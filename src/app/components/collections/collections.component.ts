import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { IContainer } from 'src/app/types/icontainer';
import { IFetchListOptions } from 'src/app/types/ifetch-list-options';
import { IListItem } from 'src/app/types/ilist-item';
import { IPagedDataStreamResult } from 'src/app/types/ipaged-data-stream-result';
import { IPagedResult } from 'src/app/types/ipaged-result';
import { IProperty } from 'src/app/types/iproperty';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit, OnDestroy {
  title: string = 'Μόνιμη συλλογή';

  items: IListItem[] = [];
  //Create sublists for specific UI requirements
  itemSubList1: IListItem[] = [];
  itemSubList2: IListItem[] = [];
  itemSubList3: IListItem[] = [];
  itemSubList4: IListItem[] = [];

  fetchListOptions: IFetchListOptions = {
    pagination: {
      currentPage: 0,
      pageSize: 16,
      totalPages: 1,
    },
    searchValues: null,
  };
  columns: number = 4;
  // pageSize: number = 20;
  // currentPage: number = 1;
  // totalPages: number = 1;
  noResults: boolean = false;
  itemTypes: string[] = ['Αίγι', 'Χαρακτική', 'Γλυπτική'];

  private titleSearchUuid: string = 'e3ac7d1c-91bd-4757-a3b6-c66c58760fdd';
  private creatorSearchUuid: string = '2eea4ba4-0b2a-42b6-8825-5fe52d5e2dfa';
  private dateSearchUuid: string = 'bac4c081-abdd-45ee-bd32-a78a453e4370';
  private typeSearchUuid: string = '91d02a67-8592-4e10-af85-2edd0db4fe76';

  titleSearchForm: FormGroup = this.fb.nonNullable.group({
    searchValue: '',
    uuid: this.titleSearchUuid,
  });

  creatorSearchForm: FormGroup = this.fb.nonNullable.group({
    searchValue: '',
    uuid: this.creatorSearchUuid,
  });

  // searchValues = {
  //   value: '',
  //   containerTypes: [],
  //   propertyValueFilters: [
  //     {
  //       propertyUuid: '',
  //       propertyValue: '',
  //       logicalOperator: '',
  //       operator: '',
  //     },
  //     // {
  //     //   propertyUuid: 'e3ac7d1c-91bd-4757-a3b6-c66c58760fdd',
  //     //   propertyValue: 'ύδρα',
  //     //   logicalOperator: 'AND',
  //     //   operator: 'CONTAINS',
  //     // },
  //     // {
  //     //   propertyUuid: '2eea4ba4-0b2a-42b6-8825-5fe52d5e2dfa',
  //     //   propertyValue: 'μαρί',
  //     //   logicalOperator: 'AND',
  //     //   operator: 'CONTAINS',
  //     // },
  //     // {
  //     //   propertyUuid: 'bac4c081-abdd-45ee-bd32-a78a453e4370',
  //     //   propertyValue: '1967',
  //     //   logicalOperator: 'AND',
  //     //   operator: 'EQUALS',
  //     // },
  //     // {
  //     //   propertyUuid: '91d02a67-8592-4e10-af85-2edd0db4fe76',
  //     //   propertyValue: 'ζωγραφι',
  //     //   logicalOperator: 'AND',
  //     //   operator: 'CONTAINS',
  //     // },
  //   ],
  // };

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.dataService.fetchListOptions$.subscribe({
    //   next: (data) => {
    //     this.fetchListOptions = data;
    //     console.log(this.fetchListOptions);
    //   },
    // });
    this.updateListOptionsAndFetch();
    // this.fetchParentContainer();
    // this.fetchContainer('87742b59-9bb3-4b82-86c6-ac9e9ffea484');
    // this.fetchChildren(this.currentPage, this.pageSize);
    // this.fetchChildrenBySearchValues(this.searchValues);
    // this.fetchDataStreams('87742b59-9bb3-4b82-86c6-ac9e9ffea484');
    // this.fetchChildrenWithDetails(this.currentPage - 1, this.pageSize);
    // this.fetchChildrenWithDetailsBySearvhValues(
    //   this.currentPage - 1,
    //   this.pageSize,
    //   this.searchValues
    // );
  }

  // Not used
  fetchParentContainer() {
    this.dataService.getParentContainer().subscribe({
      next: (response: IContainer) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  // Used for fetching single item data
  fetchContainer(id: string) {
    this.dataService.getContainer(id).subscribe({
      next: (response: IContainer) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  // Not used
  // fetchChildren(page: number, pageSize: number) {
  //   this.dataService.getChildren(page, pageSize).subscribe({
  //     next: (response: IPagedResult) => {
  //       console.log(response);
  //       // this.items = response.content;
  //       // const itemList1 = this.createSubList(this.items, 4, 0);
  //       // console.log(itemList1);
  //       // this.updateItemSubLists(this.items, this.cols);
  //       // console.log(this.itemSubList1);
  //       // console.log(this.itemSubList2);
  //       // console.log(this.itemSubList3);
  //       // console.log(this.itemSubList4);
  //     },
  //     error: (err) => console.log(err),
  //   });
  // }

  fetchDataStreams(id: string) {
    this.dataService.getDataStreams(id).subscribe({
      next: (response: IPagedDataStreamResult) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  // Not used
  // fetchChildrenBySearchValues(
  //   page: number,
  //   pageSize: number,
  //   searchValues: {}
  // ) {
  //   this.dataService
  //     .getChildrenBySearchValues(page, pageSize, searchValues)
  //     .subscribe({
  //       next: (response: IPagedResult) => {
  //         console.log(response);
  //       },
  //       error: (err) => console.log(err),
  //     });
  // }

  fetchList(options: IFetchListOptions) {
    this.dataService.getListData(options).subscribe({
      next: (response) => {
        console.log('Fetchlist: ', response);

        if (!response || response.childrenDetails.length === 0) {
          this.noResults = true;
          return;
        }
        const listItems: IListItem[] = [];

        //For each item create a new listItem with the needed properties
        response.childrenDetails.forEach((item) => {
          const listItem: IListItem = {
            title:
              item.properties?.find(
                (prop: IProperty) =>
                  prop.schemaPropertyUuid ===
                  'b26d5f89-d42f-4400-8abd-031746597fca'
              )?.valueAsText ?? '',
            creator:
              item.properties?.find(
                (prop) =>
                  prop.schemaPropertyUuid ===
                  '4c7953e0-47e5-4a28-b55f-7f7808c32553'
              )?.valueAsText ?? '',
            type:
              item.properties?.find(
                (prop) =>
                  prop.schemaPropertyUuid ===
                  '1d813c78-d2d8-40f3-8a19-5ac777453c4b'
              )?.valueAsText ?? '',
            imageUrl: item.coverFile?.viewUrl
              ? item.coverFile?.viewUrl
              : '/assets/images/default-image.jpg',
            thumbnails: {
              small: '',
              medium: '',
              large: '',
            },
            uuid: item.uuid,
          };
          //Push new listItem to listItems array
          listItems.push(listItem);
        });

        //Assign listItems to this items array
        this.items = listItems;
        console.log(this.dataService.fetchListOptions);
        this.dataService.fetchListOptions.pagination.currentPage =
          response.pageData.number;
        this.dataService.fetchListOptions.pagination.totalPages =
          response.pageData.totalPages;
        this.updateItemSubLists(this.items, this.columns);
        // console.log(this.fetchListOptions);
      },
      error: (err) => console.log(err),
    });
  }

  // fetchChildrenWithDetailsBySearvhValues(
  //   page: number,
  //   pageSize: number,
  //   body: {}
  // ) {
  //   this.dataService
  //     .getChildrenWithDetailsBySearchValues(page, pageSize, body)
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response);

  //         if (!response || response.childrenDetails.length === 0) {
  //           this.noResults = true;
  //           return;
  //         }
  //         const listItems: IListItem[] = [];

  //         //For each item create a new listItem with the needed properties
  //         response.childrenDetails.forEach((item) => {
  //           const listItem: IListItem = {
  //             title:
  //               item.properties?.find(
  //                 (prop: IProperty) =>
  //                   prop.schemaPropertyUuid ===
  //                   'b26d5f89-d42f-4400-8abd-031746597fca'
  //               )?.valueAsText ?? '',
  //             creator:
  //               item.properties?.find(
  //                 (prop) =>
  //                   prop.schemaPropertyUuid ===
  //                   '4c7953e0-47e5-4a28-b55f-7f7808c32553'
  //               )?.valueAsText ?? '',
  //             type:
  //               item.properties?.find(
  //                 (prop) =>
  //                   prop.schemaPropertyUuid ===
  //                   '1d813c78-d2d8-40f3-8a19-5ac777453c4b'
  //               )?.valueAsText ?? '',
  //             imageUrl: item.coverFile?.viewUrl
  //               ? item.coverFile?.viewUrl
  //               : '/assets/images/default-image.jpg',
  //             thumbnails: {
  //               small: '',
  //               medium: '',
  //               large: '',
  //             },
  //             uuid: item.uuid,
  //           };
  //           //Push new listItem to listItems array
  //           listItems.push(listItem);
  //         });

  //         //Assign listItems to this items array
  //         this.items = listItems;
  //         this.currentPage = response.pageData.number + 1;
  //         this.totalPages = response.pageData.totalPages;
  //         this.updateItemSubLists(this.items, this.columns);
  //       },
  //       error: (err) => console.log(err),
  //     });
  // }

  // fetchChildrenWithDetails(page: number, pageSize: number) {
  //   this.dataService.getChildrenWithDetails(page, pageSize).subscribe({
  //     //In the 'next' callback I have to create a new array with the items having only
  //     //the properties I need, cause they are many and duplicate now
  //     next: (response) => {
  //       // console.log(response);

  //       if (!response || response.childrenDetails.length === 0) {
  //         this.noResults = true;
  //         return;
  //       }
  //       const listItems: IListItem[] = [];

  //       //For each item create a new listItem with the needed properties
  //       response.childrenDetails.forEach((item) => {
  //         const listItem: IListItem = {
  //           title:
  //             item.properties?.find(
  //               (prop: IProperty) =>
  //                 prop.schemaPropertyUuid ===
  //                 'b26d5f89-d42f-4400-8abd-031746597fca'
  //             )?.valueAsText ?? '',
  //           creator:
  //             item.properties?.find(
  //               (prop) =>
  //                 prop.schemaPropertyUuid ===
  //                 '4c7953e0-47e5-4a28-b55f-7f7808c32553'
  //             )?.valueAsText ?? '',
  //           type:
  //             item.properties?.find(
  //               (prop) =>
  //                 prop.schemaPropertyUuid ===
  //                 '1d813c78-d2d8-40f3-8a19-5ac777453c4b'
  //             )?.valueAsText ?? '',
  //           imageUrl: item.coverFile?.viewUrl
  //             ? item.coverFile?.viewUrl
  //             : '/assets/images/default-image.jpg',
  //           thumbnails: {
  //             small: '',
  //             medium: '',
  //             large: '',
  //           },
  //           uuid: item.uuid,
  //         };
  //         //Push new listItem to listItems array
  //         listItems.push(listItem);
  //       });

  //       //Assign listItems to this items array
  //       this.items = listItems;
  //       this.currentPage = response.pageData.number + 1;
  //       this.totalPages = response.pageData.totalPages;
  //       this.updateItemSubLists(this.items, this.columns);
  //     },
  //     error: (err) => console.log(err),
  //   });
  // }

  // changeSearchValuesAndRefetchList(searchValue: string) {
  //   // if(this.fetchListOptions.searchValues) {
  //   //   this.fetchListOptions.searchValues.value = 'sdahdfkj';
  //   // }
  //   this.dataService.setFetchListOptions({

  //   })
  // }

  changeSearchValuesAndRefetch(searchValue: string): void {
    if (this.dataService.fetchListOptions.searchValues) {
      this.dataService.fetchListOptions.searchValues.value = searchValue;
    } else {
      this.dataService.fetchListOptions.searchValues = {
        value: searchValue,
        containerTypes: [],
        propertyValueFilters: [
          {
            propertyUuid: '',
            propertyValue: '',
            logicalOperator: '',
            operator: '',
          },
        ],
      };
    }
    this.updateListOptionsAndFetch();
  }

  updateItemSubLists(list: any[], step: number) {
    this.itemSubList1 = this.createSubList(list, step, 0);
    this.itemSubList2 = this.createSubList(list, step, 1);
    this.itemSubList3 = this.createSubList(list, step, 2);
    this.itemSubList4 = this.createSubList(list, step, 3);
  }

  createSubList(list: IListItem[], step: number, modulo: number): IListItem[] {
    const selectedIndices = list
      .map((_, index) => index)
      .filter((index) => index % step === modulo);
    const subList = selectedIndices.map((index) => list[index]);
    return subList;
  }

  updateListOptionsAndFetch() {
    this.fetchListOptions = this.dataService.fetchListOptions;
    this.fetchList(this.fetchListOptions);
  }

  onPageChange(page: number) {
    this.dataService.fetchListOptions.pagination.currentPage = page;
    this.updateListOptionsAndFetch();
  }

  onTitleSearchSubmit() {
    // this.searchValues.propertyValueFilters = [
    //   {
    //     propertyUuid: this.titleSearchUuid,
    //     propertyValue: this.titleSearchForm.value.searchValue,
    //     logicalOperator: 'AND',
    //     operator: 'CONTAINS',
    //   },
    // ];
    // this.fetchChildrenWithDetailsBySearvhValues(
    //   this.currentPage - 1,
    //   this.pageSize,
    //   this.searchValues
    // );
  }

  onSearchSubmit() {
    // this.searchValues.propertyValueFilters = [{}]
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    // this.loadMoreSub.unsubscribe();
  }
}
