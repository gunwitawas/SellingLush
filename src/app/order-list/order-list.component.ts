import {Component, OnInit, Inject} from '@angular/core';

import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {OrderService} from "../all-service/node-service/Order.service";
import {DomSanitizer} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {SweetAlertOption as SwalOpt} from "@shared/constance/SweetAlertOption";

@Component({
  selector: 'app-transfer-back',
  templateUrl: './order-list.component.html',
  styleUrls: ['../../styles.scss']
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
  selectedOrder: any;
  orderList: any = [];
  header = [
    {name: "รายการที่รอการตรวจสอบการชำระเงิน", status: "W"},
    {name: "รายการที่รอมารับสินค้า", status: "Y"},
    {name: "รายการที่รับสินค้าแล้ว", status: "S"},
    {name: "รายการที่ถูกยกเลิก", status: "C"},
    {name: "รายการทั้งหมด", status: ""}
  ];
  isModalOpen = false;

  ngOnInit(): void {

  }

  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }
 totalExpandIndex = 0;
  async showDetail(i) {
    this.expandIndex = this.expandIndex == i ? 9999 : i;
    this.orderList[this.expandIndex].orderList.forEach(f=>{
      this.totalExpandIndex += (f.price*f.qty);
    })
  }

  async showReport(i) {
    this.selectedReport = i;
    if (i == 9) this.expandIndex = 9999;
    else if (this.header[i].status == 'O') {
    } else {
      let result: any = await this.service.getOrderDetailByStatus(this.header[i]);
      this.orderList = result.map(m => {
        let v = m;
        v.totalQty = 0;
        v.totalPrice = 0;
        m.orderList.map(n => {
          console.log(n);
          v.totalQty += n.qty
          v.totalPrice += n.price
        })
        return v;
      });
      console.log( this.orderList);
    }

  }

  async checkPaySlip(orderObj) {
    $("#paySlipDetail").modal();
    this.isModalOpen = true;
    this.selectedOrder = orderObj;
  }

  async updateStatus(orderId, status) {
    if (this.header[this.selectedReport].status != 'W') {
      this.isModalOpen = false;
    }
    Swal(SwalOpt.confirmUpdate).then(async (result: any) => {
      if (result.value) {
        let result: any = await this.service.updateOrderStatus({orderId: orderId, status: status});
        if (result.affectedRows == 1) {
          await this.alertSaveProductSuccess();
          this.showReport(this.selectedReport);
          this.expandIndex = 9999;
          if (this.isModalOpen) {
            $("#paySlipDetail").modal('toggle');
          }
        }
      }
    });
  }

  async alertSaveProductSuccess() {
    await Swal('สำเร็จ !', 'บันทึกการทำรายการเรียบร้อย', 'success');
  }

}
