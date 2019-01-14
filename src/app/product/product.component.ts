import {Component, OnInit, Inject} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import Swal  from 'sweetalert2'
@Component({
  selector: 'app-transfer-back',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;
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
      detail: JSON.parse(JSON.stringify(this.productList[index]))
    });
    this.productList[index].isEdit = true;
    console.log(this.productTempList);
  }

  search() {
    this.http.get('http://localhost:3000/searchProduct', {
      params: this.searchForm,
      responseType: "json"
    }).subscribe((result: any) => {
      console.log(result);
      this.productTempList = [];
      this.productList = result.content;
    });
  }

  cancel(pos) {
    let ind = 0;
    let obj = this.productTempList.map((f, i) => {
      if (f.position == pos) {
        ind = i;
      }
      return f;
    });
    console.log(this.productList[pos]);
    console.log(this.productTempList[ind].detail);
    this.productList[pos] = JSON.parse(JSON.stringify(this.productTempList[ind].detail));
    this.productTempList.splice(ind, 1);
  }

  save(index) {

  }

  getAllProduct() {
    this.http.get('http://localhost:3000/getAllProduct').subscribe((result: any) => {
      console.log(result);
      this.productList = result.content;
    });
  }

  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  clear() {
    for (let key in this.searchForm) {
      this.searchForm[key] = "";
    }
  }

  addProduct() {
    $("#uploadInput").click();
  }

  uploadFile(event) {
    let files = event.target.files;
    if (files.length > 0) {
      console.log(files); // You will see the file
      this.getBase64(files[0]);
    }
  }

  addNewProduct() {
    this.http.post('http://localhost:3000/insertProduct', this.newProduct).subscribe((result: any) => {
      if (result.affectedRows > 0) {
        $("#uploadModal").modal('toggle');
        Swal(
          'Insert Success!',
          'Add new product success',
          'success'
        );
        this.getAllProduct();
      }
    });
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

