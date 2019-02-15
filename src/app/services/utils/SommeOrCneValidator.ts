import {AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';
import {EtudiantService, ProfesseurService} from "../entities";

@Injectable({
  providedIn: 'root'
})
export class SommeOrCneValidator {

  private timeout;
  public user:string;

  constructor(private readonly professeurService:ProfesseurService,
              private readonly etudiantService:EtudiantService) {
  }

  validate(control: AbstractControl): Promise<{ [key: string]: boolean }> {
    clearTimeout(this.timeout);

    const value = control.value;

    // do not call server when input is empty or shorter than 2 characters
    if (!value || value.length < 10) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this.timeout = setTimeout(() => {
        if (this.user==="STUDENT") {
          this.etudiantService.checkCne(control.value).subscribe(flag => {
              if (flag) {
                resolve({'CneTaken': true});
              } else {
                resolve(null);
              }
            },
            (err) => {
              resolve(null);
            }
          );
        }else if(this.user==="TEACHER"){
          this.professeurService.checkSomme(control.value).subscribe(flag => {
              if (flag) {
                resolve({'SommeTaken': true});
              } else {
                resolve(null);
              }
            },
            (err) => {
              resolve(null);
            }
          );
        }

      }, 500);
    });
  }

}
