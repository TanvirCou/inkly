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
import { Info } from '@/lib/types/types';

const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: 'Title must be at least 10 characters.' })
    .max(50, { message: 'Title must be less than 50 characters.' }),
  desc: z
    .string()
    .min(20, { message: 'Description must be at least 10 characters.' })
    .max(210, { message: 'Description must be less than 50 characters.' }),
});

const SettingsForm = ({ info }: { info: Info }) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: info.title,
      desc: info.desc,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/webinfo/update`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: info._id, ...values }),
      }
    );

    if (res.ok) {
      const formattedDate = format(
        parseISO(new Date().toISOString()),
        "MMMM d, yyyy 'at' h:mm a"
      );
      toast({
        title: 'Admin created successfully',
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
              <FormLabel>Website HeadLine</FormLabel>
              <FormControl>
                <Input placeholder="Best Coffee Shop in Brooklyn" {...field} />
              </FormControl>
              <FormDescription>
                A prominent headline that highlights your website’s main
                message.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Artisan coffee shop in downtown Austin offering organic blends and local treats"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief description of your website
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

export default SettingsForm;
