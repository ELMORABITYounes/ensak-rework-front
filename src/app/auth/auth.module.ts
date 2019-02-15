import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContainerComponent } from './container/container.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ContainerComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ThemeModule
  ]
})
export class AuthModule { }
