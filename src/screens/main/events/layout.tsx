import { FC, PropsWithChildren } from 'react';

import FilterEvents from './components/filter-events';

const EventsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mt-14 flex gap-9">
      <FilterEvents />
      {children}
    </div>
  );
};

export default EventsLayout;
