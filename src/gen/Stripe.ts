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

import { HttpClient, RequestParams } from './http-client';

export class Stripe<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Stripe
   * @name StripeWebhooksCreate
   * @request POST:/api/stripe/webhooks
   * @secure
   */
  stripeWebhooksCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/stripe/webhooks`,
      method: 'POST',
      secure: true,
      ...params,
    });
}
