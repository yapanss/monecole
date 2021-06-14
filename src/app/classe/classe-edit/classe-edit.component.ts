import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { mergeMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-classe-edit',
  templateUrl: './classe-edit.component.html',
  styleUrls: ['./classe-edit.component.css']
})
export class ClasseEditComponent implements OnInit {
	classe;
  anneeScolaire: string = this.configService.ecole.annee_scolaire;
  niveaux
	classes;
	classeForm;
	salles;
  LV2 = ["Allemand", "Espagnol"];
  Arts = ["Arts plastiques", "Musique"];

  constructor(private api: ApiService,
              private configService: ConfigService,
      			  private formBuilder: FormBuilder,
      			  private route: ActivatedRoute,
      			  private router: Router) { }

  ngOnInit(): void {
  	this.route.params
	.pipe(
	mergeMap(params => {
	    return this.api.getOneItem('classe', params.nom, this.anneeScolaire)
	}),
	catchError(err => {throw(err)})
	)
	.subscribe(classe => {
	 this.salles = this.configService.ecole.salles;
   this.classes = this.getClasses(classe["niveau"])
   this.niveaux = this.configService.ecole.niveaux.map(niveau => {
      return niveau.niveau;
   })
    this.classe = classe
    this.buildForm();
	})
  }
  buildForm(){
  	if(this.classe){
  		this.classeForm = this.formBuilder.group({
	      niveau: this.formBuilder.control(this.classe.niveau),
	      niveauSuivant: this.formBuilder.control(this.classe.niveauSuivant),
	      nom: this.formBuilder.control(this.classe.nom),
	      salle: this.formBuilder.control(this.classe.salle),
	      lv2: this.formBuilder.control(this.classe.lv2),
	      art: this.formBuilder.control(this.classe.art),
	      educateur: this.formBuilder.control(this.classe.educateur)
    	})
  	}
  }
  onSelect(){
    this.classes = this.getClasses(this.classeForm.value.niveau)
  }
  getClasses(niveauClasse){
    return this.configService.ecole.niveaux.filter(niveau => {
      return niveau.niveau == niveauClasse;
    })
    .map(niveau => niveau.classes)[0]
  }
  onSubmit(){
  	this.api.updateOneItem('classe', this.classe._id, this.classeForm.value)
  		.subscribe(response => {
        console.log(response);
        this.router.navigate(['/classes'])
      });
  }

}




