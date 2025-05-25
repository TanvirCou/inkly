import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Inkly',
  description:
    'Inkly is a blog platform dedicated to empowering writers and readers. Find out who we are and what we stand for.',
};

const faqs = [
  {
    question: 'What is Inkly?',
    answer:
      'Inkly is a modern blogging platform focused on delivering high-quality content about technology, development, and digital trends. It offers a seamless experience for both writers and readers, with powerful tools for content creation and discovery.',
  },
  {
    question: 'How do I create an account?',
    answer:
      'Click the Login button in the top right and sign up using your email or a supported OAuth provider (Google, GitHub, etc.).',
  },
  {
    question: 'Can I write my own blogs?',
    answer:
      'Yes! Once you are logged in, you can create, edit, and publish your own blogs from your dashboard.',
  },
  {
    question: 'Is Inkly free to use?',
    answer:
      'Absolutely. Reading and writing blogs on Inkly is free for everyone.',
  },
  {
    question: 'How can I contact support?',
    answer:
      'You can reach out to us via the contact form on the Contact page or email us at support@inkly.com.',
  },
];

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <div className="mb-12">
          <h1 className="relative mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            About Inkly
            <span className="absolute -bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Inkly is your go-to platform for sharing and discovering insightful
            blogs on technology, development, and digital trends. Our mission is
            to empower creators and readers with a beautiful, modern, and
            easy-to-use blogging experience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <h2 className="relative mb-4 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-300 dark:to-purple-400">
              Our Mission
            </h2>
            <p className="relative text-gray-700 dark:text-gray-200">
              To foster a vibrant community where knowledge, creativity, and
              inspiration are shared freely and openly.
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <h2 className="relative mb-4 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-300 dark:to-purple-400">
              Our Vision
            </h2>
            <p className="relative text-gray-700 dark:text-gray-200">
              To become the leading platform for high-quality, accessible, and
              engaging content in the digital age.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="relative bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:via-indigo-300 dark:to-indigo-500">
            Frequently Asked Questions
            <span className="absolute -bottom-2 left-0 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-indigo-100 via-purple-50 to-transparent dark:from-indigo-800/50 dark:via-purple-900/30 dark:to-transparent"></div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="group border-b border-indigo-100 dark:border-gray-800"
            >
              <AccordionTrigger className="text-md py-6 text-left font-medium text-gray-800 transition-colors hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default AboutPage;
