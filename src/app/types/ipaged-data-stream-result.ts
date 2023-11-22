import { IDataStream } from './idata-stream';

export interface IPagedDataStreamResult {
  content: IDataStream[];
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
