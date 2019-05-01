import {Component, OnInit, Inject} from '@angular/core';
import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";
import {ProductStoreInterface} from "./ProductStore.interface";
import {ProductStoreService} from "../all-service/node-service/ProductStore.service";
import {ProductService} from "../all-service/node-service/ProductService.service";
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
    private _sanitizer: DomSanitizer,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
  ) {

  }

  resultList: any = [];
  tempList: any = [];
  productList: any = [];


  searchForm: any = {
    selectedDate: ""
  };

  enableToAdjust: boolean;
  editMode: boolean = false;

  async ngOnInit() {
    this.searchForm.selectedDate = new Date();
    await this.search();
    let result: any = await this.serviceProduct.getAvailableProduct();
    this.productList = result.content;
  }

  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  async initResultList() {
    this.resultList = [new ProductStoreInterface()];
  }

  async search() {
    this.resultList = [];
    this.editMode = false;
    this.enableToAdjust = Validate.gteDate(this.searchForm.selectedDate, new Date());
    console.log(this.enableToAdjust);
    let Obj = {
      selectedDate: await this.convertDate(this.searchForm.selectedDate)
    }
    let result: any = await this.service.getProductStore(Obj);
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
        this.resultList[i].p_img = this.productList.filter(f => f.p_id == selected_p_id)[0].p_img;
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
    this.editMode = true;
    this.resultList.push(new ProductStoreInterface());
  }

  removeByIndex(index) {
    this.editMode = false;
    this.resultList.splice(index, 1);
  }

  removeNew() {
    this.resultList = this.resultList.filter(f => !f.isNew);
  }

  setEditStatus(i, status) {

    this.editMode = status;
    this.resultList[i].isEdit = status;
    if (!status) {
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
    await Swal(SwalOpt.confirmDelete).then(async (result: any) => {
      if (result.value) {
        let r: any = await this.service.deleteProductStore(this.resultList[i]);
        console.log(r);
        if (r.result) {
          await this.alertSaveProductSuccess();
          await this.search();
        }
      }
    });
  }

  async convertDate(date: Date) {
    return date.getFullYear() + "-" + (Number(date.getMonth()) + 1) + "-" + date.getDate();
  }

}

