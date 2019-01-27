
import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule,HomeRoutes,FormsModule, TranslateModule],
  declarations: [HomeComponent],
})
export class HomeModule {

}
