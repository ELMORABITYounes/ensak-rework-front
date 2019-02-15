import {INiveau} from "./niveau.model";
import {ILigne} from "./ligne.model";

export interface IListEtudiants {
    niveau?:INiveau
    rows?: ILigne[];
}

export class ListEtudiants implements IListEtudiants {
    constructor(
        public niveau?: INiveau,
        public rows?: ILigne[]
    ) {
        this.niveau = niveau ? niveau : null;
        this.rows = rows ? rows : null;
    }
}
