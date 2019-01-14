import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslatesService, ILang} from '@shared/translates';
import {AppStorage} from "@shared/for-storage/universal.inject";
import {TransferHttpService} from "@gorniv/ngx-transfer-http";
import {MetaService} from "@ngx-meta/core";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {
  public langList$: Observable<ILang[]>;
  public currentLang: string;
  public currentUsername: string;

  constructor(private _translatesService: TranslatesService,
              private http: TransferHttpService,
              private readonly meta: MetaService,
              @Inject(AppStorage) private storage: Storage) {
  }

  ngOnInit(): void {
    this.langList$ = this._translatesService.getLangList();
    this.currentLang = this._translatesService.getCurrentLang();
    this.currentUsername =  this.storage.getItem('username');
  }

  getCurrentStatus(){
    if(this.storage.getItem('status')){
      return true;
    }else{
      return false;
    }
  }

  getCurrentLang(){
    return this.currentLang;
  }

  getImage(lang){
    return "../../assets/icon/"+lang+"_icon.png";
  }

  getCurrentUsername(){
   return this.storage.getItem('username');
  }

  public changeLang(code: string): void {
    this._translatesService.changeLang(code);
    this.currentLang = this._translatesService.getCurrentLang();
  }

  logout(){
    this.storage.clear();
    $('#reloadButton')[0].click();
  }
}
