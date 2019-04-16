import { Component, OnInit, Inject } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { DomSanitizer } from '@angular/platform-browser';
import { PreOrderService } from 'app/all-service/node-service/PreOrderService.service';
import { AccountService } from 'app/all-service/node-service/Account.service';
import Swal from 'sweetalert2'
import * as moment from 'moment'
import { Validate } from "../shared/utillity/Validate";
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-transfer-back',
  templateUrl: './preorder-list.component.html',
})
export class PreorderListComponent implements OnInit {
  myControl = new FormControl();
  private orderListByID: Array<any>;
  private orderDetailByID: any;
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;
  public expandIndex = 9999;
  public selectedReport = 9;
  public preOrderDetail: any = [];
  public listOrder: Array<any>;
  public priceOforderList: number = 0;
  public userAccount: any;
  public searchOrderDetail: any = [];
  public isCheckSearchDate: boolean = true;
  public checkStartDate: any;
  public startDate: any;
  public checkEndDate: any;
  public endDate: any;
  public username: string;
  public status: string;
  public userList: string[];
  public sumPrice: number;
  public requestSearchOrderDetailbyDate: {
    username?: string,
    startDate?: string,
    endDate?: string,
  }

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

  async ngOnInit() {
    await this.preorderService.getPreOrderDetail().then((res: any) => {
      console.log(res.content.reverse());
      let mapUserList: string[] = res.content.map((res: any) => res.username);
      this.userList = mapUserList.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
    });

  }

  async showDetail(i) {
    this.expandIndex = this.expandIndex == i ? 9999 : i;
  }

  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  async showReport(i, address?) {
    this.username = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedReport = i;
    let response: any = await this.preorderService.getPreOrderDetail();
    if (response.content) {
      let preOrder: any = response.content;
      if (this.header[i].status === "") {
        if (address) {
          this.preOrderDetail = await preOrder.filter((result: any) => result.address && result.payment_status === 'Y');
          this.sumPrice = 0;
        } else {
          this.preOrderDetail = preOrder;
        }
      } else {
        this.preOrderDetail = await preOrder.filter((result: any) => result.payment_status === this.header[i].status);
        this.status = this.header[i].status;
        this.sumPrice = 0;
        await this.preOrderDetail.map((res) => this.sumPrice += Math.round(res.netpay));
      }
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
      });
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
      await this.preorderService.updatePaymentStatus(request).then((res: any) => {
        console.log(res);
        if (res.message === "Success" && res.result) {
          switch (remark) {
            case "Y":
              this.showReport(2);
              Swal('Success', 'บันทึกรายการชำระเงินเรียบร้อยแล้ว', 'success');
              break;
            case "N":
              this.showReport(3);
              Swal('Warning', 'ยกเลิกรายการยืนยันการชำระเงินแล้ว', 'warning');
              break;
            case "S":
              this.showReport(4);
              Swal('Success', 'ทำรายการสำเร็จ', 'success');
              break;
          }
        }
      })

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

  public async searchOrderDetailbyDate() {
    this.requestSearchOrderDetailbyDate = {
      startDate: this.startDate,
      endDate: this.endDate,
      username: this.username,
    };
    console.log(this.requestSearchOrderDetailbyDate);

    let preOrderDetail = await this.preorderService.checkPreOrderDate(this.requestSearchOrderDetailbyDate);
    if (this.status && this.status !== "") {
      this.preOrderDetail = preOrderDetail.filter((res: any) => res.payment_status === this.status);
      this.sumPrice = 0;
      await this.preOrderDetail.map((res) => this.sumPrice += Math.round(res.netpay));

    } else {
      this.preOrderDetail = preOrderDetail;
      this.sumPrice = 0;
      await this.preOrderDetail.map((res) => this.sumPrice += Math.round(res.netpay));
    }
  }

  checkInputStartDate(event: Date) {
    this.checkStartDate = Validate.getDateDiff(event);
    if (this.checkEndDate && this.checkStartDate > this.checkEndDate) {
      this.isCheckSearchDate = false;
      Swal('Warning', 'วันที่เริ่มต้นไม่สามารถมากกว่าวันที่สิ้นสุดได้', 'warning');
    } else {
      this.isCheckSearchDate = true;
      this.startDate = event.getDate() + '/' + (event.getMonth() + 1) + '/' + event.getFullYear();
    }



  }

  checkInputEndDate(event: Date) {
    this.checkEndDate = Validate.getDateDiff(event);
    if (this.checkStartDate && this.checkEndDate < this.checkStartDate) {
      this.isCheckSearchDate = false;
      Swal('Warning', 'วันที่สิ้นสุดไม่สามารถน้อยกว่าวันที่เริ่มต้นได้', 'warning');
    } else {
      this.isCheckSearchDate = true;
      this.endDate = event.getDate() + '/' + (event.getMonth() + 1) + '/' + event.getFullYear();
    }
  }

}
