import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EleveComponent } from './eleve-list/eleve.component';
import { EleveDetailComponent } from './eleve-detail/eleve-detail.component';

const routes: Routes = [
	{path: 'eleves', component: EleveComponent},
  {path: 'eleve/detail/:matricule', component: EleveDetailComponent},
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
