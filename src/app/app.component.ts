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
  	this.api.getAllItems('config')
    .pipe(
      mergeMap(config =>{
        this.configService.config = config[0];
        if(Date.parse(this.configService.config.dateFin) <= Date.now()){
          let [debut, fin] = this.configService.config.anneeScolaire.split('-')
          debut = fin
          fin = (parseInt(fin)+1).toString()
          const anneeScolaire = debut+"-"+fin
          return this.api.updateOneItem('config', config[0]._id, {
            anneeScolaire,
            dateFin: new Date('09-01-'+fin)
          })
        } else return of(config[0])
      }),
      catchError(err => {throw(err)})
    )
  	.subscribe(config => {
      console.log(config)
    })
  }
  
}
