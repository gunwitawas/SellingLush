import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from "@angular/forms";
import {ProductGuestRoutes} from './product-guest.routing';
import {ProductGuestComponent} from './product-guest.component';

@NgModule({
  imports: [CommonModule, ProductGuestRoutes, TranslateModule, FormsModule],
  declarations: [ProductGuestComponent],
})
export class ProductGuestModule {
}
