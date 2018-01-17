import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService, UserService, AuthGuard, AuthenticationService } from 'app/services';
import { Countries } from 'app/Models/countries';
import { Languages, WorkFields, User, Company } from 'app/Models';
import { Input } from '@angular/core';


@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
    @Input() companyId: any;

    company = new Company();
    countries = Countries;
    cities: any[] = [];
    languages = Languages;
    workfields = WorkFields;
    form: FormGroup;
    spinner: boolean = true;

    constructor(private router: Router, private route: ActivatedRoute,
        private srvComp: CompanyService, private srvUsr: UserService,
        private srvAuth: AuthenticationService, private fb: FormBuilder) {

        this.createForm();
    }

    ngOnInit() {
        this.srvComp.getCompanyId(this.srvAuth.getUser().uID)
            .subscribe(res => {
                this.companyId = res.CompID;
                if (this.companyId == null)
                    this.spinner = false;
                this.getData();
            });
    }

    createForm() {
        this.form = this.fb.group({
            id: [0],
            compName: ['',
                [
                    Validators.required,
                    Validators.minLength(5)
                ]
            ],
            country: ['', Validators.required],
            city: ['', Validators.required],
            //logo: [],
            comptype: ['Provider', Validators.required],
            compaddress: [''],
            phone: [''],
            mobile: [''],
            website: [''],
            email: [''],
            fax: [''],
            description: [''],
            workfield: ['', Validators.required],
            defaultlanguage: ['', Validators.required],
            disabled: ['']
        });
        this.country.valueChanges.subscribe(val => {
            this.onCountryChange(val);
        })
    }
    onCountryChange(val) {
        if (!val) return
        this.srvComp.getCountryCities(val)
            .subscribe(res => {
                this.cities = res;                
            })
    }
    loadForm() {
        this.form.setValue({
            id: this.company.CompID,
            compName: this.company.CompName,
            country: this.countries.find(c=>c.name==this.company.Country).code,
            city: this.cities,
            comptype: this.company.CompType,
            compaddress: this.company.CompAddress,
            phone: this.company.Phone,
            mobile: this.company.Mobile,
            website: this.company.Website,
            email: this.company.Email,
            fax: this.company.Fax,
            description: this.company.Description,
            workfield: this.company.WorkField,
            defaultlanguage: this.company.DefaultLanguage,
            disabled: this.company.Disabled
        });
        this.spinner = false;
    }
    getData() {
        if (this.companyId > 0 && this.companyId != null && this.companyId != undefined) {

            this.srvComp.getComp(this.companyId)
                .subscribe((data) => {
                    this.company = data;
                    this.loadForm();
                    this.spinner = false;
                });
        }
    }

    OnSubmit() {
        if (this.id.value == 0 || this.id.value == undefined) {
            this.srvComp.InsertComp(this.form.value)
                .subscribe(
                (res) => {
                    let compId = res.recordset[0].CompId;
                    let currUser = this.srvAuth.getUser();
                    currUser.cID = compId;
                    localStorage.setItem('currentUser', JSON.stringify(currUser));

                    this.srvUsr.UpdateCompUser(currUser.uID, currUser)
                        .subscribe(
                        () => {
                            this.router.navigateByUrl('/out/companySetup/departments', { relativeTo: this.route.parent, skipLocationChange: true });
                        },
                        (err) => {
                            console.log(err);
                        }
                        );
                },
                (err) => {
                    console.log(err);
                });
        }
        else {
            this.srvComp.UpdateComp(this.form.value)
                .subscribe(() => {
                    this.router.navigateByUrl('/out/companySetup/departments', { relativeTo: this.route.parent, skipLocationChange: true });
                },
                (err) => {
                    console.log(err);
                });
        }
    }
    //Save button event Ends

    get id() { return this.form.get('id'); }
    get compName() { return this.form.get('compName'); }
    get country() { return this.form.get('country'); }
    get city() { return this.form.get('city'); }
    get logo() { return this.form.get('logo'); }
    get comptype() { return this.form.get('comptype'); }
    get compaddress() { return this.form.get('compaddress'); }
    get phone() { return this.form.get('phone'); }
    get mobile() { return this.form.get('mobile'); }
    get website() { return this.form.get('website'); }
    get email() { return this.form.get('email'); }
    get fax() { return this.form.get('fax'); }
    get description() { return this.form.get('description'); }
    get workfield() { return this.form.get('workfield'); }
    get defaultlanguage() { return this.form.get('defaultlanguage'); }
    get disabled() { return this.form.get('disabled'); }
}
