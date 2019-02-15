import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';
import {IProfile} from "../../shared/model/profile.model";
import {BASE_URL} from "../../shared/constants/server.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //private SERVER:string="http://localhost:8080";
  private jwtHelper:JwtHelperService=null;
  private usernameObservable = new BehaviorSubject<string>(null);
  private emailObservable = new BehaviorSubject<string>(null);
  private rolesObservable = new BehaviorSubject<Array<{authority:string}>>([]);
  private profileImageObservable = new BehaviorSubject<string>("assets/images/avatar.png");

  constructor(private http:HttpClient) {
    this.jwtHelper=new JwtHelperService();
    this.refresh();
  }

  getProfileImage():Observable<string>{
    return this.profileImageObservable.asObservable();
  }

  setImageProfile(profile:IProfile){
    if (profile.image != null) {
      this.profileImageObservable.next('data:' + profile.imageContentType + ';base64,' + profile.image);
      if(localStorage.getItem("token")){
        localStorage.setItem("profilePicture", profile.image);
        localStorage.setItem("imageContentType", profile.imageContentType)
      }else{
        sessionStorage.setItem("profilePicture", profile.image);
        sessionStorage.setItem("imageContentType", profile.imageContentType)
      }
    }else {
      this.profileImageObservable.next("assets/images/avatar.png");
    }
  }

  saveToken(jwt:string,rememberMe?:boolean){
    if (rememberMe) {
      localStorage.setItem("token" ,jwt);
    } else {
      sessionStorage.setItem("token" ,jwt)
    }
    this.refresh();
  }

  getToken():string{
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  hasRole(role:string) : boolean{
    let roles=this.rolesObservable.getValue();
    for(let r of roles){
      if(r.authority===role) return true;
    }
    return false;
  }

  hasAnyAuthority(authorities: string[]): boolean {
    for (let i = 0; i < authorities.length; i++) {
      if (this.hasRole(authorities[i])) {
        return true;
      }
    }
    return false;
  }

  getEmail():Observable<string>{
    return this.emailObservable.asObservable();
  }

  getUsername():Observable<string>{
    return this.usernameObservable.asObservable();
  }

  refresh(){
      let jwt=this.getToken();
      if(jwt && !this.jwtHelper.isTokenExpired(jwt)){
        this.rolesObservable.next(this.jwtHelper.decodeToken(jwt).roles);
        this.emailObservable.next(this.jwtHelper.decodeToken(jwt).sub);
        this.usernameObservable.next(this.jwtHelper.decodeToken(jwt).firstName+" "+this.jwtHelper.decodeToken(jwt).lastName)
      }
  }

  public isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  logout(){
    this.clearStorage();
    this.rolesObservable.next([]);
    this.usernameObservable.next(null);
    this.emailObservable.next(null);
  }

  clearStorage(){
    localStorage.removeItem("token");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("imageContentType");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("profilePicture");
    sessionStorage.removeItem("imageContentType");
  }

  register(regiterForm){
    return this.http.post(BASE_URL+"/api/register",regiterForm);
  }

  checkUsername(value:string):Observable<boolean>{
    return this.http.get<boolean>(BASE_URL+"/api/checkUsername?value="+value)
  }

  login(user) {
    return this.http.post(BASE_URL+"/login",user,{observe:"response"});
  }

  reloadToken(){
    this.http.get(BASE_URL+"/api/refreshToken", {responseType: 'text'}).subscribe((jwt:string)=>
    {
      if(localStorage.getItem("token")){
        this.saveToken(jwt,true);
      }else{
        this.saveToken(jwt);
      }

      this.refresh();
    })
  }
}
