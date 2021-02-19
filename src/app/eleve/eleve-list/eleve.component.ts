import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { EleveDialogComponent } from '../eleve-dialog/eleve-dialog.component';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']
})
export class EleveComponent implements OnInit {

  eleves: any[] = [];
  anneeScolaire: string;

  constructor(private api: ApiService,
              private configService: ConfigService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  	this.api.getAllItems('eleve')
  	.subscribe(eleves => {
      if(eleves){
        this.anneeScolaire = this.configService.config.anneeScolaire;
        eleves.forEach(eleve =>{
          eleve.cursus.forEach(item =>{
            if(item.annee == this.anneeScolaire){
              eleve.classe = item.classe
              eleve.niveau = item.niveau
              eleve.redoublant = item.redoublant
            }
          })
        })
      }
  		this.eleves = _.sortBy(eleves, 'nom');
    })
  }
  onCreateDialog(){
    let dialogRef = this.dialog.open(EleveDialogComponent, {
      width: '80%',
      data: {
        actionType: 'create',
      }
    });
    dialogRef.componentInstance.addEleve.subscribe(eleve =>{
      this.eleves.push(eleve)
    })
  }
  onUpdateDialog(index){
    let dialogRef = this.dialog.open(EleveDialogComponent, {
      width: '80%',
      data: {
        actionType: 'update',
        eleve: this.eleves[index]
      }
    });
    dialogRef.componentInstance.updateEleve.subscribe(newEleve =>{
      this.eleves[index] = newEleve;
    })
  }
  onDelete(index){
    let eleve = this.eleves[index]
    if (confirm('Voulez-vous supprimer '+eleve.nom+" "+eleve.prenoms+"?")){
      this.api.deleteOneItem('eleve', eleve.matricule)
      .subscribe(eleve  => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/eleves'])
      });
   }
  }
}

