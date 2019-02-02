import {OnlyNumberDirective} from "./OnlyNumber.directive";
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  declarations: [OnlyNumberDirective],
  exports:[OnlyNumberDirective]
})
export class DirectiveModule {

}
