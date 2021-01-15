import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-eleve',
  templateUrl: './create-eleve.component.html',
  styleUrls: ['./create-eleve.component.css']
})
export class CreateEleveComponent implements OnInit {
  anneeScolaire: string = this.configService.config.anneeScolaire;
  eleveForm: FormGroup;
  niveaux: string[];
  redoublants: string[] = ['oui', 'non'];

  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private configService: ConfigService,
              private route: Router) {

    this.buildForm();
  }

  ngOnInit(): void {
  	this.niveaux = this.configService.config.niveaux.map(niveau => {
      return niveau.niveau;
    })
  }
  buildForm() {
    this.eleveForm = this.formBuilder.group({
      // Infos personnelles
      motDePasse: this.formBuilder.control(null),
      matricule: this.formBuilder.control(null),
      nom: this.formBuilder.control(null),
      prenoms: this.formBuilder.control(null),
      dateNaissance: this.formBuilder.control(null),
      lieuNaissance: this.formBuilder.control(null),
      genre: this.formBuilder.control(null),
      contact: this.formBuilder.control(null),
      domicile: this.formBuilder.control(null),
      // Infos parents
      pere: this.formBuilder.group({
        nomEtPrenoms: this.formBuilder.control(null),
        contact: this.formBuilder.control(null),
        profession: this.formBuilder.control(null),
      }),
      mere: this.formBuilder.group({
        nomEtPrenoms: this.formBuilder.control(null),
        contact: this.formBuilder.control(null),
        profession: this.formBuilder.control(null),
      }),
      tuteur: this.formBuilder.group({
        nomEtPrenoms: this.formBuilder.control(null),
        contact: this.formBuilder.control(null),
        profession: this.formBuilder.control(null),
      }),
      // Cursus scolaire
      anneeScolaire: this.formBuilder.control(this.anneeScolaire),
      dateEntreeEtablissement: this.formBuilder.control(null),
      etablissementOrigine: this.formBuilder.control(null),
      niveau: this.formBuilder.control(null),
      redoublant: this.formBuilder.control(null),
    });
  }
  onSubmit() {
  		this.api.postForm('eleve', this.eleveForm.value)
  		.subscribe(response => {
        this.eleveForm.reset();
      }, err  => console.error(err));
  }
  
}
