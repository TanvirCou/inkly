'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: 'Title must be at least 5 characters.' })
    .max(50, { message: 'Title must be less than 50 characters.' }),
  bio: z
    .string()
    .min(20, { message: 'Bio must be at least 10 characters.' })
    .max(210, { message: 'Bio must be less than 50 characters.' }),
  fbLink: z.string(),
  twitterLink: z.string(),
  instagramLink: z.string(),
});

const BioForm = ({
  title,
  bio,
  fbLink,
  twitterLink,
  instagramLink,
}: {
  title: string;
  bio: string;
  fbLink: string;
  twitterLink: string;
  instagramLink: string;
}) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || '',
      bio: bio || '',
      fbLink: fbLink || '',
      twitterLink: twitterLink || '',
      instagramLink: instagramLink || '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      const formattedDate = format(
        parseISO(new Date().toISOString()),
        "MMMM d, yyyy 'at' h:mm a"
      );
      toast({
        title: 'Information updated successfully',
        description: formattedDate,
      });
      router.refresh();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update info',
        variant: 'destructive',
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Title</FormLabel>
              <FormControl>
                <Input placeholder="Senior Developer" {...field} />
              </FormControl>
              <FormDescription>
                This title will appear on your public profile
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
              <FormLabel> Profile Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I’m a frontend developer who loves clean design and good coffee."
                  {...field}
                />
              </FormControl>
              <FormDescription>Tell us a bit about you</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fbLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook Link</FormLabel>
              <FormControl>
                <Input placeholder="facebook.com/username" {...field} />
              </FormControl>
              <FormDescription>
                This facebook link will appear on your public profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter Link</FormLabel>
              <FormControl>
                <Input placeholder="twitter.com/username" {...field} />
              </FormControl>
              <FormDescription>
                This twitter link will appear on your public profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagramLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram Link</FormLabel>
              <FormControl>
                <Input placeholder="instagram.com/username" {...field} />
              </FormControl>
              <FormDescription>
                This instagram link will appear on your public profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};

export default BioForm;
