import { QueueService } from './company'
export class Ticket {
    QID: number;
    VisitDate: Date;
    VisitTime: string;
    DeptID: number;
    DeptName: string;
    BranchID: number;
    BranchName: string;
    CompID: number;
    CompName: string;
    ServiceNo: string;
    UniqueNo: string;
    UserID: number;
    QStatus: string;
    BranchAddress: string;
    RequestDate: Date;
    Services: QueueService[];
}
