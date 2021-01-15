import { Component, OnInit, Input, OnChanges } from '@angular/core';
import  { MATIERES, donneAppreciation } from '../share/share';


@Component({
  selector: 'app-livretscolaire',
  templateUrl: './livretscolaire.component.html',
  styleUrls: ['./livretscolaire.component.css']
})
export class LivretscolaireComponent implements OnInit {

  donnees = [];
  periodes: string[] = [];
  matieres = MATIERES;

  @Input() eleve: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log('eleve : ', this.eleve);
    this.eleve.cursus.forEach(cursusItem =>{
      if(cursusItem.resultats){
        let periodes = Object.keys(cursusItem.resultats).filter(item =>{
          return item != 'Annuel';
        }).concat('Annuel');
        this.donnees.push({
          annee: cursusItem.annee,
          classe: cursusItem.classe,
          periodes: cursusItem.resultats ? periodes : [],
          resultats: cursusItem.resultats ? cursusItem.resultats : null,
        })
      }
    })
  }
  donneAppreciation(moyenne){
    return donneAppreciation(moyenne);
  }

}
