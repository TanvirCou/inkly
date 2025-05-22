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

export default async function SettingsPage() {
  const user = await getSingleUser();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Customize Bio</h1>
        <p className="text-muted-foreground">
          Customize your profile to make it more personal
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserPen className="h-6 w-6" />
            <CardTitle>Customize Information</CardTitle>
          </div>
          <CardDescription>Edit your title & bio</CardDescription>
        </CardHeader>
        <CardContent>
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
  );
}
