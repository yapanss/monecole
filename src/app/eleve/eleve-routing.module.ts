import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EleveComponent } from './eleve-list/eleve.component';
import { EleveDetailComponent } from './eleve-detail/eleve-detail.component';
import { CreateEleveComponent } from './create-eleve/create-eleve.component';
import { EleveEditComponent } from './eleve-edit/eleve-edit.component';

const routes: Routes = [
	{path: 'eleves', component: EleveComponent},
	{path: 'eleves/new', component: CreateEleveComponent},
  {path: 'eleve/detail/:matricule', component: EleveDetailComponent},
  {path: 'eleve/edit/:matricule', component: EleveEditComponent},
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EleveRoutingModule { }
