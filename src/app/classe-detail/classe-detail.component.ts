import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap, catchError, flatMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ClasseDialogComponent } from '../classe-dialog/classe-dialog.component';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import * as _ from 'lodash';

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
  profForm: FormGroup;
  enseignements;
  periode = "";
  periodes = [];
  imgSrc: string = "http://localhost:3000/salle.jpg";
  baseUrl: string = "localhost:3000/";
  periodeSansAnnuel: any;
  configuration: any;

  constructor(private api: ApiService,
              private configService: ConfigService,
      			  private router: Router,
      			  private route: ActivatedRoute,
              private dialog: MatDialog,
              private formBuilder: FormBuilder
  			  ) {
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
      	flatMap(classe  => {
          this.niveaux = this.configService.getNiveaux();
      		this.classe = classe;
          this.matieresDuNiveau = this.configService.getMatieres(this.classe.niveau)
          let codes = classe["enseignements"].map(enseignement =>{
            return enseignement.codeProf
          })
      		return forkJoin(this.api.getSome('eleve', 'classe', this.classe.nom, this.anneeScolaire),
                          this.api.getSome('personnel', 'code', codes))
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
 onDelete(index){}
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
          
    this.dialog.open(ClasseDialogComponent, {
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
  this.dialog.open(ClasseDialogComponent, {
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