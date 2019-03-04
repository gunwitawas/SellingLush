import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TransferBackRoutes } from './user-profile.routing';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [CommonModule, TransferBackRoutes, TranslateModule],
  declarations: [UserProfileComponent],
})
export class UserProfileModule {}
