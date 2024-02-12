import { FileUploadInputDirective } from './file-upload-input.directive';

describe('FileUploadInputPipe', () => {
  it('create an instance', () => {
    const pipe = new FileUploadInputDirective();
    expect(pipe).toBeTruthy();
  });
});
