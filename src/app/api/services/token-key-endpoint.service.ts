/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Token Key Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class TokenKeyEndpointService extends __BaseService {
  static readonly getKeyUsingGETPath = '/oauth/token_key';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param name undefined
   * @return OK
   */
  getKeyUsingGETResponse(name?: string): __Observable<__StrictHttpResponse<{[key: string]: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/oauth/token_key`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{[key: string]: string}>;
      })
    );
  }
  /**
   * @param name undefined
   * @return OK
   */
  getKeyUsingGET(name?: string): __Observable<{[key: string]: string}> {
    return this.getKeyUsingGETResponse(name).pipe(
      __map(_r => _r.body as {[key: string]: string})
    );
  }
}

module TokenKeyEndpointService {
}

export { TokenKeyEndpointService }
