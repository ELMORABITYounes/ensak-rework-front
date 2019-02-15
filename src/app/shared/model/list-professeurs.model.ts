import {IDepartement} from "./departement.model";
import {ILigne} from "./ligne.model";

export interface IListProfesseurs {
    departement?:IDepartement
    rows?: ILigne[];
}

export class ListProfesseurs implements IListProfesseurs {
    constructor(
        public departement?: IDepartement,
        public rows?: ILigne[]
    ) {
        this.departement = departement ? departement : null;
        this.rows = rows ? rows : null;
    }
}
