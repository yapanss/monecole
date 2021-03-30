import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { MATIERES, TITRES_ENCADREMENT } from '../share/share';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { map, mergeMap, catchError, flatMap } from 'rxjs/operators';

import {COMMA, ENTER, T} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  index;
  addMode: boolean = true;
  updateMode: boolean = false
  codeProf: string;
  matiere: string;
  listeMatieres: string[] = [...MATIERES, ...TITRES_ENCADREMENT ];
  matriculeProf: string;
  profs;
  titresChef: string[] = ['Proviseur', 'Directeur', 'Fondateur', 'Directeur Général'];
  listeTypePeriode: string[] = ['trimestre', 'semestre'];
  listeNomPeriode: string[] = [];
  listePeriodes: string = "";
  nomPeriodeArray: string[];
  // fichierConfig;
	niveau: String;
  niveauForm: FormGroup;
	salleForm: FormGroup;
  matiereControls: FormArray;
	classeControls: FormArray;
  forme: String;
  matieresAjoutees;
  matieres = [];
  dateFin: Date;
  proviseur;
  configuration: any;
  debut: Date;
  fin: Date;
  personnel = {nom: 'Mathieu', matricule: '23ZZER'}
  periodesEvaluation: string[] = [];

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  codeErrorMessage: string;
  toSubmitCode: boolean = false;
  codeProfErrorMessage: string;

  constructor(private formBuilder: FormBuilder,
  			  private api: ApiService,
          private config: ConfigService) {
  	// this.buildForm()
  }

  ngOnInit(): void {
    this.configuration = this.config.config
    this.nomPeriodeArray = Object.keys(this.configuration.periodesEvaluation)
    if(this.configuration.typePeriodes == 'trimestre'){
        this.listeNomPeriode = ['Premier Trimestre,Deuxième Trimestre,Troisième Trimestre', 
                                '1er Trimestre,2e Trimestre,3e Trimestre', 
                                'Trimestre 1,Trimestre 2,Trimestre 3',
                                'Trim 1,Trim 2,Trim 3']
    }else{
      this.listeNomPeriode = ['Premier Semestre,Deuxième Semestre','1er Semestre,2e Semestre','Semestre 1,Semestre 2',
                              'Sem 1,Sem 2']
      
    }
  }
  onInputDebut(debut, periode){
    this.configuration.periodesEvaluation[periode].debut = debut
  }
  onInputFin(fin, periode){
    this.configuration.periodesEvaluation[periode].fin = fin
  }
  onSelectPeriodeType(){
    if(this.configuration.typePeriodes == 'trimestre'){
      this.listeNomPeriode = ['Premier Trimestre,Deuxième Trimestre,Troisième Trimestre', 
                              '1er Trimestre,2e Trimestre,3e Trimestre', 
                              'Trimestre 1,Trimestre 2,Trimestre 3',
                              'Trim 1,Trim 2,Trim 3']
    }else{
      this.listeNomPeriode = ['Premier Semestre,Deuxième Semestre','1er Semestre,2e Semestre','Semestre 1,Semestre 2',
                              'Sem 1,Sem 2']
    }
  
    this.nomPeriodeArray = this.listeNomPeriode[0].split(",");
    this.configuration.periodes = [];
    this.configuration.periodesEvaluation = {}
    for(let nomPeriode of this.nomPeriodeArray){
      this.configuration.periodesEvaluation[nomPeriode] = {
        debut: null,
        fin: null
      }
      this.configuration.periodes.push({titre: nomPeriode, coefficient: null})
      console.log(this.configuration)
    }
  }
  onSelectNomsPeriodes(e){
    this.nomPeriodeArray = e.value.split(",");
    this.configuration.periodes = [];
    this.configuration.periodesEvaluation = {}
    for(let nomPeriode of this.nomPeriodeArray){
      this.configuration.periodesEvaluation[nomPeriode] = {
        debut: null,
        fin: null
      }
      this.configuration.periodes.push({titre: nomPeriode, coefficient: null})
    }
    console.log(this.configuration)
  }
  onAjoutNiveau(niveau){
    const nouveauNiveau = niveau.split("-");
    nouveauNiveau.forEach(niveau =>{
      this.configuration.niveaux.push({
        niveau,
        classes: [],
        matieres: []
      })
    })
  }
  onAjoutMatiere(matiere, coefficient, index){
    this.configuration.niveaux[index].matieres.push({matiere, coefficient})
  }
  onDeleteNiveau(index){
    this.configuration.niveaux.splice(index, 1)
  }
  onDeleteMatiere(matiere, index: number){
    const indexMatiere = this.configuration.niveaux[index].matieres.indexOf(matiere);
    this.configuration.niveaux[index].matieres.splice(indexMatiere, 1)
  }
  afficheDebut(event, index){
    this.configuration.periodesEvaluation[index].debut = event.value
  }
  afficheFin(event, index){
    this.configuration.periodesEvaluation[index].fin = event.value
    console.log(this.configuration)

  }
  add(event: MatChipInputEvent, i): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      console.log(event)
      console.log("i = ", i)
      this.configuration.niveaux[i].classes.push(value);
      console.log(this.configuration)
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(classe, i): void {
    const index = this.configuration.niveaux[i].classes.indexOf(classe);
    if (index >= 0) {
      this.configuration.niveaux[i].classes.splice(index, 1);
    }
  }
  addCode(){
    if((this.configuration.codesProfesseur.filter(item =>{
      return item.codeProf == this.codeProf
    })).length != 0){
      this.codeProfErrorMessage = "Ce code est déjà attribué !"
    }else {
      this.codeProfErrorMessage = ""
      return this.api.getOneItem('personnel', this.matriculeProf)
    .pipe(
      mergeMap(response => {
        if(response){
          let codeProf = {
            codeProf: this.codeProf,
            matiere: this.matiere,
            matriculeProf: this.matriculeProf,
            nomProf: response['personnel'].nom + ' ' + response['personnel'].prenoms
          }
          this.configuration.codesProfesseur =  this.configuration.codesProfesseur.concat(codeProf)
          //this.toSubmitCode = true
          return this.api.updateOneItem('config', this.configuration._id, this.configuration)
        }
      }),
      catchError(err => {throw(err)})
    )
    .subscribe(personnel =>{
      this.matiere = ""
      this.codeProf = ""
      this.matriculeProf = ""
    })
    }
    
  }
  selectCodeToModify(index){
    this.addMode = false
    this.updateMode = true
    this.index = index
    this.codeProf = this.configuration.codesProfesseur[index].codeProf
    this.matiere = this.configuration.codesProfesseur[index].matiere
    this.matriculeProf = this.configuration.codesProfesseur[index].matriculeProf
  }
  updateCode(){
    this.api.getOneItem('personnel', this.matriculeProf)
    .pipe(
      mergeMap(response => { 
        if(response){
          //console.log('Le Prof', response['personnel'].nom)
          let codeProf = {
            codeProf: this.codeProf,
            matiere: this.matiere,
            matriculeProf: this.matriculeProf,
            nomProf: response['personnel'].nom + ' ' + response['personnel'].prenoms,
          }
          //this.configuration.codesProfesseur[this.index] = codeProf
          let body = {
            codesProfesseur: [...this.configuration.codesProfesseur.slice(0,this.index), 
              ...[codeProf], 
              ...this.configuration.codesProfesseur.slice(this.index + 1)]
          }
          return this.api.updateOneItem('config', this.configuration._id, body)
        }
      })
    ).subscribe(response =>{
      this.configuration = response
          this.addMode = true
          this.updateMode = false
    })
  }
  cancelUpdate(){
    this.updateMode = false
    this.addMode = true
    this.codeProf = null;
    this.matiere = null;
    this.matriculeProf = null
  }
  deleteCode(index){
    if(confirm('Voulez-vous vraiment supprimer ce code ?')){
      let body = {
        codesProfesseur: [...this.configuration.codesProfesseur.slice(0,index), 
                         ...this.configuration.codesProfesseur.slice(index + 1)]
      }
      this.api.updateOneItem('config',this.configuration._id, body)
      .subscribe(newConfiguration =>{
        this.configuration = newConfiguration
      })
    }
  }
  onSubmit(){
    
        this.codeErrorMessage = ""
        this.api.updateOneItem('config', this.configuration._id, this.configuration)
        .subscribe(configuration =>{
          console.log(configuration)
          this.toSubmitCode = false;
        })
      
    
  }
}