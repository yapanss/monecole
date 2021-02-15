import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { RessourceDialogComponent } from '../ressource-dialog/ressource-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pageperso',
  templateUrl: './pageperso.component.html',
  styleUrls: ['./pageperso.component.css']
})
export class PagepersoComponent implements OnInit {
  ressources: any;

  constructor(private dialog: MatDialog,
              private api: ApiService) { }

  @Input() matricule: string;

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.api.getSome('ressource', 'author', this.matricule)
    .subscribe(ressources =>{
      this.ressources = ressources
      console.log(this.ressources)
    })
  }

  onCreateDialog(){
    let dialogRef = this.dialog.open(RessourceDialogComponent, {
      width: '80%',
      data: {
        actionType: 'create',
        ressource: {
          auteur: this.matricule
        }
      }
    });
    dialogRef.componentInstance.addRessource.subscribe(ressource =>{
      this.ressources.push(ressource)
    })
  }
  onUpdateDialog(index){
    let dialogRef = this.dialog.open(RessourceDialogComponent, {
      width: '80%',
      data: {
        actionType: 'update',
        ressource: this.ressources[index]
      }
    });
    dialogRef.componentInstance.updateRessource.subscribe(newRessource =>{
      this.ressources[index] = newRessource;
    })
  }
  onDelete(index){
    let id = this.ressources[index]._id;
    if (confirm('Voulez-vous vraiment supprimer cette ressource ?')){
      this.api.deleteOneItem('ressource', id)
      .subscribe(ressource =>{
        this.ressources.splice(index, 1)
      });
    }
  }
  
}
