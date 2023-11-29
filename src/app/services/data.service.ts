import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, shareReplay, switchMap, tap } from 'rxjs';
import { IContainer } from '../types/icontainer';
import { IPagedResult } from '../types/ipaged-result';
import { IContainerChild } from '../types/icontainer-child';
import { IPagedDataStreamResult } from '../types/ipaged-data-stream-result';
import { IPaginationData } from '../types/ipagination-data';
import { ISearchData } from '../types/isearch-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private parentContainerUuid: string = '37532a1a-6753-4111-8b0b-434cb8131deb';
  private apiUrl: string = 'https://storev2-api.repox.io';
  private headersOptions = {
    'Content-Type': 'application/json',
    'X-TenantID': 'mga_rodou',
    Authorization:
      'eXFWQXB2BffAtJ3COKlkED2oYlfsu8o1JOfz5e2/Gz0mFUf9LlLC1s6wviBock1ObfCtlNUPupuSe3l1ujy/rldVopaez1QumjUI7PqjZUU04tVORgAhmH3xaN7+WBSEW4Tw6VV8ToxpkGR2MX7vAXkIgGO2BUosCbhoskGm77s=',
  };
  private headers = new HttpHeaders(this.headersOptions);

  defaultPaginationData: IPaginationData = {
    currentPage: 0,
    pageSize: 16,
    totalPages: 1,
  };

  paginationData: IPaginationData = {
    currentPage: 0,
    pageSize: 16,
    totalPages: 1,
  };

  searchData: ISearchData | null = null;

  constructor(private http: HttpClient) {}

  //Get parent container
  getParentContainer(): Observable<IContainer> {
    const url = `${this.apiUrl}/v2/public/containers/${this.parentContainerUuid}`;
    return this.http.get<IContainer>(url, { headers: this.headers });
    // .pipe(tap((res: IContainer) => console.log(res)));
  }

  //Get container by id
  getContainer(id: string): Observable<IContainer> {
    const url = `${this.apiUrl}/v2/public/containers/${id}`;
    return this.http.get<IContainer>(url, { headers: this.headers });
    // .pipe(tap((res: IContainerContent) => console.log(res)));
  }

  //Get parent container's children
  getChildren(paginationOptions: IPaginationData): Observable<IPagedResult> {
    const url = `${this.apiUrl}/public/containers/${this.parentContainerUuid}/children?page=${paginationOptions.currentPage}&size=${paginationOptions.pageSize}`;
    return this.http.get<IPagedResult>(url, { headers: this.headers });
    // .pipe(tap((res: IPagedResult) => console.log(res)));
  }

  //Get container's children by search values (filtered)
  getChildrenBySearchValues(
    paginationOptions: IPaginationData,
    searchOptions: ISearchData
  ): Observable<IPagedResult> {
    const url = `${this.apiUrl}/public/containers/search?page=${paginationOptions.currentPage}&size=${paginationOptions.pageSize}`;
    return this.http.post<IPagedResult>(url, searchOptions, {
      headers: this.headers,
    });
  }

  //Get child stream data by id
  getDataStreams(id: string): Observable<IPagedDataStreamResult> {
    const url = `${this.apiUrl}/public/containers/${id}/datastreams`;

    return this.http.get<any>(url, { headers: this.headers }).pipe(
      tap((res: any) => console.log(res))
      // map((res: IDatastreamContainer) => res.content[0])
      // tap((res) => console.log(res))
    );
  }

  getChildrenDetailed(paginationOptions: IPaginationData): Observable<{
    pageData: IPagedResult;
    childrenDetails: IContainer[];
  }> {
    const sharedPageData = this.getChildren(paginationOptions).pipe(
      // tap((data: IPagedResult) => console.log(data)),
      shareReplay(1) // Share the result and replay it to new subscribers
    );

    const childrenDetails = sharedPageData.pipe(
      switchMap((data: IPagedResult) => {
        const items: IContainerChild[] = data.content;
        // Read more about these observable operators and assign correct types
        const itemContainers = items.map((item: IContainerChild) =>
          this.getContainer(item.uuid)
        );
        return forkJoin(itemContainers);
      })
    );

    return forkJoin({
      pageData: sharedPageData,
      childrenDetails,
    });
  }

  getChildrenDetailedBySearch(
    paginationOptions: IPaginationData,
    searchOptions: ISearchData
  ): Observable<{
    pageData: IPagedResult;
    childrenDetails: IContainer[];
  }> {
    const sharedPageData = this.getChildrenBySearchValues(
      paginationOptions,
      searchOptions
    ).pipe(
      // tap((data: IPagedResult) => console.log(data)),
      shareReplay(1) // Share the result and replay it to new subscribers
    );

    const childrenDetails = sharedPageData.pipe(
      switchMap((data: IPagedResult) => {
        const items: IContainerChild[] = data.content;
        // Read more about these observable operators and assign correct types
        const itemContainers = items.map((item: IContainerChild) =>
          this.getContainer(item.uuid)
        );
        return forkJoin(itemContainers);
      })
    );

    return forkJoin({
      pageData: sharedPageData,
      childrenDetails,
    });
  }

  getList(
    paginationOptions: IPaginationData,
    searchOptions: ISearchData | null
  ): Observable<{
    pageData: IPagedResult;
    childrenDetails: IContainer[];
  }> {
    if (searchOptions === null) {
      return this.getChildrenDetailed(paginationOptions);
    } else {
      return this.getChildrenDetailedBySearch(paginationOptions, searchOptions);
    }
  }
}
