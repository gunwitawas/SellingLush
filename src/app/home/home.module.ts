
import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";

@NgModule({
  imports: [CommonModule,HomeRoutes, TranslateModule,FormsModule,
    MaterialModule],
  declarations: [HomeComponent],
})
export class HomeModule {

}
