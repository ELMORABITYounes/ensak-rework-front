import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


import {ProjectSharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ProfileInfosComponent} from "./profile-infos.component";
import {ProfileEditComponent} from "./profile-edit.component";
import {PasswordComponent} from "./password/password.component";
import {PasswordStrengthBarComponent} from "./password/password-strength-bar.component";
import {profileRoutes} from "./profile.route";

@NgModule({
  imports: [
    ProjectSharedModule,
    RouterModule.forChild(profileRoutes)
  ],
  declarations: [
    ProfileInfosComponent,
    ProfileEditComponent,
    PasswordComponent,
    PasswordStrengthBarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
