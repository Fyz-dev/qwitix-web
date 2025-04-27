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

import { ProblemDetails, ResponseTransactionDTO, TransactionStatus } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Transaction<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Transaction
   * @name GetTransactionList
   * @request GET:/api/transaction/list
   * @secure
   */
  getTransactionList = (
    query?: {
      userId?: string;
      /** @format int32 */
      offset?: number;
      /** @format int32 */
      limit?: number;
      status?: TransactionStatus;
    },
    params: RequestParams = {},
  ) =>
    this.request<ResponseTransactionDTO[], ProblemDetails | void>({
      path: `/api/transaction/list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Transaction
   * @name GetTransaction
   * @request GET:/api/transaction/{id}
   * @secure
   */
  getTransaction = (id: string, params: RequestParams = {}) =>
    this.request<ResponseTransactionDTO, ProblemDetails | void>({
      path: `/api/transaction/${id}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
}
