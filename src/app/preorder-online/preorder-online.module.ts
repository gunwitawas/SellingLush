import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PreorderOnlineRoutes } from './preorder-online.routing';
import { PreorderOnlineComponent } from './preorder-online.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, PreorderOnlineRoutes, TranslateModule, FormsModule, ReactiveFormsModule],
  declarations: [PreorderOnlineComponent],
})
export class PreorderOnlineModule { }
