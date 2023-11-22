export interface IProperty {
  property: {
    description: string;
    name: string;
    propertyGroup: string;
    propertyType: string;
    slug: string;
  };
  schemaPropertyUuid: string;
  uuid: string;
  value: any;
  valueAsText: string;
}
