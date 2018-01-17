import { Component, OnInit, Input } from '@angular/core';

import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CompanyService, UserService, AuthenticationService, DepartmentService, DeptServsService } from 'app/services';
import { Service, Department } from 'app/Models';



@Component({
    selector: 'mt-wizard-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss']
})

export class DepartmentsComponent implements OnInit {

    @Input() companyId = 0;
    isSrvActive: boolean;
    departments: any[] = [];
    services: any[] = [];
    department = new Department();
    service = new Service();
    
    form: FormGroup;

    constructor(private router: Router,
        private route: ActivatedRoute, 
        private srvComp: CompanyService, private srvDept: DepartmentService, private srvServ: DeptServsService,
        private srvAuth: AuthenticationService, private fb: FormBuilder) {

        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            DeptName: ['', [Validators.required, Validators.minLength(3)]],
            CompID: ['', Validators.required],
            RangeFrom: ['', Validators.required],
            RangeTo: ['', Validators.required],
            Letter: ['', Validators.required],
            Disabled: [''],
            Services: this.fb.array([])
        });
    }

    ngOnInit() {
        if (this.companyId == 0) {
            this.srvComp.getCompanyId(this.srvAuth.getUser().uID)
                .subscribe(res => {
                    this.companyId = res.CompID;
                    this.department.CompID = this.companyId;
                    this.form.patchValue({ CompID: this.companyId });

                    this.getAllDepts();
                });
        }
    }
    getAllDepts() {
        if (this.companyId > 0 && this.companyId != null && this.companyId != undefined) {
            this.srvDept.getCompDepts(this.companyId)
                .subscribe((data) => {
                    this.departments = data;
                });
        }
    }

    SetServices(services: Service[]) {
        const serviceFGs = services.map(service => this.fb.group(service));
        const serviceFormArray = this.fb.array(serviceFGs);
        this.form.setControl('Services', serviceFormArray);
    }

    AddService(data: HTMLInputElement) {
        if (data.value.length >= 3) {
            let service = new Service();
            service.ServName = data.value;
            if (this.department.DeptID > 0) {
                service.DeptID = this.department.DeptID;
                this.srvServ.createService(service)
                    .subscribe();
            }

            this.department.Services.push(service);

            this.SetServices(this.department.Services);
            data.value = "";
        }
    }
    RemoveService(service) {
        let index = this.department.Services.indexOf(service);
        this.department.Services.splice(index, 1);

        this.SetServices(this.department.Services);
    }
    OnDeptSelect(department: Department) {
        this.Reset();
        this.department = department;
        this.SetServices(this.department.Services);

        this.form.patchValue(this.department);
    }
    OnServEdit(service: Service) {
        this.service = service;
        this.isSrvActive = true;
    }
    OnServUpdated(service: Service) {
        let index = this.department.Services.indexOf(this.service);
        if (service.ServName.length >= 3) {
            if (service.ServID > 0) {
                this.srvServ.updateService(service.ServID, service)
                    .subscribe((res) => {
                        this.department.Services[index] = res;
                        this.SetServices(this.department.Services);
                    });
            }
            else {
                this.department.Services[index] = service;
                this.SetServices(this.department.Services);
            }
            this.service = new Service();
        }
    }
    OnServDelete(service: Service) {
        let index = this.department.Services.indexOf(service);

        if (service.ServID > 0) {
            if (confirm('Are you sure you want to delete this Service?')) {
                this.srvServ.deleteService(service.ServID)
                    .subscribe(res => {
                        this.department.Services.splice(index, 1);
                        this.SetServices(this.department.Services);
                    });
            }
        } else {
            this.department.Services.splice(index, 1);
            this.SetServices(this.department.Services);
        }
        this.service = new Service();
    }
    OnServClose() {
        this.service = new Service();
        this.isSrvActive = false;
    }
    Reset() {
        this.department = new Department();
        this.department.CompID = this.companyId;

        this.form.reset();
        this.form.patchValue({
            CompID: this.companyId,
            Disabled: this.department.Disabled
        });
        this.SetServices([]);
    }
    AssignDeptValue() {
        this.department.DeptName = this.DeptName.value;
        this.department.Disabled = this.Disabled.value;
        this.department.RangeFrom = this.RangeFrom.value;
        this.department.RangeTo = this.RangeTo.value;
        this.department.Letter = this.Letter.value;
        this.department.Services = this.Services.value;
    }
    OnSubmit() {

        this.AssignDeptValue();

        if (this.department.DeptID == 0) {
            this.departments.push(this.department);
            this.srvDept.createCompDept(this.department)
                .subscribe();
        }
        else if (this.department.DeptID > 0) {
            this.srvDept.updateCompDept(this.department)
                .subscribe((res) => {
                    console.log(res);
                });
        }
        this.Reset();
    }
    Next(){
        this.router.navigateByUrl('/out/companySetup/branches', { relativeTo: this.route.parent, skipLocationChange: true });
    }
    Previous(){
        this.router.navigateByUrl('/out/companySetup/companies', { relativeTo: this.route.parent, skipLocationChange: true });        
    }
    get DeptName() { return this.form.get('DeptName'); }
    get CompID() { return this.form.get('CompID'); }
    get RangeFrom() { return this.form.get('RangeFrom'); }
    get RangeTo() { return this.form.get('RangeTo'); }
    get Letter() { return this.form.get('Letter'); }
    get Disabled() { return this.form.get('Disabled'); }
    get Services() { return this.form.get('Services') as FormArray; }
}