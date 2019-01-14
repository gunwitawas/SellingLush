import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {FormsModule} from "@angular/forms";
import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, HomeRoutes, TranslateModule,FormsModule],
  declarations: [HomeComponent],
})
export class HomeModule {

}
