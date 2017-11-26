import { NgModule } from '@angular/core';

import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatCardModule
    ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class MaterialModule { }
