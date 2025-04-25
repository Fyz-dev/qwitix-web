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

import { ProblemDetails, ResponseUserDTO } from './data-contracts';
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
    this.request<ResponseUserDTO, ProblemDetails | void>({
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
   * @name GetLoginUrl
   * @request GET:/api/account/login/google
   * @secure
   */
  getLoginUrl = (
    query?: {
      returnUrl?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/account/login/google`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name GoogleLoginCallback
   * @request GET:/api/account/login/google/callback
   * @secure
   */
  googleLoginCallback = (
    query?: {
      returnUrl?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/account/login/google/callback`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
}
