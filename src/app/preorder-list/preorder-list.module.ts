import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PreorderListRoutes } from './preorder-list.routing';
import { PreorderListComponent } from './preorder-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {APP_DATE_FORMATS, AppDateAdapter, MaterialModule} from 'app/material.module';
import { DirectiveModule } from '@shared/directive/Directive.module';
import {DateAdapter, MAT_DATE_FORMATS, MatAutocompleteModule} from '@angular/material';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PreorderListRoutes,
    TranslateModule,
    ReactiveFormsModule,
    MaterialModule,
    DirectiveModule,
    MatAutocompleteModule,
  ],
  declarations: [PreorderListComponent],
  providers:[{
    provide: DateAdapter, useClass: AppDateAdapter
  },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class PreorderListModule { }


