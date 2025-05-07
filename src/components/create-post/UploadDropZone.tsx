'use client';

import { UploadDropzone } from '@/utils/uploadthing';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

type UploadDropZoneProps = {
  setImageUrl: (url: string) => void;
  imageUrl: string;
};

export default function UploadDropZone({
  setImageUrl,
  imageUrl,
}: UploadDropZoneProps) {
  return (
    <main>
      <div>
        {imageUrl ? (
          <div className="relative">
            <div className="relative h-[250px] w-full">
              <Image
                src={imageUrl}
                alt=""
                fill
                className="rounded-md object-contain"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-0"
              onClick={() => setImageUrl('')}
            >
              <Trash2 className="h-5 w-5 text-red-600" />
            </Button>
          </div>
        ) : (
          <UploadDropzone
            className="border-indigo-600 ut-button:bg-indigo-600 ut-allowed-content:hidden ut-label:text-indigo-600 ut-upload-icon:text-indigo-600 dark:border-gray-800 dark:bg-primary-foreground dark:ut-label:text-gray-300 dark:ut-upload-icon:text-gray-300"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              console.log('Files: ', res);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
      </div>
    </main>
  );
}
