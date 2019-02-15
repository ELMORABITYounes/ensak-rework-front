import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly ERROR=1;
  userForm: FormGroup;
  public mode:number=0;
  public submitted:boolean;
  public rememberMe:boolean=false;

  constructor(public authService:AuthenticationService,
    private router:Router,
    private formBuilder: FormBuilder) {
  }

    ngOnInit() {
      if(this.authService.isAuthenticated()){
        if (this.authService.hasRole("ROLE_ADMIN"))
          this.router.navigateByUrl("/pages/dashboard");
        else
          this.router.navigateByUrl("/pages/profile");
      }
      this.submitted=false;
      this.initForm()
    }
  
    initForm(){
      this.userForm = this.formBuilder.group({
        username: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required]
      })
    }
  
    isInvalidAndDirty(field: string) {
      const ctrl = this.userForm.get(field);
      return !ctrl.valid && ctrl.dirty;
    }
  
    hasError(field: string, error: string) {
      const ctrl = this.userForm.get(field);
      return ctrl.dirty && ctrl.hasError(error);
    }
  
    onLogin(){
    this.submitted=true;
      this.authService.login(this.userForm.value)
        .subscribe(
          resp=>{
            let jwt=resp.headers.get("authorization");
            this.authService.saveToken(jwt,this.rememberMe);
            this.submitted=false;
            if (this.authService.hasRole("ROLE_ADMIN"))
              this.router.navigateByUrl("/pages/dashboard");
            else
              this.router.navigateByUrl("/pages/profile");
          },
          error1 => {
            this.mode=this.ERROR;
            this.submitted=false
          }
        )
    }

}
