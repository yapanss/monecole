import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray,Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { ApiService } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';

@Component({
  selector: 'app-emploiclasse-dialog',
  templateUrl: './emploiclasse-dialog.component.html',
  styleUrls: ['./emploiclasse-dialog.component.css']
})
export class EmploiclasseDialogComponent implements OnInit {
  emploiclasseForm: FormGroup;
  matieres; 
  codeProf;
  salles = this.configService.ecole.salles.concat([null]);
  jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
  horaires = ["m1", "m2", "m3", "m4", "m5", "s1", "s2", "s3", "s4", "s5"]
  leJour: string = "lundi";
  listeCodeProf = []
  constructor(private formBuilder: FormBuilder,
      			  private api: ApiService,
              private configService: ConfigService,
              private route: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
      			  private dialogRef: MatDialogRef<EmploiclasseDialogComponent>) {
   this.buildForm()}

  ngOnInit(): void {
    this.matieres = this.data.matieres.concat([null]);
  }

  buildForm(){
    let group = {}
    this.jours.forEach(jour => {
      group[jour] = new FormGroup(this.horaireGroup(jour))
    })
    this.emploiclasseForm = new FormGroup(group)
  }
  horaireGroup(jour){
    let group = {}
    let emploiclasse = this.data.emploiclasse
     this.horaires.forEach(heure => {
        group[heure] = new FormGroup({
            matiere: new FormControl(!emploiclasse ? null: this.data.emploiclasse[jour][heure].matiere),
            codeProf: new FormControl(!emploiclasse ? null: this.data.emploiclasse[jour][heure].codeProf),
            salle: new FormControl(!emploiclasse ? null: this.data.emploiclasse[jour][heure].salle)
          })
      })
     return group
  }
  onPrecedent(){
  	switch(this.leJour){
  		case "vendredi":
  			this.leJour = "jeudi"
  			break
  		case "jeudi":
  			this.leJour = "mercredi"
  			break
  		case "mercredi":
  			this.leJour = "mardi"
  			break
  		case "mardi":
  			this.leJour = "lundi"
  			break
  	}
  }
  onSuivant(){
  	switch(this.leJour){
  		case "lundi":
  			this.leJour = "mardi"
  			break
  		case "mardi":
  			this.leJour = "mercredi"
  			break
      case "mercredi":
        this.leJour = "jeudi"
        break
      case "jeudi":
        this.leJour = "vendredi"
        break
  		default:
  			this.leJour = "lundi"
  	}

  }
  onCancel(){
  	this.dialogRef.close()
  }
  onChangeMatiere(e, unJour, uneHeure) {
    this.codeProf = this.configService.getCodeProf(this.data.classe, e.target.value)
    const jour = unJour.textContent
    const heure = uneHeure.textContent
    this.listeCodeProf.push([jour, heure, this.codeProf])

    console.log('codes profs ', this.listeCodeProf)
  }
  onSubmit(){
    this.ajouteCodeProf()
    this.requestServer()
    .subscribe(response => {
        this.dialogRef.close()
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.onSameUrlNavigation = 'reload';
        this.route.navigate(['/classe/emploidutemps/'+this.data.classe.nom])
    })
  }
  requestServer() {
    if(this.data.emploiclasse) {
      return this.api.updateOneItem('emploiclasse', this.data.emploiclasse.classe, this.emploiclasseForm.value)
    }else {
        let body = {
        classe: this.data.classe.nom,
        lundi: this.emploiclasseForm.value.lundi,
        mardi: this.emploiclasseForm.value.mardi,
        mercredi: this.emploiclasseForm.value.mercredi,
        jeudi: this.emploiclasseForm.value.jeudi,
        vendredi: this.emploiclasseForm.value.vendredi
      }
      return this.api.postForm('emploiclasse', body)
    }
  }
  ajouteCodeProf(){
    this.listeCodeProf.forEach(item =>{
      this.emploiclasseForm.value[item[0]][item[1]]["codeProf"] = item[2]
    })
  }
}