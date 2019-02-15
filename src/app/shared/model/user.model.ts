export interface IUser {
    id?: any;
    firstName?: string;
    lastName?: string;
    username?: string;
    enabled?: boolean;
    authorities?: any[];
  telephone?:string;
}

export class User implements IUser {
    constructor(
        public id?: any,
        public firstName?: string,
        public lastName?: string,
        public username?: string,
        public enabled?: boolean,
        public authorities?: any[],
        public telephone?:string
    ) {
        this.id = id ? id : null;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.username = username ? username : null;
        this.enabled = enabled ? enabled : false;
      this.authorities = authorities ? authorities : null;
      this.telephone = telephone ? telephone : null;
    }
}
