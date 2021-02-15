import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EleveComponent } from './eleve/eleve.component';
import { ClasseComponent } from './classe/classe.component';
import { CreateEleveComponent } from './create-eleve/create-eleve.component';
import { CreateClasseComponent } from './create-classe/create-classe.component';
import { ClasseDetailComponent } from './classe-detail/classe-detail.component';
import { ClasseEditComponent } from './classe-edit/classe-edit.component';
import { EmploiClasseComponent } from './emploi-classe/emploi-classe.component';
import { EleveDetailComponent } from './eleve-detail/eleve-detail.component';
import { EleveEditComponent } from './eleve-edit/eleve-edit.component';
import { ConfigComponent } from './config/config.component';
import { BulletinComponent } from './bulletin/bulletin.component';

const routes: Routes = [
{path: 'eleves', component: EleveComponent},
{path: 'eleve/new', component: CreateEleveComponent},
{path: 'eleve/detail/:matricule', component: EleveDetailComponent},
{path: 'eleve/edit/:matricule', component: EleveEditComponent},
{path: 'personnels', loadChildren: () => import('./personnel/personnel.module').then(mod => mod.PersonnelModule)},
{path: 'classes', component: ClasseComponent},
{path: 'classe/new', component: CreateClasseComponent},
{path: 'classe/detail/:nom', component: ClasseDetailComponent},
{path: 'classe/edit/:nom', component: ClasseEditComponent},
{path: 'classe/emploidutemps/:nom', component: EmploiClasseComponent},
{path: 'config', component: ConfigComponent},
{path: 'bulletin', component: BulletinComponent},
{path: '', redirectTo: '', pathMatch: 'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
