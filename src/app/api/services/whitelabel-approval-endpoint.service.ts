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
 * Whitelabel Approval Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class WhitelabelApprovalEndpointService extends __BaseService {
  static readonly getAccessConfirmationUsingGETPath = '/oauth/confirm_access';
  static readonly getAccessConfirmationUsingHEADPath = '/oauth/confirm_access';
  static readonly getAccessConfirmationUsingPOSTPath = '/oauth/confirm_access';
  static readonly getAccessConfirmationUsingPUTPath = '/oauth/confirm_access';
  static readonly getAccessConfirmationUsingDELETEPath = '/oauth/confirm_access';
  static readonly getAccessConfirmationUsingOPTIONSPath = '/oauth/confirm_access';
  static readonly getAccessConfirmationUsingPATCHPath = '/oauth/confirm_access';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingGETResponse(model?: {}): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (model != null) __params = __params.set('model', model.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/oauth/confirm_access`,
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
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingGET(model?: {}): __Observable<ModelAndView> {
    return this.getAccessConfirmationUsingGETResponse(model).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingHEADResponse(model?: {}): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (model != null) __params = __params.set('model', model.toString());
    let req = new HttpRequest<any>(
      'HEAD',
      this.rootUrl + `/oauth/confirm_access`,
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
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingHEAD(model?: {}): __Observable<ModelAndView> {
    return this.getAccessConfirmationUsingHEADResponse(model).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingPOSTResponse(model?: {}): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (model != null) __params = __params.set('model', model.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/oauth/confirm_access`,
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
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingPOST(model?: {}): __Observable<ModelAndView> {
    return this.getAccessConfirmationUsingPOSTResponse(model).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingPUTResponse(model?: {}): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (model != null) __params = __params.set('model', model.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/oauth/confirm_access`,
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
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingPUT(model?: {}): __Observable<ModelAndView> {
    return this.getAccessConfirmationUsingPUTResponse(model).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingDELETEResponse(model?: {}): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (model != null) __params = __params.set('model', model.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/oauth/confirm_access`,
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
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingDELETE(model?: {}): __Observable<ModelAndView> {
    return this.getAccessConfirmationUsingDELETEResponse(model).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingOPTIONSResponse(model?: {}): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (model != null) __params = __params.set('model', model.toString());
    let req = new HttpRequest<any>(
      'OPTIONS',
      this.rootUrl + `/oauth/confirm_access`,
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
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingOPTIONS(model?: {}): __Observable<ModelAndView> {
    return this.getAccessConfirmationUsingOPTIONSResponse(model).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingPATCHResponse(model?: {}): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (model != null) __params = __params.set('model', model.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/oauth/confirm_access`,
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
   * @param model model
   * @return OK
   */
  getAccessConfirmationUsingPATCH(model?: {}): __Observable<ModelAndView> {
    return this.getAccessConfirmationUsingPATCHResponse(model).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }
}

module WhitelabelApprovalEndpointService {
}

export { WhitelabelApprovalEndpointService }
