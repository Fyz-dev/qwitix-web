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

import { CreateEventDTO, ProblemDetails, PublishEventDTO, ResponseEventDTO, UpdateEventDTO } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Event<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Event
   * @name EventCreate
   * @request POST:/api/event
   * @secure
   */
  eventCreate = (data: CreateEventDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name EventPublishCreate
   * @request POST:/api/event/{id}/publish
   * @secure
   */
  eventPublishCreate = (id: string, data: PublishEventDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event/${id}/publish`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name EventListList
   * @request GET:/api/event/list
   * @secure
   */
  eventListList = (
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
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name EventDetail
   * @request GET:/api/event/{id}
   * @secure
   */
  eventDetail = (id: string, params: RequestParams = {}) =>
    this.request<ResponseEventDTO, ProblemDetails | void>({
      path: `/api/event/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name EventPartialUpdate
   * @request PATCH:/api/event/{id}
   * @secure
   */
  eventPartialUpdate = (id: string, data: UpdateEventDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name EventDelete
   * @request DELETE:/api/event/{id}
   * @secure
   */
  eventDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
