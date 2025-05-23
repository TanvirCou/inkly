import ContactForm from '@/components/contact/ContactForm';
import { getSingleUser } from '@/lib/api/fetch-users';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const ContactPage = async () => {
  const user = await getSingleUser();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Have questions? We&apos;d love to hear from you. Send us a message and
          we&apos;ll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-primary-foreground">
            <h2 className="mb-6 text-2xl font-semibold">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    support@inkly.com
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-primary-foreground">
            <h2 className="mb-6 text-2xl font-semibold">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                <Linkedin className="h-6 w-6" />
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
