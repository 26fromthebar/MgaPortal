import { IProperty } from './iproperty';
import { IStreamFile } from './istream-file';
import { IUser } from './iuser';

export interface IContainer {
  coverFile?: IStreamFile;
  createdAt: string | null;
  createdBy: IUser;
  deletedAt?: string | null;
  deletedBy?: IUser | null;
  label: string;
  properties?: IProperty[];
  publishedAt: string | null;
  publishedBy: IUser;
  tags?: [];
  type: {
    name: string;
    slug: string;
    uuid: string;
  };
  updatedAt?: string | null;
  updatedBy?: IUser | null;
  uuid: string;
}
