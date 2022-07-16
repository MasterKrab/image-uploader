export interface UploadDropEvent {
  dataTransfer: DataTransfer;
}

export interface UploadFileEvent {
  form: HTMLFormElement;
}

interface UploadEvents {
  drop: UploadDropEvent;
  uploadFile: UploadFileEvent;
}

export default UploadEvents;
