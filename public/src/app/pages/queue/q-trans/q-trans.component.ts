import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DepartmentService, DeptServsService, AuthenticationService, TicketService } from 'app/services';
import swal from 'sweetalert2';
import { Ticket } from 'app/Models';
import { AudioService } from 'app/services/audio.service';

@Component({
  selector: 'q-trans',
  templateUrl: './q-trans.component.html',
  styleUrls: ['./q-trans.component.scss']
})
export class QTransComponent implements OnInit {
  @Input() ticket: Ticket;
  @Output() transDone = new EventEmitter();

  BranchID = this.authSrv.getUser().bID;
  Depts = [];
  SelectedDept;
  DeptsServices = [];
  form;
  constructor(private srvDept: DepartmentService, private srvServcs: DeptServsService,
    private authSrv: AuthenticationService, private srvTkts: TicketService,
     private fb: FormBuilder , private audSrv : AudioService) { }

  ngOnInit() {
    this.srvDept.getBranchDepts(this.BranchID)
      .subscribe(res => {
        this.audSrv.getAudId('1.wav')
        .subscribe(res=>{         
          console.log(res.url) 
          this.playAudio(res.url);
        })
        this.Depts = res;
        this.ticket.DeptID = null;
        console.log(this.ticket)
      })

    this.createForm();
  }

  playAudio(path){
    let audio = new Audio();
    audio.crossOrigin  ='anonymous';    
    audio.src = path;    
    audio.load();
    audio.play();    
    }
  
    createForm() {
    this.form = this.fb.group({
      DeptID: ['', Validators.required],
      Services: this.fb.array([])
    });

    this.DeptID.valueChanges.subscribe(val => {
      this.SelectedDept = this.Depts.filter(x => x['DeptID'] == val)[0].DeptName;      
      
      this.srvServcs.getDeptServss(val)
        .subscribe(res => {
          this.ClearServices();
          this.DeptsServices = res;
          this.AddItemToServicesArray();
          
          this.AssignValToTicket();
          console.log(this.ticket)
        })
    });
  }
  ClearServices() {
    while (this.Services.length !== 0)
      this.Services.removeAt(0);
  }
  AddItemToServicesArray() {
    for (let i = 0; i < this.DeptsServices.length; i++) {
      this.Services.push(new FormGroup(
        {
          ServID: new FormControl(this.DeptsServices[i].ServID),
          ServName: new FormControl(this.DeptsServices[i].ServName),
          ServCount: new FormControl('1', Validators.required)
        }))
    }
  }
  onSubmit() {

    if (this.ticket.DeptID != undefined && this.ticket.DeptID != null) {
      this.srvTkts.transferTicket(this.ticket)
        .subscribe(res => {
          console.log(res)
          swal("Transfer Q", "Your Q Was Transferred Successfully to Dept " + this.SelectedDept, "success");
          this.transDone.emit();
        });
    }
  }
  AssignValToTicket() {    
    this.ticket.OQTransferredTo = this.SelectedDept;    
    
    this.ticket.DeptID = this.DeptID.value;
    this.ticket.Services = this.Services.value;
  }
  get DeptID() { return this.form.get('DeptID'); }
  get Services() { return (this.form.get('Services') as FormArray) }
}
