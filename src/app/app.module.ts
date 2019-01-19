// angular
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// libs
import { CookieService } from 'ngx-cookie-service';
import { TransferHttpCacheModule } from '@nguniversal/common';
// shared
import { SharedModule } from '@shared/shared.module';
import { TranslatesService } from '@shared/translates';
// components
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import {UniversalStorage} from "@shared/for-storage/server.storage";

export function initLanguage(translateService: TranslatesService): Function {
  return (): Promise<any> => translateService.initLanguage();
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    TransferHttpCacheModule,
    HttpClientModule,
    RouterModule,
    AppRoutes,FormsModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [AppComponent],
  providers: [
    UniversalStorage,
    CookieService,
    { provide: APP_INITIALIZER, useFactory: initLanguage, multi: true, deps: [TranslatesService] },
  ],
})
export class AppModule {}
