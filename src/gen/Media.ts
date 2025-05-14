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

import { ProblemDetails } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Media<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Media
   * @name MediaDetail
   * @request GET:/api/media/{blobName}
   * @secure
   */
  mediaDetail = (blobName: string, params: RequestParams = {}) =>
    this.request<File, ProblemDetails>({
      path: `/api/media/${blobName}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
}
