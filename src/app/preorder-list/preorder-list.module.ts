import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PreorderListRoutes } from './preorder-list.routing';
import { PreorderListComponent } from './preorder-list.component';

@NgModule({
  imports: [CommonModule, PreorderListRoutes, TranslateModule],
  declarations: [PreorderListComponent],
})
export class PreorderListModule {}
