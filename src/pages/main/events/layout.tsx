import { FC, PropsWithChildren } from 'react';

import FilterEvents from './components/filter-events';

const EventsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mt-4 flex gap-4">
      <FilterEvents />
      {children}
    </div>
  );
};

export default EventsLayout;
