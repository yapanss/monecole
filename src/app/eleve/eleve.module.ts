import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EleveComponent } from './eleve-list/eleve.component';
import { EleveDetailComponent } from './eleve-detail/eleve-detail.component';
import { CreateEleveComponent } from './create-eleve/create-eleve.component';
import { LivretscolaireComponent } from './livretscolaire/livretscolaire.component';
import { CorrespondanceComponent } from './correspondance/correspondance.component';

import { EleveRoutingModule } from './eleve-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
  	EleveComponent,
  	EleveDetailComponent,
  	CreateEleveComponent,
  	LivretscolaireComponent,
  	CorrespondanceComponent
  ],
  imports: [
    CommonModule,
    EleveRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatCardModule,
    MatExpansionModule
  ]
})
export class EleveModule { }
