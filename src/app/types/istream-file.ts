export interface IStreamFile {
  createdAt: string;
  filename: string;
  filesize: number;
  mimeType?: string;
  signature?: string | null;
  thumbnails: {
    largeUrl?: string;
    mediumUrl: string;
    smallUrl?: string;
  };
  uuid: string;
  viewUrl: string;
}
