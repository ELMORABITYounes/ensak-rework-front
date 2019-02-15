import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/auth/authentication.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'profile',
  templateUrl: './profile-infos.component.html',
  styleUrls: ['./profile-infos.component.scss']
})
export class ProfileInfosComponent implements OnInit{

  img="assets/images/avatar.png";
  profile;
  constructor(
              public authService: AuthenticationService,
              protected activatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({profile}) => {
      this.profile = profile;
    });
    this.authService.getProfileImage().subscribe(img=>this.img=img)
  }


}
