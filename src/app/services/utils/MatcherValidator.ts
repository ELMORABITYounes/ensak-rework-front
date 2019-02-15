import {FormControl} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatcherValidator {
  
  control: FormControl;
  otherControl: FormControl;
  otherControlName:string;

  constructor() {
  }

  setOtherControlName(otherControlName:string){
    this.otherControlName=otherControlName;
  }

  validate (control: FormControl) : { [key: string]: boolean } {

    if (!control.parent) {
      return null;
    }

    console.log("hello!")

    // Initializing the validator.
    if (!this.control) {
      this.control = control;
      this.otherControl = control.parent.get(this.otherControlName) as FormControl;
      if (!this.otherControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
      this.otherControl.valueChanges.subscribe(() => {
        this.control.updateValueAndValidity();
      });
    }

    if (!this.otherControl) {
      return null;
    }

    if (this.otherControl.value !== this.control.value) {
      return {
        'matchOther': true
      };
    }

    return null;

  }
  
}
