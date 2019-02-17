import {Component, OnInit, Inject} from '@angular/core';
import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {OrderService} from "../all-service/node-service/Order.service";
import {Utils} from "@shared/utillity/Utils";
import {ObjectUtil} from "@shared/utillity/ObjectUtil";
import {DomSanitizer} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transfer-back',
  templateUrl: './order-online.component.html',
  styleUrls:['../../styles.scss']
})
export class OrderOnlineComponent implements OnInit {
  constructor(
    private http: TransferHttpService,
    private service: OrderService,
    private httpClient: HttpClient,
    private _sanitizer: DomSanitizer,
    private router: Router,
    @Inject(AppStorage) private appStorage: Storage
  ) {
  }

  flag = {
    isSearch : false
  }
  searchForm: any = {
    "p_id": "",
    "p_name": "",
    "p_size": "",
    "minPrice": "",
    "maxPrice": "",
    "mixer": ""
  };
  productStoreList: any = [];
  saveForm: any = {
    totalPrice: 0,
    totalQty: 0,
    cartList: []
  };
  cartList: any = [];
  selectedProduct: any = {
    selectedNum: 0
  };

  async ngOnInit() {
    await this.getCurrentProductStore();
  }

  async getCurrentProductStore() {
    let result: any = await this.service.getProductStore({});
    if (result.result) {
      this.productStoreList = result.content;
    }
  }

  async search() {

    let result: any = await this.service.searchProductStore(this.searchForm);
    if(result.result){
      this.productStoreList = result.content;
    }else{
      this.productStoreList = [];
    }
  }

  getImgPath(base64str) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  openModalCart(i) {
    if (this.isNotDuplicateProduct(i)) {
      $("#addProductModal").modal();
      let obj = ObjectUtil.jsonClone(this.productStoreList[i]);
      obj.selectedNum = 0;
      this.selectedProduct = ObjectUtil.jsonClone(obj);
    } else {
      this.alertDuplicateProductId();
    }
  }

  addToCart(i) {
    this.alertSaveProductSuccess();
    this.saveForm.cartList.push(ObjectUtil.jsonClone(this.selectedProduct));
    $("#addProductModal").modal('toggle');
  }

  isNotDuplicateProduct(i) {
    return this.saveForm.cartList.filter(f => f.p_id == this.productStoreList[i].p_id).length < 1;
  }

  setTotalPrice() {
    this.saveForm.totalPrice = 0;
    this.saveForm.totalQty = 0;
    this.saveForm.cartList.map(m => {
      console.log(m);
      this.saveForm.totalPrice += Number(m.price)
      this.saveForm.totalQty += Number(m.selectedNum)
    })
  }

  removeSelected(i) {
    this.saveForm.cartList.splice(i, 1);
    this.setTotalPrice();
  }

  async billing() {
    try {
      let result:any = await this.service.insertOrderDetail(this.getPreOrderDetail());
      if (result.result) {
        $("#cartModal").modal('toggle');
        for(let m of this.saveForm.cartList){
          let r:any = await this.service.insertOrderList({
            order_id: result.order_id,
            p_id: m.p_id,
            qty: m.selectedNum,
            price: m.price
          })
        console.log(r);
        }
        await this.router.navigate(['/order-online/report', {order_id:result.order_id}]);
      } else {
        await this.alertFailTransaction()
      }
    } catch (e) {
      await this.alertFailTransaction();
    }
  }

  async alertSaveProductSuccess() {
    await Swal('สำเร็จ !', 'เพิ่มสินค้าลงตะกร้าแล้ว', 'success');
  }

  async alertDuplicateProductId() {
    await Swal('สินค้าถูกเพิ่มแล้ว', 'กรุณาเลือกสินค้าใหม่', 'error');
  }

  async alertFailTransaction() {
    await Swal('มีบางอย่างผิดพลาด', 'เพิ่มรายการไม่สำเร็จ', 'error');
  }

  getPreOrderDetail() {
    return {
      username: this.appStorage.getItem("username"),
      qty: this.saveForm.totalQty,
      net_pay: this.saveForm.totalPrice,
    }
  }
}
