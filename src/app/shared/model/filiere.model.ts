import { INiveau } from 'app/shared/model//niveau.model';

export interface IFiliere {
    id?: number;
    nom?: string;
    niveaux?: INiveau[];
}

export class Filiere implements IFiliere {
    constructor(public id?: number, public nom?: string, public niveaux?: INiveau[]) {}
}
