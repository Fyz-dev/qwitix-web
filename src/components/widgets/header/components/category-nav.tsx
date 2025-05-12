'use client';

import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useEventCategoryListQuery } from '@/queries/hooks/event';
import { Paths } from '@/utils/paths';

const CategoryNav: FC = () => {
  const {
    data: { data: categories },
  } = useEventCategoryListQuery();

  return (
    <nav className="hidden items-center md:flex">
      {categories.slice(0, 5).map(item => (
        <Button
          className="text-muted-foreground"
          key={item}
          variant="link"
          asChild
        >
          <Link
            className="capitalize"
            href={Paths.Main.Events({ category: item })}
          >
            {item}
          </Link>
        </Button>
      ))}
    </nav>
  );
};

export default CategoryNav;
