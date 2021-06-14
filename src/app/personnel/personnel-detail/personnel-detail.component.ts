import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { mergeMap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PersonnelDialogComponent } from '../personnel-dialog/personnel-dialog.component';
import { fromEvent } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-personnel-detail',
  templateUrl: './personnel-detail.component.html',
  styleUrls: ['./personnel-detail.component.css']
})
export class PersonnelDetailComponent implements OnInit {
	personnel = <any>{};
	matricule;
  id: string;
  photo: File = null;
  showPhotoForm: boolean = false;
  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) { }

   ngOnInit(): void {
  	this.route.params
      .pipe(
        mergeMap(params => {
          this.id = params.id;
          return this.api.getOneItem('personnels', this.id)
        }),
        catchError(err => {throw(err)})
      )  
      .subscribe(personnel => {
        console.log('lepersonnel', personnel)
          this.personnel = personnel;
      })
  }
  handleFile(image: FileList, imagePreview){
    let reader = new FileReader()
     this.photo = image.item(0)
     const source$ = fromEvent(reader, 'load')
     source$.subscribe(response => {
      imagePreview.src=reader.result
    })
    reader.readAsDataURL(this.photo);
  }
  togglePhotoForm(){
    this.showPhotoForm = !this.showPhotoForm
  }
  cancelPhoto(){
    this.showPhotoForm = !this.showPhotoForm
  }
  submitPhoto(){
    if(this.photo){
      this.api.postPhoto('personnel', this.matricule, this.photo)
      .subscribe(personnel => {
        this.showPhotoForm = !this.showPhotoForm
      })
    } else alert('Pas de photo à soumettre !')
  }
  onUpdateDialog(){
    let dialogRef = this.dialog.open(PersonnelDialogComponent, {
      width: '80%',
      data: {
        actionType: 'update',
        personnel: this.personnel
      }
    });
    dialogRef.componentInstance.updatePersonnel.subscribe(newPersonnel =>{
      this.personnel = newPersonnel;
    })
  }
}


