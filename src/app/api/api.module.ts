/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { AuthorizationEndpointService } from './services/authorization-endpoint.service';
import { CheckTokenEndpointService } from './services/check-token-endpoint.service';
import { WhitelabelApprovalEndpointService } from './services/whitelabel-approval-endpoint.service';
import { WhitelabelErrorEndpointService } from './services/whitelabel-error-endpoint.service';
import { TokenEndpointService } from './services/token-endpoint.service';
import { TokenKeyEndpointService } from './services/token-key-endpoint.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AuthorizationEndpointService,
    CheckTokenEndpointService,
    WhitelabelApprovalEndpointService,
    WhitelabelErrorEndpointService,
    TokenEndpointService,
    TokenKeyEndpointService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
