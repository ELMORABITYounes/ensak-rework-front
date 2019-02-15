import { Moment } from 'moment';
import { ISoutenance } from 'app/shared/model//soutenance.model';
import { IEtudiant } from 'app/shared/model//etudiant.model';
import { ISuperviseur } from 'app/shared/model//superviseur.model';
import { IProfesseur } from 'app/shared/model//professeur.model';
import { ISociete } from 'app/shared/model//societe.model';

export const enum TypeStage {
    PFA = 'PFA',
    PFE = 'PFE'
}

export interface IStage {
    id?: number;
    sujet?: string;
    dateDebut?: Moment;
    dateFin?: Moment;
    technologies?: string;
    type?: TypeStage;
    soutenance?: ISoutenance;
    etudiant?: IEtudiant;
    superviseur?: ISuperviseur;
    professeurEncadrant?: IProfesseur;
    societe?: ISociete;
}

export class Stage implements IStage {
    constructor(
        public id?: number,
        public sujet?: string,
        public dateDebut?: Moment,
        public dateFin?: Moment,
        public technologies?: string,
        public type?: TypeStage,
        public soutenance?: ISoutenance,
        public etudiant?: IEtudiant,
        public superviseur?: ISuperviseur,
        public professeurEncadrant?: IProfesseur,
        public societe?: ISociete
    ) {}
}
