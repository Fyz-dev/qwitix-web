import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default async function Page() {
  return (
    <div className="mt-10">
      <div className="flex gap-16">
        <div className="w-full">
          <h1 className="text-4xl font-extrabold text-foreground">
            No Hidden Fees. More Savings.
          </h1>
          <h2 className="mt-4 text-base text-muted-foreground">
            We help customers save money and time.
          </h2>

          <div className="relative mt-8 h-20 rounded-full bg-muted">
            <Input
              placeholder="Search by artist, team, event or venue"
              className="h-full w-full border-none bg-transparent indent-10 shadow-none ring-0 focus-visible:ring-0 md:text-lg"
            />
            <Button
              className="absolute right-5 top-[calc(50%-18px)] rounded-full"
              size="icon"
            >
              <Search />
            </Button>
          </div>
        </div>

        <div className="min-w-[42%]">
          <article
            className={cn(
              'bg-[url(https://static.tickpick.com/cdn-cgi/image/fit=cover,width=800/content/web/homepage-cards/YqI8168.png)]',
              'bg-cover bg-center bg-no-repeat',
              'flex h-[480px] w-full flex-col justify-center rounded-3xl px-14 py-5',
            )}
          >
            <span className="mb-3 w-full text-nowrap text-2xl font-extrabold text-white">
              BuyerTrust Guarantee
            </span>
            <span className="w-full text-base text-white">
              All tickets are 100% guaranteed to be valid. If there's ever an
              issue, we'll replace them on the spot.
            </span>

            <Button
              size="lg"
              className="mt-11 h-[56px] w-min rounded-full px-11 font-bold"
            >
              Learn More
            </Button>
          </article>
        </div>
      </div>
    </div>
  );
}
