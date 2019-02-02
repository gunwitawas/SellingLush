import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ProductStoreRoutes} from './product-store.routing';
import {ProductStoreComponent} from './product-store.component';
import {MaterialModule} from "../material.module";
import {FormsModule} from "@angular/forms";
import {DirectiveModule} from "@shared/directive/Directive.module";

@NgModule({
  imports: [CommonModule, FormsModule,ProductStoreRoutes, TranslateModule, MaterialModule,DirectiveModule],
  declarations: [ProductStoreComponent],
  providers: []
})
export class ProductStoreModule {
}

