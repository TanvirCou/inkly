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
import { Category } from '@/lib/types/types';

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters.' })
    .max(50, { message: 'Title must be less than 50 characters.' }),
  desc: z
    .string()
    .min(2, { message: 'Description must be at least 2 characters.' })
    .max(200, { message: 'Description must be less than 200 characters.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
});

const CreatePostForm = ({ categories }: { categories: Category[] }) => {
  const [value, setValue] = useState('');
  const [cover, setCover] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [contentError, setContentError] = useState<string>('');
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
      category: '',
    },
  });

  console.log(value);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (value === '<p><br></p>' || value === '') {
      setContentError('Please add some content to your post');
      return;
    }
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full space-y-6 md:w-[80%] lg:w-[70%]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Title of your story"
                  {...field}
                  className="border-none bg-transparent text-center text-3xl font-bold tracking-tight focus:ring-0 md:text-4xl"
                />
              </FormControl>
              <FormMessage className="text-center" />
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
                  placeholder="Brief description of your story..."
                  {...field}
                  className="min-h-[100px] rounded-xl border-indigo-100 bg-white/50 p-4 text-base shadow-sm backdrop-blur-sm focus:border-indigo-300 focus:ring-indigo-200 dark:border-indigo-800/50 dark:bg-gray-900/50"
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
                  <SelectTrigger className="h-12 rounded-xl border-indigo-100 bg-white/50 backdrop-blur-sm hover:border-indigo-200 dark:border-indigo-800/50 dark:bg-gray-900/50">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-indigo-100 bg-white shadow-lg dark:border-indigo-800/50 dark:bg-gray-900">
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

        <div className="space-y-2">
          <div className="relative rounded-xl border border-indigo-100 bg-white/50 shadow-sm backdrop-blur-sm dark:border-indigo-800/50 dark:bg-gray-900/50">
            <ReactQuill
              theme="snow"
              className="[&_.ql-container]:rounded-b-xl [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base [&_.ql-editor]:leading-relaxed [&_.ql-toolbar]:rounded-t-xl"
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
          {contentError && (
            <p className="text-sm font-medium text-red-500">{contentError}</p>
          )}
        </div>

        <div className="space-y-6 pt-4">
          <UploadDropZone setImageUrl={setCover} imageUrl={cover} />
          <Button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-purple-500"
          >
            Publish Story
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
