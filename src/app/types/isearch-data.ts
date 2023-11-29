export interface ISearchData {
  value: string;
  containerTypes: string[];
  propertyValueFilters: {
    propertyUuid: string;
    propertyValue: string;
    logicalOperator: string;
    operator: string;
  }[];
}
