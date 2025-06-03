'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  desc: z
    .string()
    .min(1, { message: 'Please write something' })
    .max(200, { message: 'Comment must be less than 200 characters' }),
});

const CreateComment = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desc: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await getToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${postId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    );

    if (res.ok) {
      const data = await res.json();
      const formattedDate = format(
        parseISO(data.createdAt),
        "MMMM d, yyyy 'at' h:mm a"
      );
      toast({
        title: 'Comment created successfully',
        description: formattedDate,
      });
      form.reset();
      router.refresh();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to create comment',
        variant: 'destructive',
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-12">
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts..."
                    className="mb-3 min-h-[120px] resize-none rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 p-4 text-base shadow-sm backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-indigo-300 focus:bg-white focus:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-indigo-800/50 dark:from-gray-900/80 dark:via-indigo-950/30 dark:to-purple-950/30 dark:placeholder:text-gray-500 dark:focus:border-indigo-700 dark:focus:bg-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:from-indigo-500 hover:to-purple-500"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            </div>
            <span className="relative">Post Comment</span>
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateComment;
