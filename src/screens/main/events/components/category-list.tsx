'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { useEventCategoryListQuery } from '@/queries/hooks/event';

const CategoryList: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    data: { data: categories },
  } = useEventCategoryListQuery();

  const selectedCategories = searchParams?.getAll('category') ?? [];

  const onCategoryChange = (category: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (checked) {
      params.append('category', category);
    } else {
      params.delete('category', category);
    }

    params.delete('page');

    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col space-y-2">
      {categories.map(category => {
        const isChecked = selectedCategories.includes(category);

        return (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              defaultChecked={isChecked}
              onCheckedChange={checked => onCategoryChange(category, !!checked)}
            />
            <label
              htmlFor={category}
              className="text-sm leading-none font-medium capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
