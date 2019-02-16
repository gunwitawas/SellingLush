export class Validate {
  public static gteDate(date1: Date, date2: Date) {
    return new Date(date1).setHours(0, 0, 0, 0) >= new Date(date2).setHours(0, 0, 0, 0);
  }

  public static getDateDiff(event: Date) {
    let todayDate = new Date();
    let preOrderDate = new Date(event);
    let timeDiff = preOrderDate.getTime() - todayDate.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }
}