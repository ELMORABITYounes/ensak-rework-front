import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContainerComponent } from './container/container.component';
const routes: Routes = [{
  path: '',
  component: ContainerComponent,
  children: [
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
  ],
}];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],

})
export class AuthRoutingModule { }
