import { IPaginationData } from './ipagination-data';
import { ISearchData } from './isearch-data';

export interface IFetchListOptions {
  pagination: IPaginationData;
  searchValues: ISearchData | null;
}
