import { ISemestre } from 'app/shared/model//semestre.model';
import { IModule } from 'app/shared/model//module.model';
import { IProfesseur } from 'app/shared/model//professeur.model';

export interface IEnseignement {
    id?: number;
    semestre?: ISemestre;
    module?: IModule;
    professeur?: IProfesseur;
}

export class Enseignement implements IEnseignement {
    constructor(public id?: number, public semestre?: ISemestre, public module?: IModule, public professeur?: IProfesseur) {}
}
