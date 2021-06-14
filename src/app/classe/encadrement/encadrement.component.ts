import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';
import { faEdit, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { MATIERES, TITRES_ENCADREMENT, TITRES_DELEGUES } from '../../share/share';
import { catchError, mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-encadrement',
  templateUrl: './encadrement.component.html',
  styleUrls: ['./encadrement.component.css']
})
export class EncadrementComponent implements OnInit {

  @Input() classe: any;
  @Input() eleves: any[];

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faInfoCircle = faInfoCircle;
  
  page: string = "enseignement";
  titresEncadrement: string[] = TITRES_ENCADREMENT;
  titreEncadreur: string;
  matriculeEncadreur: string;
  titresDelegue: string[] = TITRES_DELEGUES;
  titreDelegue: string;
  matriculeProf;
  matriculeDelegue: string;
  codes: any;
  codesParMatiere: string[];
  matiere: string;
  matieres: string[] = MATIERES;
  delegues: any[];
  coef: number;
  codeProf: string;

  updateMode: boolean;
  addEncadrementMode: boolean = true;
  addEnseignementMode: boolean = true;
  addMode: boolean = true;
  codeEncadreur: any;
  index: any;
  updateEnseignementMode: boolean = false;
  ajoutEnseignementEnCours: boolean = false;

  constructor(private configService: ConfigService,
              private api: ApiService,) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void{
    //this.codes = this.configService.getCodes()
    //console.log('les codes : ', this.codes)
    //this.matieres = this.configService.getMatieres(this.classe.niveau)
  }
  onSelectMatiere(){ 
    // this.codesParMatiere = this.codes.filter(code =>{
    //   return code.matiere == this.matiere 
    // })
    // .map(item => item.codeProf)
  }
  
  addEncadrement(){
    this.api.getOneItem('personnel', this.matriculeEncadreur)
    .pipe(
      mergeMap(response => { 
        //if(response && response['success']){
          console.log('ma reponse ', response)
          let encadrement = {
            titreEncadreur: this.titreEncadreur,
            matriculeEncadreur: this.matriculeEncadreur,
            nomEncadreur: response['personnel'].nom + ' ' + response['personnel'].prenoms
          }
          let body = { 
            encadrements: [...this.classe.encadrements, ...[encadrement]]
          }
          console.log('ma reponse body : ', body)
          return this.api.updateOneItem('classe', this.classe._id, body)
       // }
      }),
      catchError(err => {throw(err)})
    ).subscribe(classe =>{
        console.log('la classe est :', classe)
        this.classe = classe
        this.titreEncadreur = ""
        this.matriculeEncadreur = ""
      })
    }
  saveEnseignement(addOrUpdate){
    let body: any = { }
    let enseignement = {
      matiere: this.matiere,
      coefficient: this.coef,
      matriculeProf: this.matriculeProf
    }
    if(addOrUpdate == 'add'){ 
      this.ajoutEnseignementEnCours = true;
      body = { 
        enseignements: [...this.classe.enseignements, ...[enseignement]]
      }
    } else { 
      body = {
        enseignements: [...this.classe.enseignements.slice(0,this.index), 
          ...[enseignement], 
          ...this.classe.enseignements.slice(this.index + 1)]
      }
    }
    this.api.updateOneItem('classe', this.classe._id, body)
    .subscribe(newClasse =>{
      console.log('newclasse', newClasse)
      this.classe = newClasse
      this.matiere = null
      this.coef = null
      //this.codesParMatiere = []
      this.ajoutEnseignementEnCours = false;
    })
  }
  deleteEnseignement(index){
    if(confirm("Voulez-vous vraiment supprimer cet enseignement ?")){
      let body = {
        enseignements: [...this.classe.enseignements.slice(0,index), 
          ...this.classe.enseignements.slice(index + 1)]
      }
      this.api.updateOneItem('classe', this.classe._id, body)
      .subscribe(newClasse =>{
        this.classe = newClasse
      })
    }
  }
 selectCodeToModify(index){
  this.addEnseignementMode = false
  this.updateEnseignementMode = true
  this.index = index
  this.coef = this.classe.enseignements[index].coefficient
  this.matiere = this.classe.enseignements[index].matiere
  this.onSelectMatiere()
  this.codeProf = this.classe.enseignements[index].codeProf
}
  
  cancelUpdateEnseignement(){
    this.updateEnseignementMode = false
    //this.addMode = true
    this.codeProf = null;
    this.matiere = null;
    this.coef = null;
    this.addEnseignementMode = true;
  }

}
