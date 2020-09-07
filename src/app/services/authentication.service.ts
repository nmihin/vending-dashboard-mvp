import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiConfiguration } from '../../app/api/api-configuration';


@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private apiConfiguration: ApiConfiguration) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Basic cGFya2luZ3pyand0Y2k6cHJrenI3NzgxMTI='
      })
    };

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(this.apiConfiguration.rootUrl + '/oauth/token', body.toString(), httpOptions).pipe(
      map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('vendingDataMonths');
    localStorage.removeItem('twintDataMonths');
    localStorage.removeItem('smsDataMonths');
    this.currentUserSubject.next(null);
  }

}
