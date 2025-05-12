'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { EVENT_PAGINATION_PAGE_SIZE } from '@/const';
import { ResponseEventDTOPaginationResponse } from '@/gen/data-contracts';

interface EventPaginationProps {
  events: ResponseEventDTOPaginationResponse;
}

const EventPagination: FC<EventPaginationProps> = ({ events }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(searchParams?.get('page') || 1);
  const totalPages = Math.ceil(events.totalCount / EVENT_PAGINATION_PAGE_SIZE);

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());

    params.set('page', page.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="mt-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageLink(currentPage - 1)}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageLink(i + 1)}
              isActive={i + 1 === currentPage}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={createPageLink(currentPage + 1)}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default EventPagination;
