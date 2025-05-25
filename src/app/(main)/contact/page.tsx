import ContactForm from '@/components/contact/ContactForm';
import { getSingleUser } from '@/lib/api/fetch-users';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Inkly',
  description:
    'Contact the Inkly team for support, feedback, or collaborations.',
};

const ContactPage = async () => {
  const user = await getSingleUser();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="relative mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
          Get in Touch
          <span className="absolute -bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          Have questions? We&apos;d love to hear from you. Send us a message and
          we&apos;ll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="group relative overflow-hidden rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <h2 className="relative mb-8 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-300 dark:to-purple-400">
              Contact Information
            </h2>
            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Email
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    support@inkly.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Phone
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <h2 className="relative mb-8 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-300 dark:to-purple-400">
              Follow Us
            </h2>
            <div className="relative flex gap-6">
              <a
                href="#"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 text-white transition-transform duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 text-white transition-transform duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 text-white transition-transform duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm
          firstName={user?.firstName}
          lastName={user?.lastName}
          email={user?.email}
          id={user?._id}
        />
      </div>
    </div>
  );
};

export default ContactPage;
