import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { IPagedResult } from '../types/ipaged-result';
import { IContainer } from '../types/icontainer';

@Injectable({
  providedIn: 'root',
})
export class ListDataResolver
  implements
    Resolve<{
      pageData: IPagedResult;
      childrenDetails: IContainer[];
    }>
{
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    pageData: IPagedResult;
    childrenDetails: IContainer[];
  }> {
    console.log('List Resolver executing');
    return this.dataService.getList(
      this.dataService.paginationData,
      this.dataService.searchData
    );
  }
}
