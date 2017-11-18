import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User, NodeUrl } from '../Models';
import { AuthenticationService } from './auth.service';

@Injectable()
export class TicketService {

    url = NodeUrl + 'ticket/';
    headers = new Headers({
        'Authorization': this.authService.token,
        'Salt': this.authService.salt
    });
    options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private authService: AuthenticationService) { }

    issueTicket(){

    }
    getActiveTickets(){

    }
}