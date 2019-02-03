import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'app/all-service/node-service/ProductService.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { PreOrderService } from 'app/all-service/node-service/PreOrderService.service';

@Component({
  selector: 'app-transfer-back',
  templateUrl: './preorder-online.component.html',
})
export class PreorderOnlineComponent implements OnInit {
  constructor(
    private preorderService: PreOrderService,
    private productservice: ProductService,
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    @Inject(AppStorage) private storage: Storage,
  ) { }

  public preOrderForm: FormGroup = this.formBuilder.group({
    amount: ['', Validators.required],
  });
  public USERNAME: string;
  public showPage: string = 'preOrder';
  public allProduct: any;
  public selectProduct: any;
  public invalidAmont: boolean = false;
  public sumPrice: number;
  public sumNetpay: number = 0;
  public allProductInCart = new Array;

  ngOnInit(): void {
    this.USERNAME = this.getCurrentUsername();
    this.getAllProduct();

  }

  getCurrentUsername() {
    return this.storage.getItem('username');
  }

  public changePage(page) {
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
    if (response.content) {
      this.allProduct = response.content;
    } else {
      this.showPage = 'noStock';
    }
  }

  public getImgTobase64(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  public openModalAddTocart(product) {
    this.clearInputModal();
    this.selectProduct = [product];
    $('#addToCartModal').modal('show');
  }

  private clearInputModal() {
    this.sumPrice = null;
    this.preOrderForm.patchValue({ amount: "", });
    this.invalidAmont = false;
  }

  public checkDisableButtonOfAmount(price) {
    if (this.preOrderForm.value['amount'] && this.preOrderForm.value['amount'] >= 1) {
      this.invalidAmont = true;
      let amount = this.preOrderForm.value['amount'];
      this.checkSumPrice(amount, price)
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
      amount: this.preOrderForm.value['amount'],
      sumPrice: this.sumPrice,
    };

    let isNewproduct = !!this.allProductInCart.find(result => result.p_id == order.p_id && result.p_size == order.p_size);

    if (isNewproduct) {
      $('#addToCartModal').modal('hide');
      Swal('Already have this product in the cart', 'มีสินค้าชิ้นนี้ในรถเข็นแล้ว!', 'warning');
    } else {
      this.allProductInCart.push(order);
      this.calculateTotalPrice(order.sumPrice, 'plus');
      $('#addToCartModal').modal('hide');
      Swal('Added to cart!', 'เพิ่มไปยังรถเข็นแล้ว!', 'success');
    }


  }

  deleteProductInCart(product) {
    let index = this.allProductInCart.findIndex(result => result.p_id == product.p_id && result.p_size == product.p_size);
    this.allProductInCart.splice(index, 1);
    this.calculateTotalPrice(product.sumPrice, 'delete');
  }

  calculateTotalPrice(price, remark) {
    if (remark == 'delete') {
      this.sumNetpay = this.sumNetpay - price;
    } else if (remark = 'plus') {
      this.sumNetpay = this.sumNetpay + price;
    }
  }


  async confirmPreOrder() {
    // console.log(this.allProductInCart);
    let todayDate = this.getCurrentDate();

    let preOrderDetail: any = {
      username: this.USERNAME,
      pre_date: todayDate,
      payment_status: 'N',
      receive_status: 'N',
      receive_date: null,
      netpay: this.sumNetpay,
    }

    console.log("preOrderDetail", preOrderDetail );

    let result: any = await this.preorderService.insertPreOrderDetail(preOrderDetail);
    console.log("ASDasdasd", result);
    
    //ส่งไป preorder detail

    //select pre id ไป add preorder list
  }

  private getCurrentDate() {
    let todayDate = new Date();
    let currentDay = todayDate.getDate();
    let currentMonth = todayDate.getMonth() + 1; //Months are zero based
    let currentYear = todayDate.getFullYear();
    let currentDate = currentDay + "/" + currentMonth + "/" + currentYear;
    return currentDate;
  }
}
