'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' })
    .max(50, { message: 'First name must be less than 50 characters.' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' })
    .max(50, { message: 'Last name must be less than 50 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  subject: z
    .string()
    .min(2, { message: 'Subject must be at least 2 characters.' })
    .max(50, { message: 'Subject must be less than 50 characters.' }),
  message: z
    .string()
    .min(2, { message: 'Message must be at least 2 characters.' })
    .max(500, { message: 'Message must be less than 500 characters.' }),
});

const ContactForm = ({
  firstName,
  lastName,
  email,
  id,
}: {
  firstName?: string;
  lastName?: string;
  email?: string;
  id?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      subject: '',
      message: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contact/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, id }),
      }
    );

    console.log(res);

    if (res.ok) {
      const data = await res.json();
      const formattedDate = format(
        parseISO(data.createdAt),
        "MMMM d, yyyy 'at' h:mm a"
      );
      toast({
        title: 'Message sent successfully',
        description: formattedDate,
      });
      form.reset();
      router.refresh();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      <h2 className="relative mb-8 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-300 dark:to-purple-400">
        Send us a Message
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      className="border-indigo-100 bg-white/50 backdrop-blur-sm transition-all focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      className="border-indigo-100 bg-white/50 backdrop-blur-sm transition-all focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-200">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    {...field}
                    className="border-indigo-100 bg-white/50 backdrop-blur-sm transition-all focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-200">
                  Subject
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="How can we help?"
                    {...field}
                    className="border-indigo-100 bg-white/50 backdrop-blur-sm transition-all focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-200">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message here..."
                    {...field}
                    className="min-h-[150px] border-indigo-100 bg-white/50 backdrop-blur-sm transition-all focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600"
          >
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
