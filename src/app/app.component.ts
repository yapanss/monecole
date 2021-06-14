import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { ConfigService } from './services/config.service';
import { mergeMap, catchError, map, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lmkApp';
  constructor(private api: ApiService,
  			      private configService: ConfigService){}

  ngOnInit(): void {
    
  	this.api.getAllItems('ecoles')
    .pipe(
       mergeMap(ecole =>{
         console.log('monecole', ecole)
         this.configService.ecole = ecole[0];
         if(Date.parse(this.configService.ecole.date_fin) <= Date.now()){
           let [debut, fin] = this.configService.ecole.annee_scolaire.split('-')
           debut = fin
           fin = (parseInt(fin)+1).toString()
           const annee_scolaire = debut+"-"+fin
           return this.api.updateOneItem('ecoles', ecole[0]._id, {
             annee_scolaire,
             date_fin: new Date('09-01-'+fin)
           })
         } else return of(ecole[0])
       }),
       catchError(err => {throw(err)})
     )
  	 .subscribe(ecole => {
       console.log('tonecole', ecole)
     })
  }
  
}
