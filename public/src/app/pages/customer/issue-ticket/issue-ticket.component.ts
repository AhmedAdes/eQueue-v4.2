import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {
  CompanyService, BranchService, DepartmentService, DeptServsService, TicketService,
  AuthenticationService
} from '../../../services'
import { Company, Branch, Department, Service, CurrentUser } from '../../../Models'

@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.component.html',
  styleUrls: ['./issue-ticket.component.scss']
})
export class IssueTicketComponent implements OnInit {
  currentUser = this.auth.getUser()
  compList: Company[] = []
  branchList: Branch[] = []
  deptList: Department[] = []
  servList: Service[] = []
  selComp: number
  selBrnch: number
  selDept: number
  selServ: any[]
  visitDate: string
  inFrm: FormGroup
  comp: AbstractControl
  branch: AbstractControl
  dept: AbstractControl
  serv: AbstractControl
  vDate: AbstractControl
  servNo: AbstractControl
  submitted = false

  constructor(private srvtkt: TicketService, private auth: AuthenticationService,
    private srvComp: CompanyService, private srvBrnc: BranchService,
    private srvDept: DepartmentService, private srvSrv: DeptServsService, fb: FormBuilder
  ) {
    this.inFrm = fb.group({
      'comp': ['', Validators.required],
      'branch': ['', Validators.required],
      'dept': ['', Validators.required],
      'serv': ['', Validators.required],
      'vDate': ['', Validators.required],
      'servNo': '',
    })
    this.inFrm.controls['comp'].valueChanges.subscribe(val => this.OnCompChange(val))
    this.inFrm.controls['branch'].valueChanges.subscribe(val => this.OnBranchChange(val))
    this.inFrm.controls['dept'].valueChanges.subscribe(val => this.onDeptChange(val))

    this.comp = this.inFrm.get('comp')
    this.branch = this.inFrm.get('branch')
    this.dept = this.inFrm.get('dept')
    this.serv = this.inFrm.get('serv')
    this.vDate = this.inFrm.get('vDate')
    this.servNo = this.inFrm.get('servNo')
  }

  ngOnInit() {
    this.srvComp.getAllProviders().subscribe(c => {
      this.compList = c
    })
  }
  OnCompChange(val) {
    if (!val) { this.branchList = []; return }
    this.srvBrnc.getCompBranch(val).subscribe(br => {
      this.branchList = br
      this.branch.setValue(null)
      this.deptList = []
      this.servList = []
      // this.OnBranchChange(this.branchList[0].BranchID)
    })
  }
  OnBranchChange(val) {
    if (!val) { this.deptList = []; return }
    this.srvDept.getBranchDepts(val).subscribe(dp => {
      this.deptList = dp
      this.servList = []
      // this.onDeptChange(this.deptList[0].DeptID)
    })
  }
  onDeptChange(val) {
    if (!val) { this.servList = []; return }
    this.srvSrv.getDeptServss(val).subscribe(sv => {
      this.servList = sv.map(v => { return { ServID: v.ServID, ServName: v.ServName, checked: false } })
    })
  }
  HandleForm(formValue) {
    this.submitted = true;
    let selServs = this.servList.filter(c => c.checked == true)
    console.log(selServs)
    this.serv.setValue(selServs)
    // if (selServs.length <= 0){
    //   this.serv.errors.required
    // } else {
    //   this.serv.setValue(true)
    // }
    if (this.inFrm.invalid) { return }
    console.log(this.inFrm.value)
  }
  resetAll() {
    this.inFrm.reset()
    this.submitted = false
  }

}
