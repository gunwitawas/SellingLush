import {Component, OnInit, Inject} from '@angular/core';

import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {UserService} from "../all-service/node-service/UserService.service";
import {DomSanitizer} from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-transfer-back',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  userDetail: any = {
    username: "",
    name: "",
    tel: "",
    address: "",
    line_id: "",
    image: ""
  };
  firstUpload = true;

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    private _sanitizer: DomSanitizer,
    private service: UserService,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
  ) {
  }

  async ngOnInit() {
    let result: any = await this.service.getUserProfile({username: this.appStorage.getItem("username")});
    this.userDetail = result;
    console.log(result);
  }

  async save() {
    let result: any = await this.service.updateProfile(this.userDetail);
    if (result.affectedRows > 0) {
      this.alertSaveSuccess();
    } else {
      this.alertFailTransaction();
    }
  }

  getImgPath(base64str: any) {
    return this._sanitizer
      .bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + base64str);
  }

  uploadFile(event) {
    this.firstUpload = false;
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


  async alertSaveSuccess() {
    await Swal('สำเร็จ !', 'แก้ไขข้อมูลเรียบร้อย', 'success');
  }


  async alertFailTransaction() {
    await Swal('มีบางอย่างผิดพลาด', 'แก้ไขข้อมูลไม่สำเร็จ', 'error');
  }

}

