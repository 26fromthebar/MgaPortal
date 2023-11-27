export interface IFetchListOptions {
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
  searchValues: {
    value: string;
    containerTypes: [];
    propertyValueFilters: [
      {
        propertyUuid: string;
        propertyValue: string;
        logicalOperator: string;
        operator: string;
      }
    ];
  } | null;
}
