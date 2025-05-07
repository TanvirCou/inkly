'use client';

import { UploadButton } from '@/utils/uploadthing';
import { FileVideo, ImageUp } from 'lucide-react';

type UploadThingButtonProps = {
  type: 'image' | 'video';
  endpoint: 'imageUploader' | 'videoUploader';
  setData: (url: string) => void;
};

export default function UploadThingButton({
  type,
  endpoint,
  setData,
}: UploadThingButtonProps) {
  return (
    <main className="flex items-center">
      <UploadButton
        className="ut-button:h-fit ut-button:w-fit ut-button:bg-background ut-allowed-content:hidden ut-readying:bg-background ut-ready:bg-background ut-uploading:bg-background"
        endpoint={endpoint}
        content={{
          button:
            type === 'image' ? (
              <ImageUp className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <FileVideo className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ),
        }}
        onClientUploadComplete={(res) => {
          setData(res[0].url);
          console.log('Files: ', res);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
