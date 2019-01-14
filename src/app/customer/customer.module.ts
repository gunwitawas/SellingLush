import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CustomerRoutes } from './customer.routing';
import { CustomerComponent } from './customer.component';

@NgModule({
  imports: [CommonModule, CustomerRoutes, TranslateModule],
  declarations: [CustomerComponent],
})
export class CustomerModule {}

