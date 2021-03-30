import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ajout-eleve-prof',
  templateUrl: './ajout-eleve-prof.component.html',
  styleUrls: ['./ajout-eleve-prof.component.css']
})
export class AjoutEleveProfComponent implements OnInit {

  anneeScolaire: string = this.configService.config.anneeScolaire;
  profForm: FormGroup;
  eleveForm: FormGroup;
	eleveControls: FormGroup;
  eleveGroup: FormGroup;
  group={};
  nom: String;
  eleves = this.data.eleves;
  field = this.data.field;
  emploiclasse;
  jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
  horaires = ["m1", "m2", "m3", "m4", "m5", "s1", "s2", "s3", "s4", "s5"]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  			      private formBuilder: FormBuilder,
          	  private dialogRef: MatDialogRef<AjoutEleveProfComponent>,
          	  private api: ApiService,
          	  private configService: ConfigService,
          	  private route: Router) { 
  	this.buildForm()
  }

   ngOnInit(): void {
    this.api.getOneItem('emploiclasse', this.data.classe.nom)
    .subscribe(emploiclasse =>{
      this.emploiclasse = emploiclasse
    })
  }

  buildForm() {
    this.eleveForm = this.data.eleveForm;
    this.profForm = this.data.profForm;
  }
  filterEleve(){
    this.data.eleves = this.eleves.filter(eleve => {
      return eleve.nom.startsWith(this.nom) || eleve.matricule.startsWith(this.nom)
    });
  }
  onCancel(){
    this.dialogRef.close();
  }
  onSubmitProf(){
    let enseignements = Object.entries(this.profForm.value)
                        .map(keyValue => {
                          return {
                            matiere: keyValue[0],
                            codeProf: keyValue[1]['professeur'],
                            coefficient: keyValue[1]['coefficient']
                          }
                        })
    let body = {enseignements}
    this.requestServer(body)
    .subscribe(response =>{
      this.dialogRef.close();
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate(['/classe/detail/'+this.data.classe.nom])
    })
    
  }
  onCancelProf(){
    this.dialogRef.close();
  }
  onChangeProf(e, matiere){
    if(this.emploiclasse){
      this.jours.forEach(jour =>{
        this.horaires.forEach(horaire =>{
          if(this.emploiclasse[jour][horaire]["matiere"] == matiere){
            this.emploiclasse[jour][horaire]["codeProf"] = e.target.value
          }
        })
      })
    }
  }
  onSubmitEleve(){
    this.dialogRef.close();
    const selectedMatriculeEleves = Object.entries(this.eleveForm.value)
                            .filter(keyValue => keyValue[1])
                            .map(keyValue => keyValue[0]);
    const reqBodyEleves = {
      anneeScolaire: this.anneeScolaire,
      matriculeEleves: selectedMatriculeEleves,
      classe: this.data.classe.nom,
      updateQuery: 'classe'
    }
    const reqBodyClasse = {
      effectif: this.data.classe.effectif + selectedMatriculeEleves.length
    }
    forkJoin([this.api.updateItems('eleve', reqBodyEleves),
              this.api.updateOneItem('classe', this.data.classe._id, reqBodyClasse)]
    )    
    .subscribe(response  => {
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate(['/classe/detail/'+this.data.classe.nom])
    });
  }
  requestServer(body){
    if(this.emploiclasse){
      return forkJoin(this.api.updateOneItem('classe', this.data.classe._id, body),
                      this.api.updateOneItem('emploiclasse', this.emploiclasse.classe, this.emploiclasse))
               
    }else{
      return this.api.updateOneItem('classe', this.data.classe._id, body)
    }
  }

}


