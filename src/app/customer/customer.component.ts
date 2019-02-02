import { Component, OnInit, Inject } from '@angular/core';

import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'app/all-service/register-service/Account.service';
import Swal from 'sweetalert2'
import { UserService } from 'app/all-service/register-service/UserService.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-transfer-back',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    private accountservice: AccountService,
    private userservice: UserService
  ) { }

  public registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    name: ['', Validators.required],
    address: ['', Validators.required],
    tel: ['', Validators.required],
    line_id: ['', Validators.required],
    type: ['M', Validators.required],
    email: ['', Validators.required],
    upLoadImage: [''],
  });

  public result: any;
  public allUserAccount: any;
  public validUsername: boolean = true;
  public validPassword: boolean = true;
  public checkUploadImageProfile: boolean = false;
  public uploadImg: any = "../../assets/img/imageUser.png";
  public defaultImage: any;


  ngOnInit(): void {
    this.startPageCustomer();
  }

  private startPageCustomer() {
    this.loadDefaultImage();
    this.getAllUserAccount();
  }

  private async loadDefaultImage() {
    let imageUrl = "../../assets/img/imageUser.png";
    const self = this;
    const xhr = new XMLHttpRequest()
    xhr.open("GET", imageUrl);
    xhr.responseType = "blob";
    xhr.send();
    await xhr.addEventListener("load", function () {
      let reader = new FileReader();
      reader.readAsDataURL(xhr.response);
      reader.addEventListener("loadend", function () {
        self.defaultImage = reader.result;
      });
    });
  }

  private async getAllUserAccount() {
    let response: any = await this.accountservice.getUserAccount();
    if (response) {
      this.allUserAccount = response.content.filter(result => result.type == 'M');
    }
  }

  private async summitFormRegister() {
    this.checkInputUploadImage();
    await this.insertRegisterFormToDataBase();
    this.getAllUserAccount();
  }

  private async insertRegisterFormToDataBase() {
    console.log("this.registerForm.value", this.registerForm.value);
    
    let createAccount: any = await this.accountservice.createAccount(this.registerForm.value);
    if (createAccount['result'] === "succcess") {
      Swal('Create new Account success!', 'เพิ่มข้อมูลผู้ใช้งานสำเร็จ!', 'success');
      this.hideInsertModal();
      this.clearRegisterForm();
    }
    else if (createAccount['result'] === "duplicate") {
      this.registerForm.value['username'] = '';
      Swal('Username already exist', 'ชื่อผู้ใช้นี้มีอยู่แล้ว!', 'warning');
    }
    else {
      Swal('The system cannot process your transaction', 'ระบบไม่สามารถทำรายการได้ในขณะนี้!', 'error');
    }
  }

  private hideInsertModal() {
    $('#createUserAccount').modal('hide');
  }

  private clearRegisterForm() {
    this.registerForm.patchValue({
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      address: "",
      tel: "",
      line_id: "",
      email: "",
      upLoadImage: "",
    });
    this.checkUploadImageProfile = false;
    this.uploadImg = "../../assets/img/imageUser.png";
  }

  private checkInputUploadImage() {
    if (this.checkUploadImageProfile) {
      this.registerForm.value['upLoadImage'] = this.uploadImg;
    }
    else {
      this.registerForm.value['upLoadImage'] = this.defaultImage;
    }
  }

  private uploadFile(event) {
    this.checkUploadImageProfile = true;
    let files = event.target.files;
    if (files.length > 0) {
      this.updateFileImageToBase64(files[0]);
    }
  }

  private updateFileImageToBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.uploadImg = reader.result;
      this.registerForm.value['upLoadImage'] = this.uploadImg;
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  public getImgTobase64(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  public async validateUsername() {
    let res: any = await this.userservice.checkValidUsername({ username: this.registerForm.value['username'] });
    this.validUsername = res.result;

  }

  public validatePassword() {
    if (this.registerForm.value['password'] !== this.registerForm.value['confirmPassword']) {
      this.validPassword = false;
    } else {
      this.validPassword = true;
    }
  }

}
