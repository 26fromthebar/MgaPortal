export interface IFetchListOptions {
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
  searchValues: {
    value: string;
    containerTypes: string[];
    propertyValueFilters: {
      propertyUuid: string;
      propertyValue: string;
      logicalOperator: string;
      operator: string;
    }[];
  } | null;
}
