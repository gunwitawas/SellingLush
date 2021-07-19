import {DomSanitizer} from "@angular/platform-browser";
export class UploadImageUtil{
  constructor( public _sanitizer: DomSanitizer) {
  }

private  uploadImage:any;


  public  uploadFile(event) {
    let files = event.target.files;
    if (files.length > 0) {
      console.log(files); // You will see the file
       this.getBase64(files[0]);
    }
  }

  public  async  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  public async  getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.uploadImage = reader.result;
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
