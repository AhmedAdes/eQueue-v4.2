import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company, NodeUrl } from '../Models';
import { AuthenticationService } from './auth.service';

@Injectable()
export class CompanyService {

    url = NodeUrl + 'comp/';
    headers = new Headers({
        'Authorization': this.authService.token,
        'Salt': this.authService.salt
    });
    options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private authService: AuthenticationService) { }

    getComp(id?: number) {
        let geturl = this.url;
        if (id != null) {
            geturl = this.url + id;
        }
        return this.http.get(geturl, this.options).map(res => res.json());
    }
    getAllProviders() {
        return this.http.get(this.url + 'allProviders/all', this.options).map(res => res.json());
    }
   
    InsertComp(comp){
        return this.http.post(this.url,comp,this.options).map(res=>res.json());
    }
}
