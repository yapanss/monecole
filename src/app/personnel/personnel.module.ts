import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelComponent } from './personnel-list/personnel.component';
import { PersonnelDetailComponent } from './personnel-detail/personnel-detail.component';
import { PersonnelDialogComponent } from './personnel-dialog/personnel-dialog.component';
import { PagepersoComponent } from './pageperso/pageperso.component';
import { RessourceDialogComponent } from './ressource-dialog/ressource-dialog.component';
import { EmploiprofComponent } from './emploiprof/emploiprof.component';
import { EvaluationComponent } from './evaluation/evaluation.component';

import { PersonnelRoutingModule } from './personnel-routing.module';
import { SafePipe } from './../safe.pipe';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
  	PersonnelComponent,
  	PersonnelDetailComponent,
  	PersonnelDialogComponent,
    PagepersoComponent,
    RessourceDialogComponent,
    EmploiprofComponent,
    EvaluationComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatCardModule,
    FontAwesomeModule,
    PersonnelRoutingModule
  ]
})
export class PersonnelModule { }
