import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { request } from 'https';
import { resolve } from 'path';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
  ) { }

  getUserAccount() {
    this.http.get('http://localhost:3000/getAccount').subscribe((result: any) => {
      console.log(result);
      return result;
    });
  }

  async createAccount(request){
  let result =  await this.http.post('http://localhost:3000/Register', request).toPromise();
  return result;
  }
}
