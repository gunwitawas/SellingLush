import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { OrderListRoutes } from './report-list.routing';
import { ReportListComponent } from './report-list.component';
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material";
import {APP_DATE_FORMATS, AppDateAdapter, MaterialModule} from "../material.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule,FormsModule, OrderListRoutes, TranslateModule,MaterialModule],
  declarations: [ReportListComponent],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class ReportListModule {}
