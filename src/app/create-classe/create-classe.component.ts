import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { mergeMap, catchError, flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-classe',
  templateUrl: './create-classe.component.html',
  styleUrls: ['./create-classe.component.css']
})
export class CreateClasseComponent implements OnInit {
  classeForm: FormGroup;
  anneeScolaire: string = this.configService.config.anneeScolaire;
  niveaux; 
  classes; 
  salles;
  LV2 = ["Allemand", "Espagnol"];
  Arts = ["Arts plastiques", "Musique"];

  constructor(private api: ApiService,
              private configService: ConfigService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.buildForm()
  }

  ngOnInit(): void {
    this.salles = this.configService.config.salles;
    this.niveaux = this.configService.config.niveaux.map(niveau => {
      return niveau.niveau;
    })
  }
  buildForm(){
    this.classeForm = this.formBuilder.group({
      anneeScolaire: this.formBuilder.control(this.anneeScolaire),
      niveau: this.formBuilder.control(null),
      niveauSuivant: this.formBuilder.control(null),
      nom: this.formBuilder.control(null),
      salle: this.formBuilder.control(null),
      lv2: this.formBuilder.control(null),
      art: this.formBuilder.control(null),
      educateur: this.formBuilder.control(null)
    })
  }
  onSelectNiveau(){
    this.classes = this.getClassesDuNiveau(this.classeForm.value.niveau);
  }
  onSubmit(){
    const classe = this.classeForm.value.nom;
    const matieresEtCoef = this.configService.getMatieresEtCoef(this.classeForm.value.niveau)
    const bodyClasse = {
      form: this.classeForm.value,
      enseignements: this.initialiseEnseignements(matieresEtCoef)
    }
    const bodyCahierTexte = {
      classe,
      partage: []
    }
    forkJoin([
      this.api.postForm('classe', bodyClasse),
      this.api.postForm('cahiertexte', bodyCahierTexte)
    ])
    .subscribe(response => {
      console.log(response);
      this.classeForm.reset();
    });
  }
  getNiveauAvecClassesEtMatieres(niveau){
    return this.configService.config.niveaux.filter(leNiveau => {
      return leNiveau.niveau == niveau;
    })
  }
  getClassesDuNiveau(niveau){
    return this.getNiveauAvecClassesEtMatieres(niveau)
            .map(niveau => niveau.classes)[0]
  }
  initialiseEnseignements(matieresEtCoef){
    let enseignements: any[] = [];
    matieresEtCoef.forEach(matiereEtCoef =>{
      enseignements.push({
        matiere: matiereEtCoef[0],
        coefficient: matiereEtCoef[1],
        codeProf: null
      })
    })
    return enseignements;
  }
}

  

