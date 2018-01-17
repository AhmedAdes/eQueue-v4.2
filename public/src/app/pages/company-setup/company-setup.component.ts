import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'company-setup',
    templateUrl: './company-setup.component.html',
    styleUrls: ['./company-setup.component.scss']
})

export class CompanySetupComponent implements OnInit {
    constructor(private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        
    }

}