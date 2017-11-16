import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services'

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f') loginForm: NgForm;
    error = '';

    constructor(private router: Router,
        private route: ActivatedRoute, private srvAuth: AuthenticationService) { }

    // On submit button click
    onSubmit() {
        const newuser = {
            LoginName: this.loginForm.controls['inputEmail'].value,
            UserPass: this.loginForm.controls['inputPass'].value
        };
        this.srvAuth.login(newuser).subscribe(result => {
            if (result.login === true) {
                this.router.navigate(['full-layout']);
            } else {
                this.error = result.error;
            }
        })
        // this.loginForm.reset();
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
