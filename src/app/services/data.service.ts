import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concat,
  forkJoin,
  map,
  mergeMap,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { IContainer } from '../types/icontainer';
import { IPagedResult } from '../types/ipaged-result';
import { IContainerChild } from '../types/icontainer-child';
import { IPagedDataStreamResult } from '../types/ipaged-data-stream-result';
import { IFetchListOptions } from '../types/ifetch-list-options';

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

  // private fetchListOptionsSubject = new BehaviorSubject<IFetchListOptions>({
  //   pagination: {
  //     currentPage: 3,
  //     pageSize: 24,
  //     totalPages: 1,
  //   },
  //   searchValues: null,
  //   // searchValues: {
  //   //   value: '',
  //   //   containerTypes: [],
  //   //   propertyValueFilters: [
  //   //     {
  //   //       propertyUuid: '',
  //   //       propertyValue: '',
  //   //       logicalOperator: '',
  //   //       operator: '',
  //   //     },
  //   //   ],
  //   // },
  // });
  // fetchListOptions$ = this.fetchListOptionsSubject.asObservable();

  fetchListOptions: IFetchListOptions = {
    pagination: {
      currentPage: 0,
      pageSize: 24,
      totalPages: 1,
    },
    searchValues: null,
    // searchValues: {
    //   value: '',
    //   containerTypes: [],
    //   propertyValueFilters: [
    //     {
    //       propertyUuid: '',
    //       propertyValue: '',
    //       logicalOperator: 'AND',
    //       operator: 'CONTAINS',
    //     },
    //   ],
    // },
  };

  constructor(private http: HttpClient) {}

  // setFetchListOptions(data: IFetchListOptions) {
  //   this.fetchListOptionsSubject.next(data);
  // }

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
  getChildren(page: number, pageSize: number): Observable<IPagedResult> {
    const url = `${this.apiUrl}/public/containers/${this.parentContainerUuid}/children?page=${page}&size=${pageSize}`;
    return this.http.get<IPagedResult>(url, { headers: this.headers });
    // .pipe(tap((res: IPagedResult) => console.log(res)));
  }

  //Get container's children by search values (filtered)
  getChildrenBySearchValues(
    page: number,
    pageSize: number,
    body: {}
  ): Observable<IPagedResult> {
    const url = `${this.apiUrl}/public/containers/search?page=${page}&size=${pageSize}`;
    return this.http.post<IPagedResult>(url, body, { headers: this.headers });
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

  getListData(options: IFetchListOptions): Observable<{
    pageData: IPagedResult;
    childrenDetails: IContainer[];
  }> {
    if (options.searchValues === null) {
      return this.getChildrenWithDetails(
        options.pagination.currentPage,
        options.pagination.pageSize
      );
    } else {
      return this.getChildrenWithDetailsBySearchValues(
        options.pagination.currentPage,
        options.pagination.pageSize,
        options.searchValues
      );
    }
  }

  getChildrenWithDetails(
    page: number,
    pageSize: number
  ): Observable<{
    pageData: IPagedResult;
    childrenDetails: IContainer[];
  }> {
    const sharedPageData = this.getChildren(page, pageSize).pipe(
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

  getChildrenWithDetailsBySearchValues(
    page: number,
    pageSize: number,
    body: {}
  ): Observable<{
    pageData: IPagedResult;
    childrenDetails: IContainer[];
  }> {
    const sharedPageData = this.getChildrenBySearchValues(
      page,
      pageSize,
      body
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
}

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import {
//   BehaviorSubject,
//   Observable,
//   concat,
//   forkJoin,
//   map,
//   mergeMap,
//   of,
//   shareReplay,
//   switchMap,
//   tap,
// } from 'rxjs';
// import { IContainer } from '../types/icontainer';
// import { IPagedResult } from '../types/ipaged-result';
// import { IContainerChild } from '../types/icontainer-child';
// import { IPagedDataStreamResult } from '../types/ipaged-data-stream-result';
// import { IFetchListOptions } from '../types/ifetch-list-options';

// @Injectable({
//   providedIn: 'root',
// })
// export class DataService {
//   private parentContainerUuid: string = '37532a1a-6753-4111-8b0b-434cb8131deb';
//   private apiUrl: string = 'https://storev2-api.repox.io';
//   private headersOptions = {
//     'Content-Type': 'application/json',
//     'X-TenantID': 'mga_rodou',
//     Authorization:
//       'eXFWQXB2BffAtJ3COKlkED2oYlfsu8o1JOfz5e2/Gz0mFUf9LlLC1s6wviBock1ObfCtlNUPupuSe3l1ujy/rldVopaez1QumjUI7PqjZUU04tVORgAhmH3xaN7+WBSEW4Tw6VV8ToxpkGR2MX7vAXkIgGO2BUosCbhoskGm77s=',
//   };
//   private headers = new HttpHeaders(this.headersOptions);

//   private fetchListOptionsSubject = new BehaviorSubject<IFetchListOptions>({
//     pagination: {
//       currentPage: 0,
//       pageSize: 16,
//       totalPages: 1,
//     },
//     searchValues: null,
//     // searchValues: {
//     //   value: '',
//     //   containerTypes: [],
//     //   propertyValueFilters: [
//     //     {
//     //       propertyUuid: '',
//     //       propertyValue: '',
//     //       logicalOperator: '',
//     //       operator: '',
//     //     },
//     //   ],
//     // },
//   });
//   fetchListOptions$ = this.fetchListOptionsSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   setFetchListOptions(data: IFetchListOptions) {
//     this.fetchListOptionsSubject.next(data);
//   }

//   //Get parent container
//   getParentContainer(): Observable<IContainer> {
//     const url = `${this.apiUrl}/v2/public/containers/${this.parentContainerUuid}`;
//     return this.http.get<IContainer>(url, { headers: this.headers });
//     // .pipe(tap((res: IContainer) => console.log(res)));
//   }

//   //Get container by id
//   getContainer(id: string): Observable<IContainer> {
//     const url = `${this.apiUrl}/v2/public/containers/${id}`;
//     return this.http.get<IContainer>(url, { headers: this.headers });
//     // .pipe(tap((res: IContainerContent) => console.log(res)));
//   }

//   //Get parent container's children
//   getChildren(page: number, pageSize: number): Observable<IPagedResult> {
//     const url = `${this.apiUrl}/public/containers/${this.parentContainerUuid}/children?page=${page}&size=${pageSize}`;
//     return this.http.get<IPagedResult>(url, { headers: this.headers });
//     // .pipe(tap((res: IPagedResult) => console.log(res)));
//   }

//   //Get container's children by search values (filtered)
//   getChildrenBySearchValues(
//     page: number,
//     pageSize: number,
//     body: {}
//   ): Observable<IPagedResult> {
//     const url = `${this.apiUrl}/public/containers/search?page=${page}&size=${pageSize}`;
//     return this.http.post<IPagedResult>(url, body, { headers: this.headers });
//   }

//   //Get child stream data by id
//   getDataStreams(id: string): Observable<IPagedDataStreamResult> {
//     const url = `${this.apiUrl}/public/containers/${id}/datastreams`;

//     return this.http.get<any>(url, { headers: this.headers }).pipe(
//       tap((res: any) => console.log(res))
//       // map((res: IDatastreamContainer) => res.content[0])
//       // tap((res) => console.log(res))
//     );
//   }

//   getListData(options: IFetchListOptions): Observable<{
//     pageData: IPagedResult;
//     childrenDetails: IContainer[];
//   }> {
//     if (options.searchValues === null) {
//       return this.getChildrenWithDetails(
//         options.pagination.currentPage,
//         options.pagination.pageSize
//       );
//     } else {
//       return this.getChildrenWithDetailsBySearchValues(
//         options.pagination.currentPage,
//         options.pagination.pageSize,
//         options.searchValues
//       );
//     }
//   }

//   getChildrenWithDetails(
//     page: number,
//     pageSize: number
//   ): Observable<{
//     pageData: IPagedResult;
//     childrenDetails: IContainer[];
//   }> {
//     const sharedPageData = this.getChildren(page, pageSize).pipe(
//       // tap((data: IPagedResult) => console.log(data)),
//       shareReplay(1) // Share the result and replay it to new subscribers
//     );

//     const childrenDetails = sharedPageData.pipe(
//       switchMap((data: IPagedResult) => {
//         const items: IContainerChild[] = data.content;
//         // Read more about these observable operators and assign correct types
//         const itemContainers = items.map((item: IContainerChild) =>
//           this.getContainer(item.uuid)
//         );
//         return forkJoin(itemContainers);
//       })
//     );

//     return forkJoin({
//       pageData: sharedPageData,
//       childrenDetails,
//     });
//   }

//   getChildrenWithDetailsBySearchValues(
//     page: number,
//     pageSize: number,
//     body: {}
//   ): Observable<{
//     pageData: IPagedResult;
//     childrenDetails: IContainer[];
//   }> {
//     const sharedPageData = this.getChildrenBySearchValues(
//       page,
//       pageSize,
//       body
//     ).pipe(
//       // tap((data: IPagedResult) => console.log(data)),
//       shareReplay(1) // Share the result and replay it to new subscribers
//     );

//     const childrenDetails = sharedPageData.pipe(
//       switchMap((data: IPagedResult) => {
//         const items: IContainerChild[] = data.content;
//         // Read more about these observable operators and assign correct types
//         const itemContainers = items.map((item: IContainerChild) =>
//           this.getContainer(item.uuid)
//         );
//         return forkJoin(itemContainers);
//       })
//     );

//     return forkJoin({
//       pageData: sharedPageData,
//       childrenDetails,
//     });
//   }
// }
