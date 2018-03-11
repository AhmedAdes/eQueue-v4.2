import { Component, OnInit, Input } from '@angular/core';
import { UserRoles, Branch, User } from 'app/Models';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { BranchService, AuthenticationService, CompanyService, UserService } from 'app/services';
import { FormGroup } from '@angular/forms/src/model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UserComponent implements OnInit {
  @Input() companyId = 0;
  roles = UserRoles;
  form: FormGroup;
  user = new User();
  branch = new Branch();
  usersCount: boolean;
  managers;
  branches: Branch[] = [];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private srvBrnch: BranchService, private srvAuth: AuthenticationService,
    private srvComp: CompanyService, private srvUser: UserService) {
    this.createForm();
  }

  ngOnInit() {
    if (this.companyId == 0) {

      this.srvComp.getCompanyId(this.srvAuth.getUser().uID)
        .subscribe(res => {
          this.companyId = res.CompID;
          this.getAllBranches();
        });
    }
  }
  createForm() {
    this.form = this.fb.group({
      BranchID: ['', Validators.required],
      UserName: ['', Validators.required],
      Email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      UserPass: ['cmacgm', Validators.required],
      UserRole: ['', Validators.required],
      ManagerID: [''],
      Phone: [''],
      Mobile: [''],
      Title: [''],
      Departments: this.fb.array([], Validators.required),
      Disabled: [false]
    });
    
    
      this.BranchID.valueChanges.subscribe(val => {
        
        this.branches.filter(obj => obj.BranchID == val).map(b => {
          this.branch.BranchID = b.BranchID;
          this.branch.BranchName = b.BranchName;
          this.branch.Departments = b.Departments;
          this.branch.Users = b.Users;
        });
      });    
  }
  getAllBranches() {
    this.srvBrnch.getBrnchsDepts(this.companyId)
      .subscribe(res => {
        this.branches = res;
        this.checkUsersCount();
      });
  }
  SetDepartments(departments: any[]) {
    const departmentFGs = departments.map(department => this.fb.group(department));
    const departmentFormArray = this.fb.array(departmentFGs);
    this.form.setControl('Departments', departmentFormArray);
  }
  checkUsersCount() {
    for (let i = 0; i < this.branches.length; i++) {
      if (this.branches[i].Users.length == 0) {
        this.usersCount = false;
        return;
      } else {
        this.usersCount = true;
      }
    }
  }
  addDepartment(department) {
    if (!this.user.Departments.includes(department)) {
      this.user.Departments.push(department);
      this.SetDepartments(this.user.Departments);
    }
  }
  removeDepartment(department) {
    let index = this.user.Departments.indexOf(department);
    this.user.Departments.splice(index, 1);
    this.SetDepartments(this.user.Departments);
  }
  onSubmit() {
    this.assignValues();
    if (this.user.UserID == 0 || this.user.UserID == undefined) {
      this.srvUser.InsertUser(this.user)
        .subscribe(res => {
          this.user.UserID = res;
          this.branch.Users.push(this.user);
          this.reset();
        });
    } else {
      this.srvUser.UpdateUser(this.user.UserID, this.user)
        .subscribe(res => {
          this.branches.forEach(b => {
            if (b.Users.findIndex(u => u.UserID == this.user.UserID) !== -1) {
              b.Users.splice(b.Users.findIndex(u => u.UserID == this.user.UserID), 1);
            }
          });
          this.branch.Users.push(this.user);
          this.reset();
        });
    }
  }

  onUserSelect(user) {
    this.form.patchValue(user);
    this.SetDepartments(user.Departments);
    this.user = user;
    console.log(this.user);
  }
  next() {
    this.router.navigateByUrl('/out/companySetup/conclusion', { relativeTo: this.route.parent, skipLocationChange: true });
  }
  previous() {
    this.router.navigateByUrl('/out/companySetup/branches', { relativeTo: this.route.parent, skipLocationChange: true });
  }
  reset() {
    this.form.reset();

    this.branch = new Branch();

    this.user = new User();
    this.user.EntityType = 1;
    this.user.CompID = this.companyId;

    this.form.patchValue({ UserPass: 'cmacgm' })
    this.checkUsersCount();
  }
  assignValues() {
    if (!this.ManagerID.value || this.ManagerID.value == '')
      this.user.ManagerID = null;
    else
      this.user.ManagerID = this.ManagerID.value;
    this.user.EntityType = 1;
    this.user.CompID = this.companyId;
    this.user.BranchID = this.BranchID.value;
    this.user.UserPass = this.UserPass.value;
    this.user.UserRole = this.UserRole.value;
    this.user.Phone = this.Phone.value;
    this.user.Mobile = this.Mobile.value;
    this.user.Email = this.Email.value;
    this.user.UserName = this.UserName.value;
    this.user.Title = this.Title.value;
    this.user.Disabled = this.Disabled.value;
  }

  get BranchID() { return this.form.get('BranchID'); }
  get UserName() { return this.form.get('UserName'); }
  get UserPass() { return this.form.get('UserPass'); }
  get UserRole() { return this.form.get('UserRole'); }
  get ManagerID() { return this.form.get('ManagerID'); }
  get Phone() { return this.form.get('Phone'); }
  get Mobile() { return this.form.get('Mobile'); }
  get Email() { return this.form.get('Email'); }
  get Title() { return this.form.get('Title'); }
  get Disabled() { return this.form.get('Disabled'); }
}
