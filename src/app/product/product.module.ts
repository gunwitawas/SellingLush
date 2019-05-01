import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from "@angular/forms";
import {ProductRoutes} from './product.routing';
import {ProductComponent} from './product.component';
import {APP_DATE_FORMATS, AppDateAdapter, MaterialModule} from "../material.module";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material";

@NgModule({
  imports: [CommonModule, ProductRoutes, TranslateModule, FormsModule, MaterialModule],
  declarations: [ProductComponent],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class ProductModule {
}
