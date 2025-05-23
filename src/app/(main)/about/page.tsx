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
    <div className="mx-auto max-w-3xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-indigo-700">
          About Inkly
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Inkly is your go-to platform for sharing and discovering insightful
          blogs on technology, development, and digital trends. Our mission is
          to empower creators and readers with a beautiful, modern, and
          easy-to-use blogging experience.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-6 md:flex-row">
          <div className="flex-1 rounded-lg bg-indigo-50 p-6 shadow-md dark:bg-primary-foreground">
            <h2 className="mb-2 text-xl font-semibold text-indigo-600">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              To foster a vibrant community where knowledge, creativity, and
              inspiration are shared freely and openly.
            </p>
          </div>
          <div className="flex-1 rounded-lg bg-indigo-50 p-6 shadow-md dark:bg-primary-foreground">
            <h2 className="mb-2 text-xl font-semibold text-indigo-600">
              Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              To become the leading platform for high-quality, accessible, and
              engaging content in the digital age.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-md text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
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
