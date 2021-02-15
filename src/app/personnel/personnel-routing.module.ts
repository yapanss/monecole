import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PersonnelComponent } from './personnel-list/personnel.component';
import { PersonnelDetailComponent } from './personnel-detail/personnel-detail.component';

const routes: Routes = [
	{path: '', component: PersonnelComponent},
	{path: 'detail/:matricule', component: PersonnelDetailComponent},
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
