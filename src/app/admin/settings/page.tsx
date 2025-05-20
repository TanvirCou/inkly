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

export default async function SettingsPage() {
  const info: Info = await getWebInfo();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your website settings</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <CardTitle>Website Configuration</CardTitle>
          </div>
          <CardDescription>
            Configure your website&apos;s basic information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm info={info} />
        </CardContent>
      </Card>
    </div>
  );
}
