import {StatusKeyInterface} from "../StatusKey.interface";

export class ProductStoreInterface extends StatusKeyInterface
{
  public p_id:string = "";
  public p_name:string = "";
  public sale_date:Date = new Date();
  public stockQty:number = 0;
  public saleQty:number = 0;
}
