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
      <h3 className="mb-6 text-2xl font-semibold">Comments</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write your comment here..."
                    className="mb-2 min-h-[100px] bg-indigo-50 dark:bg-primary-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-2 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Send
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateComment;
