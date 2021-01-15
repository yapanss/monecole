import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.css']
})
export class BulletinComponent implements OnInit, OnChanges {
  classeOuEleve: string = "";
  classeOuEleves: string[] = ['Classe', 'Elève'];
  matriculeEleve: string;
  listeBulletin: any[];
  periode;

  @Input() eleves;
  @Input() periodes: string[];
  @Input() lesProfs: any[];
  @Input() configuration: any;

  constructor() { }

  ngOnInit(): void {
   
  }
  ngOnChanges(): void {
    if(this.eleves){
      this.eleves.forEach(eleve =>{
        eleve.cursus.forEach(cursusItem  =>{ 
          eleve.classe = cursusItem.classe;
          eleve.redoublant = cursusItem.redoublant;
          eleve.decisionFinAnnee = cursusItem.decisionFinAnnee;
          eleve.resultats = cursusItem.resultats
        })
      })
      console.log(this.eleves)
    }   
  }
  // onSelectClasseOuEleve(choix){
    
  // }
  onGenerate(){
    if(this.classeOuEleve == 'Elève'){
      this.listeBulletin = this.eleves.filter(eleve =>{
        return eleve.matricule == this.matriculeEleve
      })
    }else if(this.classeOuEleve == 'Classe'){
      this.listeBulletin = this.eleves
    }
  }
  printBulletin(){
    window.print()
  }
}
