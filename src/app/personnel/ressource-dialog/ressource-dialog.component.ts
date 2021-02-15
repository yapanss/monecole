import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ressource-dialog',
  templateUrl: './ressource-dialog.component.html',
  styleUrls: ['./ressource-dialog.component.css']
})
export class RessourceDialogComponent implements OnInit {

  ressourceForm: FormGroup;

  @Output() addRessource = new EventEmitter()
  @Output() updateRessource = new EventEmitter()

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<RessourceDialogComponent>,
              private api: ApiService) {
      this.buildForm();
  }

  ngOnInit(): void {
  }
  buildForm() {
    this.ressourceForm = this.formBuilder.group({
      auteur: this.formBuilder.control(this.data.ressource.auteur),
      titre: this.formBuilder.control(this.data.ressource.titre ? this.data.ressource.titre : null),
      niveau: this.formBuilder.control(this.data.ressource.niveau ? this.data.ressource.niveau : null),
      type: this.formBuilder.control(this.data.ressource.type ? this.data.ressource.type : null),
      liens: this.formBuilder.group({
        video: this.formBuilder.control(this.data.ressource.liens && this.data.ressource.liens.video ? this.data.ressource.liens.video : null),
        pdf: this.formBuilder.control(this.data.ressource.liens && this.data.ressource.liens.pdf ? this.data.ressource.liens.pdf : null),
        doc: this.formBuilder.control(this.data.ressource.liens && this.data.ressource.liens.doc ? this.data.ressource.liens.doc : null),
        ppt: this.formBuilder.control(this.data.ressource.liens && this.data.ressource.liens.ppt ? this.data.ressource.liens.ppt : null)
      }),
    })
  }

  onUpdate(){
    const id = this.data.ressource._id;
    this.api.updateOneItem('ressource', id, this.ressourceForm.value)
  		.subscribe(response => {
        console.log(response);
        this.updateRessource.emit(response)
        this.dialogRef.close()
      }, err  => console.error(err));
  }
  onCreate(){
    if(this.data.actionType == 'create'){
      this.api.postForm('ressource', this.ressourceForm.value)
  		.subscribe(response => {
        console.log(response);
        this.addRessource.emit(response)
        this.dialogRef.close()
      }, err  => console.error(err));
    } 
  }

}
