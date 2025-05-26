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
  label: z
    .string()
    .min(2, { message: 'Category must be at least 2 characters' })
    .max(20, { message: 'Category must be less than 20 characters.' }),
});

const CreateCategory = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/create`,
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
      const formattedDate = format(
        parseISO(new Date().toISOString()),
        "MMMM d, yyyy 'at' h:mm a"
      );
      toast({
        title: 'Category created successfully',
        description: formattedDate,
      });
      setOpen(false);
      form.reset();
      router.refresh();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to create category',
        variant: 'destructive',
      });
    }
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-700 text-white transition-all duration-300 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-lg hover:shadow-indigo-500/25">
          <div className="relative flex items-center">
            <PlusCircle className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span>Create Category</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="space-y-4">
          <SheetTitle className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            Create Category
          </SheetTitle>
          <SheetDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-6"
              >
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Marketing"
                          {...field}
                          className="rounded-lg border-gray-200 bg-white px-4 py-2 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                        Enter a unique category title (2-20 characters)
                      </FormDescription>
                      <FormMessage className="text-sm font-medium text-red-500 dark:text-red-400" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="group relative mt-6 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-2 text-white shadow-sm transition-all duration-300 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:hover:shadow-indigo-500/10"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="text-sm font-medium">Create Category</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCategory;
