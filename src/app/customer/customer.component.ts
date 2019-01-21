import { Component, OnInit, Inject } from '@angular/core';

import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'app/all-service/register-service/Account.service';
import { log } from 'util';

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
    private formBuilder : FormBuilder,
    private accountservice : AccountService
  ) {
    console.log(`ORIGIN_URL=${baseUrl}`);
  }

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required ],
    password: ['', Validators.required ],
    confirmPassword: ['', Validators.required ],
    name: ['', Validators.required ],
    address: ['', Validators.required ],
    tel: ['', Validators.required ],
    line_id: ['', Validators.required ],
    type: ['M', Validators.required ],
    email: ['', Validators.required ],
    image: ['not to do', Validators ],
 });

  ngOnInit(): void {

    }

    async summitFormRegister(){
      console.log("regisform : ",this.registerForm.value);
      let createAccount:any = await this.accountservice.createAccount(this.registerForm.value);
      console.log("qweqweqwe: ",createAccount)
    };
    
  }
