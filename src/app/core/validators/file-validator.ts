export class FileValidator {
  public static isValidExcelMimetype(file: File): boolean {
    const ext: string[] = ['xlsx', 'xls'];
    const filename = file.name;
    const type = file.type;
    return ext.includes(filename.split('.').pop()) &&
      (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        type === 'application/vnd.ms-excel');
  }
}
