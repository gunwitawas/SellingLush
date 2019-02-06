import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { OrderOnlineRoutes } from './order-online.routing';
import { OrderOnlineComponent } from './order-online.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, OrderOnlineRoutes, TranslateModule,FormsModule],
  declarations: [OrderOnlineComponent],
})
export class OrderOnlineModule {}
