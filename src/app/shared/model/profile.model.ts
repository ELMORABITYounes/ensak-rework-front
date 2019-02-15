import {IUser, User} from "./user.model";
import {INiveau, Niveau} from "./niveau.model";
import {Departement, IDepartement} from "./departement.model";

export interface IProfile {
    id?: number;
    imageContentType?: string;
    image?: any;
  user?: IUser;

}

export class Profile implements IProfile {
    constructor(public id?: number, public imageContentType?: string, public image?: any,public user?:IUser,public cne?,
  public somme?,
  public departement?:IDepartement,public niveau?:INiveau) {
      this.id = id ? id : null;
      this.user = user ? user : new User();
      this.cne = cne ? cne : null;
      this.somme = somme ? somme : null;
      this.departement = departement ? departement : new Departement();
      this.niveau = niveau ? niveau : new Niveau();
    }
}
