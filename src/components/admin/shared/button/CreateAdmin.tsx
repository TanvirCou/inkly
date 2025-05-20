'use client';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';

const formSchema = z.object({
  email: z.string().email({ message: 'Email isnot valid' }),
});

const CreateAdmin = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/makeAdmin`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
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
      setOpen(false);
      form.reset();
      router.refresh();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to create admin',
        variant: 'destructive',
      });
    }
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          <PlusCircle className="mr-1" />
          Create Admin
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Admin</SheetTitle>
          <SheetDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex h-[88vh] flex-col justify-between"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@gmail.com"
                          {...field}
                          className="shadow-sm focus:border-indigo-500 focus:outline-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 dark:bg-primary-foreground"
                        />
                      </FormControl>
                      <FormDescription>
                        You need to enter an email address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CreateAdmin;
