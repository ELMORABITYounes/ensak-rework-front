export interface ILigne {
    firstName?: string;
    lastName?: string;
    username?: string;
    cneOrSomme?: number;
    tel?: string
}

export class Ligne implements ILigne {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public username?: string,
        public cneOrSomme?: number,
        public tel?: string
    ) {
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.username = username ? username : null;
        this.cneOrSomme = cneOrSomme ? cneOrSomme : null;
        this.tel = tel ? tel : null;
    }
}
