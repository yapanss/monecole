import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
	
	classes;
	anneeScolaire: string;
  constructor(private api: ApiService,
              private configService: ConfigService,
              private route: Router) { }

  ngOnInit(): void {
    this.anneeScolaire = this.configService.config.anneeScolaire;
    console.log('annee scolaire', this.anneeScolaire)
  	this.api.getAllItems('classe', this.anneeScolaire)
  	.subscribe(classes => {
  		this.classes = classes;
      console.log(classes);
  	});
  }

  onDelete(index){
   if (confirm('Voulez-vous suprimer cette classe')){
    let reqBody = {query: this.classes[index].nom, value: null, anneeScolaire: this.anneeScolaire}
      forkJoin([
        this.api.deleteOneItem('classe', this.classes[index]._id),
        this.api.updateItems('eleve', reqBody),
        this.api.deleteOneItem('emploiclasse', this.classes[index].nom)
      ])
      .subscribe(classe  => {
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.onSameUrlNavigation = 'reload';
        this.route.navigate(['/classes'])
      });
   }
  }

}
