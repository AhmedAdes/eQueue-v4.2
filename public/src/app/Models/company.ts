export class Company {
  CompID: number;
  CompName: string;
  Country: string;
  City: string;
  Logo: string;
  CompType: string;
  CompAddress: string;
  Phone: string;
  Mobile: string;
  Website: string;
  Email: string;
  Fax: string;
  Description: string;
  WorkField: string;
  DefaultLanguage: string;
  Disabled: boolean;
}
export class Branch {
  BranchID: number;
  BranchName: string;
  CompID: number;
  CompName: string;
  Country: string;
  City: string;
  BranchAddress: string;
  Phone: string;
  Mobile: string;
  Email: string;
  Fax: string;
  Disabled: boolean;
}
export class Department {
  DeptID: number;
  DeptName: string;
  CompID: number;
  CompName: string;
  RangeFrom: number;
  RangeTo: number;
  Letter: string;
  Disabled: boolean;
}
export class BranchDept {
  DeptID: number;
  DeptName: string;
  BranchID: number;
  BranchName: string;
}
export class Service {
  ServID: number;
  ServName: string;
  DeptID: number;
  DeptName: string;
  Disabled: boolean;
}
export class QueueService {
  QID: number;
  ServID: number;
  ServName: string;
  DeptID: number;
  checked: boolean;
  ServCount: number;
  Notes: string;
}
