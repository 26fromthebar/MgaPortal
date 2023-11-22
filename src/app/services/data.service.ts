import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { IContainer } from '../types/icontainer';
import { IPagedResult } from '../types/ipaged-result';
import { IContainerChild } from '../types/icontainer-child';
import { IPagedDataStreamResult } from '../types/ipaged-data-stream-result';

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
  getAllChildren(): Observable<IPagedResult> {
    const url = `${this.apiUrl}/public/containers/${this.parentContainerUuid}/children`;
    return this.http.get<IPagedResult>(url, { headers: this.headers });
    // .pipe(tap((res: IContainer) => console.log(res)));
  }

  //Get container's children by search values (filtered)
  getChildrenBySearchValues(body: {}): Observable<IPagedResult> {
    const url = `${this.apiUrl}/public/containers/search`;
    return this.http.post<IPagedResult>(url, body, { headers: this.headers });
  }

  //Get child by id
  getDataStreams(id: string): Observable<IPagedDataStreamResult> {
    const url = `${this.apiUrl}/public/containers/${id}/datastreams`;

    return this.http
      .get<IPagedDataStreamResult>(url, { headers: this.headers })
      .pipe
      // tap((res: IDatastreamContainer) => console.log(res))
      // map((res: IDatastreamContainer) => res.content[0])
      // tap((res) => console.log(res))
      ();
  }

  //Get children with their details in one combined observable
  getChildrenWithDetails() {
    return this.getAllChildren().pipe(
      switchMap((data: IPagedResult) => {
        const items: IContainerChild[] = data.content;
        // Read more about these observable operators and assign correct types
        const requests = items.map((item: IContainerChild) =>
          this.getContainer(item.uuid)
        );
        return forkJoin(requests, (...content) =>
          items.map((item, index) => ({
            ...item,
            content: content[index],
          }))
        );
      })
    );
  }
}
