import {
  Component,
  OnInit,
  Input,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { CahiertexteDialogComponent } from "../cahiertexte-dialog/cahiertexte-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "../services/api.service";
//import { DOCUMENT } from '@angular/common';
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-cahiertexte",
  templateUrl: "./cahiertexte.component.html",
  styleUrls: ["./cahiertexte.component.css"],
})
export class CahiertexteComponent implements OnInit {
  cahiertexte;
  matieres: string[] = [
    "Anglais",
    "Allemand",
    "Arts Plastiques",
    "Conduite",
    "Couture",
    "Edhc",
    "Espagnol",
    "EPS",
    "Français",
    "Histoire-Géographie",
    "Mathématiques",
    "Musique",
    "Philosophie",
    "Physique-Chimie",
    "SVT",
    "TICE",
  ];
  matiere: string;
  dateDebut: Date;
  dateFin: Date;
  @Input() classe: string;
  htmlContent: string = `<div>  
                            <h1 class='bg-info'>Cahier de Texte de la classe</h1>
                            <h1 style="color: red;">Cahier de Texte de la classe</h1>

                          </div>`;
  //@ViewChild('textcontenair') public textcont: ElementRef;

  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private api: ApiService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.api.getOneItem("cahiertexte", this.classe).subscribe((response) => {
      console.log("response = ", response);
      this.cahiertexte = response["cahiertexte"];
    });
  }
  ngAfterViewInit() {}

  onCreateDialog() {
    let dialogRef = this.dialog.open(CahiertexteDialogComponent, {
      width: "80%",
      data: {
        classe: this.classe,
        matiere: this.matiere,
        id: this.cahiertexte._id,
      },
    });
    //dialogRef.componentInstance.addRessource.subscribe(ressource =>{
    //this.ressources.push(ressource)
    //})
    dialogRef.componentInstance.updateCahier.subscribe((newCahier) => {
      this.cahiertexte = newCahier;
    });
  }
  onUpdateDialog(index) {
    let dialogRef = this.dialog.open(CahiertexteDialogComponent, {
      width: "80%",
    });
    dialogRef.componentInstance.updateCahier.subscribe((newCahier) => {
      this.cahiertexte = newCahier;
    });
  }
  onDelete(index) {}
  onGenerate() {
    let contenu: string = "<div id='accordion'>";
    let dateString;
    let href;
    let id;
    let i = 0;
    this.cahiertexte["partage"][this.matiere].forEach((item) => {
      i = i + 1;
      href = "#item" + i;
      id = "item" + i;
      dateString = this.datePipe.transform(item.date, "dd/MM/yyyy");
      contenu =
        contenu +
        `<div class='card mb-2'>  
                              <div class='card-header'>
                                <a class='btn card-link' data-toggle='collapse' href=${href}>${dateString}</a>
                              </div>
                              <div id=${id} class="collapse show" data-parent="#accordion">
                                <div class="card-body">${item.texte}</div>
                              </div>
                          </div>`;
    });
    this.htmlContent = contenu + "</div>";
  }

  onChange(e) {}
  onDataChange() {}
}
