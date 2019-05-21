import {Injectable} from '@angular/core';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {request} from 'https';
import {ServiceConstance} from "../../shared/constance/ServiceConstance";
import {resolve} from 'path';
import {reject} from 'q';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchProductServicePath = ServiceConstance.rootPath + ServiceConstance.productPath + "/searchProduct";
  updateProductServicePath = ServiceConstance.rootPath + ServiceConstance.productPath + "/updateProduct";
  insertProductServicePath = ServiceConstance.rootPath + ServiceConstance.productPath + "/insertProduct";
  getProductServicePath = ServiceConstance.rootPath + ServiceConstance.productPath + "/getAllProduct";
  getCurrentProductServicePath = ServiceConstance.rootPath + ServiceConstance.productPath + "/getCurrentProductId";
  getLatestProductServicePath = ServiceConstance.rootPath + ServiceConstance.productPath + "/getLatestProduct";
  getBestSellerProductServicePath = ServiceConstance.rootPath + ServiceConstance.productPath + "/getBestSellerProduct";
  getAvailableProductServicePath = ServiceConstance.rootPath + ServiceConstance.productPath + "/getAvailableProduct";
  parameter: any = {
    params: {},
    responseType: "json"
  }

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
  ) {

  }


  async searchProduct(params) {
    this.parameter.params = params;
    let result = await this.http.get(this.searchProductServicePath, this.parameter).toPromise();
    return result;
  }

  async getProduct() {
    let result = await this.http.get(this.getProductServicePath).toPromise();
    return result;
  }

  async getCurrentProductId(params) {
    this.parameter.params = params;
    console.log(this.parameter)
    let result = await this.http.get(this.getCurrentProductServicePath, this.parameter).toPromise();
    return result;
  }

  async getAvailableProduct() {
    let result = await this.http.get(this.getAvailableProductServicePath).toPromise();
    return result;
  }

  async getLatestProduct() {
    let result = await this.http.get(this.getLatestProductServicePath).toPromise();
    return result;
  }

  async getBestSellerProduct() {
    let result = await this.http.get(this.getBestSellerProductServicePath).toPromise();
    return result;
  }

  async insertProduct(params) {
    let result = await this.http.post(this.insertProductServicePath, params).toPromise();
    return result;
  }

  async updateProduct(params) {
    let result = await this.http.post(this.updateProductServicePath, params).toPromise();
    return result;
  }
}
