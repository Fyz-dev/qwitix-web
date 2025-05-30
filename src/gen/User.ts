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

import { ProblemDetails, ResponseUserDTO, UpdateUserDTO } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags User
   * @name GetUser
   * @request GET:/api/user/{id}
   * @secure
   */
  getUser = (id: string, params: RequestParams = {}) =>
    this.request<ResponseUserDTO, ProblemDetails | void>({
      path: `/api/user/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UpdateUser
   * @request PATCH:/api/user/{id}
   * @secure
   */
  updateUser = (id: string, data: UpdateUserDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/user/${id}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
