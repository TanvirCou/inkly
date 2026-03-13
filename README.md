# ✍️ Inkly — Modern Multi-Role Blog Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-purple)](https://clerk.com/)
[![ShadcnUI](https://img.shields.io/badge/ShadcnUI-Library-black)](https://ui.shadcn.com/)

## Overview

**Inkly** is a high-performance, responsive blog web application built with Next.js 15, TypeScript, and Tailwind CSS. It provides a seamless writing and reading experience with dedicated dashboards for **Users** (Authors) and **Administrators**, featuring secure multi-role authentication via Clerk and advanced content management tools.

---

## 📺 Live Demo

🔗 [https://inkly-six.vercel.app](https://inkly-six.vercel.app)

---

## 🔗 Repositories

- **Client (This Repo):** [Frontend Repository](https://github.com/TanvirCou/inkly)
- **Server:** [Backend Repository](https://github.com/TanvirCou/inkly-server)

---

## 👥 Demo Accounts

For testing the application with different roles:

| Role | Email | Password |
|---|---|---|
| **Standard User** | `kta516930@gmail.com` | `tanvir1234` |
| **Administrator** | `ahmed.tnvr999@gmail.com` | `tanvir1234` |

---

## 🚀 Features

### 🔐 Authentication & Role Management

- **Secure Multi-Role Access:** Powered by **Clerk**, providing seamless registration, login, and secure session management.
- **Dynamic Dashboards:**
  - **User (Author):** Create, edit, and manage personal blog posts, track activity, and customize profiles.
  - **Admin:** Complete platform oversight including user management, post moderation, and site settings.

---

### 📝 Content Management

- **Rich Text Editing:** Full-featured blog post creation using **React Quill**, supporting formatted text, images, and links.
- **Image Handling:** Reliable and fast image uploads integrated with **Uploadthing**.
- **Categorization:** Organize content into categories for better discoverability.
- **Featured Posts:** Highlight premium content on the homepage and specialized sections.
- **Saved Posts:** Users can bookmark their favorite reads for easy access later.

---

### 🧑‍💼 User & Admin Dashboards

- **Author Tools (User):**
  - **Activity Feed:** Track post engagement and personal statistics.
  - **Bio Customization:** Update personal information and author profile.
  - **Post Management:** Full CRUD operations for personal blog entries.
- **Platform Management (Admin):**
  - **Dashboard Analytics:** Visual overview of platform growth and engagement.
  - **User Directory:** Manage and monitor all registered users.
  - **Content Moderation:** Oversee and edit any post on the platform.
  - **Inquiry Management:** Handle contact forms and user support requests.
  - **Site Settings:** Global configuration for platform-wide preferences.

---

### 🎨 User Experience & Design

- **Modern Aesthetics:** Built with **shadcn/ui** and **Radix UI** for a premium, accessible component library.
- **Responsive Layout:** Pixel-perfect design across mobile, tablet, and desktop devices.
- **Performance Optimized:** Utilizing Next.js 15's latest capabilities like Server Components and advanced caching.
- **Dynamic Interactions:** Smooth carousels (Embla) and toast notifications for real-time feedback.

---

## 📸 Screenshots

### Home Page

![Home Page Screenshot](https://i.postimg.cc/zvdZdGYN/inkly-home.jpg)

### Blog Details Page

![Blog Details Page Screenshot](https://i.postimg.cc/C1NW1x1m/inkly-blog-details.jpg)  

### User Dashboard

![User Dashboard Screenshot](https://i.postimg.cc/jqMpY2Bx/inkly-user.jpg)

### Admin Dashboard

![Admin Dashboard Screenshot](https://i.postimg.cc/CKC2Pxbv/inkly-admin.jpg)

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15.2.8 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3.4.1 + shadcn/ui |
| **Authentication** | Clerk 6.19.0 |
| **Content Editor** | React Quill New 3.4.6 |
| **Form Management** | React Hook Form 7.56.2 + Zod 3.24.4 |
| **Image Upload** | Uploadthing 7.4.0 |

---

## 📁 Project Structure (Important Files)

**src/app/layout.tsx** — Root layout  
**src/app/globals.css** — Global CSS file  
**src/app/loading.tsx** — Global loading UI  
**src/app/not-found.tsx** — Custom Not Found page  
**src/app/error.tsx** — Global error page that catches runtime errors  
**src/components/** — Reusable UI components and feature-specific elements  
**src/hooks/** — Custom React hooks for shared logic and UI states  
**src/lib/** — API fetch handlers, type definitions, and core library configurations  
**src/utils/** — Utility functions and helper methods (e.g., shadcn/ui helpers)  
**src/middleware.ts** — Clerk authentication and role-based route protection  
**public/** — Static assets including images and icons  
**tailwind.config.ts** — Tailwind CSS configuration  
**next.config.ts** — Next.js configuration  

---

## 📦 Installation & Usage

Follow these steps to set up the project locally:

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/TanvirCou/inkly.git
cd inkly
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Uploadthing (Image Uploads)
UPLOADTHING_TOKEN=

# Backend API URL
NEXT_PUBLIC_API_URL=
```

- **Clerk:** [Get your API keys here](https://dashboard.clerk.dev/)
- **Uploadthing:** [Get your Token here](https://uploadthing.com/dashboard)
- **Backend Setup:** Follow the instructions in the [Backend Repository](https://github.com/TanvirCou/inkly-server) to get your server running and obtain the API URL.

### 5. Run the Application
Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🔮 Future Enhancements

- **Real-time Comments** — Live interaction on blog posts using WebSockets.
- **Newsletter Subscription** — Integration with services like Mailchimp or Resend.
- **AI-Powered Content Suggestions** — Personalized reading recommendations based on user interests.
- **Push Notifications** — Real-time alerts when subscribed authors publish new content.
- **Multi-language Support (i18n)** — Expand reach with support for multiple languages.

---

## 📄 License

This project is for educational and portfolio purposes.
