import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { mergeMap, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-classe-dialog',
  templateUrl: './classe-dialog.component.html',
  styleUrls: ['./classe-dialog.component.css']
})
export class ClasseDialogComponent implements OnInit {

  classeForm: FormGroup;
  anneeScolaire;
  classes;
  salles = ['S1', 'S2', 'S3', 'S4', 'Labo']
  niveaux = ['Sixième', 'Cinquième', 'Quatrième', 'Troisième']
  LV2 = ["Allemand", "Espagnol"];
  Arts = ["Arts plastiques", "Musique"];

  @Output() addClasse = new EventEmitter()
  @Output() updateClasse = new EventEmitter()

  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private configService: ConfigService,
              private dialogRef: MatDialogRef<ClasseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
          this.buildForm()
        }

  ngOnInit(): void {
        //this.anneeScolaire = this.configService.config.anneeScolaire;
        //this.salles = this.configService.config.salles;
        // this.niveaux = this.configService.config.niveaux.map(niveau => {
        //   return niveau.niveau;
        //})
        console.log('classeecole', this.configService.ecole)

  }

  buildForm(){
    //if(this.eleve){
      this.classeForm = this.formBuilder.group({
        annee_scolaire: this.formBuilder.control(this.data.classe && this.data.classe.annee_scolaire ?
                                                this.data.classe.annee_scolaire : '2020-2021'),
        niveau: this.formBuilder.control(this.data.classe && this.data.classe.niveau ?
                                         this.data.classe.niveau : null),
        niveau_suivant: this.formBuilder.control(this.data.classe && this.data.classe.niveau_suivant ?
                                         this.data.classe.niveau_suivant : null),
        nom: this.formBuilder.control(this.data.classe && this.data.classe.nom ?
                                         this.data.classe.nom : null),
        salle: this.formBuilder.control(this.data.classe && this.data.classe.salle ?
                                         this.data.classe.salle : null),
        lv2: this.formBuilder.control(this.data.classe && this.data.classe.lv2 ?
                                         this.data.classe.lv2 : null),
        art: this.formBuilder.control(this.data.classe && this.data.classe.art ?
                                         this.data.classe.art : null),
        //educateur: this.formBuilder.control(this.data.classe && this.data.classe.educateur ?
                                         //this.data.classe.educateur : null)
      })
    }
  onCancel(){
    this.dialogRef.close();
  }
  onCreate(){
      this.classeForm.value.annee_scolaire = this.configService.ecole.annee_scolaire
      this.api.postForm('classes', this.classeForm.value)
      .subscribe(response => {
        this.addClasse.emit(response)
        this.dialogRef.close()
      }, err  => console.error(err));
  }
  onUpdate(){
  const id = this.data.classe._id['$oid'];
    this.api.updateOneItem('classes', id, this.classeForm.value)
      .subscribe(response => {
        this.updateClasse.emit(response)
        this.dialogRef.close()
      }, err  => console.error(err));
  //}
  }


  // *********** fonctions de createClasse

  onSelectNiveau(){
    this.classes = this.getClassesDuNiveau(this.classeForm.value.niveau);
  }
  onSubmit(){
    this.api.postForm('classes', this.classeForm.value)
    // const classe = this.classeForm.value.nom;
    // const matieresEtCoef = this.configService.getMatieresEtCoef(this.classeForm.value.niveau)
    // const bodyClasse = {
    //   form: this.classeForm.value,
    //   enseignements: this.initialiseEnseignements(matieresEtCoef)
    // }
    // const bodyCahierTexte = {
    //   classe,
    //   partage: []
    // }
    // forkJoin([
    //   this.api.postForm('classe', bodyClasse),
    //   this.api.postForm('cahiertexte', bodyCahierTexte)
    // ])
    .subscribe(response => {
      console.log(response);
      this.classeForm.reset();
    });
  }
  getNiveauAvecClassesEtMatieres(niveau){
    return this.configService.ecole.niveaux.filter(leNiveau => {
      return leNiveau.niveau == niveau;
    })
  }
  // getClassesDuNiveau(niveau){
  //   return this.getNiveauAvecClassesEtMatieres(niveau)
  //           .map(niveau => niveau.classes)[0]
  // }
  getClassesDuNiveau(niveau){
    switch(niveau){
      case 'Sixième' :
        return ['6E01', '6E02', '6E03'];
      case 'Cinquième' :
        return ['5E01', '5E02', '5E03'];
      case 'Quatrième' :
        return ['4E01', '4E02', '4E03'];
      case 'Troisième' :
        return ['3E01', '3E02', '3E03'];
      default :
        return []; 
    }
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
