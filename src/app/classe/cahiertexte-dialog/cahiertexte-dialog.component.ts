import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cahiertexte-dialog',
  templateUrl: './cahiertexte-dialog.component.html',
  styleUrls: ['./cahiertexte-dialog.component.css']
})
export class CahiertexteDialogComponent implements OnInit {

  cahiertexteForm: FormGroup;
  
  //@Output() addRessource = new EventEmitter()
  @Output() updateCahier = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<CahiertexteDialogComponent>,
              private api: ApiService) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.cahiertexteForm = this.formBuilder.group({
      date: this.formBuilder.control(null),
      texte: this.formBuilder.control(null),
      pieceJointe: this.formBuilder.control(null)
    })
  }
  onUpdate(){
    const id = this.data.id;
    const formValue = {
      //classe: this.data.classe,
      matiere: this.data.matiere,
      entree: {
        date: this.cahiertexteForm.value.date,
        texte: this.cahiertexteForm.value.texte,
        pieceJointe: this.cahiertexteForm.value.pieceJointe
      }
    }
    console.log('formValue = ', formValue)
    this.api.updateOneItem('cahiertexte', id, formValue)
  		.subscribe(response => {
        console.log(response);
        this.updateCahier.emit(response)
        this.dialogRef.close()
      }, err  => console.error(err));
  }

}

