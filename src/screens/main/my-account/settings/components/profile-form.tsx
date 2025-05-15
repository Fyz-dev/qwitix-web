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
import { useUpdateAccountMutation } from '@/queries/hooks/account';
import { useAuthUser } from '@/stores';
import { userSchema, UserSchemaType } from '@/validations/user';

const ProfileForm: FC = () => {
  const { user } = useAuthUser(state => state);

  const updateMutation = useUpdateAccountMutation();

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: user?.fullName || '',
    },
  });

  const onSubmit = (data: UserSchemaType) => {
    const promise = updateMutation.mutateAsync({ ...data });

    toast.promise(promise, {
      loading: 'Updating account...',
      success: () => 'Account successfully updated!',
      error: 'Failed to update account.',
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:max-w-xl"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
