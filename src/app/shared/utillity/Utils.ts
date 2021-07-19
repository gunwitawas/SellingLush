
import {DomSanitizer} from "@angular/platform-browser";
export class Utils {
  static sanitizer:DomSanitizer;
   public static getImgPath(base64str) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }
}
