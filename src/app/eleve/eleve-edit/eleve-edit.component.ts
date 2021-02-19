import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { mergeMap, catchError } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-eleve-edit',
  templateUrl: './eleve-edit.component.html',
  styleUrls: ['./eleve-edit.component.css']
})
export class EleveEditComponent implements OnInit {
	eleve;
	eleveForm: FormGroup;
	matricule: string;
  anneeScolaire: string;
  constructor(private api: ApiService,
              private configService: ConfigService,
      			  private formBuilder: FormBuilder,
      			  private route: ActivatedRoute,
      			  private router: Router) {
  	 }

  ngOnInit(): void {
  	this.route.params
      .pipe(
        mergeMap(params => {
          this.matricule = params.matricule;
         return this.api.getOneItem('eleve', this.matricule)
       }),
         catchError(err => {throw(err)})
      )
      .subscribe(eleve  => {
        this.anneeScolaire = this.configService.config.anneeScolaire;
          eleve['cursus'].forEach(item =>{
            if(item.annee == this.anneeScolaire){
              eleve['classe'] = item.classe
              eleve['niveau'] = item.niveau
              eleve['redoublant'] = item.redoublant
              eleve['resultats'] = item.resultats
            }
          })
      	this.eleve = eleve;
      	this.buildForm();
      })
  }

  buildForm(){
  	if(this.eleve){
  		this.eleveForm = this.formBuilder.group({
      anneeScolaire: this.formBuilder.control(this.anneeScolaire),
  		// Infos personnelles
      motDePasse: this.formBuilder.control(null),
      matricule: this.formBuilder.control(this.eleve.matricule),
      nom: this.formBuilder.control(this.eleve.nom),
      prenoms: this.formBuilder.control(this.eleve.prenoms),
      dateNaissance: this.formBuilder.control(this.eleve.dateNaissance),
      lieuNaissance: this.formBuilder.control(this.eleve.lieuNaissance),
      genre: this.formBuilder.control(this.eleve.genre),
      niveau: this.formBuilder.control({
      	value: this.eleve.niveau, 
      	disabled: this.eleve.classe ? true: false
      }),
      redoublant: this.eleve.redoublant,
      contact: this.formBuilder.control(this.eleve.contact),
      domicile: this.formBuilder.control(this.eleve.domicile),
      // Infos parents
      pere: this.formBuilder.group({
        nomEtPrenoms: this.formBuilder.control(this.eleve.pere.nomEtPrenoms),
        contact: this.formBuilder.control(this.eleve.pere.contact),
        profession: this.formBuilder.control(this.eleve.pere.profession),
      }),
      mere: this.formBuilder.group({
        nomEtPrenoms: this.formBuilder.control(this.eleve.mere.nomEtPrenoms),
        contact: this.formBuilder.control(this.eleve.mere.contact),
        profession: this.formBuilder.control(this.eleve.mere.profession),
      }),
      tuteur: this.formBuilder.group({
        nomEtPrenoms: this.formBuilder.control(this.eleve.tuteur.nomEtPrenoms),
        contact: this.formBuilder.control(this.eleve.tuteur.contact),
        profession: this.formBuilder.control(this.eleve.tuteur.profession),
      }),
      // Cursus scolaire
      dateEntreeEtablissement: this.formBuilder.control(this.eleve.dateEntreeEtablissement),
      etablissementOrigine: this.formBuilder.control(this.eleve.etablissementOrigine)
    })
  	}
  }

  onSubmit(){
  	this.api.updateOneItem('eleve', this.matricule, this.eleveForm.value)
  		.subscribe(response => {
        console.log(response);
        this.router.navigate(['/eleves'])
      });
  }
}


