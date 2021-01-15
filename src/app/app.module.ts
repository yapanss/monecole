import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EleveComponent } from './eleve/eleve.component';
import { CreateEleveComponent } from './create-eleve/create-eleve.component';
import { AuthInterceptor } from './services/auth.interceptor';

//Angular Material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatRadioModule } from "@angular/material/radio";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';

//other tier modules
import { AngularEditorModule } from '@kolkov/angular-editor';

import { HeaderComponent } from './header/header.component';
import { CreateClasseComponent } from './create-classe/create-classe.component';
import { ClasseComponent } from './classe/classe.component';
import { ClasseDetailComponent } from './classe-detail/classe-detail.component';
import { EleveDetailComponent } from './eleve-detail/eleve-detail.component';
import { ClasseDialogComponent } from './classe-dialog/classe-dialog.component';
import { EleveEditComponent } from './eleve-edit/eleve-edit.component';
import { ConfigComponent } from './config/config.component';
import { PersonnelComponent } from './personnel/personnel.component';
// import { PersonnelCreateComponent } from './personnel-create/personnel-create.component';
import { EmploiClasseComponent } from './emploi-classe/emploi-classe.component';
import { EmploiclasseDialogComponent } from './emploiclasse-dialog/emploiclasse-dialog.component';
import { EmploiprofComponent } from './emploiprof/emploiprof.component';
import { PersonnelDetailComponent } from './personnel-detail/personnel-detail.component';
import { ClasseEditComponent } from './classe-edit/classe-edit.component';
// import { PersonnelEditComponent } from './personnel-edit/personnel-edit.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { ProfilComponent } from './profil/profil.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { PagepersoComponent } from './pageperso/pageperso.component';
import { RessourceDialogComponent } from './ressource-dialog/ressource-dialog.component';
import { SafePipe } from './safe.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonnelDialogComponent } from './personnel-dialog/personnel-dialog.component';
import { CorrespondanceComponent } from './correspondance/correspondance.component';
import { LivretscolaireComponent } from './livretscolaire/livretscolaire.component';
import { CahiertexteComponent } from './cahiertexte/cahiertexte.component';
import { CahiertexteDialogComponent } from './cahiertexte-dialog/cahiertexte-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    EleveComponent,
    CreateEleveComponent,
    HeaderComponent,
    CreateClasseComponent,
    ClasseComponent,
    ClasseDetailComponent,
    EleveDetailComponent,
    ClasseDialogComponent,
    EleveEditComponent,
    ConfigComponent,
    PersonnelComponent,
    // PersonnelCreateComponent,
    EmploiClasseComponent,
    EmploiclasseDialogComponent,
    EmploiprofComponent,
    PersonnelDetailComponent,
    ClasseEditComponent,
    // PersonnelEditComponent,
    EvaluationComponent,
    ProfilComponent,
    BulletinComponent,
    PagepersoComponent,
    RessourceDialogComponent,
    SafePipe,
    PersonnelDialogComponent,
    CorrespondanceComponent,
    LivretscolaireComponent,
    CahiertexteComponent,
    CahiertexteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    MatChipsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    FontAwesomeModule,
    AngularEditorModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ClasseDialogComponent]
})
export class AppModule { }
