import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IListItem } from 'src/app/types/ilist-item';
import { IPaginationData } from 'src/app/types/ipagination-data';
import { IProperty } from 'src/app/types/iproperty';
import { ISearchData } from 'src/app/types/isearch-data';

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

  private typeSearchUuid: string = '91d02a67-8592-4e10-af85-2edd0db4fe76';

  paginationData: IPaginationData = {
    currentPage: 0,
    pageSize: 16,
    totalPages: 1,
  };

  searchData: ISearchData | null = null;

  columns: number = 4;
  noResults: boolean = false;
  itemTypes: string[] = ['Ζωγραφική', 'Χαρακτική', 'Γλυπτική'];
  clickedButtonIndex: number = 0;

  isFiltersOpen: boolean = false;

  listSub: Subscription = new Subscription();
  // searchValues = {
  //   value: '',
  //   containerTypes: [],
  //   propertyValueFilters: [
  //     {
  //       propertyUuid: 'e3ac7d1c-91bd-4757-a3b6-c66c58760fdd',
  //       propertyValue: 'ύδρα',
  //       logicalOperator: 'AND',
  //       operator: 'CONTAINS',
  //     },
  //     {
  //       propertyUuid: '2eea4ba4-0b2a-42b6-8825-5fe52d5e2dfa',
  //       propertyValue: 'μαρί',
  //       logicalOperator: 'AND',
  //       operator: 'CONTAINS',
  //     },
  //     {
  //       propertyUuid: 'bac4c081-abdd-45ee-bd32-a78a453e4370',
  //       propertyValue: '1967',
  //       logicalOperator: 'AND',
  //       operator: 'EQUALS',
  //     },
  //     {
  //       propertyUuid: '91d02a67-8592-4e10-af85-2edd0db4fe76',
  //       propertyValue: 'ζωγραφι',
  //       logicalOperator: 'AND',
  //       operator: 'CONTAINS',
  //     },
  //   ],
  // };

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paginationData = this.dataService.paginationData;
    this.searchData = this.dataService.searchData;
    this.fetchList(this.paginationData, this.searchData);
  }

  fetchList(
    paginationOptions: IPaginationData,
    searchOptions: ISearchData | null
  ) {
    this.listSub = this.dataService
      .getList(paginationOptions, searchOptions)
      .subscribe({
        next: (response) => {
          console.log('Response of getList: ', response);

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
                  (prop: IProperty) =>
                    prop.schemaPropertyUuid ===
                    '4c7953e0-47e5-4a28-b55f-7f7808c32553'
                )?.valueAsText ?? '',
              type:
                item.properties?.find(
                  (prop: IProperty) =>
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

          //Assign listItems to this.items array
          this.items = listItems;

          // Update pagination options
          this.dataService.paginationData = {
            currentPage: response.pageData.number,
            pageSize: response.pageData.size,
            totalPages: response.pageData.totalPages,
          };
          this.paginationData = this.dataService.paginationData;

          // // Update search options
          // this.dataService.searchData = this.searchData;

          // Update items sublists
          this.updateItemSubLists(this.items, this.columns);
          // console.log(this.fetchListOptions);
        },
        error: (err) => {
          console.log(err);
          this.noResults = true;
        },
      });
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

  onPageChange(page: number) {
    this.dataService.paginationData = {
      ...this.paginationData,
      currentPage: page,
    };
    this.paginationData = this.dataService.paginationData;

    this.fetchList(this.paginationData, this.searchData);
  }

  onNewListOptions() {
    this.clickedButtonIndex = 0;
    this.searchData = this.dataService.searchData;
    this.fetchList(this.paginationData, this.searchData);
  }

  onCloseFilters() {
    this.isFiltersOpen = false;
  }

  toggleFilters() {
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  //Function to handle button click
  onButtonClick(index: number, type: string) {
    this.clickedButtonIndex = index;
    this.dataService.paginationData = this.dataService.defaultPaginationData;
    this.paginationData = this.dataService.paginationData;

    if (this.clickedButtonIndex === 0) {
      console.log('Index 0');

      this.dataService.searchData = null;
      this.searchData = this.dataService.searchData;

      this.fetchList(this.paginationData, this.searchData);
    } else {
      console.log('Index > 0', type);

      this.dataService.searchData = {
        value: '',
        containerTypes: [],
        propertyValueFilters: [
          {
            propertyUuid: this.typeSearchUuid,
            propertyValue: type.toLowerCase(),
            logicalOperator: 'AND',
            operator: 'EQUALS',
          },
        ],
      };
      this.searchData = this.dataService.searchData;
      this.fetchList(this.paginationData, this.searchData);
    }
  }

  ngOnDestroy(): void {
    this.listSub.unsubscribe();
  }
}
