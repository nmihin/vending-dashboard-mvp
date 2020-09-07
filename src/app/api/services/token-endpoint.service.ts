/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OAuth2AccessToken } from '../models/oauth-2access-token';

/**
 * Token Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class TokenEndpointService extends __BaseService {
  static readonly getAccessTokenUsingGETPath = '/oauth/token';
  static readonly postAccessTokenUsingPOSTPath = '/oauth/token';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `TokenEndpointService.GetAccessTokenUsingGETParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * @return OK
   */
  getAccessTokenUsingGETResponse(params: TokenEndpointService.GetAccessTokenUsingGETParams): __Observable<__StrictHttpResponse<OAuth2AccessToken>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.parameters != null) __params = __params.set('parameters', params.parameters.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/oauth/token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OAuth2AccessToken>;
      })
    );
  }
  /**
   * @param params The `TokenEndpointService.GetAccessTokenUsingGETParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * @return OK
   */
  getAccessTokenUsingGET(params: TokenEndpointService.GetAccessTokenUsingGETParams): __Observable<OAuth2AccessToken> {
    return this.getAccessTokenUsingGETResponse(params).pipe(
      __map(_r => _r.body as OAuth2AccessToken)
    );
  }

  /**
   * @param params The `TokenEndpointService.PostAccessTokenUsingPOSTParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * @return OK
   */
  postAccessTokenUsingPOSTResponse(params: TokenEndpointService.PostAccessTokenUsingPOSTParams): __Observable<__StrictHttpResponse<OAuth2AccessToken>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.parameters != null) __params = __params.set('parameters', params.parameters.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/oauth/token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OAuth2AccessToken>;
      })
    );
  }
  /**
   * @param params The `TokenEndpointService.PostAccessTokenUsingPOSTParams` containing the following parameters:
   *
   * - `parameters`: parameters
   *
   * - `name`:
   *
   * @return OK
   */
  postAccessTokenUsingPOST(params: TokenEndpointService.PostAccessTokenUsingPOSTParams): __Observable<OAuth2AccessToken> {
    return this.postAccessTokenUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as OAuth2AccessToken)
    );
  }
}

module TokenEndpointService {

  /**
   * Parameters for getAccessTokenUsingGET
   */
  export interface GetAccessTokenUsingGETParams {

    /**
     * parameters
     */
    parameters: any;
    name?: string;
  }

  /**
   * Parameters for postAccessTokenUsingPOST
   */
  export interface PostAccessTokenUsingPOSTParams {

    /**
     * parameters
     */
    parameters: any;
    name?: string;
  }
}

export { TokenEndpointService }
