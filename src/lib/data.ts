import {
  AdminProfile,
  ContactInfo,
  PricingCategory,
  ProjectItem,
  ServiceItem,
  SiteSettings,
  TestimonialItem,
} from "./types";

export const initialSiteSettings: SiteSettings = {
  siteName: "AKSHAJ WEB STUDIO",
  tagline: "Turning Ideas Into Digital Reality.",
  heroHeadline: "AKSHAJ WEB STUDIO",
  heroIntroduction:
    "We transform ideas into powerful digital experiences. AKSHAJ WEB STUDIO specializes in custom Website Development, futuristic Web Design, native App Development, and scalable AI Solutions to help forward-thinking businesses establish and expand their digital presence.",
  heroSubheadline:
    "Engineering next-generation Website Development, mobile App Development, creative Web Design, and custom AI Solutions that empower your business to scale.",
  footerAboutText:
    "A world-class digital agency crafting bespoke digital experiences, mission-critical web applications, AI automation tools, and native Android software for enterprises and forward-thinking businesses worldwide.",
  googleSiteVerification: "google2cb903cb381db4e1",
  googleAnalyticsId: "G-AKSHAJSTUDIO",
  metaDescription:
    "AKSHAJ WEB STUDIO - Turning Ideas Into Digital Reality. Premier digital engineering agency delivering custom Website Development, mobile App Development, intelligent AI Solutions, and modern Web Design.",
};

export const initialProfile: AdminProfile = {
  name: "Akshaj Lodhi",
  roleTitle: "Founder & Developer",
  organization: "AKSHAJ WEB STUDIO",
  tagline: "Turning Ideas Into Digital Reality.",
  photoUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  personalPhotoUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  professionalPhotoUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  bioIntro:
    "Founder & Developer at AKSHAJ WEB STUDIO. Dedicated to turning ideas into digital reality through high-performance web development, modern application engineering, and intelligent AI solutions.",
  fullBio:
    "Hello, I am Akshaj Lodhi, Founder and Developer of AKSHAJ WEB STUDIO. I specialize in crafting bespoke websites, high-speed business applications, and AI-driven platforms that empower brands and enterprises to scale. With a deep passion for clean architectural code, futuristic aesthetics, and frictionless user experiences, I manage projects from initial concept to full production deployment.",
  businessJourney:
    "Driven by a relentless curiosity for software engineering and creative digital design, I founded AKSHAJ WEB STUDIO to provide end-to-end digital solutions—spanning modern full-stack web platforms, mobile software, and intelligent AI integrations. Today, AKSHAJ WEB STUDIO operates as a full-service digital agency turning client ideas into high-impact digital reality.",
  areasOfInterest: [
    "Full-Stack Web Development (Next.js, React, TypeScript)",
    "Artificial Intelligence & LLM Workflow Automation",
    "Android & Cross-Platform Mobile Applications",
    "High-Performance Database Architectures",
    "Modern Glassmorphic & Futuristic UI/UX Design Systems",
    "Custom Software & Enterprise Automation",
  ],
  goals:
    "To engineer innovative digital solutions and high-converting web experiences for clients worldwide, setting new standards for digital excellence, responsiveness, and AI integration.",
  businessVision:
    "Building Ideas. Creating Technology. Shaping Tomorrow. Our mission at AKSHAJ WEB STUDIO is to deliver world-class digital assets that turn ambitious visions into scalable, tangible technology.",
  skills: [
    { id: "skill-1", name: "Next.js / React / TypeScript", level: 95, category: "Frontend" },
    { id: "skill-2", name: "Node.js / Express & Python Backend", level: 90, category: "Backend" },
    { id: "skill-3", name: "AI & LLM Integration (Gemini, OpenAI)", level: 92, category: "AI Engineering" },
    { id: "skill-4", name: "Android Application Development", level: 86, category: "Mobile" },
    { id: "skill-5", name: "Tailwind CSS & Glassmorphic UI/UX", level: 96, category: "Design" },
    { id: "skill-6", name: "Databases (Firebase, PostgreSQL, MongoDB)", level: 88, category: "Database" },
    { id: "skill-7", name: "Cloud Deployment (Vercel, Google Cloud)", level: 90, category: "Cloud & DevOps" },
  ],
  education: [
    {
      id: "edu-1",
      degree: "[Degree / Qualification - Add via Admin Dashboard]",
      institution: "[College / University Name - Add via Admin Dashboard]",
      year: "Optional / Editable",
      details: "Academic qualifications are customizable through the admin dashboard.",
    },
  ],
  achievements: [
    "Founded AKSHAJ WEB STUDIO as an independent software development & digital agency.",
    "Architected and deployed full-stack web applications with verified 100% mobile responsiveness.",
    "Engineered intelligent AI-driven conversational bots and vector knowledge workflows.",
    "Established a seamless UPI payment and inquiry management pipeline for international clients.",
  ],
  experienceYears: 3,
  projectsCompleted: 10,
  clientSatisfaction: 100,
  location: "Available for Projects Worldwide",
  availableForHire: true,
};

export const initialContactInfo: ContactInfo = {
  personalPhone: "+91 98765 43210",
  businessPhone: "+91 98765 43211",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  instagramUsername: "akshajwebstudio",
  instagramUrl: "https://instagram.com/akshajwebstudio",
  businessEmail: "contact@akshajwebstudio.com",
  personalEmail: "akshaj.dev@gmail.com",
  email: "contact@akshajwebstudio.com",
  address: "Digital Innovation Hub, Cyber Enclave, Tech Park, India",
  workingHours: "Monday - Saturday: 9:00 AM - 8:00 PM IST",
  upiId: "akshajwebstudio@okaxis",
  upiHolderName: "Akshaj Web Studio",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com/in/akshajwebstudio",
    twitter: "https://twitter.com/akshajwebstudio",
    instagram: "https://instagram.com/akshajwebstudio",
    facebook: "https://facebook.com/akshajwebstudio",
    youtube: "https://youtube.com/@akshajwebstudio",
  },
};

export const initialServices: ServiceItem[] = [
  {
    id: "web-dev",
    name: "Website Development",
    category: "Web",
    shortDescription:
      "Modern, ultra-fast and responsive web solutions engineered with modern frameworks, pristine code, and seamless responsiveness.",
    fullDescription:
      "We build responsive, blazing-fast websites that combine breathtaking aesthetics with robust engineering. Whether you need a corporate portal, an interactive web application, or a customer gateway, our code is optimized for extreme speed, SEO prominence, and multi-device fluid interaction.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    features: [
      "Custom responsive design (Mobile, Tablet, Desktop)",
      "Next.js / React with lightning-fast Core Web Vitals",
      "Interactive animations & dynamic UI components",
      "SEO-ready semantic HTML and structured schema",
      "Continuous deployment with zero-downtime hosting",
    ],
    startingPrice: "₹14,999",
    turnaroundTime: "5 - 7 Business Days",
    iconName: "Globe",
    popular: true,
  },
  {
    id: "biz-web",
    name: "Business Website Development",
    category: "Enterprise",
    shortDescription:
      "Corporate web portals designed to position your brand as an industry leader, generate qualified leads, and convert visitors.",
    fullDescription:
      "Crafted specifically for enterprises, B2B companies, consulting firms, and agencies. We incorporate corporate storytelling, lead-capturing funnels, client portal access, security compliance, and dynamic CMS capabilities for effortless content publishing.",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    features: [
      "Lead generation forms with instant email/CRM alerts",
      "Interactive service catalogs & case study showcases",
      "Google Analytics 4 & Meta Pixel conversion tracking",
      "Speed optimized with CDN caching & asset minification",
      "Corporate grade SSL & enterprise security shielding",
    ],
    startingPrice: "₹24,999",
    turnaroundTime: "7 - 12 Business Days",
    iconName: "Briefcase",
    popular: true,
  },
  {
    id: "school-web",
    name: "School Website Development",
    category: "Web",
    shortDescription:
      "Comprehensive, secure, and intuitive digital platforms for schools, colleges, universities, and coaching academies.",
    fullDescription:
      "Empower educational institutions with dynamic portals featuring student admission inquiry pipelines, academic calendar management, circular notices, faculty directories, gallery showcases, and parent communication channels.",
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
    features: [
      "Online student admission inquiry & registration workflow",
      "Notice board & dynamic exam timetable management",
      "Faculty profiles & departmental directory system",
      "Photo & video event gallery with cloud storage",
      "Compliant with educational board web guidelines",
    ],
    startingPrice: "₹21,999",
    turnaroundTime: "10 - 14 Business Days",
    iconName: "GraduationCap",
  },
  {
    id: "ecommerce-dev",
    name: "E-commerce Development",
    category: "Enterprise",
    shortDescription:
      "High-converting online stores built for scale, frictionless checkouts, inventory synchronization, and multi-channel revenue.",
    fullDescription:
      "Transform browsers into buyers with custom e-commerce platforms. We build lightning-fast product catalogs, filtered search, multi-currency support, automated tax/shipping calculations, UPI/card payment gateways, and order fulfillment dashboards.",
    imageUrl:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    features: [
      "Custom product catalog with advanced search & filters",
      "Frictionless single-page checkout flow",
      "Automated WhatsApp & Email order confirmations",
      "Integrated UPI, NetBanking, Debit/Credit & Wallet gateways",
      "Stock inventory alerts & discount coupon engines",
    ],
    startingPrice: "₹34,999",
    turnaroundTime: "12 - 18 Business Days",
    iconName: "ShoppingCart",
    popular: true,
  },
  {
    id: "android-dev",
    name: "Android Application Development",
    category: "Mobile",
    shortDescription:
      "High-performance native and cross-platform Android mobile apps with fluid animations, offline caching, and push notifications.",
    fullDescription:
      "Take your business directly into your customers' hands. We build sleek Android apps complying with Google Play Store guidelines, optimized for battery life, smooth 60fps animations, background synchronization, and secure REST/GraphQL API consumption.",
    imageUrl:
      "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=800&auto=format&fit=crop",
    features: [
      "Modern Material Design 3 and fluid motion UI",
      "Push notifications with Firebase Cloud Messaging (FCM)",
      "Offline data persistence and synchronization",
      "Camera, Geolocation, and Biometric device integrations",
      "End-to-end Google Play Store launch and deployment",
    ],
    startingPrice: "₹39,999",
    turnaroundTime: "15 - 25 Business Days",
    iconName: "Smartphone",
    popular: true,
  },
  {
    id: "ai-website",
    name: "AI Website Development",
    category: "AI",
    shortDescription:
      "Next-generation intelligent websites equipped with embedded AI assistants, smart recommendation engines, and dynamic personalization.",
    fullDescription:
      "Stand out in the modern digital era. We embed intelligent AI conversational bots trained on your business data, real-time dynamic copy generation, smart visual generators, and predictive search that adapts dynamically to every user's intent.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop",
    features: [
      "Custom 24/7 AI conversational agent trained on your brand data",
      "Smart dynamic search with vector embeddings & LLM answers",
      "Personalized content feeds based on user behavior",
      "Automated lead qualification via intelligent chat",
      "Integration with Google Gemini, OpenAI, Claude & Anthropic APIs",
    ],
    startingPrice: "₹29,999",
    turnaroundTime: "8 - 14 Business Days",
    iconName: "Bot",
    popular: true,
  },
  {
    id: "ai-application",
    name: "AI Application Development",
    category: "AI",
    shortDescription:
      "Bespoke artificial intelligence web applications, intelligent automation pipelines, RAG systems, and generative tools.",
    fullDescription:
      "Unlock high-margin software value with custom AI applications. From specialized document intelligence tools to automated generative content platforms, sentiment analyzers, and predictive business models, we build production AI software from architecture to delivery.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    features: [
      "Document parsing, OCR, and intelligent multi-page analysis",
      "Retrieval-Augmented Generation (RAG) knowledge vaults",
      "Custom fine-tuned prompts and streaming UI responses",
      "Secure API key management and usage rate-limiting",
      "Subscription billing & SaaS monetization modules",
    ],
    startingPrice: "₹49,999",
    turnaroundTime: "18 - 30 Business Days",
    iconName: "Cpu",
  },
  {
    id: "portfolio-web",
    name: "Portfolio Website Development",
    category: "Web",
    shortDescription:
      "Signature personal branding websites for founders, creators, executives, and creative professionals demanding aesthetic prestige.",
    fullDescription:
      "Make an unforgettable first impression. We create bespoke portfolio websites with bespoke interactive typography, smooth WebGL/canvas animations, interactive project showcases, press features, and direct inquiry booking pipelines.",
    imageUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    features: [
      "Futuristic dark & gold aesthetic with glassmorphism touches",
      "Interactive project galleries with case study deep-dives",
      "Live resume / CV viewer and instant downloadable PDF link",
      "Integrated booking calendar / inquiry submission",
      "Social proof badges, awards display, and press mentions",
    ],
    startingPrice: "₹12,999",
    turnaroundTime: "4 - 7 Business Days",
    iconName: "Sparkles",
  },
  {
    id: "event-web",
    name: "Seminar & Event Website Development",
    category: "Web",
    shortDescription:
      "High-energy websites for conferences, international summits, corporate seminars, hackathons, and cultural festivals.",
    fullDescription:
      "Maximize ticket sales and attendee registration with dedicated event websites. Features interactive speaker lineups, multi-track agenda schedules, venue maps, sponsor recognition tiers, live countdown timers, and ticket booking.",
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    features: [
      "Interactive speaker roster with bio popups & topic badges",
      "Dynamic multi-day schedule with track filters",
      "Direct ticket reservation & attendee badge generation",
      "Sponsor tier showcase with interactive backlink grids",
      "Live stream embedding & real-time announcement ticker",
    ],
    startingPrice: "₹19,999",
    turnaroundTime: "6 - 10 Business Days",
    iconName: "Calendar",
  },
  {
    id: "custom-software",
    name: "Custom Software Development",
    category: "Custom",
    shortDescription:
      "Enterprise internal tools, custom ERP/CRM workflows, database management systems, and automated cloud backends.",
    fullDescription:
      "Solve complex business bottlenecks with tailor-made software. When off-the-shelf software falls short, we engineer custom workflows, automated invoicing, customer relation management, inventory tracking, role-based security, and multi-tenant cloud architectures.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    features: [
      "Custom role-based access control (RBAC) & user permissions",
      "Comprehensive analytics dashboards with real-time charts",
      "Automated reporting, PDF invoice generation & CSV exports",
      "RESTful / GraphQL APIs with robust error handling",
      "Scalable PostgreSQL / Firebase / Cloud infrastructure",
    ],
    startingPrice: "₹59,999",
    turnaroundTime: "20 - 45 Business Days",
    iconName: "Layers",
  },
];

export const initialProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Apex Horizon - AI Executive Intelligence Suite",
    category: "AI Solutions",
    description:
      "Autonomous enterprise analytics and generative executive summaries powered by Google Gemini and vector knowledge vaults.",
    fullOverview:
      "Apex Horizon aggregates high-volume business data from multiple channels and synthesizes real-time executive intelligence briefings. Built with Next.js 14, TypeScript, Tailwind CSS, and vector embeddings.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    liveUrl: "https://example.com/apex-horizon",
    githubUrl: "https://github.com",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini AI API", "Cloud Firestore"],
    featured: true,
    completionDate: "October 2026",
    clientName: "Horizon Enterprises Global",
  },
  {
    id: "proj-2",
    title: "Aura Luxe - Fine Jewelry E-Commerce Experience",
    category: "Web Development",
    description:
      "Luxury direct-to-consumer jewelry portal featuring 3D model previews, instant UPI payments, and high-conversion checkout.",
    fullOverview:
      "Engineered an ultra-luxurious e-commerce shopping experience for high-ticket jewelry. Includes instant razorpay/UPI checkout, automated insurance certificate generation, and live inventory sync.",
    imageUrl:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    liveUrl: "https://example.com/aura-luxe",
    githubUrl: "https://github.com",
    technologies: ["React", "Next.js", "Tailwind CSS", "Razorpay / UPI", "Node.js"],
    featured: true,
    completionDate: "September 2026",
    clientName: "Aura Jewels Ltd",
  },
  {
    id: "proj-3",
    title: "Vanguard Nexus - Android Field Operations App",
    category: "Android App",
    description:
      "Native Android field management tool with offline GPS tracking, biometric authentication, and instant inspection reports.",
    fullOverview:
      "Mission-critical Android utility enabling over 1,200 field technicians to record site audits in real-time even without network connectivity, syncing securely whenever signal is restored.",
    imageUrl:
      "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/vanguard-nexus",
    technologies: ["Android", "Kotlin", "Firebase Sync", "Material 3", "Room Database"],
    featured: true,
    completionDate: "August 2026",
    clientName: "Vanguard Logistics",
  },
  {
    id: "proj-4",
    title: "Oakridge International - School & Campus Ecosystem",
    category: "Web Development",
    description:
      "Complete campus portal featuring digital admissions pipeline, dynamic timetable broadcaster, and secure parent portal.",
    fullOverview:
      "Developed a modern, accessible web portal serving over 3,000 students, teachers, and parents. Handles admissions, online fee status, attendance summaries, and digital event archives.",
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/oakridge",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Cloudinary"],
    featured: false,
    completionDate: "July 2026",
    clientName: "Oakridge Academy Trust",
  },
  {
    id: "proj-5",
    title: "Synapse Core - Custom Enterprise ERP System",
    category: "Custom Software",
    description:
      "Bespoke multi-department ERP orchestrating supply chain, inventory management, role-based workflows, and automated invoice reconciliation.",
    fullOverview:
      "Replaced disjointed legacy spreadsheets with a unified cloud-native ERP dashboard. Features real-time KPI visualization, PDF quote generation, and audit trail compliance.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/synapse-core",
    githubUrl: "https://github.com",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
    featured: true,
    completionDate: "May 2026",
    clientName: "Synapse Industrial Manufacturing",
  },
  {
    id: "proj-6",
    title: "Summit 2026 - International Tech Conclave",
    category: "Web Development",
    description:
      "High-energy interactive event platform with live agenda scheduler, speaker stage tracking, and instant QR badge ticketing.",
    fullOverview:
      "Designed and deployed the official summit portal attracting 15,000+ registered global attendees. Included speaker showcase, sponsor lounges, interactive stage schedules, and live stream.",
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/summit-2026",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase", "QR Engine"],
    featured: false,
    completionDate: "March 2026",
    clientName: "Global Tech Summit Board",
  },
];

export const initialPricingCategories: PricingCategory[] = [
  {
    id: "STARTER",
    name: "Starter Package",
    tagline: "For basic websites, personal portfolios, and sleek landing pages.",
    price: "₹14,999",
    billingPeriod: "one-time investment",
    targetAudience: "Startups, Freelancers, Personal Brands & Landing Pages",
    features: [
      "Up to 5 Custom Responsive Web Pages",
      "Modern Dark & Gold or Custom Brand Theme",
      "Mobile, Tablet & Desktop Fluid Layout",
      "Interactive Contact Form with Instant Alerts",
      "Standard Search Engine Optimization (SEO)",
      "Social Media & WhatsApp Floating Integration",
      "Free 30 Days Post-Launch Maintenance",
      "Fast 5 - 7 Days Delivery",
    ],
    ctaText: "Choose Starter Plan",
  },
  {
    id: "PROFESSIONAL",
    name: "Professional Package",
    tagline: "For business websites, growing brands, and advanced features.",
    price: "₹34,999",
    billingPeriod: "one-time investment",
    targetAudience: "Established Companies, E-commerce Brands & Schools",
    popular: true,
    features: [
      "Up to 12 Bespoke Pages & Custom Funnels",
      "Dynamic Admin Content Management System (CMS)",
      "E-commerce or Service Catalog Setup",
      "Integrated UPI & Payment Gateway Preparation",
      "Advanced Lead Capturing & CRM Data Sync",
      "Interactive Animations & Micro-interactions",
      "Comprehensive Technical SEO & Schema Markup",
      "Google Analytics 4 & Conversion Tracking",
      "60 Days Dedicated Technical Support",
      "Delivery in 10 - 15 Business Days",
    ],
    ctaText: "Choose Professional Plan",
  },
  {
    id: "PREMIUM",
    name: "Premium Package",
    tagline: "For advanced applications, custom AI integrations, and full-stack software.",
    price: "₹69,999",
    billingPeriod: "one-time investment",
    targetAudience: "Enterprises, Tech Startups & Custom Platforms",
    features: [
      "Full Custom Architecture (Web + Mobile or Custom AI)",
      "Embedded AI Assistant / LLM Chat Integration",
      "Multi-Role Authentication & Permission Security",
      "Custom Database Architecture & Real-Time Sync",
      "Android App or Complex SaaS Platform",
      "Custom API Development & 3rd-Party Integrations",
      "Enterprise Grade Cloud Infrastructure & Caching",
      "Priority 24/7 SLA Technical Support for 90 Days",
      "Complete Source Code & Documentation Handover",
      "Dedicated Project Lead & Milestones",
    ],
    ctaText: "Choose Premium Plan",
  },
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: "test-1",
    clientName: "Vikram Singhania",
    clientRole: "Managing Director",
    clientCompany: "Horizon Enterprises",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    quote:
      "AKSHAJ WEB STUDIO elevated our digital presence to international standards. The craftsmanship, speed, and futuristic aesthetics blew our board away. Our inbound leads surged by over 240% within the first month.",
    rating: 5,
    projectTitle: "AI Executive Intelligence Suite",
  },
  {
    id: "test-2",
    clientName: "Elena Rostova",
    clientRole: "Creative Director",
    clientCompany: "Aura Luxe Fine Jewels",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    quote:
      "The dark and gold aesthetic developed for our brand is simply sublime. Every micro-interaction feels weighted and luxurious. The seamless checkout and UPI integration made buying effortless for our clients.",
    rating: 5,
    projectTitle: "Fine Jewelry E-Commerce Experience",
  },
  {
    id: "test-3",
    clientName: "Dr. Rajeshwar Rao",
    clientRole: "Head of Campus Affairs",
    clientCompany: "Oakridge Trust",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    quote:
      "Professional, disciplined, and genuinely world-class. Akshaj built an educational portal that parents, students, and teachers love using daily. Inquiries for new admissions were processed seamlessly.",
    rating: 5,
    projectTitle: "School & Campus Ecosystem",
  },
];
