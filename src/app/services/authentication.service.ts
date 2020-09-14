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


    let currentUserHD = {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicGFya2luZ3pyand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU5OTExMDEwMCwiYXV0aG9yaXRpZXMiOlsiQWRtaW4iXSwianRpIjoiM2FkMmU1YmEtNTU5Ny00YjNmLTg1YzMtNzllYTdiNmMyYWU1IiwiY2xpZW50X2lkIjoicGFya2luZ3pyand0Y2kifQ.6ExFXLcXhC5nPb3XT59uD6iUmkLbZOHfm38De7j29Ck",
      "token_type": "bearer",
      "expires_in": 431990000,
      "scope": "read write",
      "jti": "3ad2e5ba-5597-4b3f-85c3-79ea7b6c2ae5"
    }


    localStorage.setItem('currentUser', JSON.stringify(currentUserHD));
    this.currentUserSubject.next(currentUserHD);
    return currentUserHD;

    /*
    return this.http.post<any>(this.apiConfiguration.rootUrl, body.toString(), httpOptions).pipe(
      map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

       console.log(user)

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
    */

  }


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('vendingDataMonths');
    localStorage.removeItem('twintDataMonths');
    localStorage.removeItem('smsDataMonths');
    this.currentUserSubject.next(null);
  }

}
