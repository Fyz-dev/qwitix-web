'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

const SearchInput: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams?.get('search') || '',
  );
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery !== searchParams?.get('search')) {
      const params = new URLSearchParams(searchParams?.toString());

      if (debouncedSearchQuery.trim() !== '') {
        params.set('search', debouncedSearchQuery);
      } else {
        params.delete('search');
      }

      params.delete('page');

      router.replace(`?${params.toString()}`);
    }
  }, [debouncedSearchQuery]);

  return (
    <Input
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default SearchInput;
