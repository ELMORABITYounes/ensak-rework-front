import { Component, OnInit } from '@angular/core';

import {ETUDIANT_MENU_ITEMS, MENU_ITEMS, PROFESSEUR_MENU_ITEMS} from './pages-menu';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
      <router-outlet name="popup"></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit{
  menu=[];
  constructor(private authService:AuthenticationService){

  }

  ngOnInit(): void {
    if (this.authService.hasRole("ROLE_ADMIN")){
      this.menu=MENU_ITEMS;
    } else if(this.authService.hasRole("ROLE_STUDENT")){
      this.menu=ETUDIANT_MENU_ITEMS;
    } else if(this.authService.hasRole("ROLE_TEACHER")){
      this.menu=PROFESSEUR_MENU_ITEMS;
    }
  }
}
