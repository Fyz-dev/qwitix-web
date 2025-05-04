'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const HIDDEN_SEGMENTS = ['organizer'];

const Breadcrumbs: FC = () => {
  const pathname = usePathname() ?? '';

  const rawSegments = pathname.split('/').filter(Boolean);
  const visibleSegments = rawSegments.filter(
    segment => !HIDDEN_SEGMENTS.includes(segment),
  );

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-2">
        {visibleSegments.map((segment, index) => {
          const isLast = index === visibleSegments.length - 1;
          const href =
            '/' +
            rawSegments
              .slice(
                0,
                rawSegments.findIndex(s => !HIDDEN_SEGMENTS.includes(s)) +
                  index +
                  1,
              )
              .join('/');

          return (
            <>
              {index !== 0 && <BreadcrumbSeparator />}
              <div key={href} className="flex items-center">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{capitalize(segment)}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
