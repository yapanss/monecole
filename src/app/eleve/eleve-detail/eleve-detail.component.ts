import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, catchError, map, flatMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-eleve-detail',
  templateUrl: './eleve-detail.component.html',
  styleUrls: ['./eleve-detail.component.css']
})
export class EleveDetailComponent implements OnInit {
	eleve = <any>{};
  anneeScolaire: string;
  periodes: string[];
  matieres = [];
  total: number;
  enseignements;
  classe;
  periode: string;
	matricule;
  photo;
  showPhotoForm: boolean = false
  imgSrc: string;
  baseUrl: string = "http://localhost:3000/"
  constructor(private api: ApiService,
              private configService: ConfigService,
      			  private router: Router,
      			  private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.route.params
      .pipe(
        mergeMap(params => {
          this.matricule = params.matricule;
          return this.api.getOneItem('eleve', this.matricule)
       })
      )
      .pipe(
        flatMap(eleve =>{
          this.anneeScolaire = this.configService.config.anneeScolaire;
          eleve['cursus'].forEach(item =>{
            if(item.annee == this.anneeScolaire){
              eleve['classe'] = item.classe
              eleve['resultats'] = item.resultats
              eleve['decisionFinAnnee'] = item.decisionFinAnnee
            }
          })
          this.eleve = eleve;
          return this.api.getOneItem('classe', eleve['classe'], this.anneeScolaire)
        }),
         catchError(err => {throw(err)})
      )
      .subscribe(classe => {
        this.periodes = this.configService.getPeriodes().concat(['Annuel']);
        if(classe){
          this.classe = classe;
          this.enseignements = this.classe.enseignements;
        }
        this.imgSrc = !this.eleve.photoUrl ? this.baseUrl+"avatar.png" : this.baseUrl+this.eleve.photoUrl
      })
  }
  handleFile(image: FileList, imagePreview){
    let reader = new FileReader()
     this.photo = image.item(0)
     const source$ = fromEvent(reader, 'load')
     source$.subscribe(response => {
      imagePreview.src=reader.result
    })
    reader.readAsDataURL(this.photo);
  }
  togglePhotoForm(){
    this.showPhotoForm = !this.showPhotoForm
  }
  cancelPhoto(){
    this.showPhotoForm = !this.showPhotoForm
  }
  submitPhoto(){
    if(this.photo){
      this.api.postPhoto('eleve', this.matricule, this.photo)
      .subscribe(eleve => {
        this.showPhotoForm = !this.showPhotoForm
      })
    } else alert('Pas de photo à soumettre !')
  }
  
  onGenerate(){
    this.matieres = []
    let matieres = (this.eleve.resultats && this.eleve.resultats[this.periode]) ?
         Object.keys(this.eleve.resultats[this.periode]).filter(item => {
           return item != 'moyenne' && item != 'coefficient' && 
                  item != 'nbrAbsence' && item != 'distinction' &&
                  item != 'min' && item != 'max' && item != 'rang'
          }) :
         this.matieres
    this.matieres = _.sortBy(matieres, (matiere) => matiere)
  }
  
}
