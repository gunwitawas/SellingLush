import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { OrderOnlineRoutes } from './order-online.routing';
import { OrderOnlineComponent } from './order-online.component';

@NgModule({
  imports: [CommonModule, OrderOnlineRoutes, TranslateModule],
  declarations: [OrderOnlineComponent],
})
export class OrderOnlineModule {}
