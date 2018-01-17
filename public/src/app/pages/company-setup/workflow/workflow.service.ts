import { Injectable } from '@angular/core';
import { STEPS } from './workflow.model';

@Injectable()
export class WorkflowService {
    private workflow = [
        { step: STEPS.companies, count: 0, valid: false },
        { step: STEPS.departments, count: 0, valid: false },
        { step: STEPS.branches, count: 0, valid: false },
        { step: STEPS.users, count: 0, valid: false },
        { step: STEPS.conclusion, count: 0, valid: false }
    ];


    validateLoginSteps(steps: any) {
        this.workflow[0].count = steps.Comp;
        this.workflow[1].count = steps.Dept;
        this.workflow[2].count = steps.Brnch;
        this.workflow[3].count = steps.Usrs;
    }
    getLoginFirstInvalidStep(steps: any) {
        let step = null;
        let found = false;
        this.validateLoginSteps(steps);
        for (var i = 0; i < this.workflow.length - 1 && !found; i++) {
            if (this.workflow[i].count == 0) {
                step = this.workflow[i].step;
                found = true;
            }
        }
        return step;
    }

    validateStep(step: string) {
        // If the state is found, set the valid field to true 
        var found = false;
        for (var i = 0; i < this.workflow.length && !found; i++) {
            if (this.workflow[i].step === step) {
                found = this.workflow[i].valid = true;
            }
        }
    }

    resetSteps() {
        // Reset all the steps in the Workflow to be invalid
        this.workflow.forEach(element => {
            element.valid = false;
        });
    }

    getFirstInvalidStep(step: string): string {
        // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.workflow.length && !found && valid; i++) {
            let item = this.workflow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step
            }
        }
        return redirectToStep;
    }
}