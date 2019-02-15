import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {ProjectSharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    ThemeModule,
    ProjectSharedModule,
    RouterModule
  ],
  declarations: [
    DashboardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
