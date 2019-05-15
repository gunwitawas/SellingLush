import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PreorderOnlineRoutes } from './preorder-online.routing';
import { PreorderOnlineComponent } from './preorder-online.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {APP_DATE_FORMATS, AppDateAdapter, MaterialModule} from 'app/material.module';
import { DirectiveModule } from '@shared/directive/Directive.module';
import {DateAdapter, MAT_DATE_FORMATS, MatAutocompleteModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PreorderOnlineRoutes,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DirectiveModule,
    MatAutocompleteModule,
  ],
  declarations: [PreorderOnlineComponent],
  providers:[{
    provide: DateAdapter, useClass: AppDateAdapter
  },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class PreorderOnlineModule { }
