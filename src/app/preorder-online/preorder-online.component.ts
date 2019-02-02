import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'app/all-service/node-service/ProductService.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-back',
  templateUrl: './preorder-online.component.html',
})
export class PreorderOnlineComponent implements OnInit {
  constructor(
    
    private productservice: ProductService,
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    @Inject(AppStorage) private storage: Storage,
  ) { }
  
  public preOrderDetail: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    pre_date: ['', Validators.required],
    payment_status: ['', Validators.required],
    receive_status: ['', Validators.required],
    receive_date: ['', Validators.required],
    netpay: ['', Validators.required],
    amount: ['', Validators.required],
  });
  public USERNAME: string;
  public showPage: string = 'preOrder';
  public allProduct: any;
  public selectProduct: any;

  ngOnInit(): void {
    this.USERNAME = this.getCurrentUsername();
    this.getAllProduct();
  }

  getCurrentUsername(){
    return this.storage.getItem('username');
   }

  public changePage(page) {
    console.log("showpage : ", page);
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
      console.log("response.content", response.content);
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
    console.log("product",[product]);
    this.selectProduct = [product];
  $('#addToCartModal').modal('show');
  }

  addTocart() {
    // set to service? isArray to table PreOrder-list&Detail
    // [preId เลขบิล auto ,name , nowdate เวลานี้, paymmentStatus "N", receiveStatus "N", receiveDate inputdateตอนรวมหน้าตะกร้า, sumPrice รวมหน้าตะกร้า]
    // [	pre_idเอาไอดีจากการ select name&paymentStatus,	p_idไอดีีจากการกดสั่งแต่ละที,	qty จำนวนแต่ละอัน]   
//ค่อยต่อ
  }

}
