import {Component, OnInit, Inject} from '@angular/core';
import {AppStorage} from '@shared/for-storage/universal.inject';

@Component({
  selector: 'app-transfer-back',
  templateUrl: './preorder-list.component.html',
})
export class PreorderListComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;

  constructor(
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
  ) {
  }

  ngOnInit() {
  }

  search() {
  }

  clear() {
  }
}
