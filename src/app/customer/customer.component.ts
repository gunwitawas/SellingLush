import { Component, OnInit, Inject } from '@angular/core';

import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'app/all-service/register-service/Account.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-transfer-back',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
    private formBuilder: FormBuilder,
    private accountservice: AccountService
  ) {
    console.log(`ORIGIN_URL=${baseUrl}`);
  }

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    name: ['', Validators.required],
    address: ['', Validators.required],
    tel: ['', Validators.required],
    line_id: ['', Validators.required],
    type: ['M', Validators.required],
    email: ['', Validators.required],
    image: ['not to do', Validators],
  });

  ngOnInit(): void {

  }

  async summitFormRegister() {
    console.log("regisform : ", this.registerForm.value);
    let createAccount: any = await this.accountservice.createAccount(this.registerForm.value);
    console.log("qweqweqvfwe: ", createAccount)

    if (createAccount['result'] === "succcess") {
      Swal(
        'Create new Account success!',
        'เพิ่มข้อมูลผู้ใช้งานสำเร็จ!',
        'success'
      );
    } else if (createAccount['result'] === "duplicate") {
      Swal(
        'Username already exist',
        'ชื่อผู้ใช้นี้มีอยู่แล้ว!',
        'warning'
      );
    } else {
      Swal(
        'The system cannot process your transaction',
        'ระบบไม่สามารถทำรายการได้ในขณะนี้!',
        'error'
      );
    }
  };


  }
