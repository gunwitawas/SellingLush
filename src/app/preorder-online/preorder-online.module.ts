import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PreorderOnlineRoutes } from './preorder-online.routing';
import { PreorderOnlineComponent } from './preorder-online.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material.module';
import { DirectiveModule } from '@shared/directive/Directive.module';
import { MatAutocompleteModule } from '@angular/material';

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
})
export class PreorderOnlineModule { }
