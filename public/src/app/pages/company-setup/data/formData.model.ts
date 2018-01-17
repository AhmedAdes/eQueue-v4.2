//Wizard form data class Starts
export class FormData {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    departments: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';

    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.departments = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
}
//Wizard form data class Ends

//Personal tab data class starts
export class Company {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
}
//Personal tab data class ends

//Address tab data class starts
export class Branches {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
}
//Address tab data class Ends