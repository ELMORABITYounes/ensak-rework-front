import { IFiliere } from 'app/shared/model//filiere.model';
import { ISemestre } from 'app/shared/model//semestre.model';

export interface INiveau {
    id?: number;
    nom?: string;
    filiere?: IFiliere;
    semestres?: ISemestre[];
}

export class Niveau implements INiveau {
    constructor(public id?: number, public nom?: string, public filiere?: IFiliere, public semestres?: ISemestre[]) {
      this.id = id ? id : null;
      this.nom = nom ? nom : null;
    }
}
