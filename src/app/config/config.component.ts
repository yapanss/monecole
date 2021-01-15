import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
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
  onSubmit(){
    console.log(this.configuration.periodesEvaluation)
    this.api.updateOneItem('config', this.configuration._id, this.configuration)
    .subscribe(configuration =>{
      console.log(configuration)
    })
  }
}