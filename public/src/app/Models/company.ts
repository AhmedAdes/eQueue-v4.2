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
  Country: string;
  City: string;
  BranchAddress: string;
  Phone: string;
  Mobile: string;
  Email: string;
  Fax: string;
  Disabled: boolean;
  Departments: any[] = [];
  Users: any[] = [];
}
export class Department {
  DeptID: number = 0;
  DeptName: string = '';
  CompID: number = 0;
  RangeFrom: number = 0;
  RangeTo: number = 0;
  Letter: string = '';
  Disabled: boolean = false;
  Services: Service[] = [];
}
export class BranchDept {
  DeptID: number;
  DeptName: string;
  BranchID: number;
  BranchName: string;
}
export class Service {
  constructor(public ServName: string = '') { }
  Disabled: boolean = false;
  ServID: number;
  DeptID: number;
  DeptName: string;
  checked: boolean
}
