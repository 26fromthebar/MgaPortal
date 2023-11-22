import { IProperty } from './iproperty';
import { IStreamFile } from './istream-file';
import { IUser } from './iuser';

export interface IContainerChild {
  color?: string;
  coverFile?: IStreamFile;
  createdAt: string;
  createdBy: IUser;
  deletedAt: string | null;
  deletedBy: IUser | null;
  label: string;
  parent: string;
  properties?: IProperty[];
  publishedAt: string;
  publishedBy: IUser;
  shared: boolean;
  type: {
    name: string;
    slug: string;
    uuid: string;
  };
  updatedAt: string | null;
  updatedBy: IUser | null;
  uuid: string;
}
