import { IDepartement } from 'app/shared/model//departement.model';
import { IEnseignement } from 'app/shared/model//enseignement.model';
import {IProfile} from "./profile.model";
import {IUser, User} from "./user.model";

export interface IProfesseur extends IProfile{
    id?: number;
    somme?: number;
    departement?: IDepartement;
    enseignements?: IEnseignement[];
}

export class Professeur implements IProfesseur {
    constructor(public id?: number, public imageContentType?: string, public image?: any, public somme?: number, public departement?: IDepartement, public enseignements?: IEnseignement[],public user?:IUser) {
      this.user=new User();
    }
}
