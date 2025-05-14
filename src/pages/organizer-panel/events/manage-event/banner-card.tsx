import { Ticket, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'sonner';

import EditBannerDialog from '../components/edit-banner-dialog';

import { Button } from '@/components/ui/button';
import { ResponseEventDTO } from '@/gen/data-contracts';
import { useDeleteImageEventMutation } from '@/queries/hooks/event';

interface BannerCardProps {
  event: ResponseEventDTO;
}

const BannerCard: FC<BannerCardProps> = ({ event }) => {
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);

  const deleteImageMutation = useDeleteImageEventMutation(event.id);

  const onDeleteImage = () => {
    const deleteImagePromise = deleteImageMutation.mutateAsync();

    toast.promise(deleteImagePromise, {
      loading: 'Deleting image...',
      success: 'Image successfully deleted!',
      error: 'Failed to delete image.',
    });

    deleteImagePromise.then(() => {
      router.refresh();
    });
  };

  return (
    <div
      className="bg-muted relative flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {event.imgUrl ? (
        <>
          <div
            className="absolute inset-0 bg-center"
            style={{
              backgroundImage: `url(${event.imgUrl})`,
              filter: 'blur(10px)',
            }}
          />
          <Image
            width={500}
            height={500}
            src={event.imgUrl}
            alt={event.title}
            className="relative h-full w-full object-contain"
          />
        </>
      ) : (
        <Ticket className="size-8" />
      )}

      <div
        className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/40 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <EditBannerDialog event={event} />
        {event.imgUrl && (
          <Button
            onClick={onDeleteImage}
            type="button"
            variant="destructive"
            size="icon"
            aria-label="Delete image"
            className="hover:bg-destructive bg-destructive!"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BannerCard;
