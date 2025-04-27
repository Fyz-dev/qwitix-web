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

import { CreateOrganizerDTO, ProblemDetails, ResponseOrganizerDTO, UpdateOrganizerDTO } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Organizer<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Organizer
   * @name CreateOrganizer
   * @request POST:/api/organizer
   * @secure
   */
  createOrganizer = (data: CreateOrganizerDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/organizer`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizer
   * @name GetOrganizerList
   * @request GET:/api/organizer/list
   * @secure
   */
  getOrganizerList = (
    query?: {
      /** @format int32 */
      offset?: number;
      /** @format int32 */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ResponseOrganizerDTO[], void>({
      path: `/api/organizer/list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizer
   * @name GetOrganizer
   * @request GET:/api/organizer/{id}
   * @secure
   */
  getOrganizer = (id: string, params: RequestParams = {}) =>
    this.request<ResponseOrganizerDTO, ProblemDetails | void>({
      path: `/api/organizer/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizer
   * @name UpdateOrganizer
   * @request PATCH:/api/organizer/{id}
   * @secure
   */
  updateOrganizer = (id: string, data: UpdateOrganizerDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/organizer/${id}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
