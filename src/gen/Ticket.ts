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

import { BuyTicketDTO, CreateTicketDTO, ProblemDetails, ResponseTicketDTO, UpdateTicketDTO } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Ticket<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Ticket
   * @name CreateTicket
   * @request POST:/api/ticket
   * @secure
   */
  createTicket = (data: CreateTicketDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/ticket`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name BuyTicket
   * @request POST:/api/ticket/buy
   * @secure
   */
  buyTicket = (data: BuyTicketDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/ticket/buy`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name GetTicketList
   * @request GET:/api/ticket/list
   * @secure
   */
  getTicketList = (
    query?: {
      eventId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ResponseTicketDTO[], void>({
      path: `/api/ticket/list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name GetTicket
   * @request GET:/api/ticket/{id}
   * @secure
   */
  getTicket = (id: string, params: RequestParams = {}) =>
    this.request<ResponseTicketDTO, ProblemDetails | void>({
      path: `/api/ticket/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name UpdateTicket
   * @request PATCH:/api/ticket/{id}
   * @secure
   */
  updateTicket = (id: string, data: UpdateTicketDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/ticket/${id}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name DeleteTicket
   * @request DELETE:/api/ticket/{id}
   * @secure
   */
  deleteTicket = (id: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/ticket/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
}
