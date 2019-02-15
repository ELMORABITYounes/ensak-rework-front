import { ISociete } from 'app/shared/model//societe.model';

export interface ISuperviseur {
    id?: number;
    nom?: string;
    prenom?: string;
    email?: string;
    tel?: string;
    societe?: ISociete;
}

export class Superviseur implements ISuperviseur {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public email?: string,
        public tel?: string,
        public societe?: ISociete
    ) {}
}
