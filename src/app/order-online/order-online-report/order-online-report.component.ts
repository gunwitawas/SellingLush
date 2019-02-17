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
    isEdit: true,
    isSelectedOrder: false
  }
expandIndex = 9999;
orderList:any = [];

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      if (params.order_id) {
        await this.setOrderDetail(params);
      }
    });
    await this.initMainDetail();
  }
  showDetail(i){
    this.expandIndex =  this.expandIndex==i ? 9999:i;

  }
  showAllOrder(){
    this.flag.isSelectedOrder = false;
    this.initMainDetail();
  }

 async confirmOrder(){
    let result:any = await this.service.comfirmPayment(this.currentOrder);
    if(result.result){
      await this.alertSuccess();
    }else{
      await this.alertError();
    }
  }

  async initMainDetail() {

    this.expandIndex = 9999;
    let result = await this.service.getOrderDetailByUsernameService({
      username: this.appStorage.getItem("username")
    });
    this.orderList = result;
    console.log(this.orderList);

  }

  async setOrderDetail(params) {
    let result: any = await this.service.getOrderDetailByID(params);
    this.currentOrder = result;
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
