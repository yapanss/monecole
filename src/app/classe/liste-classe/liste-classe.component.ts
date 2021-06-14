import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ClasseDialogComponent } from '../classe-dialog/classe-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AjoutEleveProfComponent } from '../ajout-eleve-prof/ajout-eleve-prof.component';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-liste-classe',
  templateUrl: './liste-classe.component.html',
  styleUrls: ['./liste-classe.component.css']
})
export class ListeClasseComponent implements OnInit {

  eleves;
  eleveForm;
  elevesSelectionnes: string[] = [];
  etatSelection: string[] = [];
  checkList: boolean[] = [];
  allChecked: boolean = false;

  @Input() classe

  constructor(private api: ApiService,
              private router: Router,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.classe._id['$oid']
    console.log('clacla', id)
    this.api.getSome('eleves', 'classe', id)
    .subscribe(eleves => {
      this.eleves = eleves
      console.log('meseleves', eleves)
    })
  }

  onCheckOnce(matricule, index){
    if(this.checkList[matricule]){
      this.etatSelection[index] = 'selection'
      this.elevesSelectionnes.push(matricule)
      if(this.elevesSelectionnes.length == this.eleves.length){
        this.allChecked = true
      }
    }else{
      this.etatSelection[index] = ''
      this.elevesSelectionnes = this.elevesSelectionnes.filter(item =>{
        return item != matricule
      })
      this.allChecked = false
    }
  }

  removeEleve(){
    if(confirm('Voulez-vous vraiment supprimer ces élèves de la classe ?')){
      let eleveBody = {
        updateQuery : 'classe',
        classe: null,
        matriculeEleves: this.elevesSelectionnes,
       // anneeScolaire: this.anneeScolaire
      }
      let classeBody = {
        effectif: this.classe.effectif - this.elevesSelectionnes.length
      }
      forkJoin([this.api.updateItems('eleve', eleveBody), 
                this.api.updateOneItem('classe', this.classe._id, classeBody)])
      .subscribe(response =>{
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate(['/classe/detail/'+this.classe._id['$oid']])
      })
    }
  }

  toggleCheckAll(){
    let index = 0
    if(this.allChecked){
        this.eleves.forEach(eleve =>{
        this.checkList[eleve.matricule] = true;
        this.elevesSelectionnes[index] = eleve.matricule
        this.etatSelection[index] = 'selection'
        index += 1
      })
    } else{
          this.elevesSelectionnes = []
          this.eleves.forEach(eleve =>{
          this.checkList[eleve.matricule] = false;
          this.etatSelection[index] = ''
          index += 1
        })
      }
  }

  onAjoutEleve() {
    let group = {};
    this.api.getSome('eleves','niveau',  this.classe.niveau)
    .subscribe(eleves => {
      Object.entries(eleves)
      .map(keyValue  => keyValue[1])
      .forEach((eleve: object) =>{
        console.log('matric', eleve['matricule'])
            group[eleve['matricule']] = new FormControl(null);  
      })
            
    this.eleveForm = this.formBuilder.group(group)
    this.dialog.open(AjoutEleveProfComponent, {
     // this.dialog.open(ClasseDialogComponent, {
        disableClose: true,
        width: '80%',
        data: {
          eleves, 
          eleveForm: this.eleveForm, 
          classe: this.classe,
          field: 'eleve'
        }
      });
    });
   }

}
