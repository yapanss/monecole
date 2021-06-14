import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray,Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EmploiclasseDialogComponent } from '../emploiclasse-dialog/emploiclasse-dialog.component';
import { MATIERES } from '../../share/share';

@Component({
  selector: 'app-emploi-classe',
  templateUrl: './emploi-classe.component.html',
  styleUrls: ['./emploi-classe.component.css']
})
export class EmploiClasseComponent implements OnInit {
  anneeScolaire: string;
	emploiclasse;
  classe;
  matieres;
  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private configService: ConfigService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  	this.route.params
      .pipe(
        mergeMap(params => {
          this.anneeScolaire = this.configService.ecole.anneeScolaire;
          return forkJoin([this.api.getOneItem('emploiclasse', params.nom),
                          this.api.getOneItem('classe', params.nom, this.anneeScolaire)])
         
       }),
        catchError(err => {throw(err)})
      )
      .subscribe(response => {
        if(response){
          this.emploiclasse = response[0];
          this.classe = response[1];
          //this.matieres = this.configService.getMatieres(this.classe.niveau)
        }
      })
  }
  onCreate(){
    this.dialog.open(EmploiclasseDialogComponent, {
      disableClose: true,
      width: '80%',
      data: {
        emploiclasse: this.emploiclasse,
        matieres: MATIERES,
        classe: this.classe
      }
    })
  }
}
