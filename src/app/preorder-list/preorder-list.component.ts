import { Component, OnInit, Inject } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { DomSanitizer } from '@angular/platform-browser';
import { PreOrderService } from 'app/all-service/node-service/PreOrderService.service';

@Component({
  selector: 'app-transfer-back',
  templateUrl: './preorder-list.component.html',
})
export class PreorderListComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;
  expandIndex = 9999;
  selectedReport = 9;
  preOrderDetail: any = [];
  header = [
    { name: "รายการทั้งหมด", status: "", icon: "fa fa-list" },
    { name: "รายการที่รอการตรวจสอบการชำระเงิน", status: "W", icon: "fa fa-spinner" },
    { name: "รายการที่ชำระเงินแล้ว", status: "Y", icon: "fa fa-external-link" },
    { name: "รายการที่ยังไม่ได้ชำระเงิน", status: "N", icon: "fa fa-window-close-o" },
    { name: "รายการที่ได้รับสินค้าแล้ว", status: "S", icon: "fa fa-check-square-o" },
  ];
  constructor(
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
    private _sanitizer: DomSanitizer,
    private preOrderService: PreOrderService,
  ) {
  }

  ngOnInit() {
    console.log("asd", this.header);

  }
  async showDetail(i) {
    this.expandIndex = this.expandIndex == i ? 9999 : i;
  }

  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  async showReport(i) {
    this.selectedReport = i;
    let response: any = await this.preOrderService.getPreOrderDetail();
    if (response.content) {
      let preOrder: any = response.content;
      if (this.header[i].status === "") {
        this.preOrderDetail = preOrder;
      } else {
        this.preOrderDetail = await preOrder.filter((result: any) => result.payment_status == this.header[i].status);
      }
      console.log("this.preOrderDetail", this.preOrderDetail);

    } else {

    }
  }
}                                       
