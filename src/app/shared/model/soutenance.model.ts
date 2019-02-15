import { Moment } from 'moment';
import {IMembreJury, MembreJury} from 'app/shared/model//membre-jury.model';
import {Validators} from "@angular/forms";

export interface ISoutenance {
    id?: number;
    date?: Moment;
    membresJuries?: IMembreJury[];
}

export class Soutenance implements ISoutenance {
    constructor(public id?: number, public date?: Moment, public membresJuries?: IMembreJury[]) {
      this.id = id ? id : null;
      this.date = date ? date : null;
      this.membresJuries = membresJuries ? membresJuries : this.initMembresJury();
    }

    initMembresJury(){
      let membresJury: IMembreJury[]=[];
      for(let i=0;i<3;i++){
        membresJury.push(new MembreJury())
      }
      return membresJury
    }
}
