export class SweetAlertOption {
  public static confirmDelete:any = {
    title: 'ยืนยันการลบข้อมูล?',
    text: "ข้อมูลจะถูกลบถาวร!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '<i class="fa fa-check"></i> ยืนยัน',
    cancelButtonText: '<i class="fa fa-times"></i> ยกเลิก'
  };
  public static confirmUpdate:any = {
    title: 'ยืนยันการแก้ไขสถานะ?',
    text: "รายการสั่งจะถูกดำเนินการสู่ขั้นตอนถัดไป!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '<i class="fa fa-check"></i> ยืนยัน',
    cancelButtonText: '<i class="fa fa-times"></i> ยกเลิก'
  };
}
