import SettingsForm from '@/components/admin/settings/SettingsForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getWebInfo } from '@/lib/api/fetch-info';
import { Info } from '@/lib/types/types';
import { Settings } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | Inkly Admin',
  description: 'Manage your website settings from the Inkly admin dashboard.',
};

export default async function SettingsPage() {
  const info: Info = await getWebInfo();

  return (
    <div className="min-h-screen space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
          Website Settings
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Configure and customize your website&apos;s appearance and
          functionality
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden backdrop-blur-sm">
          <CardHeader className="border-b bg-gray-50/80 dark:bg-gray-900/80">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-lg">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  General Configuration
                </CardTitle>
                <CardDescription className="mt-1 text-gray-600 dark:text-gray-400">
                  Manage your website&apos;s core settings and information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6 space-y-6">
              <SettingsForm info={info} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
