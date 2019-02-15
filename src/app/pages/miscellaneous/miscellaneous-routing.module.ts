import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiscellaneousComponent } from './miscellaneous.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [{
  path: '',
  component: MiscellaneousComponent,
  children: [
    {
    path: '404',
    component: NotFoundComponent,
  },
    {
      path: 'error',
      component: ErrorComponent,
      data: {
        authorities: [],
        pageTitle: 'error.title'
      }
    },
    {
      path: 'accessdenied',
      component: ErrorComponent,
      data: {
        authorities: [],
        pageTitle: 'error.title',
        error403: true
      }
    },
  {
    path:"**",
    redirectTo:"404"
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscellaneousRoutingModule { }

export const routedComponents = [
  MiscellaneousComponent,
  NotFoundComponent,
  ErrorComponent
];
