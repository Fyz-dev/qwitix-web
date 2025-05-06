'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const HIDDEN_SEGMENTS = ['organizer'];

const isId = (segment: string) => /^[a-f\d]{24}$/i.test(segment);

const Breadcrumbs: FC = () => {
  const pathname = usePathname() ?? '';
  const segments = pathname.split('/').filter(Boolean);

  const visibleSegments = segments.filter(
    segment => !HIDDEN_SEGMENTS.includes(segment) && !isId(segment),
  );

  const firstVisibleIndex = segments.findIndex(
    s => !HIDDEN_SEGMENTS.includes(s),
  );

  const formatSegment = (s: string) =>
    s
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-2">
        {visibleSegments.map((segment, index) => {
          const isLast = index === visibleSegments.length - 1;
          const href =
            '/' + segments.slice(0, firstVisibleIndex + index + 1).join('/');

          return (
            <Fragment key={href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{formatSegment(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
