import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CustomerRoutes } from './customer.routing';
import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, CustomerRoutes, TranslateModule,ReactiveFormsModule,FormsModule],
  declarations: [CustomerComponent],
})
export class CustomerModule {}

