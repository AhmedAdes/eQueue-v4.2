import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Countries } from '../../Models/countries';
import { CompanyTypes ,WorkFields ,Languages} from '../../Models';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  countries = Countries; 
  compType = CompanyTypes;
  workfields = WorkFields;
  languages = Languages;

  compForm = new FormGroup({
    id : new FormControl(),
    compName : new FormControl("",[
      Validators.required
    ]),
    country: new FormControl(),
    city : new FormControl(),
    logo: new FormControl (),
    comptype: new FormControl(),
    compaddress: new FormControl(),
    phone: new FormControl(),
    mobile: new FormControl(),
    website: new FormControl(),
    email: new FormControl(),
    fax : new FormControl(),
    description: new FormControl(),
    workfield: new FormControl(),
    defaultlanguage: new FormControl(),
    disabled : new FormControl()
  });



  
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
