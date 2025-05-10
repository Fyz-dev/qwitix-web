export const Paths = {
  BaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  Organizer: {
    Home: '/organizer/home',
    Events: '/organizer/events',
    CreateEvent: '/organizer/events/create',
    ManageEvent: (id: string) => `/organizer/events/manage-event/${id}`,
    Analytics: '/organizer/analytics',
    Settings: '/organizer/settings',
  },
  Main: {
    Events: '/events',
    Event: (id: string) => `/events/${id}`,
    BuyTickets: (id: string) => `/events/${id}/buy-tickets`,
    AccountDashboard: '/my-account/dashboard',
    AccountSettings: '/my-account/settings',
  },
};
