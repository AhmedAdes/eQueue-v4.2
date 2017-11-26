import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Department, NodeUrl } from '../Models';
import { AuthenticationService } from './auth.service';

@Injectable()
export class DeptServsService {

    url = NodeUrl + 'brnc/';
    headers = new Headers({
        'Authorization': this.authService.token,
        'Salt': this.authService.salt
    });
    options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private authService: AuthenticationService) { }

    getServs(id?: number) {
        let geturl = this.url;
        if (id != null) {
            geturl = this.url + id;
        }
        return this.http.get(geturl, this.options).map(res => res.json());
    }
    getDeptServss(deptId: number) {
        return this.http.get(this.url + 'DeptServs/' + deptId, this.options).map(res => res.json());
    }
    getBranchServss(brncId: number) {
        return this.http.get(this.url + 'BranchServs/' + brncId, this.options).map(res => res.json());
    }
}
