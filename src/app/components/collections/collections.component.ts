import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IContainer } from 'src/app/types/icontainer';
import { IPagedDataStreamResult } from 'src/app/types/ipaged-data-stream-result';
import { IPagedResult } from 'src/app/types/ipaged-result';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit, OnDestroy {
  title: string = 'Μόνιμη συλλογή';

  itemTypes: string[] = ['Ζωγραφική', 'Χαρακτική', 'Γλυπτική'];
  searchValues = {
    value: 'αίγινα',
    containerTypes: [],
    propertyValueFilters: [
      // {
      // propertyUuid: '47d41d83-c217-4144-982e-7ab3c51045e2',
      // propertyValue: '1617',
      // logicalOperator: 'AND',
      // operator: 'CONTAINS',
      // },
    ],
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.fetchParentContainer();
    // this.fetchContainer('87742b59-9bb3-4b82-86c6-ac9e9ffea484');
    // this.fetchAllChildren();
    // this.fetchChildrenBySearchValues(this.searchValues);
    // this.fetchDataStreams('87742b59-9bb3-4b82-86c6-ac9e9ffea484');
    this.fetchChildrenWithDetails();
  }

  fetchParentContainer() {
    this.dataService.getParentContainer().subscribe({
      next: (response: IContainer) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  fetchContainer(id: string) {
    this.dataService.getContainer(id).subscribe({
      next: (response: IContainer) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  fetchAllChildren() {
    this.dataService.getAllChildren().subscribe({
      next: (response: IPagedResult) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  fetchChildrenBySearchValues(searchValues: {}) {
    this.dataService.getChildrenBySearchValues(searchValues).subscribe({
      next: (response: IPagedResult) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  fetchDataStreams(id: string) {
    this.dataService.getDataStreams(id).subscribe({
      next: (response: IPagedDataStreamResult) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  fetchChildrenWithDetails() {
    this.dataService.getChildrenWithDetails().subscribe({
      //In the 'next' callback I have to create a new array with the items having only
      //the properties I need, cause they are many and duplicate now
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  changeSearchValuesAndRefetch(searchValue: string): void {
    this.searchValues.value = searchValue;
    console.log(this.searchValues);
    this.fetchChildrenBySearchValues(this.searchValues);
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    // this.loadMoreSub.unsubscribe();
  }
}
