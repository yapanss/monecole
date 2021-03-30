import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap, catchError, flatMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AjoutEleveProfComponent } from '../ajout-eleve-prof/ajout-eleve-prof.component';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import * as _ from 'lodash';
import { ClasseDialogComponent } from '../classe-dialog/classe-dialog.component';

@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.component.html',
  styleUrls: ['./classe-detail.component.css']
})
export class ClasseDetailComponent implements OnInit {
  anneeScolaire: string = this.configService.config.anneeScolaire;
  niveaux: string[];
  niveauProchain: string[] = [];
  decisions: string[] = ['Admis (e)', 'Redouble', 'Exclu (e)'];
  ecole: any;
	classe: any;
  codes;
	nom;
  eleves;
  infoEleves: any[] = [];
  professeurs;
  lesProfs = [];
  matieres;
  matieresDuNiveau = [];
  eleveGroup: FormGroup;
  eleveForm: FormGroup;
  formEleve: FormGroup;
  profForm: FormGroup;
  enseignements;
  periode = "";
  periodes = [];
  imgSrc: string = "http://localhost:3000/salle.jpg";
  baseUrl: string = "localhost:3000/";
  periodeSansAnnuel: any;
  configuration: any;

  elevesSelectionnes: string[] = []
  checkList: boolean[] = []
  removeIcon: boolean = true
  etatSelection: string[] = [];
  allChecked: boolean = false;

  constructor(private api: ApiService,
              private configService: ConfigService,
      			  private router: Router,
      			  private route: ActivatedRoute,
              private dialog: MatDialog,
              private formBuilder: FormBuilder
  			  ) {
    this.buildForm()
  }

  ngOnInit(): void {
    console.log('activatedroute', this.route)
  	this.route.params
      .pipe(
        mergeMap(params => {
          this.nom = params.nom;
          return this.api.getOneItem('classe', this.nom, this.anneeScolaire)
       })
      )
      .pipe(
      	mergeMap(classe  => {
          this.niveaux = this.configService.getNiveaux();
      		this.classe = classe;
          this.matieresDuNiveau = this.configService.getMatieres(this.classe.niveau)
          let codes = classe["enseignements"].map(enseignement =>{
            return enseignement.codeProf
          })
      		return forkJoin([this.api.getSome('eleve', 'classe', this.classe.nom, this.anneeScolaire),
                          this.api.getSome('personnel', 'code', codes)])
          }),
      		catchError(err => {throw(err)})
      )
      .subscribe(response => {
        this.configuration = this.configService.config;
        this.periodeSansAnnuel = this.configService.getPeriodes();
          this.periodes = this.configService.getPeriodes().concat(['Annuel']);
          // let eleves = response[0];
              this.eleves = _.orderBy(response[0], ['nom']);
              this.eleves.forEach(eleve =>{
                this.checkList[eleve.matricule] = false
                this.etatSelection.push('')
                eleve['cursus'].forEach(item =>{
                  if(item.annee == this.anneeScolaire){
                    this.infoEleves.push({
                      resultats: item.resultats,
                      decisionFinAnnee: item.decisionFinAnnee,
                      niveau: item.niveau,
                      redoublant: item.redoublant
                    })
                  }
                })
              })
          this.infoEleves.forEach(info =>{
            // console.log('resultats annuel : ', eleve.resultats['Annuel'])
            if(info.decisionFinAnnee == 'Admis (e)'){
              this.niveauProchain.push(this.classe.niveauSuivant)
            }else{
              this.niveauProchain.push(null)
            }
          })
          this.professeurs = response[1]['personnels']
          this.enseignements = this.classe["enseignements"];
          this.enseignements.forEach(enseignement =>{
            this.professeurs.forEach(prof =>{
              if(enseignement.codeProf == prof.code){
                this.lesProfs.push({
                  matiere: enseignement.matiere,
                  prof
                })
              }
            })
          })
          this.lesProfs = _.orderBy(this.lesProfs, ['matiere'])
      })
 }
 buildForm(){
  let group = {};
  if(this.eleves){
    this.eleves.forEach(eleve =>{
      group[eleve["matricule"]] = new FormControl(null); 
    })
    this.formEleve = this.formBuilder.group(group)
  }else {
    console.log('builder : ', 'désolé, ya pas eleve')
  }
  
 }
onCheckOnce(matricule, index){
  if(this.checkList[matricule]){
    this.etatSelection[index] = 'selection'
    this.elevesSelectionnes.push(matricule)
    if(this.elevesSelectionnes.length == this.eleves.length){
      this.allChecked = true
    }
  }else{
    this.etatSelection[index] = ''
    this.elevesSelectionnes = this.elevesSelectionnes.filter(item =>{
      return item != matricule
    })
    this.allChecked = false
  }
}
toggleCheckAll(){
  let index = 0
  if(this.allChecked){
      this.eleves.forEach(eleve =>{
      this.checkList[eleve.matricule] = true;
      this.elevesSelectionnes[index] = eleve.matricule
      this.etatSelection[index] = 'selection'
      index += 1
    })
  } else{
        this.elevesSelectionnes = []
        this.eleves.forEach(eleve =>{
        this.checkList[eleve.matricule] = false;
        this.etatSelection[index] = ''
        index += 1
      })
    }
}
 removeEleve(){
   if(confirm('Voulez-vous vraiment supprimer ces élèves de la classe ?')){
     let eleveBody = {
       updateQuery : 'classe',
       classe: null,
       matriculeEleves: this.elevesSelectionnes,
       anneeScolaire: this.anneeScolaire
     }
     let classeBody = {
       effectif: this.classe.effectif - this.elevesSelectionnes.length
     }
     forkJoin([this.api.updateItems('eleve', eleveBody), 
               this.api.updateOneItem('classe', this.classe._id, classeBody)])
     .subscribe(response =>{
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/classe/detail/'+this.classe.nom])
     })
   }
 }
 onDelete(index){}
 onUpdateDialog(){
  let dialogRef = this.dialog.open(ClasseDialogComponent, {
    width: '80%',
    data: {
      actionType: 'update',
      classe: this.classe
    }
  });
  dialogRef.componentInstance.updateClasse.subscribe(newClasse =>{
    this.classe = newClasse;
  })
 }
 onAjoutEleve() {
  let group = {};
  this.api.getSome('eleve','niveau',  this.classe.niveau, this.anneeScolaire)
  .subscribe(eleves => {
    Object.entries(eleves)
    .map(keyValue  => keyValue[1])
    .forEach((eleve: object) =>{
          group[eleve["matricule"]] = new FormControl(null);  
    })
          
  this.eleveForm = this.formBuilder.group(group)
          
    this.dialog.open(AjoutEleveProfComponent, {
      disableClose: true,
      width: '80%',
      data: {
        eleves, 
        eleveForm: this.eleveForm, 
        classe: this.classe,
        field: 'eleve'
      }
    });
  });
 }

 onAjoutProf(){
  this.codes = this.configService.config.codesPersonnel.concat([null]);
  let group: any = {};
  this.classe.enseignements.forEach(enseignement =>{
    let matiere = Object.values(enseignement)[1].toString();
    group[matiere] = this.formBuilder.group({
      professeur : this.formBuilder.control(enseignement.codeProf),
      coefficient : this.formBuilder.control(enseignement.coefficient)
    })
  })
  this.profForm = this.formBuilder.group(group);
  this.dialog.open(AjoutEleveProfComponent, {
      disableClose: true,
      width: '80%',
      data: {
        profForm: this.profForm, 
        classe: this.classe,
        field: 'prof',
        matieres: this.matieresDuNiveau,
        codes: this.codes
      }
    });
 }
 attribueCursusProchain(eleve, infoEleve: any, niveauProchain: string): void{
   const cursusProchain = {
     annee: this.configService.getAnneeSuivante(),
     niveau: infoEleve.decisionFinAnnee == 'Admis (e)' ? 
                                        niveauProchain : 
                                        infoEleve.decisionFinAnnee == 'Redouble' ?
                                        infoEleve.niveau : 
                                        null,
     classe: null,
     redoublant: infoEleve.decisionFinAnnee == 'Redouble' ? 'oui': 'non',
     resultats: {},
     decisionFinAnnee: null
   }
   eleve.cursus.unshift(cursusProchain)
 }
 onSubmitDecision(){
   let i = 0
   this.eleves.forEach(eleve =>{
     if(eleve.cursus[0].annee == this.configService.getAnneeSuivante()){
       eleve.cursus.splice(0, 1)
     }
      this.attribueCursusProchain(eleve, this.infoEleves[i], this.niveauProchain[i])
      i = i+1
   })
   let body = {
    eleves: this.eleves,
    classe: this.classe.nom,
    updateQuery: 'resultats',
    anneeScolaire: this.anneeScolaire
  }
  this.api.updateItems('eleve', body)
  .subscribe(response =>{
      this.eleves = response; 
  })
 }

}