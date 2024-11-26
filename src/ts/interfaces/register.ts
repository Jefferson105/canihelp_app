export interface ICheckEmailToken {
    Email: string;
    Token: string;
    RegistrationID: string;
}

export interface ICheckCellPhoneToken {
    CellPhone: string;
    Token: string;
    RegistrationID: string;
    UserData: any;
}

export interface IRegister {
    CellPhone: string;
    Name: string;
    Email: string;
    Password: string;
    UserName: string;
}

export interface IRegisterPro {
    category: object;
    subs: Array<object>;
    specialties: Array<object>;
    tags: Array<object>;
}
