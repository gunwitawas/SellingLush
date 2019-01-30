import {Component, OnInit, Inject} from '@angular/core';
import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";
import {ProductStoreInterface} from "./ProductStore.interface";
import {ProductStoreService} from "../all-service/register-service/ProductStore.service";
import {ProductService} from "../all-service/register-service/ProductService.service";

@Component({
  selector: 'app-transfer-back',
  templateUrl: './product-store.component.html',
})
export class ProductStoreComponent implements OnInit {
  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    private doms: DomSanitizer,
    private service: ProductStoreService,
    private serviceProduct: ProductService,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
  ) {
  }

  resultList: ProductStoreInterface[] = [{
    p_id: "001",
    p_name: "ทดสอบ",
    sale_date: new Date(),
    saleQty: 1,
    stockQty: 2,
    isEdit: false,
    isUpdate: false,
    isNew: true
  }] as ProductStoreInterface[];
  productList: any = [];
  searchForm = {
    selectedDate: new Date()
  }

  async ngOnInit() {
    let result: any = await this.service.getProductStore(this.searchForm);
    this.resultList = result.content;
    result = await this.serviceProduct.getProduct();
    this.productList = result.content;
  }


  addNew() {
    this.resultList.push(new ProductStoreInterface());
  }
  removeNew(){
    this.resultList = this.resultList.filter(f=>!f.isNew);
  }
}

