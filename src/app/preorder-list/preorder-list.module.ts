import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PreorderListRoutes } from './preorder-list.routing';
import { PreorderListComponent } from './preorder-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MaterialModule } from 'app/material.module';
import { DirectiveModule } from '@shared/directive/Directive.module';
@NgModule({
  imports: [FormsModule,CommonModule, PreorderListRoutes, TranslateModule,ReactiveFormsModule, MaterialModule, DirectiveModule],
  declarations: [PreorderListComponent],
})
export class PreorderListModule {}


