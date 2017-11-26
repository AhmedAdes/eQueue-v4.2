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
      'vDate': ['', Validators.required],
      'servNo': '',
    })
    this.inFrm.controls['comp'].valueChanges.subscribe(val => this.OnCompChange(val))
    this.inFrm.controls['branch'].valueChanges.subscribe(val => this.OnBranchChange(val))
    this.inFrm.controls['dept'].valueChanges.subscribe(val => this.onDeptChange(val))

    this.comp = this.inFrm.get('comp')
    this.branch = this.inFrm.get('branch')
    this.dept = this.inFrm.get('dept')
    this.vDate = this.inFrm.get('vDate')
    this.servNo = this.inFrm.get('servNo')
  }

  ngOnInit() {
    this.srvComp.getAllProviders().subscribe(c => {
      this.compList = c
    })
  }
  OnCompChange(val) {

  }
  OnBranchChange(val) {

  }
  onDeptChange(val) {

  }
  HandleForm(formValue) {
    this.submitted = true;
    if ( this.inFrm.invalid ) { return }
    console.log(formValue)
  }
  resetAll() {
    this.inFrm.reset()
    this.submitted = false
  }

}
