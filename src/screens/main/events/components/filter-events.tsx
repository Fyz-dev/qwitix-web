import { FC } from 'react';

import CategoryList from './category-list';
import LiveEndedEvent from './live-ended-event';
import SearchInput from './search-input';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const FilterEvents: FC = () => {
  return (
    <Card className="h-min w-full max-w-[272px]">
      <CardHeader>
        <span className="text-xl font-bold">Filters</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-bold">Search</span>
          <SearchInput />
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <span className="font-bold">Categories</span>
          <LiveEndedEvent />
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <span className="font-bold">Categories</span>
          <CategoryList />
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterEvents;
