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
};
