import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'app/all-service/node-service/ProductService.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { PreOrderService } from 'app/all-service/node-service/PreOrderService.service';
import { Validate } from "../shared/utillity/Validate";
import { ImagePath } from "../shared/constance/ImagePath";
import { AccountService } from 'app/all-service/node-service/Account.service';

@Component({
  selector: 'app-transfer-back',
  templateUrl: './preorder-online.component.html',
  styleUrls: ['./preorder-online.component.css']
})
export class PreorderOnlineComponent implements OnInit {
  constructor(
    private preorderService: PreOrderService,
    private productservice: ProductService,
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    @Inject(AppStorage) private storage: Storage,
    private accountService: AccountService
  ) { }


  private amount: number;

  private USERNAME: string;
  private showPage: string = 'preOrder';
  private allProduct: any;
  private selectProduct: any;
  private invalidAmont: boolean = false;
  private sumPrice: number;
  private sumNetpay: number = 0;
  private sumAmount: number = 0;
  private priceOforderList: number = 0;
  private allProductInCart = new Array;
  private listOrder: Array<any>;
  private listPreOrder: Array<any>;
  private orderListByID: Array<any>
  private checkPaymentStatus: any;
  private isMoreThanDate: boolean;
  private isMoreThanMonth: boolean;
  private isPreorderDate: boolean;
  private isUpDateForPayment: boolean;
  private selectedDate = new Date();
  private uploadImg: any;
  private orderDetailByID: any;
  private userAccount: any;
  private province: string;
  private address: string;
  private checkAddress: boolean = false;
  delivery: string;

  private provinceList = ['สุพรรณบุรี', 'นครปฐม', 'กาญจนบุรี', 'อ่างทอง', 'ชัยนาท'];
  private preOrderList: {
    pre_id: string,
    p_id: string,
    qty: number
  };
  private preOrderDetail: {
    username: string,
    pre_date: string,
    payment_status: string,
    receive_status: string,
    receive_date: string,
    netpay: number,
    address: string,
    delivery: string
  }
  private receiveDateForm = {
    selectedDate: new Date()
  };
  private upDateForPayment: {
    pre_id: string,
    username: string,
    pre_date: string,
    payment_status: string,
    receive_status: string,
    receive_date: string,
    netpay: string,
    pay_img: any,
  }

  private imagePath = new ImagePath();
  private slipPayment = this.imagePath.slipPayment;
  ngOnInit(): void {
    this.getDataStartPage();
  }

  private getDataStartPage() {
    this.USERNAME = this.getCurrentUsername();
    this.getListPreOrderDetail();
    this.getAllProduct();
  }

  getCurrentUsername() {
    return this.storage.getItem('username');
  }

  private changePage(page) {
    this.showPage = page;
    if (this.showPage === 'preOrder') {
      this.getAllProduct();
    } else if (this.showPage === 'preStatus') {
      //something
    } else if (this.showPage === 'noStock') {
      //something
    }
  }

  private async getAllProduct() {
    let response: any = await this.productservice.getProduct();
    console.log(response);

    if (response.content) {
      this.allProduct = response.content;
      this.showPage = 'preOrder';
    } else {
      this.showPage = 'noStock';
    }
  }

  private async getListPreOrderDetail() {
    let response: any = await this.preorderService.getPreOrderDetail();
    if (response.content) {
      let preOrder: any = response.content;
      this.listPreOrder = await preOrder.filter((result: any) => result.username == this.USERNAME);
      await this.checkOrderStatus();
    } else {
      this.showPage = 'noStock';
    }
  }

  private async checkOrderStatus() {
    let paymentStatus = 'N';
    let OrderStatus_NO = await this.listPreOrder.filter((result: any) => result.payment_status == paymentStatus);
    if (OrderStatus_NO.length > 0) {
      this.checkPaymentStatus = "NO";
      this.showPage = 'preStatus';
    } else {
      paymentStatus = 'W';
      let OrderStatus_Wait = await this.listPreOrder.filter((result: any) => result.payment_status == paymentStatus);
      if (OrderStatus_Wait.length > 0) {
        this.checkPaymentStatus = "WAIT";
        this.showPage = 'preStatus';
      }
    }



  }

  private openModalAddTocart(product) {
    if (this.checkPaymentStatus == "NO") {
      Swal('Warning', 'ตรวจสอบรายการค้างชำระของคุณ', 'warning');
      this.showPage = 'preStatus';
    } else if (this.checkPaymentStatus == "WAIT") {
      Swal('Warning', 'กำลังตรวจสอบสถานะการชำระเงิน', 'warning');
      this.showPage = 'preStatus';
    } else {
      this.clearInputModal();
      this.selectProduct = [product];
      $('#addToCartModal').modal('show');
    }
  }

  private clearInputModal() {
    this.sumPrice = null;
    this.amount = null;
    this.invalidAmont = false;
  }

  private checkDisableButtonOfAmount(price) {
    if (this.amount && this.amount >= 1) {
      this.invalidAmont = true;
      this.checkSumPrice(this.amount, price)
    } else {
      this.invalidAmont = false;
      this.checkSumPrice()
    }
  }

  private checkSumPrice(amount = null, price = null) {
    this.sumPrice = amount * price;
  }

  public addTocart(product) {

    let order = {
      p_id: product.p_id,
      p_name: product.p_name,
      p_size: product.p_size,
      mixer: product.mixer,
      p_img: product.p_img,
      amount: this.amount,
      sumPrice: this.sumPrice,
    };
    console.log(order.amount);

    let isNewproduct = !!this.allProductInCart.find(result => result.p_id == order.p_id && result.p_size == order.p_size);

    if (isNewproduct) {
      $('#addToCartModal').modal('hide');
      Swal('Already have this product in the cart', 'มีสินค้าชิ้นนี้ในรถเข็นแล้ว!', 'warning');
    } else {
      this.allProductInCart.push(order);
      this.calculateTotalPrice(order.sumPrice, 'plus');
      this.calculateTotalamount(order.amount, 'plus');
      $('#addToCartModal').modal('hide');
      Swal('Added to cart!', 'เพิ่มไปยังรถเข็นแล้ว!', 'success');
    }


  }

  deleteProductInCart(index) {
    this.calculateTotalPrice(this.allProductInCart[index].sumPrice, 'delete');
    this.calculateTotalamount(this.allProductInCart[index].amount, 'delete');
    this.allProductInCart.splice(index, 1);
  }

  calculateTotalamount(amount, remark) {
    if (remark === 'delete') {
      this.sumAmount = this.sumAmount - +amount;
    } else if (remark = 'plus') {
      this.sumAmount = this.sumAmount + +amount;
    }
  }

  calculateTotalPrice(price, remark) {
    if (remark === 'delete') {
      this.sumNetpay = this.sumNetpay - price;
    } else if (remark = 'plus') {
      this.sumNetpay = this.sumNetpay + price;
    }
  }


  async confirmPreOrder() {
    if (this.checkAddress) {
      console.log(this.address + '' + this.province);
      if (this.address && this.province) {
        await this.insertToPreOrder_Detail();
      } else {
        Swal('Warning', 'กรุณากรอกที่อยู่ในการจัดส่งให้ครบ หรือปิดปุ่มบริการจัดส่งสินค้า!', 'warning');
      }
    } else {
      await this.insertToPreOrder_Detail();
    }
  }

  public clickCheckAddress() {
    this.checkAddress = this.checkAddress ? true : false;
    console.log(this.checkAddress);

  }

  private async insertToPreOrder_Detail() {
    this.preOrderDetail = {
      username: this.USERNAME,
      pre_date: this.getCurrentDate(),
      payment_status: 'N',
      receive_status: 'N',
      receive_date: this.tranformDate(),
      netpay: this.sumNetpay,
      address: this.address ? this.address + ' : ' + this.province : '',
      delivery : this.sumAmount > 10 ? 'N' : 'Y'
    };
    console.log(this.preOrderDetail);

    await this.preorderService.insertPreOrderDetail(this.preOrderDetail).then(async (response: any) => {
      console.log(response);
      if (response.pre_id && response['message'] === 'Success') {
        await this.insertToPreOrder_List(response);
        $('#cartModal').modal('hide');
        Swal('Confirm the order is successful!', 'ยืนยันการสั่งซื้อสำเร็จ!', 'success');
        this.clearProductinCart();
        this.getDataStartPage();
      }
      else {
        $('#cartModal').modal('hide');
        Swal('Warning', 'ไม่สามารถทำรายการนี้ได้!', 'warning');
      }
    });

  }

  private tranformDate() {
    const date = this.selectedDate.getDate();
    const month = this.selectedDate.getMonth() + 1;
    const year = this.selectedDate.getFullYear();
    let receiveDate: string = date + "/" + month + "/" + year;
    return receiveDate;
  }

  private clearProductinCart() {
    this.allProductInCart = [];
    this.showPage = 'preStatus';
  }

  private async insertToPreOrder_List(response: any) {
    try {
      let preID: string = response.pre_id;
      for (let i = 0; i < this.allProductInCart.length; i++) {
        this.preOrderList = {
          pre_id: preID,
          p_id: this.allProductInCart[i].p_id,
          qty: this.allProductInCart[i].amount
        };
        await this.preorderService.insertPreOrderList(this.preOrderList);
      }
    } catch (error) {
      Swal('Error', error, 'error');
    }

  }

  getDiffDate(date){
    return Validate.getDateDiff(date);

  }
  private getCurrentDate() {
    let todayDate = new Date();
    let currentDay = todayDate.getDate();
    let currentMonth = todayDate.getMonth() + 1; //Months are zero based
    let currentYear = todayDate.getFullYear();
    let currentDate = currentDay + "/" + currentMonth + "/" + currentYear;
    return currentDate;
  }

  private checkPreorderDate(event: Date) {
    let sumdayDate = Validate.getDateDiff(event);
    this.isMoreThanDate = sumdayDate >= 2;
    this.isMoreThanMonth = sumdayDate <= 30;
    this.isPreorderDate = this.isMoreThanDate && this.isMoreThanMonth;
    if (!this.isPreorderDate) {
      Swal('Warning', 'กรุณาสั่งของล่วงหน้าอย่างน้อย 2 วัน และ ไม่เกิน 30 วัน!', 'warning');
    }
  }

  private async showOrderByPreId(preId: any, remark?: string) {
    this.listOrder = [];
    this.listOrder = [];
    let OrderDetail: any = await this.preorderService.getPreOrderDetail();
    if (OrderDetail.content) {
      this.orderDetailByID = await OrderDetail.content.filter((result: any) => result.pre_id == preId);
    }
    console.log(this.orderDetailByID[0].delivery);
    this.delivery = this.orderDetailByID[0].delivery;
    this.userAccount = await this.accountService.getUserAccount(this.orderDetailByID[0].username);


    let OrderList: any = await this.preorderService.getPreOrderList();
    if (OrderList.content) {
      this.orderListByID = await OrderList.content.filter((result: any) => result.pre_id == preId);
      this.priceOforderList = 0;

      this.orderListByID.map(async (obj, index) => {
        this.priceOforderList += +(obj.price * obj.qty);

      })
      console.log(this.priceOforderList);
      console.log(this.delivery);


      if (remark !== 'hide') {
        $('#listOrder').modal('show');
      }
    }
  }

  public openModalUplpadPayMent(item) {
    $('#uploadPayment').modal('show');
    this.showOrderByPreId(item.pre_id, 'hide');
    console.log("item", item);
    this.isUpDateForPayment = true;
    this.upDateForPayment = {
      pre_id: item.pre_id,
      username: item.username,
      pre_date: item.pre_date,
      payment_status: item.payment_status,
      receive_status: item.receive_status,
      receive_date: item.receive_date,
      netpay: item.netpay,
      pay_img: (item.pay_img ? this.getImgTobase64(item.pay_img) : this.slipPayment)
    }
  }

  private async uploadPayment() {
    this.upDateForPayment.payment_status = "W";
    await this.preorderService.uploadImagePayment(this.upDateForPayment).then((result: any) => {
      console.log("uploadPayment", result);
      if (result && result.message === "Success") {
        Swal('Upload successful!', 'ทำการอัพโหลดหลักฐานการโอนเงินสำเร็จแล้ว!', 'success');
        this.getDataStartPage();
        $('#uploadPayment').modal('hide');
      } else {
        Swal('Error', 'กรุณาตรวจสอบไฟล์รูปภาพของคุณ!', 'error');
      }

    })

  }


  private uploadFile(event) {
    let files = event.target.files;
    if (files.length > 0) {
      this.updateFileImageToBase64(files[0]);
    }
  }

  private updateFileImageToBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.upDateForPayment.pay_img = reader.result;
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  private getImgTobase64(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  private printBillpreOrder() {
    const printContent = document.getElementById("billPreOrder");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}


