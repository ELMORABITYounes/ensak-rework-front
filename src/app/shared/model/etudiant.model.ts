import { INiveau } from 'app/shared/model//niveau.model';
import {IProfile} from "./profile.model";
import {IUser, User} from "./user.model";

export interface IEtudiant extends IProfile{
    id?: number;
    cne?: number;
    niveau?: INiveau;
}

export class Etudiant implements IEtudiant {
    constructor(public id?: number, public imageContentType?: string, public image?: any, public cne?: number, public niveau?: INiveau,public user?:IUser) {
      this.user=new User();
    }
}
