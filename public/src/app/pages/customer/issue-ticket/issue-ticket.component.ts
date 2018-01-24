import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import {
  CompanyService, BranchService, DepartmentService, DeptServsService, TicketService,
  AuthenticationService
} from '../../../services'
import { Company, Branch, Department, CurrentUser, QueueService } from '../../../Models'
import * as hf from '../../helper.functions'
import { validateConfig } from '@angular/router/src/config';
import { FormArray } from '@angular/forms/src/model';

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
  servList: QueueService[] = []
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
  modDate: AbstractControl
  user: AbstractControl
  srvfrm
  servNo: string
  uniqueNo: string
  visitTime: string
  submitted = false
  showForm = true
  now = new Date()
  today: NgbDateStruct
  modelDate: NgbDateStruct

  constructor(private srvtkt: TicketService, private auth: AuthenticationService,
    private srvComp: CompanyService, private srvBrnc: BranchService,
    private srvDept: DepartmentService, private srvSrv: DeptServsService, private fb: FormBuilder
  ) {
    this.inFrm = fb.group({
      'comp': ['', Validators.required],
      'branch': ['', Validators.required],
      'dept': ['', Validators.required],
      'modDate': ['', Validators.required],
      'srvfrm': fb.array([], Validators.required),
      'vDate': '',
      'user': ''
    })
    this.inFrm.controls['comp'].valueChanges.subscribe(val => this.OnCompChange(val))
    this.inFrm.controls['branch'].valueChanges.subscribe(val => this.OnBranchChange(val))
    this.inFrm.controls['dept'].valueChanges.subscribe(val => this.onDeptChange(val))

    this.comp = this.inFrm.get('comp')
    this.branch = this.inFrm.get('branch')
    this.dept = this.inFrm.get('dept')
    this.modDate = this.inFrm.get('modDate')
    this.vDate = this.inFrm.get('vDate')
    this.user = this.inFrm.get('user')
    this.srvfrm = this.inFrm.get('srvfrm')
    this.modDate.setValue(this.selectToday())
    this.vDate.setValue(this.now)
  }

  ngOnInit() {
    this.srvComp.getAllProviders().subscribe(c => {
      this.compList = c
      this.srvtkt.GetToday().subscribe(d => this.today = { year: new Date(d).getFullYear(), month: new Date(d).getMonth() + 1, day: new Date(d).getDate() }, err => hf.handleError(err))
    })
  }
  selectToday() {
    return { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
  }
  initService(s) {
    return this.fb.group({
      ServID: s.ServID,
      ServName: s.ServName,
      checked: s.checked,
      ServCount: s.ServCount,
      Notes: s.Notes
    })
  }
  addService(s) {
    (<FormArray>this.inFrm.controls['srvfrm']).push(this.initService(s))
  }
  subscribeChecked(i, val) {
    if (val == true) {
      (<FormGroup>(<FormArray>this.srvfrm).controls[i]).get('ServCount')
        .setValidators([Validators.required, Validators.min(1)])
    } else {
      (<FormGroup>(<FormArray>this.srvfrm).controls[i]).get('ServCount').clearValidators();
      (<FormGroup>(<FormArray>this.srvfrm).controls[i]).get('ServCount').reset(0);
    }
  }
  OnCompChange(val) {
    if (!val) { this.branchList = []; return }
    this.srvBrnc.getCompBranch(val).subscribe(br => {
      this.branchList = br
      this.branch.setValue(null)
      this.deptList = []
      this.servList = [];
      (<FormArray>this.srvfrm).controls = []
      // this.OnBranchChange(this.branchList[0].BranchID)
    })
  }
  OnBranchChange(val) {
    if (!val) { this.deptList = []; return }
    this.srvDept.getBranchDepts(val).subscribe(dp => {
      this.deptList = dp
      this.dept.setValue(null)
      this.servList = [];
      (<FormArray>this.srvfrm).controls = []
      // this.onDeptChange(this.deptList[0].DeptID)
    })
  }
  onDeptChange(val) {
    if (!val) {
      this.servList = [];
      (<FormArray>this.srvfrm).controls = []
      return
    }
    this.srvSrv.getDeptServss(val).subscribe(sv => {
      this.servList = sv.map(v => {
        return {
          ServID: v.ServID, ServName: v.ServName,
          checked: false, ServCount: 0, Notes: ''
        }
      })
      if(this.srvfrm.controls.length > 0) (<FormArray>this.srvfrm).controls = []
      this.servList.forEach(s => this.addService(s))
    })
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  HandleForm(formValue) {
    this.submitted = true;
    let selServs = this.srvfrm.controls.filter((s: FormGroup) => s.controls['checked'].value == true)
    if (selServs.length == 0) {
      hf.handleError('Please select Service from the List')
      return
    }
    if (!selServs.every((s: FormGroup) => s.controls['ServCount'].value > 0)) {
      hf.handleError('Please add a count for each selected Service')
      return
    }
    this.vDate.setValue(this.modDate.value ?
      new Date(Date.UTC(this.modDate.value.year, this.modDate.value.month - 1, this.modDate.value.day)) : null)
    this.user.setValue(this.currentUser.uID)

    if (this.inFrm.invalid) { console.log(this.inFrm); return }
    this.srvtkt.issueTicket(this.inFrm.value).subscribe(cols => {
      if (cols.error) {
        hf.handleError(cols.error); this.submitted = false; return
      }
      this.servNo = cols.ServiceNo
      this.uniqueNo = cols.UniqueNo
      this.visitTime = hf.changeToServerTime(cols.VisitTime)
      this.showForm = false
    }, err => hf.handleError(err))
  }
  resetAll() {
    (<FormArray>this.srvfrm).controls = []
    this.inFrm.reset()
    this.modDate.setValue(this.selectToday())
    this.showForm = true
    // this.foc.first.nativeElement.focus()
    this.submitted = false
  }

}
