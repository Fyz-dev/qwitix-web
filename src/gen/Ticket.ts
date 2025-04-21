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

import { BuyTicketDTO, CreateTicketDTO, ProblemDetails, ResponseTicketDTO, UpdateTicketDTO } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Ticket<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Ticket
   * @name TicketCreate
   * @request POST:/api/ticket
   * @secure
   */
  ticketCreate = (data: CreateTicketDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/ticket`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name TicketBuyCreate
   * @request POST:/api/ticket/buy
   * @secure
   */
  ticketBuyCreate = (data: BuyTicketDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/ticket/buy`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name TicketListList
   * @request GET:/api/ticket/list
   * @secure
   */
  ticketListList = (
    query?: {
      eventId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ResponseTicketDTO[], void>({
      path: `/api/ticket/list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name TicketDetail
   * @request GET:/api/ticket/{id}
   * @secure
   */
  ticketDetail = (id: string, params: RequestParams = {}) =>
    this.request<ResponseTicketDTO, ProblemDetails | void>({
      path: `/api/ticket/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name TicketPartialUpdate
   * @request PATCH:/api/ticket/{id}
   * @secure
   */
  ticketPartialUpdate = (id: string, data: UpdateTicketDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/ticket/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ticket
   * @name TicketDelete
   * @request DELETE:/api/ticket/{id}
   * @secure
   */
  ticketDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/ticket/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
