'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUpload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useOrganizerStore } from '../../providers/organizer-provider';
import EventMutationFormField from '../components/event-mutation-form-field';
import { useVenueStore } from '../providers/venue-store-provider';

import { Button } from '@/components/ui/button';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/ui/file-upload';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import {
  useCreateEventMutation,
  useUploadImageEventMutation,
} from '@/queries/hooks/event';
import { Paths } from '@/utils/paths';
import { eventSchema, EventSchemaType } from '@/validations/event';

const CreateForm: FC = () => {
  const router = useRouter();

  const venue = useVenueStore(state => state.venue);
  const organizer = useOrganizerStore(state => state.organizer);

  const createEventMutation = useCreateEventMutation();
  const uploadEventImageMutation = useUploadImageEventMutation();

  const form = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      venue: undefined,
      imgFile: [],
    },
  });

  const onSubmit = (data: EventSchemaType) => {
    const createEventPromise = createEventMutation.mutateAsync({
      ...data,
      organizerId: organizer.id,
    });

    toast.promise(createEventPromise, {
      loading: 'Creating event...',
      success: 'Event successfully created!',
      error: 'Failed to create event.',
    });

    createEventPromise.then(({ data: eventData }) => {
      if (!(data.imgFile && data.imgFile.length > 0)) return;

      const uploadImagePromise = uploadEventImageMutation.mutateAsync({
        id: eventData.id,
        Image: data.imgFile[0],
      });

      toast.promise(uploadImagePromise, {
        loading: 'Upload image...',
        success: 'Image successfully upload!',
        error: 'Failed to upload image.',
      });

      uploadImagePromise.then(() => {
        router.push(Paths.Organizer.Events);
      });
    });
  };

  useEffect(() => {
    if (venue)
      form.setValue('venue', venue, {
        shouldValidate: true,
      });
  }, [venue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <EventMutationFormField form={form}>
          <FormField
            control={form.control}
            name="imgFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onValueChange={field.onChange}
                    accept="image/*"
                    maxFiles={1}
                    maxSize={5 * 1024 * 1024}
                    onFileReject={(_, message) => {
                      form.setError('imgFile', {
                        message,
                      });
                    }}
                  >
                    <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                      <CloudUpload className="size-4" />
                      Drag and drop or
                      <FileUploadTrigger asChild>
                        <Button variant="link" size="sm" className="p-0">
                          choose files
                        </Button>
                      </FileUploadTrigger>
                      to upload
                    </FileUploadDropzone>
                    <FileUploadList>
                      {field.value?.map((file, index) => (
                        <FileUploadItem key={index} value={file}>
                          <FileUploadItemPreview />
                          <FileUploadItemMetadata />
                          <FileUploadItemDelete asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7"
                            >
                              <X />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </FileUploadItemDelete>
                        </FileUploadItem>
                      ))}
                    </FileUploadList>
                  </FileUpload>
                </FormControl>
                <FormDescription>Upload 1 images up to 5MB.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </EventMutationFormField>

        <Button type="submit" disabled={createEventMutation.isPending}>
          {createEventMutation.isPending ? (
            <>
              <Spinner size="small" className="text-current" />
              Creating...
            </>
          ) : (
            'Create event'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;
