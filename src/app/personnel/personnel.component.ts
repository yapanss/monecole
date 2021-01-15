import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PersonnelDialogComponent } from '../personnel-dialog/personnel-dialog.component';
import { faEdit, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  personnels;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faInfoCircle = faInfoCircle;

  constructor(private api: ApiService,
              private router: Router,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
  	this.api.getAllItems('personnel')
  	.subscribe(response => {
      if(response['success']){
  		  this.personnels = response['personnels'];
      }else{
        const {message} = response;
        alert(message);
        this.router.navigateByUrl('/');
      }
    })
  }
  onCreateDialog(){
    let dialogRef = this.dialog.open(PersonnelDialogComponent, {
      width: '80%',
      data: {
        actionType: 'create',
      }
    });
    dialogRef.componentInstance.addPersonnel.subscribe(personnel =>{
      this.personnels.push(personnel)
    })
  }
  onUpdateDialog(index){
    let dialogRef = this.dialog.open(PersonnelDialogComponent, {
      width: '80%',
      data: {
        actionType: 'update',
        personnel: this.personnels[index]
      }
    });
    dialogRef.componentInstance.updatePersonnel.subscribe(newPersonnel =>{
      this.personnels[index] = newPersonnel;
    })
  }
  onDelete(index){
    let personnel = this.personnels[index]
    if (confirm('Voulez-vous supprimer '+personnel.nom+" "+personnel.prenoms+"?")){
      this.api.deleteOneItem('personnel', personnel.matricule)
      .subscribe(personnel =>{
        this.personnels.splice(index, 1)
      });
   }
  }
}


