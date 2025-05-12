'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateOrganizerMutation } from '@/queries/hooks/organizer';
import { organizerSchema, OrganizerSchemaType } from '@/validations/organizer';

const RegisterForm: FC = () => {
  const createOrganizerMutation = useCreateOrganizerMutation();

  const form = useForm<OrganizerSchemaType>({
    resolver: zodResolver(organizerSchema),
    defaultValues: {
      name: '',
      bio: '',
      imageUrl: undefined,
    },
  });

  const onSubmit = (data: OrganizerSchemaType) => {
    const promise = createOrganizerMutation.mutateAsync({
      ...data,
    });

    toast.promise(promise, {
      loading: 'Creating organizer...',
      success: () => 'Organizer successfully created!',
      error: 'Failed to create organizer.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your organization's
                name, your name, or a pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
