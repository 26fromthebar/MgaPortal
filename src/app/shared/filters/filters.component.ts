import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { IFetchListOptions } from 'src/app/types/ifetch-list-options';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() isFiltersOpen: boolean = false;
  @Output() closeFilters = new EventEmitter();
  @Output() newListOptions = new EventEmitter();

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

  fetchListOptions: IFetchListOptions = {
    pagination: {
      currentPage: 0,
      pageSize: 16,
      totalPages: 1,
    },
    searchValues: null,
  };

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onCloseFilters() {
    this.isFiltersOpen = false;
    this.closeFilters.emit();
  }

  onTitleSearchSubmit() {
    // console.log(
    //   this.titleSearchForm.value.searchValue,
    //   this.titleSearchForm.value.uuid
    // );
    this.dataService.setFetchListOptions({
      ...this.fetchListOptions,
      searchValues: {
        value: '',
        containerTypes: [],
        propertyValueFilters: [
          {
            propertyUuid: this.titleSearchForm.value.uuid,
            propertyValue: this.titleSearchForm.value.searchValue.toLowerCase(),
            logicalOperator: 'AND',
            operator: 'CONTAINS',
          },
        ],
      },
    });
    this.newListOptions.emit();
    this.closeFilters.emit();
  }

  onCreatorSearchSubmit() {
    this.dataService.setFetchListOptions({
      ...this.fetchListOptions,
      searchValues: {
        value: '',
        containerTypes: [],
        propertyValueFilters: [
          {
            propertyUuid: this.creatorSearchForm.value.uuid,
            propertyValue:
              this.creatorSearchForm.value.searchValue.toLowerCase(),
            logicalOperator: 'AND',
            operator: 'CONTAINS',
          },
        ],
      },
    });
    this.newListOptions.emit();
    this.closeFilters.emit();
  }

  onClearFilters() {
    // this.titleSearchForm.value.searchValue = '';
    this.titleSearchForm.get('searchValue')?.setValue('');
    this.creatorSearchForm.get('searchValue')?.setValue('');

    // console.log(this.creatorSearchValue);
    this.dataService.setFetchListOptions({
      ...this.fetchListOptions,
      searchValues: null,
    });
    // this.newListOptions.emit();
    // console.log(this.dataService.fetchListOptions);
    // this.fetchListOptions = this.dataService.fetchListOptions;
    // console.log(this.dataService.fetchListOptions);
    // this.fetchList(this.dataService.fetchListOptions);
  }
}
