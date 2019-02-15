import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import {Router} from "@angular/router";
import {ProfileService} from "../../../services/auth/profile.service";


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user: any={picture:"assets/images/avatar.png",username:""};

  userMenu = [{ title: 'Mot de passe' },{ title: 'Mon Profile' }, { title: 'Se déconnecter' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: AuthenticationService,
              private router:Router,
              private profileService:ProfileService) {
  }

  ngOnInit() {
    this.authService.getUsername().subscribe(
      username => this.user.username=username
    );
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });
    this.profileService.getProfile().subscribe(profile => this.authService.setImageProfile(profile))
    this.authService.getProfileImage().subscribe(image=>this.user.picture=image);
  }

  onItemSelection( title ) {
    if ( title === 'Se déconnecter' ) {
      // Do something on Log out
      this.authService.logout();
      this.router.navigateByUrl("/auth/login")
    } else if ( title === 'Mon Profile' ) {
      // Do something on Profile
      this.router.navigateByUrl("/pages/profile")
    }else if ( title === 'Mot de passe' ) {
      // Do something on Profile
      this.router.navigateByUrl("/pages/profile/password")
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
