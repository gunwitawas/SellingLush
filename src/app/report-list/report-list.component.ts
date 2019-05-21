import {Component, OnInit, Inject} from '@angular/core';

import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {OrderService} from "../all-service/node-service/Order.service";
import {DomSanitizer} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {SweetAlertOption as SwalOpt} from "@shared/constance/SweetAlertOption";
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import {ReportService} from "../all-service/node-service/Report.service";

@Component({
  selector: 'app-transfer-back',
  templateUrl: './report-list.component.html',
  styleUrls: ['../../styles.scss']
})
export class ReportListComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;
  searchForm = {
    startDate: new Date(),
    endDate: new Date(),
    p_size: "",
    type: "",
    mixer: "",
    username: ""
  }

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    private service: OrderService,
    private reportService: ReportService,
    private _sanitizer: DomSanitizer,
    @Inject(AppStorage) private appStorage: Storage
  ) {

  }

  expandIndex = 9999;
  selectedReport = 9;
  selectedOrder: any;
  orderList: any = {
    orderList: [],
    totalPrice: 0,
    totalQty: 0
  };
  header = [
    {name: "รายงานการขายต่อวัน", status: "D"},
    {name: "รายงานการขายสินค้า", status: "P"},
    {name: "รายงานสินค้าคงเหลือต่อวัน", status: "S"},

    {name: "รายงานยอดจองสินค้าสินค้า", status: "R"},
    {name: "รายงานการจัดส่ง", status: "T"}
  ];

  isModalOpen = false;

  ngOnInit(): void {
    this.getMixerList();
    this.getCustomerList();
  }

  async getMixerList() {
    this.mixerList = await this.reportService.getMixerList();
  }

  async getCustomerList() {
    this.customerList = await this.reportService.getCustomer();
  }

  showImage = true;
  resultList: any = [];
  customerList: any = [];
  mixerList: any = [];
  totalExpandIndex = 0;

  totalPrice = 0;

  totalQty = 0;

  async showReport(i) {
    this.totalPrice = 0;
    this.totalQty = 0;
    this.selectedReport = i;
    if (i == 9) this.expandIndex = 9999;
    else if (this.header[i].status == 'O') {
    } else {
      let result: any;

      if (this.header[i].status == 'D') {
        let obj = {
          endDate: new Date(this.searchForm.endDate),
          startDate: new Date(this.searchForm.startDate),
          username: (this.searchForm.username)
        }
        result = await this.reportService.getExpenseReport(obj);
        result.forEach(f => {
          this.totalPrice += f.net_pay
        });
      } else if (this.header[i].status == 'S' || this.header[i].status == 'P') {
        let obj = {
          endDate: new Date(this.searchForm.endDate),
          startDate: new Date(this.searchForm.startDate),
          p_size: (this.searchForm.p_size),
          type: this.header[i].status,
          mixer: this.searchForm.mixer
        }
        result = await this.reportService.getStockReport(obj);
        result.forEach(f => {
          if (this.header[i].status == 'S') {
            this.totalPrice += (f.price * f.stockQty);
            this.totalQty += f.stockQty;
          } else if (this.header[i].status == 'P') {
            this.totalPrice += (f.price * f.saleQty);
            this.totalQty += f.saleQty;
          }
        })
        if (this.header[i].status == 'P') {
          result = result.filter(f => f.saleQty != 0)
        } else if (this.header[i].status == 'S') {
          result = result.filter(f => f.stockQty != 0)
        }

       // this.resultList = result;
      }
      this.resultList = result;
      console.log(this.resultList)
    }

  }

}
