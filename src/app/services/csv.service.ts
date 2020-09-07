import { Component, Input } from "@angular/core";
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { SelectaData } from '../models/dataInterfaceSelecta';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { VendingData } from '../models/dataInterfaceVending';

@Injectable({
  providedIn: 'root'
})
export class ReadingCSVService {
  //rootUrl: string = '//smarpaysrv-test.azurewebsites.net/VendingDashboard/';
  rootUrl: string = 'localhost:4200/';

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) {}

  getCSVsms(): Observable<SelectaData[]> {
    return this.httpClient.get<SelectaData[]>('http://smarpaysrv-test.azurewebsites.net/VendingDashboard/data/voucher_sms_2020.csv')
    .pipe(
      take(1)
    );
  }

  getCSVtwint(): Observable<SelectaData[]> {
    return this.httpClient.get<SelectaData[]>('http://smarpaysrv-test.azurewebsites.net/VendingDashboard/data/voucher_twint_2020.csv')
    .pipe(
      take(1)
    );
  }

  getCSVvending(): Observable<VendingData[]> {
    return this.httpClient.get<VendingData[]>('http://smarpaysrv-test.azurewebsites.net/VendingDashboard/data/vending_2020.csv')
    .pipe(
      take(1)
    );
  }

}
