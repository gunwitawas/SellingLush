import { Component, OnInit, Inject } from '@angular/core';

import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transfer-back',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
  ) {
    console.log(`ORIGIN_URL=${baseUrl}`);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/login').subscribe((result) => {
      console.log(result);
      this.result = result;
    });
    this.httpClient.get('https://reqres.in/api/users?delay=3').subscribe((result) => {
      this.resultHttpClient = result;
    });
    this.http
      .post(
        'https://reqres.in/api/users',
        JSON.stringify({
          name: 'morpheus',
          job: 'leader',
        }),
      )
      .subscribe((result) => {
        this.resultPost = result;
      });
  }
}
