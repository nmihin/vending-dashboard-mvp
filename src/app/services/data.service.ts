import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { tap, retry, catchError } from 'rxjs/operators';
import { ApiConfiguration } from '../../app/api/api-configuration';

// MODELS
import { ParkingSpacesResponse } from "../api/models/parking-spaces-response";
import { ParkingSpace } from "../api/models/parking-space";
import { GroupedEventsResponse } from "../api/models/grouped-events-response";
import { ParkingArea } from "../api/models/parking-area";
import { Barrier } from "../api/models/barrier";
import { BarriersResponse } from "../api/models/barriers-response";
import { ParkingSummaryResponse } from "../api/models/parking-summary-response";
import { AlarmsResponse } from "../api/models/alarms-response";


let auth_token ='';
localStorage.getItem('currentUser') ? auth_token = JSON.parse(localStorage.getItem('currentUser')) : auth_token='';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: "Bearer " + auth_token
  })
};


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private _refreshData$ = new Subject<void>();

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  get refreshData$(){
    return this._refreshData$;
  }

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private apiConfiguration: ApiConfiguration
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getVendingData() {
    return this.httpClient.get('../../data/gffgfgfgfgvending_all.csv')
  }
  connectivityUsingGET() {
    return this.httpClient.get(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/connectivity');
  }
  getBarriersUsingGET() {
    return this.httpClient.get(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/barriers');
  }
  getParkingAreasUsingGET() {
    return this.httpClient.get(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/parkingareas');
  }
  getParkingSpacesUsingGET() {
    return this.httpClient.get(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/parkingspaces?page=0&pageSize=50')
  }
  getParkingSummaryUsingGET(): Observable<ParkingSummaryResponse[]> {
    return this.httpClient.get<ParkingSummaryResponse[]>(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/parkingSummary');
  }
  getGroupedEventsUsingGET() {
    let currentUnixTimeFromNew = new Date();
    let currentUnixTimeToNew = new Date();


    var coeff = 1000 * 60 * 5;
    var currentUnixTimeFromNewRounded = new Date((Math.round(currentUnixTimeFromNew.getTime() / coeff) * coeff) - 300000)
    var currentUnixTimeToNewRounded = new Date((Math.round(currentUnixTimeToNew.getTime() / coeff) * coeff) - 300000)

    let currentUnixTimeFrom = currentUnixTimeFromNewRounded.setHours(currentUnixTimeFromNewRounded.getHours() - 2) ;
    let currentUnixTimeTo = currentUnixTimeToNewRounded.setHours(currentUnixTimeToNewRounded.getHours());

    let ISOStringFrom = new Date(currentUnixTimeFrom).toISOString().slice(0,-5);
    let ISOStringTo = new Date(currentUnixTimeTo).toISOString().slice(0,-5);
    console.log(ISOStringFrom +' '+ISOStringTo)

    return this.httpClient.get(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/groupedEvents?&eventType=ParkingOccupancyChanged&fromUTC='+ISOStringFrom+'&toUTC='+ISOStringTo+'&interval=1200');
    //return this.httpClient.get('http://dev.aldo.tech:8080/parkingzr/api/v1/groupedEvents?&eventType=ParkingOccupancyChanged&from=2019-12-19T00:30:00&to=2019-12-19T11:15:00&interval=1200')
    //return this.httpClient.get('http://dev.aldo.tech:8080/parkingzr/api/v1/groupedEvents?eventType=ParkingOccupancyChanged&fromUTC=2019-12-19T00:30:00&toUTC=2019-12-19T10:15:00&interval=1200')
  }
  getSensorsUsingGET() {
    return this.httpClient.get(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/sensors?page=0&pageSize=100');
  }
  getAlarmsUsingGET() {
    return this.httpClient.get(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/alarms?page=0&pageSize=20&sortBy=eventTime:desc');
  }
  updateEntryBarrierStatusUsingPOST(barrier: Barrier): Observable<Barrier> {
    //console.log(barrier.barrierState)
    return this.httpClient.post<Barrier>(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/barriers/entryBarrier1',
    JSON.stringify({
      "state": barrier.barrierState
    }),
    httpOptions
    )
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  updateExitBarrierStatusUsingPOST(barrier: Barrier): Observable<Barrier> {
    //console.log(barrier.barrierState)
    return this.httpClient.post<Barrier>(this.apiConfiguration.rootUrl + '/parkingzr/api/v1/barriers/exitBarrier1',
    JSON.stringify({
      "state": barrier.barrierState
    }),
    httpOptions
    )
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
