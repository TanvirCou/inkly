import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, MessageSquare, User } from 'lucide-react';
import { getInquiries } from '@/lib/api/fetch-inquiries';
import { Contact } from '@/lib/types/types';

export default async function ContactInquiriesPage() {
  const inquiries: Contact[] = await getInquiries();
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Contact Inquiries</h1>
        <p className="text-muted-foreground">
          View and manage contact form submissions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {inquiries.map((inquiry) => (
          <Card key={inquiry._id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-500" />
                {inquiry.firstName} {inquiry.lastName}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {inquiry.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-muted-foreground">
                    Subject
                  </h3>
                  <p className="text-sm">{inquiry.subject}</p>
                </div>
                <div>
                  <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {inquiry.message}
                  </p>
                </div>
                <div className="border-t pt-2 text-xs text-muted-foreground">
                  Received on{' '}
                  {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
