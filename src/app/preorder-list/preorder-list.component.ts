import { Component, OnInit, Inject } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { DomSanitizer } from '@angular/platform-browser';
import { PreOrderService } from 'app/all-service/node-service/PreOrderService.service';
import { AccountService } from 'app/all-service/node-service/Account.service';

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
  private listOrder: Array<any>;
  private orderListByID: Array<any>
  private orderDetailByID: any;
  private priceOforderList: number = 0;
  private userAccount: any;

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
    private preorderService: PreOrderService,
    private accountService: AccountService
  ) {
  }

  ngOnInit() {
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
    let response: any = await this.preorderService.getPreOrderDetail();
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

  public async showOrderByPreId(preId: any, remark?: string) {
    this.listOrder = [];
    let OrderDetail: any = await this.preorderService.getPreOrderDetail();
    if (OrderDetail.content) {
      this.orderDetailByID = await OrderDetail.content.filter((result: any) => result.pre_id == preId);
    }
    this.userAccount = await this.accountService.getUserAccount(this.orderDetailByID[0].username);

    let OrderList: any = await this.preorderService.getPreOrderList();
    if (OrderList.content) {
      this.orderListByID = await OrderList.content.filter((result: any) => result.pre_id == preId);
      this.priceOforderList = 0;

      this.orderListByID.map(async (obj, index) => {
        this.priceOforderList += (obj.price * obj.qty);
      })
      if (remark !== 'hide') {
        $('#listOrder').modal('show');
      }
    }
  }

  private getImgTobase64(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  public async checkConfirmPatment(pre_id: string, remark: string) {
    try {
      let request = {
        pre_id: pre_id,
        payment_status: remark
      }
      let result = await this.preorderService.updatePaymentStatus(request);
    } catch (error) {
      console.log("error", error);
    }
  }

  public async printBillpreOrder() {

    const printContent = document.getElementById("billPreOrder");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
    
  }

}                                       
