/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

/**
 * Check Token Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class CheckTokenEndpointService extends __BaseService {
  static readonly checkTokenUsingGETPath = '/oauth/check_token';
  static readonly checkTokenUsingHEADPath = '/oauth/check_token';
  static readonly checkTokenUsingPOSTPath = '/oauth/check_token';
  static readonly checkTokenUsingPUTPath = '/oauth/check_token';
  static readonly checkTokenUsingDELETEPath = '/oauth/check_token';
  static readonly checkTokenUsingOPTIONSPath = '/oauth/check_token';
  static readonly checkTokenUsingPATCHPath = '/oauth/check_token';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingGETResponse(token: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (token != null) __params = __params.set('token', token.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/oauth/check_token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingGET(token: string): __Observable<{}> {
    return this.checkTokenUsingGETResponse(token).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingHEADResponse(token: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (token != null) __params = __params.set('token', token.toString());
    let req = new HttpRequest<any>(
      'HEAD',
      this.rootUrl + `/oauth/check_token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingHEAD(token: string): __Observable<{}> {
    return this.checkTokenUsingHEADResponse(token).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingPOSTResponse(token: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (token != null) __params = __params.set('token', token.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/oauth/check_token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingPOST(token: string): __Observable<{}> {
    return this.checkTokenUsingPOSTResponse(token).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingPUTResponse(token: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (token != null) __params = __params.set('token', token.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/oauth/check_token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingPUT(token: string): __Observable<{}> {
    return this.checkTokenUsingPUTResponse(token).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingDELETEResponse(token: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (token != null) __params = __params.set('token', token.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/oauth/check_token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingDELETE(token: string): __Observable<{}> {
    return this.checkTokenUsingDELETEResponse(token).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingOPTIONSResponse(token: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (token != null) __params = __params.set('token', token.toString());
    let req = new HttpRequest<any>(
      'OPTIONS',
      this.rootUrl + `/oauth/check_token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingOPTIONS(token: string): __Observable<{}> {
    return this.checkTokenUsingOPTIONSResponse(token).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingPATCHResponse(token: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (token != null) __params = __params.set('token', token.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/oauth/check_token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param token token
   * @return OK
   */
  checkTokenUsingPATCH(token: string): __Observable<{}> {
    return this.checkTokenUsingPATCHResponse(token).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module CheckTokenEndpointService {
}

export { CheckTokenEndpointService }
