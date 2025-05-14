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
  CreateEventDTO,
  EventStatus,
  ProblemDetails,
  PublishEventDTO,
  ResponseEventDTO,
  ResponseEventDTOPaginationResponse,
  UpdateEventDTO,
} from './data-contracts';
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
    this.request<ResponseEventDTO, ProblemDetails | void>({
      path: `/api/event`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
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
    query?: {
      organizerId?: string;
      /** @format int32 */
      offset?: number;
      /** @format int32 */
      limit?: number;
      status?: EventStatus;
      searchQuery?: string;
      categories?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<ResponseEventDTOPaginationResponse, void>({
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
  /**
   * No description
   *
   * @tags Event
   * @name GetEventCategories
   * @request GET:/api/event/categories
   * @secure
   */
  getEventCategories = (params: RequestParams = {}) =>
    this.request<string[], void>({
      path: `/api/event/categories`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name UploadEventImage
   * @request POST:/api/event/{id}/upload-image
   * @secure
   */
  uploadEventImage = (
    id: string,
    data: {
      /** @format binary */
      Image?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event/${id}/upload-image`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Event
   * @name DeleteEventImage
   * @request DELETE:/api/event/{id}/delete-image
   * @secure
   */
  deleteEventImage = (id: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/event/${id}/delete-image`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
}
