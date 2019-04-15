import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CustomerRoutes } from './customer.routing';
import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material.module';
import { DirectiveModule } from '@shared/directive/Directive.module';
import { MatAutocompleteModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutes,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    DirectiveModule,
    MatAutocompleteModule
  ],
  declarations: [CustomerComponent],
})
export class CustomerModule { }

