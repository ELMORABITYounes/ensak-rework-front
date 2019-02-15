import { ISoutenance } from 'app/shared/model//soutenance.model';

export const enum RoleMembreJury {
    ENCADRANT = 'ENCADRANT',
    PRESIDANT = 'PRESIDANT',
    EXAMINATEUR = 'EXAMINATEUR',
    INVITE = 'INVITE'
}

export interface IMembreJury {
    id?: number;
    nom?: string;
    prenom?: string;
    email?: string;
    roleMembre?: RoleMembreJury;
    soutenance?: ISoutenance;
}

export class MembreJury implements IMembreJury {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public email?: string,
        public roleMembre?: RoleMembreJury,
        public soutenance?: ISoutenance
    ) {
      this.id = id ? id : null;
      this.nom = nom ? nom : null;
      this.prenom = prenom ? prenom : null;
      this.email = email ? email : null;
      this.roleMembre = roleMembre ? roleMembre : null;
      this.soutenance = soutenance ? soutenance : null;
    }
}
