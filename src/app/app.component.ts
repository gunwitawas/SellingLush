import {Component, OnInit} from '@angular/core';

import { MetaService } from '@ngx-meta/core';
import {UniversalStorage} from "@shared/for-storage/server.storage";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private readonly meta: MetaService,
              private storage:UniversalStorage) {
    this.meta.setTag('og:title', 'home ctor');
  }
  ngOnInit(){
    this.storage.username = "guest";
    console.log(this.storage);
    if(this.storage.status){

    }
    this.storage.status = "";
  }
}
