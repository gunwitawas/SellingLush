import {Component, OnInit, Inject} from '@angular/core';
import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";
import {ProductStoreInterface} from "./ProductStore.interface";
import {ProductStoreService} from "../all-service/register-service/ProductStore.service";
import {ProductService} from "../all-service/register-service/ProductService.service";
import {Validate} from "../shared/utillity/Validate";
import Swal from 'sweetalert2'
import {SweetAlertOption as SwalOpt} from "@shared/constance/SweetAlertOption";
import {ObjectUtil as util} from "@shared/utillity/ObjectUtil";

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

  resultList: ProductStoreInterface[] = [new ProductStoreInterface()] as ProductStoreInterface[];
  tempList: ProductStoreInterface[];
  productList: any = [];


  searchForm = {
    selectedDate: new Date()
  };

  enableToAdjust: boolean;
  editMode: boolean = false;

  async ngOnInit() {
    await this.search();
    let result:any = await this.serviceProduct.getProduct();
    this.productList = result.content;
  }

  async initResultList() {
    this.resultList = [new ProductStoreInterface()];
  }

  async search() {
    this.resultList =[];
    this.editMode = false;
    this.enableToAdjust = Validate.gteDate(this.searchForm.selectedDate, new Date());
    console.log(this.enableToAdjust);
    let result: any = await this.service.getProductStore(this.searchForm);
    if (result.result) {
      if (result.content.length > 0) {
        this.resultList = util.jsonClone(result.content);
        this.tempList = util.jsonClone(result.content);
      }
    }
  }

  async save(i) {
    let result: any;
    if (this.resultList[i].isNew)
      result = await this.service.insertProductStore(this.resultList[i]);
    else
      result = await this.service.updateProductStore(this.resultList[i]);
    if (result.result) {
      await this.alertSaveProductSuccess();
      await this.search();
    }
  }

  async setProductId(i) {
    let selected_p_id = this.resultList[i].p_id;
    let valid = true;
    if (this.isValidProduct(selected_p_id)) {
      if (this.isDuplicateProduct(selected_p_id)) {
        this.resultList[i].p_name = this.productList.filter(f => f.p_id == selected_p_id)[0].p_name;
      } else {
        await this.alertDuplicateProductId();
        valid = false;
      }
    } else {
      await this.alertInvalidProdutId();
      valid = false;
    }
    if (!valid) {
      this.resultList[i].p_name = '';
      this.resultList[i].p_id = '';
    }
  }

  cancelEdit(i) {
    this.resultList[i] = util.jsonClone(this.tempList[i]);
  }

  isDuplicateProduct(productId) {
    return this.resultList.filter(f => f.p_id == productId && !f.isNew).length == 0
  }

  isValidProduct(productId) {
    return this.productList.filter(f => f.p_id == productId).length > 0
  }

  addNew() {
    this.editMode=true;
    this.resultList.push(new ProductStoreInterface());
  }

  removeByIndex(index) {
    this.resultList.splice(index, 1);
  }

  removeNew() {
    this.resultList = this.resultList.filter(f => !f.isNew);
  }

  setEditStatus(i, status) {

    this.editMode = status;
    this.resultList[i].isEdit = status;
    if(!status){
      this.cancelEdit(i);
    }
  }

  async alertDuplicateProductId() {
    await Swal('สินค้าถูกเพิ่มแล้ว', 'กรุณาเลือกสินค้าใหม่', 'error');

  }

  async alertInvalidProdutId() {
    await Swal('รหัสสินค้าไม่ถูกต้อง', 'กรุณาเลือกสินค้าใหม่', 'error');

  }

  async alertSaveProductSuccess() {
    await Swal('สำเร็จ !', 'บันทึกการทำรายการเรียบร้อย', 'success');
  }


  async confirmDelete(i) {
    Swal(SwalOpt.confirmDelete).then(async (result:any) => {
      if (result.value) {
        let r:any = await this.service.deleteProductStore(this.resultList[i]);
        console.log(r);
        if (r.result) {
          await this.alertSaveProductSuccess();
          await this.search();
        }
      }
    });
  }

}

