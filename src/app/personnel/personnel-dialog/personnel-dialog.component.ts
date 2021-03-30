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
	personnelNameControl;
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
	messageErreur: any;
	personnelNomUtilisateurControl: any;
	personnelMotDePasseControl: any;
	personnelNomControl: any;
	personnelPrenomControl: any;
	personnelContactControl: any;
	personnelEmailControl: any;
	personnelMatriculeControl: any;
					 
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
		  nomUtilisateur: this.formBuilder.control(this.data.personnel && this.data.personnel.nomUtilisateur ? this.data.personnel.nomUtilisateur : null, Validators.required),
		  motDePasse: this.formBuilder.control(this.data.personnel && this.data.personnel.motDePasse ? this.data.personnel.motDePasse : null, Validators.required),
	      matricule: this.formBuilder.control(this.data.personnel && this.data.personnel.matricule ? this.data.personnel.matricule : null, Validators.required),
	      nom: this.formBuilder.control(this.data.personnel && this.data.personnel.nom ? this.data.personnel.nom : null, Validators.required),
	      prenoms: this.formBuilder.control(this.data.personnel && this.data.personnel.prenoms ? this.data.personnel.prenoms : null, Validators.required),
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
	      email: this.formBuilder.control(this.data.personnel && this.data.personnel.email ? this.data.personnel.email : null, 
										  Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)),
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
	  this.personnelNomUtilisateurControl = this.personnelForm.get('nomUtilisateur')
	  this.personnelMotDePasseControl = this.personnelForm.get('motDePasse')
	  this.personnelNomControl = this.personnelForm.get('nom')
	  this.personnelPrenomControl = this.personnelForm.get('prenoms')
	  this.personnelEmailControl = this.personnelForm.get('email')
	  this.personnelMatriculeControl = this.personnelForm.get('matricule')
	  
  }
  
  onCancel(){
	  this.dialogRef.close();
  }
  onCreate(){
    if(this.personnelForm.valid){
      this.api.postForm('personnel', this.personnelForm.value)
  		.subscribe(response => {
			  if(response['statut'] == 'erreur'){
				  console.log(response);
				  this.messageErreur = response['message']
			  } else {
				this.addPersonnel.emit(response)
        		this.dialogRef.close()
			  }
        
      }, err  => console.error(err));
    }else{ 
		this.messageErreur = "Le formulaire est invalide ! Vérifiez que tous les champs sont correctement remplis."
	}
  }
  onUpdate(){
    if(this.personnelForm.valid){
	const matricule = this.data.personnel.matricule;
    this.api.updateOneItem('personnel', matricule, this.personnelForm.value)
  		.subscribe(response => {
			if(response['statut'] == 'erreur'){
				console.log(response);
				this.messageErreur = response['message']
			} else { 
				this.updatePersonnel.emit(response)
        		this.dialogRef.close()
			}
        
      }, err  => console.error(err));
  	} else{ 
		this.messageErreur = "Le formulaire est invalide ! Vérifiez que tous les champs sont correctement remplis."
	}
	}
}
