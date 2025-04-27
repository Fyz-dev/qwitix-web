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

import { CreateEventDTO, ProblemDetails, PublishEventDTO, ResponseEventDTO, UpdateEventDTO } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Event<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Event
   * @name CreateEvent
   * @request POST:/api/event
   * @secure
   */
  createEvent = (data: CreateEventDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name PublishEvent
   * @request POST:/api/event/{id}/publish
   * @secure
   */
  publishEvent = (id: string, data: PublishEventDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event/${id}/publish`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name GetEventList
   * @request GET:/api/event/list
   * @secure
   */
  getEventList = (
    query: {
      organizerId: string;
      /** @format int32 */
      offset?: number;
      /** @format int32 */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ResponseEventDTO[], void>({
      path: `/api/event/list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name GetEvent
   * @request GET:/api/event/{id}
   * @secure
   */
  getEvent = (id: string, params: RequestParams = {}) =>
    this.request<ResponseEventDTO, ProblemDetails | void>({
      path: `/api/event/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name UpdateEvent
   * @request PATCH:/api/event/{id}
   * @secure
   */
  updateEvent = (id: string, data: UpdateEventDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event/${id}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name DeleteEvent
   * @request DELETE:/api/event/{id}
   * @secure
   */
  deleteEvent = (id: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
}
