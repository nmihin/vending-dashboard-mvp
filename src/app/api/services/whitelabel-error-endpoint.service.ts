/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ModelAndView } from '../models/model-and-view';

/**
 * Whitelabel Error Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class WhitelabelErrorEndpointService extends __BaseService {
  static readonly handleErrorUsingGETPath = '/oauth/error';
  static readonly handleErrorUsingHEADPath = '/oauth/error';
  static readonly handleErrorUsingPOSTPath = '/oauth/error';
  static readonly handleErrorUsingPUTPath = '/oauth/error';
  static readonly handleErrorUsingDELETEPath = '/oauth/error';
  static readonly handleErrorUsingOPTIONSPath = '/oauth/error';
  static readonly handleErrorUsingPATCHPath = '/oauth/error';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  handleErrorUsingGETResponse(): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/oauth/error`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ModelAndView>;
      })
    );
  }
  /**
   * @return OK
   */
  handleErrorUsingGET(): __Observable<ModelAndView> {
    return this.handleErrorUsingGETResponse().pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @return OK
   */
  handleErrorUsingHEADResponse(): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'HEAD',
      this.rootUrl + `/oauth/error`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ModelAndView>;
      })
    );
  }
  /**
   * @return OK
   */
  handleErrorUsingHEAD(): __Observable<ModelAndView> {
    return this.handleErrorUsingHEADResponse().pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @return OK
   */
  handleErrorUsingPOSTResponse(): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/oauth/error`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ModelAndView>;
      })
    );
  }
  /**
   * @return OK
   */
  handleErrorUsingPOST(): __Observable<ModelAndView> {
    return this.handleErrorUsingPOSTResponse().pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @return OK
   */
  handleErrorUsingPUTResponse(): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/oauth/error`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ModelAndView>;
      })
    );
  }
  /**
   * @return OK
   */
  handleErrorUsingPUT(): __Observable<ModelAndView> {
    return this.handleErrorUsingPUTResponse().pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @return OK
   */
  handleErrorUsingDELETEResponse(): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/oauth/error`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ModelAndView>;
      })
    );
  }
  /**
   * @return OK
   */
  handleErrorUsingDELETE(): __Observable<ModelAndView> {
    return this.handleErrorUsingDELETEResponse().pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @return OK
   */
  handleErrorUsingOPTIONSResponse(): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'OPTIONS',
      this.rootUrl + `/oauth/error`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ModelAndView>;
      })
    );
  }
  /**
   * @return OK
   */
  handleErrorUsingOPTIONS(): __Observable<ModelAndView> {
    return this.handleErrorUsingOPTIONSResponse().pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @return OK
   */
  handleErrorUsingPATCHResponse(): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/oauth/error`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ModelAndView>;
      })
    );
  }
  /**
   * @return OK
   */
  handleErrorUsingPATCH(): __Observable<ModelAndView> {
    return this.handleErrorUsingPATCHResponse().pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }
}

module WhitelabelErrorEndpointService {
}

export { WhitelabelErrorEndpointService }
