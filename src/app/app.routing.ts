import {Routes, RouterModule} from '@angular/router';
import {MetaGuard} from '@ngx-meta/core';

import {WrapperComponent} from '@shared/layouts/wrapper/wrapper.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'product', loadChildren: './product/product.module#ProductModule'},
      {path: 'product-store', loadChildren: './product-store/product-store.module#ProductStoreModule'},
      {path: 'order-online', loadChildren: './order-online/order-online.module#OrderOnlineModule'},
      {path: 'order-list', loadChildren: './order-list/order-list.module#OrderListModule'},
      {path: 'preorder-online', loadChildren: './preorder-online/preorder-online.module#PreorderOnlineModule'},
      {path: 'preorder-list', loadChildren: './preorder-list/preorder-list.module#PreorderListModule'},
      {path: 'customer', loadChildren: './customer/customer.module#CustomerModule'},
      {path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfileModule'},
      {path: 'product-guest', loadChildren: './product-guest/product-guest.module#ProductGuestModule'},
      {path: 'login-regis-page', loadChildren: './login-regis-page/login-regis-page.module#LoginRegisPageModule'},
      {path: 'report', loadChildren: './report-list/report-list.module#ReportListModule'},
      {path: '**', loadChildren: './not-found/not-found.module#NotFoundModule'}
    ],
  },
];
// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, {initialNavigation: 'enabled'});
