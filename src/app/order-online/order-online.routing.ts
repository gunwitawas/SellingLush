import {OrderOnlineComponent} from './order-online.component';
import {OrderOnlineReportComponent} from './order-online-report/order-online-report.component';
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";

@NgModule({
  imports : [
    RouterModule.forChild([
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',component:OrderOnlineComponent},
      {path:'report',component:OrderOnlineReportComponent},
    ])
  ],
  exports:[RouterModule]
})
export class OrderOnlineRoutes {
  
}
