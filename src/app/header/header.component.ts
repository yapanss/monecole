import { Component, OnInit } from '@angular/core';
import { faUserCog, faBookReader, faUserTie, 
         faChalkboard, faHome, faSignInAlt, 
         faSignOutAlt, faAngleDown, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ProfilComponent } from '../profil/profil.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  faUserCog = faUserCog;
  faBookReader = faBookReader;
  faUserTie = faUserTie;
  faChalkboard = faChalkboard;
  faHome = faHome;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faChartLine = faChartLine;

  constructor(private dialog: MatDialog,
              public auth: AuthService,
              private router: Router) { }

  baseUrl: string = "http://localhost:3000/";
  logoUrl: string = this.baseUrl + "logolmk.jpg";
  srcUrl: string;
  ngOnInit(): void {
  }

  onLogin(){
    const dialogRef = this.dialog.open(ProfilComponent, {
      width: '50%'
    })
    // dialogRef.componentInstance.sendUserInfo.subscribe(user =>{
    //   console.log('USER : ', user)
    //   this.srcUrl = user.photoUrl ? this.baseUrl + user.photoUrl : this.baseUrl + 'avatar.png';
    // })
  }
  onLogout(){
    this.auth.removeSession();
    this.router.navigateByUrl('/');
  }
}
