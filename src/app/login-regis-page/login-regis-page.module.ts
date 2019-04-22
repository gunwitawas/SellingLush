
import { LoginRegisPageRoutes } from './login-regis-page.routing';
import { LoginRegisPageComponent } from './login-regis-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";

@NgModule({
  imports: [CommonModule,LoginRegisPageRoutes, TranslateModule,FormsModule,
    MaterialModule],
  declarations: [LoginRegisPageComponent],
})
export class LoginRegisPageModule {

}
