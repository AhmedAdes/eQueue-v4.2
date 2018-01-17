import { Component, OnInit, Input } from '@angular/core';

import { FormData } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { Router } from '@angular/router';

@Component({
    selector: 'mt-wizard-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {
    title = 'Thank You!';
    @Input() formData: FormData;
    isFormValid: boolean = false;

    constructor(private formDataService: FormDataService, private router: Router) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();

    }

    //Submit button event Starts
    start() {
        this.router.navigate([`home/dashboard`]);
    }
    //Submit button event Ends
}
