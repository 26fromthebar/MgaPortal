import { IStreamFile } from './istream-file';
import { IUser } from './iuser';

export interface IDataStream {
  bitstreamFile: IStreamFile;
  createdAt: string;
  createdBy: IUser;
  label: string;
  objectId: string | null;
  objectType: string | null;
  parent: string;
  publishedAt: string;
  publishedBy: IUser;
  repoxType: string;
  setAsCover: boolean | null;
  shared: boolean | null;
  textChunked: boolean;
  textExtracted: boolean;
  type: {
    name: string;
    slug: string;
    uuid: string;
  };
  updatedAt: string | null;
  updatedBy: IUser | null;
  uuid: string;
}
