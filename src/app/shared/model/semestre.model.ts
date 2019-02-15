import { INiveau } from 'app/shared/model//niveau.model';
import { IEnseignement } from 'app/shared/model//enseignement.model';

export interface ISemestre {
    id?: number;
    nom?: string;
    niveau?: INiveau;
    enseignements?: IEnseignement[];
}

export class Semestre implements ISemestre {
    constructor(public id?: number, public nom?: string, public niveau?: INiveau, public enseignements?: IEnseignement[]) {}
}
