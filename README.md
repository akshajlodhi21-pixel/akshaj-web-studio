# 🌟 AKSHAJ WEB STUDIO

> **"Turning Ideas Into Digital Reality."**  
> *A world-class digital agency website and complete business management platform.*

---

## 🚀 Live Local Application
The production server is currently active and reachable at:  
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 👑 Brand & Visual Architecture
- **Theme:** Obsidian Cosmic Black (`#030306`) with Liquid Imperial Gold (`#D4AF37`, `#FFE659`, `#916A14`) and Crisp White Accents.
- **Glassmorphism & Ambiance:** High-tech backdrop blur, gold glow card borders, and subtle cyber-grid patterns.
- **Interactive Particle Hero:** Dynamic HTML5 Canvas constellation mesh responsive to visitor mouse movements.
- **WhatsApp Floating Button:** Pulsing emerald & gold floating action button for direct client engagement.

---

## 🗺️ Website Page Directory

| Section / Page | Route | Description |
|---|---|---|
| **Page 1: Home** | `/` | Flagship landing page: Display **AKSHAJ WEB STUDIO**, tagline *"Turning Ideas Into Digital Reality."*, introduction: *"We transform ideas into powerful digital experiences..."*, the 4 buttons (**Hire Me**, **Explore Services**, **View My Projects**, **Contact Me**), metrics bar, services preview with images, featured work with video walkthroughs, and client testimonials. |
| **Page 2: About Me** | `/about` | Personal founder profile spotlight: Full Name, Dual Photograph showcase (Personal Photograph & Professional Profile Photograph), Introduction, Personal Background narrative, Business Description, Key Achievements, Verified Skills Matrix, and direct contact buttons. |
| **Page 3: Services** | `/services` | All 10 specialized services with images, feature checklists, starting prices, **View Details** modal, and **Hire Now** button: <br>1. *Website Development*<br>2. *Business Website Development*<br>3. *School Website Development*<br>4. *E-commerce Development*<br>5. *Android Application Development*<br>6. *AI Application Development*<br>7. *AI Website Development*<br>8. *Portfolio Website Development*<br>9. *Seminar & Event Website Development*<br>10. *Custom Software Development* |
| **Page 4: Project Portfolio** | `/portfolio` | Advanced portfolio with screenshots, photographs, embedded video walkthroughs, live demo links, client names, and tech badges. |
| **Page 5: Hire Me / Client Booking** | `/hire` | Full client booking funnel: Client Name, Email, Phone, WhatsApp Number, Company, Required Service, Project Scope, Budget, Expected Deadline, Reference Link. Submits via `/api/inquiries`, dispatches Resend notification & acknowledgment, and logs to database. |
| **Page 6: Pricing** | `/pricing` | 3 core tiers: **STARTER** (basic websites & portfolios), **PROFESSIONAL** (business websites & advanced features), **PREMIUM** (advanced applications & custom software). |
| **Page 7: Payment System** | `/payment` | Official UPI payment center with dynamic QR code generator, step-by-step instructions, and Payment Confirmation Form (Client Name, Amount, Transaction ID/UTR, Project Ref). Explicit verification rule: unverified transactions are never marked as successful. Built ready for Razorpay gateway integration. |
| **Page 8: Contact** | `/contact` | Complete contact management: Personal Phone, Business Phone, WhatsApp, Instagram Username & URL, Business Email, Personal Email, Facebook, LinkedIn, YouTube. Features the 5 required action buttons: <br>• *Chat on WhatsApp*<br>• *Message on Instagram*<br>• *Send an Email*<br>• *Call Now*<br>• *Follow on Instagram* |
| **Page 9: Admin Dashboard** | `/admin` | Secure control console with 10 management modules, protected by session checks. |
| **Legal: Privacy Policy** | `/privacy` | Comprehensive data privacy & NDA compliance. |
| **Legal: Terms & Conditions** | `/terms` | Commercial milestones and delivery terms. |
| **SEO: Sitemap & Robots** | `/sitemap.xml`, `/robots.txt` | Fully dynamic XML sitemap and crawler policies. |
| **404 Custom Error Page** | `/_not-found` | High-tech gold & dark 404 page. |

---

## 🔐 Admin Dashboard Modules & Credentials

### Master Admin Login:
- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email:** `admin@akshajwebstudio.com`
- **Password:** `AkshajStudio@2026`
*(A convenient "One-Click Fill" button is embedded on the login screen for testing).*

### Dashboard Modules (Sections A through I):
- **Section A: Profile Management**
  - Upload personal photograph with crop/preview.
  - Upload professional profile photograph with crop/preview.
  - Change full name and role title.
  - Change introduction copy.
  - Update personal background narrative.
  - Update business description.
  - Manage list of key achievements.
- **Section B: Contact Management**
  - Change personal phone number and business phone number.
  - Change official WhatsApp number.
  - Change Instagram username and profile URL.
  - Change business email and personal email.
  - Update Facebook, LinkedIn, YouTube, and other social links.
- **Section C: Website Management**
  - Edit homepage headings and brand display name.
  - Change website tagline.
  - Update homepage introduction copy.
  - Update footer mission narrative.
- **Section D: Service Management**
  - Add, edit, and delete services.
  - Update live starting prices and estimated turnaround times.
  - Upload/change service showcase images.
  - Update features checklist.
- **Section E: Project Management**
  - Add, edit, and delete projects.
  - Upload project screenshots and photographs.
  - Add project video walkthrough URLs (YouTube embed or video URL).
  - Add live website links and technology tags.
- **Section F: Client Management**
  - View all incoming client enquiries.
  - Filter by all 7 statuses: `New`, `Contacted`, `Discussion`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`.
  - Search by client name, email, or reference ID.
  - One-click **Export Enquiries as CSV**.
- **Section G: Payment Management**
  - View client-submitted UPI payments and UTR transaction codes.
  - Approve or reject verification status.
  - Revenue analytics.
  - Razorpay gateway integration status.
- **Section H: Testimonial Management**
  - Add client reviews and star ratings.
  - Upload reviewer avatar.
  - Edit or delete testimonials.
- **Section I: Website Settings & SEO**
  - Manage Google Search Console verification token.
  - Manage Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`).
  - Update primary SEO meta descriptions.
  - Step-by-step Google Search Console domain verification guide.

---

## 🔍 Google Search Console & SEO Publishing Guide

To make **AKSHAJ WEB STUDIO** discoverable through Google Search:

1. **Deploy to Vercel** with your custom domain (e.g. `https://akshajwebstudio.com`).
2. Visit **[Google Search Console](https://search.google.com/search-console)**.
3. Add your custom domain under **URL prefix** or **Domain property**.
4. Select the **HTML Tag** verification method and copy the `content="..."` token.
5. In your Admin Dashboard under **I. SEO & Google Search**, paste the verification token into the **Google Search Console Verification Token** field and click **Save**.
6. Back in Google Search Console, click **Verify**. Google will instantly recognize your domain.
7. Under **Sitemaps**, enter your sitemap URL:  
   `https://akshajwebstudio.com/sitemap.xml`
8. Click **Submit**. Google will crawl all 10 service routes, portfolio case studies, and informational pages.

---

## 📧 Email Notification Setup (Resend)
When a client submits an enquiry on `/hire`, the backend server automatically dispatches:
1. An inquiry alert email to your business inbox.
2. An automatic acknowledgment email to the client with their unique project tracking ID.

To activate live email delivery via Resend:
1. Create a free account at [Resend](https://resend.com).
2. Generate an API Key in your Resend dashboard.
3. Add to your `.env.local`:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   STUDIO_BUSINESS_EMAIL=akshajlodhi21@gmail.com
   ```

---

## 💳 Razorpay Payment Gateway Integration
The payment system includes a dual architecture:
1. **Direct UPI & Dynamic QR Code:** Scannable by Google Pay, PhonePe, Paytm, and BHIM, with manual UTR submission for admin ledger verification.
2. **Server-Side Razorpay Verification:** Active at `/api/payment/verify`.

To activate Razorpay:
1. Obtain your API Key ID and Secret from the [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

---

## 🔥 Firebase Cloud Integration (Firestore & Storage)
The studio features a dual persistence architecture:
1. **Firebase Firestore Database:** Automatically synchronizes and permanently stores:
   - Founder Profile & Biodata (`site_data/profile`)
   - Official Contact details (`site_data/contact`)
   - Brand Settings & SEO (`site_data/settings`)
   - Client Inquiries (`inquiries/{id}`)
   - Shipped Projects (`projects/{id}`)
   - Services (`services/{id}`)
   - Payment Records (`payments/{id}`)
2. **Firebase Storage:** Permanent cloud storage for uploaded portrait photographs and project screenshots under `profile/` and `projects/`.
3. **Resilient Local/Server Disk Fallback:** When Firebase credentials are not yet entered, the studio automatically persists data to `/data/profile.json` and permanent image uploads to `/public/uploads/` via authenticated `/api/upload` and `/api/profile` endpoints.

To activate your Firebase project:
1. Create a project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Firestore Database** in production mode.
3. Enable **Cloud Storage**.
4. Copy your web app config into `.env.local` (see `.env.example`).

---

## 🚢 GitHub Integration & Vercel Deployment Guide

### 1. Push to GitHub:
```bash
git branch -M main
git add .
git commit -m "feat: complete production-ready AKSHAJ WEB STUDIO platform"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/akshaj-web-studio.git
git push -u origin main
```

### 2. Deploy on Vercel:
1. Navigate to **[Vercel Dashboard](https://vercel.com/new)**.
2. Select **Import Git Repository** and choose your `akshaj-web-studio` repository.
3. In **Environment Variables**, add the values from your `.env.example`:
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD`
   - `ADMIN_JWT_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://akshajwebstudio.com`)
   - `RESEND_API_KEY` (if using email)
   - `NEXT_PUBLIC_FIREBASE_*` (if using Firebase)
4. Click **Deploy**. Vercel will build and serve your application globally with sub-second response times.
5. In Vercel Project Settings > Domains, link your custom domain (e.g. `akshajwebstudio.com`).
