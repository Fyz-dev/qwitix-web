/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ProblemDetails, ResponseAccountDTO, UrlResponseDTO } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Account<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Account
   * @name GetAccount
   * @request GET:/api/account
   * @secure
   */
  getAccount = (params: RequestParams = {}) =>
    this.request<ResponseAccountDTO, ProblemDetails | void>({
      path: `/api/account`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name UpdateRefreshToken
   * @request POST:/api/account/refresh
   * @secure
   */
  updateRefreshToken = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/account/refresh`,
      method: 'POST',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name GetGoogleLoginUrl
   * @request GET:/api/account/registration/google
   * @secure
   */
  getGoogleLoginUrl = (
    query?: {
      returnUrl?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UrlResponseDTO, any>({
      path: `/api/account/registration/google`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
