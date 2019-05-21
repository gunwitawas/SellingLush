import {Component, Inject, OnInit} from '@angular/core';
import {AppStorage} from "@shared/for-storage/universal.inject";
import {TranslatesService} from "@shared/translates";
import {TransferHttpService} from "@gorniv/ngx-transfer-http";
import {MetaService} from "@ngx-meta/core";

const LINKS_A: any[] = [
  { link: '/home', name: 'home', icon: 'home' },
  { link: '/product', name: 'product', icon: 'store' },
  { link: '/product-store', name: 'product-store', icon: 'local_grocery_store' },
  { link: '/order-list', name: 'order', icon: 'reorder' },
  { link: '/preorder-list', name: 'preorder', icon: 'record_voice_over' },
  { link: '/customer', name: 'customer', icon: 'people' },
  { link: '/report', name: 'report', icon: 'assignment' },
];

const LINKS_M: any[] = [
  { link: '/home', name: 'home', icon: 'home' },
  { link: '/order-online', name: 'order', icon: 'reorder' },
  { link: '/preorder-online', name: 'preorder', icon: 'record_voice_over' }
];

const LINKS: any[] = [
  { link: '/home', name: 'home', icon: 'home' },
  { link: '/product-guest', name: 'product-guest', icon: 'store' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public  links: any[] = [];
  constructor(private _translatesService: TranslatesService,
              private http: TransferHttpService,
              private readonly meta: MetaService,
              @Inject(AppStorage) private storage: Storage) {
  }

  ngOnInit(): void {
    this.setLink();
    /*
        const linkTemp = JSON.parse(JSON.stringify(LINKS));
        this.links = linkTemp.map((link) => {
          link.name = `sidebar.${link.name}`;
          return link;
        });
    */
  }
   setLink(){
    console.log(this.storage);
    let status = this.storage.getItem("status");
    let linkTemp:any;
    if(status=='M'){
      linkTemp = JSON.parse(JSON.stringify(LINKS_M));
    }else if(status=='A'){
      linkTemp = JSON.parse(JSON.stringify(LINKS_A));
    }else{
      linkTemp = JSON.parse(JSON.stringify(LINKS));
    }
    this.links = linkTemp.map((link) => {
      link.name = `sidebar.${link.name}`;
      return link;
    });
    // return this.links;
  }

}
