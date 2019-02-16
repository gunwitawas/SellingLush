import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { OrderOnlineRoutes } from './order-online.routing';
import { OrderOnlineComponent } from './order-online.component';
import {FormsModule} from "@angular/forms";
import {DirectiveModule} from "@shared/directive/Directive.module";
import { OrderOnlineReportComponent } from './order-online-report/order-online-report.component';

@NgModule({
  imports: [CommonModule, OrderOnlineRoutes, TranslateModule,FormsModule,DirectiveModule],
  declarations: [OrderOnlineComponent, OrderOnlineReportComponent],
})
export class OrderOnlineModule {}
