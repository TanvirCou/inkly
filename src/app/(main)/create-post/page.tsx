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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';

import UploadDropZone from '@/components/create-post/UploadDropZone';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => {
    return (
      <div className="flex h-[150px] w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  },
});
import 'react-quill-new/dist/quill.snow.css';
import UploadThingButton from '@/components/create-post/UploadThingButton';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters.' })
    .max(50, { message: 'Title must be less than 50 characters.' }),
  desc: z
    .string()
    .min(2, { message: 'Description must be at least 2 characters.' })
    .max(200, { message: 'Description must be less than 200 characters.' }),
  category: z.enum([
    'general',
    'web-design',
    'development',
    'databases',
    'search-engines',
    'marketing',
    'gaming',
    'fotball',
  ]),
});

const categories = [
  {
    label: 'General',
    value: 'general',
  },
  {
    label: 'Web Design',
    value: 'web-design',
  },
  {
    label: 'Development',
    value: 'development',
  },
  {
    label: 'Databases',
    value: 'databases',
  },
  {
    label: 'Search Engines',
    value: 'search-engines',
  },
  {
    label: 'Marketing',
    value: 'marketing',
  },
  {
    label: 'Gaming',
    value: 'gaming',
  },
  {
    label: 'Fotball',
    value: 'fotball',
  },
];

const CreatePostPage = () => {
  const [value, setValue] = useState('');
  const [cover, setCover] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    img && setValue((prev) => prev + `<p><img src="${img}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video}"/></p>`
      );
  }, [video]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      desc: '',
      category: 'general',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await getToken();
    const newPost = {
      title: values.title,
      desc: values.desc,
      category: values.category,
      cover: cover,
      content: value,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    if (res.ok) {
      const data = await res.json();
      const formattedDate = format(
        parseISO(data.createdAt),
        "MMMM d, yyyy 'at' h:mm a"
      );
      toast({
        title: 'Post created successfully',
        description: formattedDate,
      });
      router.push(`/posts/${data.slug}`);
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-2 px-4 py-4 sm:px-6 md:px-8 lg:px-16">
      <p className="text-2xl font-bold text-gray-800 dark:text-white">
        Create Blogs
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 md:w-[80%] lg:w-[60%]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="My Awesome Blog"
                    {...field}
                    className="rounded-none border-x-0 border-b-2 border-t-0 text-center placeholder:text-2xl focus:border-none focus:outline-none md:text-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="This is a description of my blog"
                    {...field}
                    className="bg-gray-50 shadow-sm focus:border-indigo-500 focus:outline-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 dark:bg-primary-foreground"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-gray-50 dark:bg-primary-foreground">
                      <SelectValue placeholder="General" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((i) => (
                        <SelectItem key={i.value} value={i.value}>
                          {i.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative">
            <ReactQuill
              theme="snow"
              className="w-full rounded-md bg-gray-50 shadow-md dark:bg-primary-foreground"
              value={value}
              onChange={setValue}
            />
            <div className="absolute right-4 top-2.5 flex gap-3">
              <UploadThingButton
                type="image"
                endpoint="imageUploader"
                setData={setImg}
              />
              <UploadThingButton
                type="video"
                endpoint="videoUploader"
                setData={setVideo}
              />
            </div>
          </div>

          <UploadDropZone setImageUrl={setCover} imageUrl={cover} />
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostPage;
