import { Component, OnInit, Inject } from '@angular/core';

import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import {UserService} from "../all-service/node-service/UserService.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-transfer-back',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  userDetail : any;
  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    private _sanitizer: DomSanitizer,
    private service: UserService,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
  ) {
    console.log(`ORIGIN_URL=${baseUrl}`);
  }
  async ngOnInit() {
    let result:any = await this.service.getUserProfile({username:this.appStorage.getItem("username")});
    this.userDetail = result;
    console.log(result);
  }

  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

   uploadFile(event) {
    let files = event.target.files;
    if (files.length > 0) {
      this.getBase64(files[0]);
    }
  }

  getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.userDetail.image = reader.result;
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}

