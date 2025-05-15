type QueryParams = Record<string, string | number | boolean | undefined>;

export const Paths = {
  BaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  CancelBuyTickets: '/cancel-buy-tickets',
  SuccessBuyTickets: '/success-buy-tickets',
  Unauthorized: '/unauthorized',
  Organizer: {
    Login: '/login-organizer',
    Register: '/register-organizer',
    Home: '/organizer/home',
    Events: '/organizer/events',
    CreateEvent: '/organizer/events/create',
    ManageEvent: (id: string) => `/organizer/events/manage-event/${id}`,
    Analytics: '/organizer/analytics',
    SettingsProfile: '/organizer/settings/profile',
    SettingsAppearance: '/organizer/settings/appearance',
  },
  Main: {
    Events: (params?: QueryParams) => buildPath('/events', params),
    // Events: '/events',
    Event: (id: string) => `/events/${id}`,
    BuyTickets: (id: string) => `/events/${id}/buy-tickets`,
    AccountDashboard: '/my-account/dashboard',
    AccountSettingsProfile: '/my-account/settings/profile',
    AccountSettingsAppearance: '/my-account/settings/appearance',
  },
};

export function buildPath(path: string, queryParams?: QueryParams): string {
  const params = new URLSearchParams();

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    }
  }

  const queryString = params.toString();

  return queryString ? `${path}?${queryString}` : path;
}
