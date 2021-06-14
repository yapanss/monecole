import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { mergeMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-eleve-dialog',
  templateUrl: './eleve-dialog.component.html',
  styleUrls: ['./eleve-dialog.component.css']
})
export class EleveDialogComponent implements OnInit {

	eleveForm: FormGroup;
	anneeScolaire;

	@Output() addEleve = new EventEmitter()
	@Output() updateEleve = new EventEmitter()

  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private router: Router,
			  private route: ActivatedRoute,
			  private configService: ConfigService,
			  private dialogRef: MatDialogRef<EleveDialogComponent>,
			  @Inject(MAT_DIALOG_DATA) public data: any) { 
  				this.buildForm()
  			}

  ngOnInit(): void {
        this.anneeScolaire = this.configService.ecole.annee_scolaire;
  }

  buildForm(){
  	//if(this.eleve){
  	  this.eleveForm = this.formBuilder.group({
      anneeScolaire: this.formBuilder.control(this.anneeScolaire),
  		// Infos personnelles
      motDePasse: this.formBuilder.control(null),
      matricule: this.formBuilder.control(this.data.eleve && this.data.eleve.matricule ? this.data.eleve.matricule : null),
      nom: this.formBuilder.control(this.data.eleve && this.data.eleve.nom ? this.data.eleve.nom : null),
      prenoms: this.formBuilder.control(this.data.eleve && this.data.eleve.prenoms ? this.data.eleve.prenoms : null),
      date_naissance: this.formBuilder.control(this.data.eleve && this.data.eleve.date_naissance ? this.data.eleve.date_naissance : null),
      lieu_naissance: this.formBuilder.control(this.data.eleve && this.data.eleve.lieu_naissance ? this.data.eleve.lieu_naissance : null),
      genre: this.formBuilder.control(this.data.eleve && this.data.eleve.genre ? this.data.eleve.genre : null),
      niveau: this.formBuilder.control({
      	value: this.data.eleve && this.data.eleve.niveau ? this.data.eleve.niveau : null, 
      	disabled: this.data.eleve && this.data.eleve.classe ? true: false
      }),
      redoublant: this.data.eleve ? this.data.eleve.redoublant : null,
      contact: this.formBuilder.control(this.data.eleve && this.data.eleve.contact ? this.data.eleve.contact : null),
      domicile: this.formBuilder.control(this.data.eleve && this.data.eleve.domicile ? this.data.eleve.domicile : null),
      // Infos parents
      pere: this.formBuilder.group({
        nomEtPrenoms: this.formBuilder.control(this.data.eleve && this.data.eleve.pere && this.data.eleve.pere.nomEtPrenoms ? 
        										this.data.eleve.pere.nomEtPrenoms : null),
        contact: this.formBuilder.control(this.data.eleve && this.data.eleve.pere && this.data.eleve.pere.contact ? 
        										this.data.eleve.pere.contact : null),
        profession: this.formBuilder.control(this.data.eleve && this.data.eleve.pere && this.data.eleve.pere.profession ? 
        										this.data.eleve.pere.profession : null),
      }),
      mere: this.formBuilder.group({
        nomEtPrenoms: this.formBuilder.control(this.data.eleve && this.data.eleve.mere && this.data.eleve.mere.nomEtPrenoms ? 
        										this.data.eleve.mere.nomEtPrenoms : null),
        contact: this.formBuilder.control(this.data.eleve && this.data.eleve.mere && this.data.eleve.mere.contact ? 
        										this.data.eleve.mere.contact : null),
        profession: this.formBuilder.control(this.data.eleve && this.data.eleve.mere && this.data.eleve.mere.profession ? 
        										this.data.eleve.mere.profession : null),
      }),
      tuteur: this.formBuilder.group({
        nomEtPrenoms: this.formBuilder.control(this.data.eleve && this.data.eleve.tuteur && this.data.eleve.tuteur.nomEtPrenoms ? 
        										this.data.eleve.tuteur.nomEtPrenoms : null),
        contact: this.formBuilder.control(this.data.eleve && this.data.eleve.tuteur && this.data.eleve.tuteur.contact ? 
        										this.data.eleve.pere.contact : null),
        profession: this.formBuilder.control(this.data.eleve && this.data.eleve.tuteur && this.data.eleve.tuteur.profession ? 
        										this.data.eleve.tuteur.profession : null),
      }),
      // Cursus scolaire
      dateEntreeEtablissement: this.formBuilder.control(this.data.eleve && this.data.eleve.dateEntreeEtablissement ? this.data.eleve.dateEntreeEtablissement : null),
      etablissementOrigine: this.formBuilder.control(this.data.eleve && this.data.eleve.etablissementOrigine ? this.data.eleve.etablissementOrigine : null)
    })
  	}
  onCancel(){
	  this.dialogRef.close();
  }
  onCreate(){
      //this.api.postForm('eleve', this.eleveForm.value)
      this.api.postForm('eleves', this.eleveForm.value)
  		.subscribe(response => {
        this.addEleve.emit(response)
        this.dialogRef.close()
      }, err  => console.error(err));
  }
  onUpdate(){
	const id = this.data.eleve._id['$oid'];
    this.api.updateOneItem('eleves', id, this.eleveForm.value)
  		.subscribe(response => {
        this.updateEleve.emit(response)
        this.dialogRef.close()
      }, err  => console.error(err));
  //}
  }

}
