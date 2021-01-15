import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-emploiprof',
  templateUrl: './emploiprof.component.html',
  styleUrls: ['./emploiprof.component.css']
})
export class EmploiprofComponent implements OnInit, OnChanges {
  anneeScolaire: string;
  emploiprof = {
    lundi: {},
    mardi: {},
    mercredi: {},
    jeudi: {},
    vendredi: {}
  };
  array = [];
  codeProf;
  emploiclasses;
  matieres;
  jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
  horaires = ["m1", "m2", "m3", "m4", "m5", "s1", "s2", "s3", "s4", "s5"];

  @Input() personnel: any;
  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private configService: ConfigService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if(this.configService.config){
      this.anneeScolaire = this.configService.config.anneeScolaire;
    }
    this.codeProf = this.personnel["code"]
    this.api.getSome('classe', 'prof', this.codeProf, this.anneeScolaire)
    .pipe(
      mergeMap(classes =>{
        console.log(classes);
        let nomsClasse = classes.map(classe => classe.nom)
        return this.api.getSome('emploiclasse', 'classe', nomsClasse)
    }),
    catchError(err => {throw(err)})
  )
  .subscribe(emploiclasses => {
    this.emploiclasses = emploiclasses;
    console.log('Emploi Classe = ', this.emploiclasses)
    this.buildEmploiProf()
})
  }

  buildEmploiProf(){
    this.initialiseEmploiProf()
    let group = {}
    if(this.emploiclasses){
      this.emploiclasses.forEach(emploiclasse =>{
        this.jours.forEach(jour => {
          this.determineHeuresDeCours(jour, emploiclasse)
      })
    })
    this.array.forEach(item =>{
      this.emploiprof[item[0]][item[1]] = {
        classe: item[2],
        matiere: item[3],
        salle: item[4]
      }
    })
    }
    console.log('emploi du temps prof : ', this.emploiprof)
  }
  initialiseEmploiProf(){
    this.jours.forEach(jour =>{
      this.horaires.forEach(heure =>{
        this.emploiprof[jour] = this.initialiseHoraires()
      })
    })
  }
  initialiseHoraires(){
    let group = {}
    this.horaires.forEach(heure => {
      group[heure] = {
        classe: null,
        matiere: null,
        salle: null
      }
    })
    return group
  }
  determineHeuresDeCours(jour, emploiclasse){
    let group = {}
     this.horaires.forEach(heure => {
      if(emploiclasse[jour][heure]["codeProf"] == this.codeProf){
        this.array.push([jour, heure, emploiclasse.classe, emploiclasse[jour][heure]["matiere"],
                         emploiclasse[jour][heure]["salle"]])
       } 
    })
  }
}  