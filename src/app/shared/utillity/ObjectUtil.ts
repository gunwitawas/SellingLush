export class ObjectUtil {
  public static jsonClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
