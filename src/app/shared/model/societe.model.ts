import { ISuperviseur } from 'app/shared/model//superviseur.model';

export interface ISociete {
    id?: number;
    nom?: string;
    ville?: string;
    adresse?: string;
    secteursActivite?: string;
    superviseurs?: ISuperviseur[];
    telephone?:string;
}

export class Societe implements ISociete {
    constructor(
        public id?: number,
        public nom?: string,
        public ville?: string,
        public adresse?: string,
        public telephone?: string,
        public secteursActivite?: string,
        public superviseurs?: ISuperviseur[]
    ) {}
}
