import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule,BrowserModule, ReactiveFormsModule,HomeRoutes,FormsModule, TranslateModule],
  declarations: [HomeComponent],
})
export class HomeModule {

}
