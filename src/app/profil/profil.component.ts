import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { mergeMap, catchError, map, flatMap } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  
  matricule: string;
  motDePasse: string;
  statut: string = "";
  statuts: string[] = ['élève', 'personnel', 'Administrateur']

  @Output() sendUserInfo = new EventEmitter()

  constructor(private api: ApiService,
              private configService: ConfigService,
              private auth: AuthService,
              private dialogRef: MatDialogRef<ProfilComponent> ,
      		    private router: Router,
      		    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.dialogRef.close();
    const credential = {
      statut: this.statut,
      matricule: this.matricule,
      motDePasse: this.motDePasse
    }
    this.auth.postCredential(credential)
    .subscribe(authResult =>{
      if(authResult['success']){
        let redirectUrl;
        
        this.auth.setSession(authResult);
        
        if(authResult['statut'] == 'élève'){
          redirectUrl = `/eleve/detail/${authResult['user'].matricule}`;
        }else {
          redirectUrl = `/personnel/detail/${authResult['user'].matricule}`;
			alert(redirectUrl);
        }
        this.router.navigateByUrl(redirectUrl)
        // this.sendUserInfo.emit(response['user'])
      }
    })
  }

}