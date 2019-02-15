import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { Router } from '@angular/router';
import { UsernameValidator } from '../../services/utils/UsernameValidator';
import {matchOtherValidator} from "../../services/utils/MyErrorStateMatcher";
import {INiveau} from "../../shared/model/niveau.model";
import {IDepartement} from "../../shared/model/departement.model";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {SommeOrCneValidator} from "../../services/utils/SommeOrCneValidator";
import {DepartementService, NiveauService} from "../../services/entities";


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  readonly ERROR=1;
  readonly SUCCESS=2;
  userForm: FormGroup;
  public mode:number=0;
  public niveaux:INiveau[];
  public departements:IDepartement[];
  public submitted:boolean;


  constructor(private authService:AuthenticationService,
              private router:Router,
              private formBuilder: FormBuilder,
              private usernameValidator: UsernameValidator,
              private sommeOrCneValidator: SommeOrCneValidator,
              private niveauService:NiveauService,
              private departementService:DepartementService
              ) {
  this.sommeOrCneValidator.user="STUDENT"
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      if (this.authService.hasRole("ROLE_ADMIN"))
        this.router.navigateByUrl("/pages/dashboard");
      else
        this.router.navigateByUrl("/pages/profile");
    }
    this.submitted=false;
    this.initForm();
    this.niveauService.query().subscribe(
      (res: HttpResponse<INiveau[]>) => {
        this.niveaux = res.body;
      },
      (res: HttpErrorResponse) => {
        this.mode=this.ERROR
        console.log(res);
      }
    );
    this.departementService.query().subscribe(
      (res: HttpResponse<IDepartement[]>) => {
        this.departements = res.body;
      },
      (res: HttpErrorResponse) => this.mode=this.ERROR
    );
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      type:["STUDENT",Validators.required],
      cneOrSomme:["",[Validators.required,Validators.min(1000000000),Validators.max(9999999999)],this.sommeOrCneValidator.validate.bind(this.sommeOrCneValidator)],
      niveauOrDepartement:["",Validators.required],
      username:["",[Validators.required,Validators.email],this.usernameValidator.validate.bind(this.usernameValidator)],
      password:["",Validators.required],
      repeatedPassword:["",[Validators.required,matchOtherValidator("password")]]})
  }

  isInvalidAndDirty(field: string) {
    const ctrl = this.userForm.get(field);
    return !ctrl.valid && ctrl.dirty;
  }

  hasError(field: string, error: string) {
    const ctrl = this.userForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  onRegister(){
    this.submitted=true
    console.log(this.userForm.value)
    this.authService.register(this.userForm.value)
      .subscribe(
        resp=>{
          this.mode=this.SUCCESS
          this.submitted=false
        },
        error1 => {
          this.mode=this.ERROR;
          this.submitted=false
        }
      )
  }

  onChange(userValue) {
    this.sommeOrCneValidator.user=userValue
  }

}
