# 🛍️ E-Commerce App

A full-featured e-commerce web application built with **Next.js** for modern performance and scalability.  
It integrates authentication, cart management, product uploads, secure payments, and optimized UI to deliver a complete shopping experience.

---

## 🚀 Tech Stack

- **Next.js (JSX + JavaScript)** – Framework for building scalable and performant web apps.  
- **Cloudinary** – Image storage, optimization, and delivery.  
- **React Hook Form** – Performant and easy form handling.  
- **shadcn/ui** – Pre-built, accessible, and customizable UI components.  
- **Zod** – Schema validation for type-safe forms and APIs.  
- **TanStack (React Query)** – Data fetching, caching, and server state management.  
- **Jose** – JWT (JSON Web Token) handling for secure authentication.  
- **Nodemailer** – Email service for account verification, order confirmations, etc.  
- **Redux + Redux Persist** – Centralized state management with persistence across sessions.  

---

## 📖 Overview

The **E-Commerce App** allows users to:

- 🔑 **Sign up / Login** securely with JWT (Jose).  
- 👕 **Browse products** with optimized Cloudinary images.  
- 🛒 **Add items to cart & checkout** using Redux + Redux Persist.  
- ✅ **Form validation** using React Hook Form + Zod.  
- 📦 **Manage orders** with TanStack Query for smooth async handling.  
- 📧 **Email notifications** for orders and account actions via Nodemailer.  
- 🎨 **Modern UI** built with shadcn components for consistency and accessibility.  

---

## 📂 Project Structure

```bash
ecommerce_app/
│── app/             # Next.js App Router pages & routes
│── components/      # Reusable UI components (shadcn)
│── lib/             # Utilities (zod schemas, JWT helpers, etc.)
│── store/           # Redux + Redux Persist setup
│── hooks/           # Custom React hooks
│── public/          # Static assets
│── styles/          # Global styles
│── README.md        # Documentation
