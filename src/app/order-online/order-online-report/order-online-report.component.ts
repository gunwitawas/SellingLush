import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../all-service/node-service/Order.service";
import {ObjectUtil} from "@shared/utillity/ObjectUtil";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-online-report',
  templateUrl: './order-online-report.component.html',
  styleUrls: ['./order-online-report.component.scss']
})
export class OrderOnlineReportComponent implements OnInit,OnDestroy {

  constructor(private service: OrderService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }
sub = new Subject();
  saveFormDetail: any={
    cartList:[{
      p_id:0
    }]
  };

  flag = {
    isEdit: true
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
    });

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
