import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, MessageSquare, User, Clock } from 'lucide-react';
import { getInquiries } from '@/lib/api/fetch-inquiries';
import { Contact } from '@/lib/types/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Inquiries | Inkly Admin',
  description:
    'View and manage all contact form submissions and user inquiries received on Inkly.',
};

export default async function ContactInquiriesPage() {
  const inquiries: Contact[] = await getInquiries();
  return (
    <div className="p-6">
      <div className="mb-8 space-y-1">
        <div className="relative inline-block">
          <h1 className="bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            User Inquiries
          </h1>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          View and manage contact form submissions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {inquiries.map((inquiry) => (
          <Card
            key={inquiry._id}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <CardHeader className="relative space-y-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="rounded-full bg-indigo-100 p-1.5 dark:bg-indigo-900/30">
                  <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {inquiry.firstName} {inquiry.lastName}
                </span>
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4" />
                {inquiry.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {inquiry.subject}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <MessageSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  Message
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {inquiry.message}
                </p>
              </div>
              <div className="flex items-center gap-2 border-t pt-3 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
