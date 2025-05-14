'use client';

import { CloudUpload, Edit, Plus, X } from 'lucide-react';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EventSchemaType } from '@/validations/event';

interface EventMutationFormFieldProps {
  form: UseFormReturn<EventSchemaType>;
}

const EventMutationFormField: FC<EventMutationFormFieldProps> = ({ form }) => {
  const { setOpen: setDrawerVenueOpen, venue } = useVenueStore(state => state);

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="gap-0">
              Title<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} />
            </FormControl>
            <FormDescription>
              This is the title of your event. It should be descriptive and
              engaging.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add description for your event"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              This is the description of your event. It should provide detailed
              information about what attendees can expect.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

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
                        <Button variant="ghost" size="icon" className="size-7">
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

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="gap-0">
              Category<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Add category for your event" {...field} />
            </FormControl>
            <FormDescription>
              This is the category of your event. It helps attendees find your
              event based on their interests.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="venue"
        render={() => (
          <FormItem>
            <FormLabel className="gap-0">
              Venue<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              {venue ? (
                <Button
                  onClick={() => setDrawerVenueOpen('edit')}
                  type="button"
                  className="justify-between"
                  variant="outline"
                >
                  {venue.name}
                  <Edit />
                </Button>
              ) : (
                <Button
                  onClick={() => setDrawerVenueOpen('create')}
                  type="button"
                  variant="outline"
                >
                  <Plus />
                  Add venue
                </Button>
              )}
            </FormControl>
            <FormDescription>
              This is the venue of your event. It should provide detailed
              information about where the event will take place.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default EventMutationFormField;
