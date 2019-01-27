import { Component, OnInit, Inject } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-transfer-back',
  templateUrl: './product-store.component.html',
})
export class ProductStoreComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;
  date: Date;
  yourModelDate = new Date();
  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    private doms:DomSanitizer,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
  ) {
  }

  ngOnInit() {

  }
}

