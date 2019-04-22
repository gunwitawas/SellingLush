import {Component, OnInit, Inject} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {ObjectUtil as util} from "../shared/utillity/ObjectUtil";
import Swal from 'sweetalert2' ;
import {ProductService} from "../all-service/node-service/ProductService.service";

@Component({
  selector: 'product-guest',
  templateUrl: './product-guest.component.html',
  styleUrls: ['./product-guest.component.css']
})
export class ProductGuestComponent implements OnInit {
  public result: any;
  public uploadImg: any;

  searchForm: any = {
    "p_id": "",
    "p_name": "",
    "p_size": "",
    "minPrice": "",
    "maxPrice": "",
    "mixer": "",
    "p_img": ""
  }
  productList: any = [];
  productTempList: any = [];
  newProduct: any = {
    p_id: "",
    p_name: "",
    p_size: "",
    price: "",
    mixer: "",
    p_img: ""
  };

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    private _sanitizer: DomSanitizer,
    private service: ProductService,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
  ) {
    console.log(`ORIGIN_URL=${baseUrl}`);
  }

  ngOnInit(): void {
    this.uploadImg = "../../assets/icon/upload.png";
    this.getAllProduct();
  }

  edit(index) {
    this.productTempList.push({
      position: index,
      detail: util.jsonClone(this.productList[index])
    });
    this.productList[index].isEdit = true;
    console.log(this.productTempList);
  }

  async search() {
    let result: any = await this.service.searchProduct(this.searchForm);
    this.productTempList = [];
    this.productList = result.content;
  }

  cancel(pos) {
    let ind = 0;
    let obj = this.productTempList.map((f, i) => {
      if (f.position == pos) {
        ind = i;
      }
      return f;
    });
    this.productList[pos] = JSON.parse(JSON.stringify(this.productTempList[ind].detail));
    this.productTempList.splice(ind, 1);
  }

  async save(index) {
    let result: any = await this.service.updateProduct(this.productList[index]);
    if (result.affectedRows > 0) {
      Swal(
        'Update Success!',
        'Update product success',
        'success'
      );
     await this.getAllProduct();
    }
  }
  async getAllProduct() {
    let result: any = await this.service.getProduct();
    this.productList = result.content;
  }


  clear() {
    for (let key in this.searchForm) {
      this.searchForm[key] = "";
    }
  }

  addProduct() {
    $("#uploadInput").click();
  }



  async addNewProduct() {
    let result: any = await this.service.insertProduct(this.newProduct);
    if (result.affectedRows > 0) {
      $("#uploadModal").modal('toggle');
      Swal(
        'Insert Success!',
        'Add new product success',
        'success'
      );
      this.getAllProduct();
    }
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
      this.newProduct.p_img = this.uploadImg;
      console.log(this.newProduct);
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}

