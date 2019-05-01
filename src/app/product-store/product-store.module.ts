import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ProductStoreRoutes} from './product-store.routing';
import {ProductStoreComponent} from './product-store.component';
import {APP_DATE_FORMATS, AppDateAdapter, MaterialModule} from "../material.module";
import {FormsModule} from "@angular/forms";
import {DirectiveModule} from "@shared/directive/Directive.module";
import {DateAdapter, MAT_DATE_FORMATS, MatDatepickerModule} from "@angular/material";

@NgModule({
  imports: [CommonModule, FormsModule, ProductStoreRoutes, TranslateModule, MaterialModule, DirectiveModule],
  declarations: [ProductStoreComponent],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class ProductStoreModule {
}

