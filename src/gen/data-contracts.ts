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
  successUrl: string | null;
  cancelUrl: string | null;
  tickets: TicketPurchaseDTO[] | null;
}

export interface CreateEventDTO {
  organizerId: string | null;
  title: string | null;
  description?: string | null;
  category: string | null;
  venue: CreateVenueDTO;
}

export interface CreateOrganizerDTO {
  name: string | null;
  bio?: string | null;
  imageUrl?: string | null;
}

export interface CreateTicketDTO {
  eventId: string | null;
  name: string | null;
  details?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity: number;
}

export interface CreateVenueDTO {
  name: string | null;
  address: string | null;
  city: string | null;
  state?: string | null;
  zip?: string | null;
}

export enum EventStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  Postponed = 'Postponed',
  Canceled = 'Canceled',
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
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
  token: string | null;
}

export interface ResponseEventDTO {
  id: string | null;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  organizerId: string | null;
  title: string | null;
  description?: string | null;
  category?: string | null;
  status: EventStatus;
  venue: ResponseVenueDTO;
  /** @format date-time */
  startDate?: Date | null;
  /** @format date-time */
  endDate?: Date | null;
}

export interface ResponseOrganizerDTO {
  id: string | null;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  userId: string | null;
  name: string | null;
  bio?: string | null;
  imageUrl?: string | null;
  isVerified: boolean;
}

export interface ResponseTicketDTO {
  id: string | null;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  eventId: string | null;
  name: string | null;
  details?: string | null;
  /** @format double */
  price: number;
  /** @format int32 */
  quantity: number;
}

export interface ResponseTransactionDTO {
  id: string | null;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  userId: string | null;
  tickets: TicketPurchaseDTO[] | null;
  currency: string | null;
  status: TransactionStatus;
}

export interface ResponseUserDTO {
  id: string | null;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
  stripeCustomerId: string | null;
  fullName: string | null;
  email: string | null;
  token?: string | null;
  imageUrl?: string | null;
}

export interface ResponseVenueDTO {
  name: string | null;
  address: string | null;
  city: string | null;
  state?: string | null;
  zip?: string | null;
}

export interface TicketPurchaseDTO {
  ticketId: string | null;
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
  title?: string | null;
  description?: string | null;
  category?: string | null;
  venue?: UpdateVenueDTO;
}

export interface UpdateOrganizerDTO {
  name?: string | null;
  bio?: string | null;
  imageUrl?: string | null;
  isVerified?: boolean | null;
}

export interface UpdateTicketDTO {
  name?: string | null;
  details?: string | null;
  /** @format double */
  price?: number | null;
  /** @format int32 */
  quantity?: number | null;
}

export interface UpdateUserDTO {
  fullName?: string | null;
  email?: string | null;
  imageUrl?: string | null;
}

export interface UpdateVenueDTO {
  name?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
}

export interface UrlResponseDTO {
  url: string | null;
}
