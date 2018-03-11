import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company, NodeUrl } from '../Models';
import { AuthenticationService } from './auth.service';

@Injectable()

export class AudioService{

    url = NodeUrl + 'aud/';
    headers = new Headers({
        'Authorization': this.authService.token,
        'Salt': this.authService.salt
    });
    options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private authService: AuthenticationService) { }

    getAudId(id: string) {
        return this.http.get(this.url + 'audio/' + id, this.options);
    }
}