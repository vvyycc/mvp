import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: 'input[fileUploadInput], div[fileUploadInput]',
})
export class FileUploadInputDirective {
  private queue: any = null;
  private element: HTMLElement;

  @Output() public duringSelect: EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  @Input('fileUploadInput')
  set fileUpload(value: any) {
    if (value) {
      this.queue = value;
    }
  }

  @HostListener('change')
  public onChange(): any {
    const files = this.elementRef.nativeElement.files;
    this.duringSelect.emit(files);

    for (const file of files) {
      this.queue.add(file);
    }
    this.elementRef.nativeElement.value = '';
  }
}
