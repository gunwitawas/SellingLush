import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductStoreRoutes } from './product-store.routing';
import { ProductStoreComponent } from './product-store.component';


@NgModule({
  imports: [CommonModule, ProductStoreRoutes, TranslateModule],
  declarations: [ProductStoreComponent],
  providers: [
  ]
})
export class ProductStoreModule {}

