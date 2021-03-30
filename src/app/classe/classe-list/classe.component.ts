import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from '../../services/config.service';
import { ClasseDialogComponent } from '../classe-dialog/classe-dialog.component';

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
              private dialog: MatDialog,
              private route: Router) { }

  ngOnInit(): void {
    this.anneeScolaire = this.configService.config.anneeScolaire;
    console.log('annee scolaire', this.anneeScolaire)
  	this.api.getAllItems('classe', this.anneeScolaire)
  	.subscribe(classes => {
  		this.classes = classes;
      console.log('classes : ', classes);
  	});
  }
  onCreateDialog(){
    let dialogRef = this.dialog.open(ClasseDialogComponent, {
      width: '80%',
      data: {
        actionType: 'create',
      }
    });
    dialogRef.componentInstance.addClasse.subscribe(classe =>{
      this.classes.push(classe)
    })
  }
  onUpdateDialog(index){
    let dialogRef = this.dialog.open(ClasseDialogComponent, {
      width: '80%',
      data: {
        actionType: 'update',
        classe: this.classes[index]
      }
    });
    dialogRef.componentInstance.updateClasse.subscribe(newClasse =>{
      this.classes[index] = newClasse;
    })
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
