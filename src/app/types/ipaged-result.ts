import { IContainerChild } from './icontainer-child';
import { IDataStream } from './idata-stream';

export interface IPagedResult {
  content: IContainerChild[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {};
  size: number;
  sort: {};
  totalElements: number;
  totalPages: number;
}
