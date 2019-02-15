import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import {ProfileService} from "../../services/auth/profile.service";
import {IProfile, Profile} from "../../shared/model/profile.model";
import {ProfileInfosComponent} from "./profile-infos.component";
import {UserRouteAccessService} from "../../services/auth/user-route-access-service";
import {ProfileEditComponent} from "./profile-edit.component";
import {PasswordComponent} from "./password/password.component";

@Injectable({ providedIn: 'root' })
export class ProfileResolve implements Resolve<IProfile> {
    constructor(private service: ProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfile> {
            return this.service.getProfile();
    }
}

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileInfosComponent,
    resolve: {
      profile: ProfileResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Profile'
    },
    canActivate: [UserRouteAccessService]
  },
    {
        path: 'edit',
        component: ProfileEditComponent,
        resolve: {
          profile: ProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Profile'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'password',
        component: PasswordComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superviseurs'
        },
        canActivate: [UserRouteAccessService]
    }
];
