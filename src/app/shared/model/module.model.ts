import { IDepartement } from 'app/shared/model//departement.model';
import { IEnseignement } from 'app/shared/model//enseignement.model';

export interface IModule {
    id?: number;
    nom?: string;
    nbrHeuresCours?: number;
    nbrHeuresTD?: number;
    departement?: IDepartement;
    enseignements?: IEnseignement[];
}

export class Module implements IModule {
    constructor(
        public id?: number,
        public nom?: string,
        public nbrHeuresCours?: number,
        public nbrHeuresTD?: number,
        public departement?: IDepartement,
        public enseignements?: IEnseignement[]
    ) {}
}
