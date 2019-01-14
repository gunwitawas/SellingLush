import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { OrderListRoutes } from './order-list.routing';
import { OrderListComponent } from './order-list.component';

@NgModule({
  imports: [CommonModule, OrderListRoutes, TranslateModule],
  declarations: [OrderListComponent],
})
export class OrderListModule {}
