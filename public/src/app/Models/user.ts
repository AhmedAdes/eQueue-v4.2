export class User {
    UserID: number;
    UserName: string;
    LoginName: string;
    UserPass: string;
    UserRole: string;
    EntityType: string;
    ManagerID: number;
    ManagerName: string;
    CreateDate: Date;
    Phone: string;
    Mobile: string;
    Email: string;
    AcFailCount: number;
    Title: string;
    CompID: number;
    BranchID: number;
    CompName: string;
    BranchName: string;
    photo: string;
    Disabled: boolean;
    Salt: string;
}

export class CurrentUser {
    uID: number;
    uName: string;
    uRl: number;
    etyp: number;
    tkn: string;
    slt: string;
    photo: string;
    cID: number;
    bID: number;
}

