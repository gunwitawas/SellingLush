import { Component, OnInit, Inject } from '@angular/core';

import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transfer-back',
  templateUrl: './preorder-list.component.html',
})
export class PreorderListComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
  ) {
  }

  ngOnInit() {

  }
}
