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

import {
  ProblemDetails,
  ResponseAccountDTO,
  ResponseOrganizerDTO,
  UpdateUserDTO,
  UrlResponseDTO,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

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
   * @name UpdateAccount
   * @request PATCH:/api/account
   * @secure
   */
  updateAccount = (data: UpdateUserDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/account`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name GetOrganizerAccount
   * @request GET:/api/account/organizer
   * @secure
   */
  getOrganizerAccount = (params: RequestParams = {}) =>
    this.request<ResponseOrganizerDTO, ProblemDetails | void>({
      path: `/api/account/organizer`,
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
   * @name Logout
   * @request POST:/api/account/logout
   * @secure
   */
  logout = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/account/logout`,
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
    query: {
      returnUrl: string;
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
