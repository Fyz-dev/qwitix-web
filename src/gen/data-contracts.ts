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

export interface BuyTicketDTO {
  successUrl: string;
  cancelUrl: string;
  tickets: TicketPurchaseDTO[];
}

export interface CreateEventDTO {
  organizerId: string;
  title: string;
  description?: string;
  /** @format binary */
  imgFile?: File;
  category: string;
  venue: CreateVenueDTO;
}

export interface CreateOrganizerDTO {
  name: string;
  bio?: string;
  imageUrl?: string;
}

export interface CreateTicketDTO {
  eventId: string;
  name: string;
  details?: string;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity: number;
}

export interface CreateVenueDTO {
  name: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
}

export enum EventStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  Postponed = 'Postponed',
  Canceled = 'Canceled',
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  /** @format int32 */
  status?: number;
  detail?: string;
  instance?: string;
  [key: string]: any;
}

export interface PublishEventDTO {
  /** @format date-time */
  startDate: Date;
  /** @format date-time */
  endDate: Date;
}

export interface ResponseAccountDTO {
  user: ResponseUserDTO;
  token: string;
}

export interface ResponseBuyTicketDTO {
  url: string;
}

export interface ResponseEventDTO {
  id: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  organizerId: string;
  title: string;
  description?: string;
  imgUrl?: string;
  category: string;
  status: EventStatus;
  venue: ResponseVenueDTO;
  tickets?: ResponseTicketDTO[];
  /** @format date-time */
  startDate?: Date;
  /** @format date-time */
  endDate?: Date;
}

export interface ResponseEventDTOPaginationResponse {
  items: ResponseEventDTO[];
  hasNextPage: boolean;
  /** @format int32 */
  totalCount: number;
}

export interface ResponseOrganizerDTO {
  id: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  userId: string;
  name: string;
  bio?: string;
  imageUrl?: string;
  isVerified: boolean;
}

export interface ResponseTicketDTO {
  id: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  eventId: string;
  name: string;
  details?: string;
  /** @format double */
  price: number;
  /** @format int32 */
  quantity: number;
}

export interface ResponseTicketWithSoldDTO {
  id: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  eventId: string;
  name: string;
  details?: string;
  /** @format double */
  price: number;
  /** @format int32 */
  quantity: number;
  /** @format int32 */
  sold?: number;
}

export interface ResponseTransactionDTO {
  id: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  userId: string;
  tickets: ResponseTicketDTO[];
  currency: string;
  status: TransactionStatus;
  stripePaymentLink?: string;
}

export interface ResponseTransactionDTOPaginationResponse {
  items: ResponseTransactionDTO[];
  hasNextPage: boolean;
  /** @format int32 */
  totalCount: number;
}

export interface ResponseUserDTO {
  id: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  stripeCustomerId: string;
  fullName: string;
  email: string;
  imageUrl?: string;
}

export interface ResponseVenueDTO {
  name: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
}

export interface TicketPurchaseDTO {
  ticketId: string;
  /** @format int32 */
  quantity: number;
}

export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Refunded = 'Refunded',
  Failed = 'Failed',
}

export interface UpdateEventDTO {
  title?: string;
  description?: string;
  /** @format binary */
  imgFile?: File;
  category?: string;
  venue?: UpdateVenueDTO;
}

export interface UpdateOrganizerDTO {
  name?: string;
  bio?: string;
  imageUrl?: string;
  isVerified?: boolean;
}

export interface UpdateTicketDTO {
  name?: string;
  details?: string;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
}

export interface UpdateUserDTO {
  fullName?: string;
  email?: string;
  imageUrl?: string;
}

export interface UpdateVenueDTO {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface UrlResponseDTO {
  url: string;
}
