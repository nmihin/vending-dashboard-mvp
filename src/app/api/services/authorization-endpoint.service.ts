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
 * Authorization Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class AuthorizationEndpointService extends __BaseService {
  static readonly authorizeUsingGETPath = '/oauth/authorize';
  static readonly authorizeUsingHEADPath = '/oauth/authorize';
  static readonly authorizeUsingPOSTPath = '/oauth/authorize';
  static readonly authorizeUsingPUTPath = '/oauth/authorize';
  static readonly authorizeUsingDELETEPath = '/oauth/authorize';
  static readonly authorizeUsingOPTIONSPath = '/oauth/authorize';
  static readonly authorizeUsingPATCHPath = '/oauth/authorize';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `AuthorizationEndpointService.AuthorizeUsingGETParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingGETResponse(params: AuthorizationEndpointService.AuthorizeUsingGETParams): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.parameters != null) __params = __params.set('parameters', params.parameters.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.model != null) __params = __params.set('model', params.model.toString());
    if (params.complete != null) __params = __params.set('complete', params.complete.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/oauth/authorize`,
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
   * @param params The `AuthorizationEndpointService.AuthorizeUsingGETParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingGET(params: AuthorizationEndpointService.AuthorizeUsingGETParams): __Observable<ModelAndView> {
    return this.authorizeUsingGETResponse(params).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param params The `AuthorizationEndpointService.AuthorizeUsingHEADParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingHEADResponse(params: AuthorizationEndpointService.AuthorizeUsingHEADParams): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.parameters != null) __params = __params.set('parameters', params.parameters.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.model != null) __params = __params.set('model', params.model.toString());
    if (params.complete != null) __params = __params.set('complete', params.complete.toString());
    let req = new HttpRequest<any>(
      'HEAD',
      this.rootUrl + `/oauth/authorize`,
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
   * @param params The `AuthorizationEndpointService.AuthorizeUsingHEADParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingHEAD(params: AuthorizationEndpointService.AuthorizeUsingHEADParams): __Observable<ModelAndView> {
    return this.authorizeUsingHEADResponse(params).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param params The `AuthorizationEndpointService.AuthorizeUsingPOSTParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingPOSTResponse(params: AuthorizationEndpointService.AuthorizeUsingPOSTParams): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.parameters != null) __params = __params.set('parameters', params.parameters.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.model != null) __params = __params.set('model', params.model.toString());
    if (params.complete != null) __params = __params.set('complete', params.complete.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/oauth/authorize`,
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
   * @param params The `AuthorizationEndpointService.AuthorizeUsingPOSTParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingPOST(params: AuthorizationEndpointService.AuthorizeUsingPOSTParams): __Observable<ModelAndView> {
    return this.authorizeUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param params The `AuthorizationEndpointService.AuthorizeUsingPUTParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingPUTResponse(params: AuthorizationEndpointService.AuthorizeUsingPUTParams): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.parameters != null) __params = __params.set('parameters', params.parameters.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.model != null) __params = __params.set('model', params.model.toString());
    if (params.complete != null) __params = __params.set('complete', params.complete.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/oauth/authorize`,
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
   * @param params The `AuthorizationEndpointService.AuthorizeUsingPUTParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingPUT(params: AuthorizationEndpointService.AuthorizeUsingPUTParams): __Observable<ModelAndView> {
    return this.authorizeUsingPUTResponse(params).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param params The `AuthorizationEndpointService.AuthorizeUsingDELETEParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingDELETEResponse(params: AuthorizationEndpointService.AuthorizeUsingDELETEParams): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.parameters != null) __params = __params.set('parameters', params.parameters.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.model != null) __params = __params.set('model', params.model.toString());
    if (params.complete != null) __params = __params.set('complete', params.complete.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/oauth/authorize`,
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
   * @param params The `AuthorizationEndpointService.AuthorizeUsingDELETEParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingDELETE(params: AuthorizationEndpointService.AuthorizeUsingDELETEParams): __Observable<ModelAndView> {
    return this.authorizeUsingDELETEResponse(params).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param params The `AuthorizationEndpointService.AuthorizeUsingOPTIONSParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingOPTIONSResponse(params: AuthorizationEndpointService.AuthorizeUsingOPTIONSParams): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.parameters != null) __params = __params.set('parameters', params.parameters.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.model != null) __params = __params.set('model', params.model.toString());
    if (params.complete != null) __params = __params.set('complete', params.complete.toString());
    let req = new HttpRequest<any>(
      'OPTIONS',
      this.rootUrl + `/oauth/authorize`,
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
   * @param params The `AuthorizationEndpointService.AuthorizeUsingOPTIONSParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingOPTIONS(params: AuthorizationEndpointService.AuthorizeUsingOPTIONSParams): __Observable<ModelAndView> {
    return this.authorizeUsingOPTIONSResponse(params).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }

  /**
   * @param params The `AuthorizationEndpointService.AuthorizeUsingPATCHParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingPATCHResponse(params: AuthorizationEndpointService.AuthorizeUsingPATCHParams): __Observable<__StrictHttpResponse<ModelAndView>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.parameters != null) __params = __params.set('parameters', params.parameters.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.model != null) __params = __params.set('model', params.model.toString());
    if (params.complete != null) __params = __params.set('complete', params.complete.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/oauth/authorize`,
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
   * @param params The `AuthorizationEndpointService.AuthorizeUsingPATCHParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * - `model`: model
   *
   * - `complete`:
   *
   * @return OK
   */
  authorizeUsingPATCH(params: AuthorizationEndpointService.AuthorizeUsingPATCHParams): __Observable<ModelAndView> {
    return this.authorizeUsingPATCHResponse(params).pipe(
      __map(_r => _r.body as ModelAndView)
    );
  }
}

module AuthorizationEndpointService {

  /**
   * Parameters for authorizeUsingGET
   */
  export interface AuthorizeUsingGETParams {

    /**
     * parameters
     */
    parameters: any;
    name?: string;

    /**
     * model
     */
    model?: {};
    complete?: boolean;
  }

  /**
   * Parameters for authorizeUsingHEAD
   */
  export interface AuthorizeUsingHEADParams {

    /**
     * parameters
     */
    parameters: any;
    name?: string;

    /**
     * model
     */
    model?: {};
    complete?: boolean;
  }

  /**
   * Parameters for authorizeUsingPOST
   */
  export interface AuthorizeUsingPOSTParams {

    /**
     * parameters
     */
    parameters: any;
    name?: string;

    /**
     * model
     */
    model?: {};
    complete?: boolean;
  }

  /**
   * Parameters for authorizeUsingPUT
   */
  export interface AuthorizeUsingPUTParams {

    /**
     * parameters
     */
    parameters: any;
    name?: string;

    /**
     * model
     */
    model?: {};
    complete?: boolean;
  }

  /**
   * Parameters for authorizeUsingDELETE
   */
  export interface AuthorizeUsingDELETEParams {

    /**
     * parameters
     */
    parameters: any;
    name?: string;

    /**
     * model
     */
    model?: {};
    complete?: boolean;
  }

  /**
   * Parameters for authorizeUsingOPTIONS
   */
  export interface AuthorizeUsingOPTIONSParams {

    /**
     * parameters
     */
    parameters: any;
    name?: string;

    /**
     * model
     */
    model?: {};
    complete?: boolean;
  }

  /**
   * Parameters for authorizeUsingPATCH
   */
  export interface AuthorizeUsingPATCHParams {

    /**
     * parameters
     */
    parameters: any;
    name?: string;

    /**
     * model
     */
    model?: {};
    complete?: boolean;
  }
}

export { AuthorizationEndpointService }
