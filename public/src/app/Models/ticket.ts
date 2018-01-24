import { QueueService } from "./company";
export class Ticket {
    QID: number = 0;
    UserID: number;
    cCompName: string;
    cUserName: string;
    BranchID: number;
    BranchName: string;
    DeptID: number;
    DeptName: string;
    ServiceNo: string;
    RequestDate: Date;
    VisitDate: Date;
    VisitTime: string;
    CallTime: string;    
    StartServeDT:Date;
    EndServeDT : Date;
    ServingTime:number;
    QStatus: string;
    QCurrent : boolean;
    QTransfer : boolean;
    UniqueNo: string;    
    BranchAddress: string;
    EstUserNo : number;
    EstServingTime: number;    
    CompID: number;
    CompName: string;
    ProvUserID : number;
    pUserName: string;
    Services: QueueService[] = [];
}

