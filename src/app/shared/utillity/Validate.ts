export class Validate {
  public static gteDate(date1: Date, date2: Date) {
    return  new Date(date1).setHours(0, 0, 0, 0) >= new Date(date2).setHours(0, 0, 0, 0);
  }
}

