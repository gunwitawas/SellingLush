import {Component, OnInit, Inject} from '@angular/core';
import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {OrderService} from "../all-service/node-service/Order.service";
import {Utils} from "@shared/utillity/Utils";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-transfer-back',
  templateUrl: './order-online.component.html',
})
export class OrderOnlineComponent implements OnInit {
  constructor(
    private http: TransferHttpService,
    private service: OrderService,
    private httpClient: HttpClient,
    private _sanitizer: DomSanitizer,
    @Inject(AppStorage) private appStorage: Storage
  ) {
  }

  productStoreList: any = [];
  cartList:any=[];
  async ngOnInit(): void {
    await this.getCurrentProductStore();
  }

  async getCurrentProductStore() {
    let result: any = await this.service.getProductStore({});
    if (result.result) {
      this.productStoreList = result.content;
    }
  }
  getImgPath(base64str) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }
  addToCart(i){
    if(this.isNotDuplicateProduct(i)){
      this.cartList.push(this.productStoreList[i])
    }
  }
  isNotDuplicateProduct(i){
    return true;
  }
}
