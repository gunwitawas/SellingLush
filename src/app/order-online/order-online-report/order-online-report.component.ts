import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../all-service/node-service/Order.service";
import {ObjectUtil} from "@shared/utillity/ObjectUtil";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {DomSanitizer} from "@angular/platform-browser";
import {OrderListInterface} from "./OrderList.interface";
import {Validate} from "@shared/utillity/Validate";
import {AppStorage} from "@shared/for-storage/universal.inject";
import Swal from "sweetalert2";
import {SweetAlertOption as SwalOpt} from "@shared/constance/SweetAlertOption";

@Component({
  selector: 'app-order-online-report',
  templateUrl: './order-online-report.component.html',
  styleUrls: ['./order-online-report.component.scss']
})
export class OrderOnlineReportComponent extends Validate implements OnInit {

  constructor(private service: OrderService,
              private _sanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              @Inject(AppStorage) private appStorage: Storage) {
    super();
  }

  uploadImg: any = "../../assets/icon/upload.png";
  currentOrder: OrderListInterface;
  flag = {
    isEdit: false,
    isSelectedOrder: false
  }
  expandIndex = 9999;
  orderList: any = [];

  async ngOnInit() {
    let result = await this.service.clearOrderOverdue({});
    this.activatedRoute.params.subscribe(async params => {
      if (params.order_id) {
        await this.setOrderDetail(params);
      }
    });
    await this.initMainDetail();
  }

  async updateOrderStatus(orderId) {
    Swal(SwalOpt.confirmUpdate).then(async (result: any) => {
      if (result.value) {

        let result: any = await this.service.updateOrderStatus({status: 'C', orderId: orderId});
        if (result.affectedRows == 1) {
          this.alertSuccess();
          this.ngOnInit();
        } else {
          this.alertError();
        }
      }
    });

    let result: any = await this.service.updateOrderStatus({status: 'C', orderId: orderId});
    if (result) {

    }
  }

  async showDetail(i) {
    this.expandIndex = this.expandIndex == i ? 9999 : i;
  }

  async showAllOrder() {
    this.flag.isSelectedOrder = false;
    await this.initMainDetail();
  }

  async confirmOrder() {
    let result: any = await this.service.comfirmPayment(this.currentOrder);
    if (result.result) {
      this.flag.isEdit = true;

      await this.alertSuccess();
    } else {
      await this.alertError();
    }
  }

  async initMainDetail() {
    this.expandIndex = 9999;
    this.uploadImg = "../../assets/icon/upload.png";
    let result = await this.service.getOrderDetailByUsernameService({
      username: this.appStorage.getItem("username")
    });
    this.orderList = result;
    console.log(this.orderList);
  }

  async setOrderDetail(params) {
    let result: any = await this.service.getOrderDetailByID({order_id: params.order_id});
    this.currentOrder = result;
    if (this.currentOrder.orderDetail.pay_img) {
      this.flag.isEdit = true;
      this.uploadImg = this.getImgPath(this.currentOrder.orderDetail.pay_img);
    } else {
      this.flag.isEdit = false;
    }
    this.currentOrder.orderDetail.totalQty = _.sumBy(result.orderList,
      (o: any) => {
        return o.qty;
      });
    this.flag.isSelectedOrder = true;
  }

  uploadFile(event) {
    let files = event.target.files;
    if (files.length > 0) {
      console.log(files); // You will see the file
      this.getBase64(files[0]);
    }
  }

  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.uploadImg = reader.result;
      this.currentOrder.orderDetail.pay_img = this.uploadImg;
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  async alertError() {
    await Swal('เกิดข้อผิดพลาด !', 'ทำรายการไม่สำเร็จ', 'error');
  }

  async alertSuccess() {
    await Swal('สำเร็จ !', 'บันทึกการทำรายการเรียบร้อย', 'success');
  }

}
