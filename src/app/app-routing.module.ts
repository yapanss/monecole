import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EleveComponent } from './eleve/eleve.component';
import { ClasseComponent } from './classe/classe.component';
import { CreateEleveComponent } from './create-eleve/create-eleve.component';
import { CreateClasseComponent } from './create-classe/create-classe.component';
import { ClasseDetailComponent } from './classe-detail/classe-detail.component';
import { ClasseEditComponent } from './classe-edit/classe-edit.component';
import { EmploiClasseComponent } from './emploi-classe/emploi-classe.component';
import { EmploiprofComponent } from './emploiprof/emploiprof.component';
import { EleveDetailComponent } from './eleve-detail/eleve-detail.component';
import { EleveEditComponent } from './eleve-edit/eleve-edit.component';
import { ConfigComponent } from './config/config.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { PersonnelDetailComponent } from './personnel-detail/personnel-detail.component';
// import { PersonnelCreateComponent } from './personnel-create/personnel-create.component';
// import { PersonnelEditComponent } from './personnel-edit/personnel-edit.component';
import { BulletinComponent } from './bulletin/bulletin.component';

const routes: Routes = [
{path: 'eleves', component: EleveComponent},
{path: 'eleve/new', component: CreateEleveComponent},
{path: 'eleve/detail/:matricule', component: EleveDetailComponent},
{path: 'eleve/edit/:matricule', component: EleveEditComponent},
{path: 'personnels', component: PersonnelComponent},
// {path: 'personnels/new', component: PersonnelCreateComponent},
{path: 'personnels/detail/:matricule', component: PersonnelDetailComponent},
// {path: 'personnels/edit/:matricule', component: PersonnelEditComponent},
{path: 'classes', component: ClasseComponent},
{path: 'classe/new', component: CreateClasseComponent},
{path: 'classe/detail/:nom', component: ClasseDetailComponent},
{path: 'classe/edit/:nom', component: ClasseEditComponent},
{path: 'classe/emploidutemps/:nom', component: EmploiClasseComponent},
{path: 'prof/emploidutemps/:codeProf', component: EmploiprofComponent},
{path: 'config', component: ConfigComponent},
{path: 'bulletin', component: BulletinComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
