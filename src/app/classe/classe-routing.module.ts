import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasseComponent } from './classe-list/classe.component';
import { ClasseDetailComponent } from './classe-detail/classe-detail.component';

const routes: Routes = [
	{path: 'classes', component: ClasseComponent},
  {path: 'classe/detail/:id', component: ClasseDetailComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseRoutingModule { }
