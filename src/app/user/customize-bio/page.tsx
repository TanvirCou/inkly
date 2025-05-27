import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BioForm from '@/components/user/customize-bio/BioForm';
import { getSingleUser } from '@/lib/api/fetch-users';
import { UserPen } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customize Profile | Inkly',
  description:
    'Personalize your Inkly profile by updating your information and preferences.',
};

export default async function CustomizeInfoPage() {
  const user = await getSingleUser();

  return (
    <div className="p-6">
      <div className="mb-8 space-y-1">
        <div className="relative inline-block">
          <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            Customize Information
          </h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customize your profile to make it more personal
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card className="overflow-hidden border-gray-200/50 transition-all duration-300 hover:border-indigo-500/20 dark:border-gray-800/50 dark:hover:border-indigo-500/20">
          <CardHeader className="border-b border-gray-100 bg-white/50 dark:border-gray-800/50 dark:bg-gray-950/50">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                  <UserPen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Customize Information
                </CardTitle>
              </div>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                Edit your title & bio to personalize your profile
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <BioForm
              title={user?.title}
              bio={user?.bio}
              fbLink={user?.fbLink}
              twitterLink={user?.twitterLink}
              instagramLink={user?.instagramLink}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
