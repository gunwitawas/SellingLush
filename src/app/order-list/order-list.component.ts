import {Component, OnInit, Inject} from '@angular/core';

import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {OrderService} from "../all-service/node-service/Order.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-transfer-back',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    private service: OrderService,
    private _sanitizer: DomSanitizer,
    @Inject(AppStorage) private appStorage: Storage
  ) {

  }
  expandIndex = 9999;
  selectedReport = 9;
  orderList:any=[];
  header = [
    {name: "รายการที่รอการตรวจสอบการชำระเงิน", status: "W"},
    {name: "รายการที่รอมารับสินค้า", status: "Y"},
    {name: "รายการที่สั่งล่าสุด", status: "O"},
    {name: "รายการที่ถูกยกเลิก", status: "C"},
    {name: "รายการทั้งหมด", status: ""}
  ];

  ngOnInit(): void {

  }

  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }
  async showDetail(i) {
    this.expandIndex = this.expandIndex == i ? 9999 : i;
  }

 async showReport(i) {
    this.selectedReport = i;
    if(i==9) this.expandIndex = 9999;
    else if (this.header[i].status == 'O') {

    } else {
      let result = await  this.service.getOrderDetailByStatus(this.header[i]);
      this.orderList = result;
    }

  }
}
