import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators , ReactiveFormsModule ,FormBuilder} from '@angular/forms';
import { Countries } from '../../Models/countries';
import { CompanyTypes ,WorkFields ,Languages, Company} from '../../Models';
import { CompanyService } from 'app/services/comp.service';



@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  countries = Countries; 
  compType = CompanyTypes;
  workfields = WorkFields;
  languages = Languages;
  comp : Company;
  compForm : FormGroup;

  constructor(private srvComp: CompanyService,fb : FormBuilder) { 

    this.compForm = fb.group({
      id : [0],
      compName :['',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      country: ['',Validators.required],
      city : ['',Validators.required],
      //logo: [],
      comptype:['',Validators.required],
      compaddress: [''],
      phone: [''],
      mobile: [''],
      website:[''],
      email:[''],
      fax :[''],
      description: [''],
      workfield:['',Validators.required],
      defaultlanguage: ['',Validators.required],
      disabled : ['']
    });  
  }
  
  ngOnInit() {
    console.log('Hello');
  }
  
  OnSubmit(){
    if(this.id.value == 0 || this.id.value ==undefined )
    {
      console.log(this.compForm.value);
      this.srvComp.InsertComp(this.compForm.value)
      .subscribe(
      res=>{
        console.log('Done');
      },
      err=>{
          console.log("Somthing wrong happened!");
        });
    }else
    {

    }
  }
  
  get id(){return this.compForm.get('id');}
  get compName(){return this.compForm.get('compName');}
  get country(){return this.compForm.get('country');}
  get city(){return this.compForm.get('city');}
  get logo(){return this.compForm.get('logo');}
  get comptype(){return this.compForm.get('comptype');}
  get compaddress(){return this.compForm.get('compaddress');}
  get phone(){return this.compForm.get('phone');}
  get mobile(){return this.compForm.get('mobile');}
  get website(){return this.compForm.get('website');}
  get email(){return this.compForm.get('email');}
  get fax(){return this.compForm.get('fax');}
  get description(){return this.compForm.get('description');}
  get workfield(){return this.compForm.get('workfield');}
  get defaultlanguage(){return this.compForm.get('defaultlanguage');}
  get disabled(){return this.compForm.get('disabled');}  

}
