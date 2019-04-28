import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from "@angular/forms";
import {ProductRoutes} from './product.routing';
import {ProductComponent} from './product.component';
import {MaterialModule} from "../material.module";

@NgModule({
  imports: [CommonModule, ProductRoutes, TranslateModule, FormsModule,MaterialModule],
  declarations: [ProductComponent],
})
export class ProductModule {
}
