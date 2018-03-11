import { QueueService } from "./company";
export class Ticket {
    QID: number = 0;
    lastCurQ: number = 0;
    FirstPendQ: number = 0;
    notAttQ : number;
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
    StartServeDT: Date;
    EndServeDT: Date;
    ServingTime: number;
    QStatus: string;
    QCurrent: boolean;
    QTransfer: boolean;
    OQTransferred: boolean;    
    UniqueNo: string;
    BranchAddress: string;
    EstUserNo: number;
    EstServingTime: number;
    CompID: number;
    CompName: string;
    ProvUserID: number;
    pUserName: string;
    NQTransferredFrom:string;
    NQTransferredBy:string;
    OQTransferredBy:string;
    OQTransferredTo:string;
    OQTransferDT:string;
    Services: QueueService[] = [];
    Qtask: string; // Passing the required task ( NEXT , START , HOLD , TRANSFERE , ETC..) 
}

