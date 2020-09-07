/* tslint:disable */
import { OAuth2RefreshToken } from './oauth-2refresh-token';
export interface OAuth2AccessToken {
  additionalInformation?: {};
  expiration?: string;
  expired?: boolean;
  expiresIn?: number;
  refreshToken?: OAuth2RefreshToken;
  scope?: Array<string>;
  tokenType?: string;
  value?: string;
}
