
export interface IDepartement {
    id?: number;
    nom?: string;
    description?: string;
}

export class Departement implements IDepartement {
    constructor(public id?: number, public nom?: string, public description?: string) {
      this.id = id ? id : null;
      this.nom = nom ? nom : null;
    }
}
