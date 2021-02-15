import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { mergeMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-personnel-dialog',
  templateUrl: './personnel-dialog.component.html',
  styleUrls: ['./personnel-dialog.component.css']
})
export class PersonnelDialogComponent implements OnInit {
	personnel;
	personnelForm: FormGroup;
	emplois = ["Professeur de lycée", "Professeur de collège", "Educateur",
	             "Inspecteur d\'orientation", "Inspecteur d\'éducation"]
	genres = ["M", "F"];
	situationMatrimoniales = ["marié(e)", "divorcé(e)", "veuf(ve)", "célibataire"];
	titres = ["Professeur", "Educateur(trice)", "Censeur", "Proviseur", 
	                "Inspecteur d\'orientation", "Inspecteur d\'éducation"];
	specialites = ["Anglais", "Allemand", "Arts Plastiques", "EPS", "Espagnol", 
	                 "Français", "Histoire-Géographie", "Musique", "Mathématiques",
					 "Philosophie", "Physique-Chimie", "SVT"]

	@Output() addPersonnel = new EventEmitter()
	@Output() updatePersonnel = new EventEmitter()
					 
  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private router: Router,
			  private route: ActivatedRoute,
			  private dialogRef: MatDialogRef<PersonnelDialogComponent>,
			  @Inject(MAT_DIALOG_DATA) public data: any) {
				this.buildForm()
			  }

  ngOnInit(): void {}
  buildForm(){
  		this.personnelForm = this.formBuilder.group({
  			// Infos personnelles
		  motDePasse: this.formBuilder.control(null),
	      matricule: this.formBuilder.control(this.data.personnel && this.data.personnel.matricule ? this.data.personnel.matricule : null),
	      nom: this.formBuilder.control(this.data.personnel && this.data.personnel.nom ? this.data.personnel.nom : null),
	      prenoms: this.formBuilder.control(this.data.personnel && this.data.personnel.prenoms ? this.data.personnel.prenoms : null),
		  dateNaissance: this.formBuilder.control(this.data.personnel && this.data.personnel.dateNaissance ? 
												  this.data.personnel.dateNaissance : null),
		  lieuNaissance: this.formBuilder.control(this.data.personnel && this.data.personnel.lieuNaissance ?
												  this.data.personnel.lieuNaissance : null),
	      genre: this.formBuilder.control(this.data.personnel && this.data.personnel.genre ? this.data.personnel.genre : null),
		  situationMatrimoniale: this.formBuilder.control(this.data.personnel && this.data.personnel.situationMatrimoniale ?
														  this.data.personnel.situationMatrimoniale : null),
		  nombreEnfants: this.formBuilder.control(this.data.personnel && this.data.personnel.nombreEnfants ? 
												  this.data.personnel.nombreEnfants : null),
	      contact: this.formBuilder.control(this.data.personnel && this.data.personnel.contact ? this.data.personnel.contact : null),
	      domicile: this.formBuilder.control(this.data.personnel && this.data.personnel.domicile ? this.data.personnel.domicile : null),
	      // Carriere
		  dateEntreeEtablissement: this.formBuilder.control(this.data.personnel && this.data.personnel.dateEntreeEtablissement ?
															this.data.personnel.dateEntreeEtablissement : null),
	      diplomes: this.formBuilder.control(this.data.personnel && this.data.personnel.diplomes ? this.data.personnel.diplomes : null),
	      emploi: this.formBuilder.control(this.data.personnel && this.data.personnel.emploi ? this.data.personnel.emploi : null),
	      fonction: this.formBuilder.group({
			titre: this.formBuilder.control(this.data.personnel && this.data.personnel.fonction && this.data.personnel.fonction.titre ? 
											  this.data.personnel.fonction.titre : null),
			  specialite: this.formBuilder.control(this.data.personnel && this.data.personnel.fonction && this.data.personnel.fonction.specialite ?
												   this.data.personnel.fonction.specialite : null)
	      }),
	      // Annee Courante
	  	code: this.formBuilder.control(this.data.personnel && this.data.personnel.code ? this.data.personnel.code : null),
	  	radiation: this.formBuilder.group({
			estRadie: this.formBuilder.control(this.data.personnel && this.data.personnel.radiation && this.data.personnel.radiation.estRadie ?
												 this.data.personnel.radiation.estRadie : null),
			dateDeSortie: this.formBuilder.control(this.data.personnel && this.data.personnel.radiation && this.data.personnel.radiation.dateDeSortie ?
												   this.data.personnel.radiation.dateDeSortie : null),
			motif: this.formBuilder.control(this.data.personnel && this.data.personnel.radiation && this.data.personnel.radiation.motif ?
					 						this.data.personnel.radiation.motif : null)
	  	})
	  })
  }
  onCancel(){
	  this.dialogRef.close();
  }
  onCreate(){
    if(this.data.actionType == 'create'){
      this.api.postForm('personnel', this.personnelForm.value)
  		.subscribe(response => {
        this.addPersonnel.emit(response)
        this.dialogRef.close()
      }, err  => console.error(err));
    } 
  }
  onUpdate(){
	const matricule = this.data.personnel.matricule;
    this.api.updateOneItem('personnel', matricule, this.personnelForm.value)
  		.subscribe(response => {
        this.updatePersonnel.emit(response)
        this.dialogRef.close()
      }, err  => console.error(err));
  }
}
