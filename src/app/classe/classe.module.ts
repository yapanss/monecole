import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasseRoutingModule } from './classe-routing.module';

import { ClasseComponent } from './classe-list/classe.component';
import { ClasseDetailComponent } from './classe-detail/classe-detail.component';
import { AjoutEleveProfComponent } from './ajout-eleve-prof/ajout-eleve-prof.component';
import { ClasseDialogComponent } from './classe-dialog/classe-dialog.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { CahiertexteComponent } from './cahiertexte/cahiertexte.component';
import { CahiertexteDialogComponent } from './cahiertexte-dialog/cahiertexte-dialog.component';
import { EmploiClasseComponent } from './emploi-classe/emploi-classe.component';
import { EmploiclasseDialogComponent } from './emploiclasse-dialog/emploiclasse-dialog.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
  	ClasseComponent,
  	ClasseDetailComponent,
    AjoutEleveProfComponent,
    ClasseDialogComponent,
    BulletinComponent,
    CahiertexteComponent,
    CahiertexteDialogComponent,
    EmploiClasseComponent,
    EmploiclasseDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClasseRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    AngularEditorModule,
    FontAwesomeModule,
  ]
})
export class ClasseModule { }
