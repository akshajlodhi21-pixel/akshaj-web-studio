export type InquiryStatus = 
  | "New" 
  | "Contacted" 
  | "Discussion" 
  | "Confirmed" 
  | "In Progress" 
  | "Completed" 
  | "Cancelled";

export type PaymentStatus = 
  | "Pending Verification" 
  | "Verified" 
  | "Rejected";

export interface ServiceItem {
  id: string;
  name: string;
  category: "Web" | "Mobile" | "AI" | "Enterprise" | "Custom";
  shortDescription: string;
  fullDescription: string;
  features: string[];
  startingPrice: string;
  turnaroundTime: string;
  iconName: string;
  imageUrl?: string;
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Web Development" | "AI Solutions" | "Android App" | "Custom Software";
  description: string;
  fullOverview?: string;
  imageUrl: string;
  additionalImages?: string[];
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
  completionDate?: string;
  clientName?: string;
  isConcept?: boolean;
  statusLabel?: string;
}

export interface PricingCategory {
  id: "STARTER" | "PROFESSIONAL" | "PREMIUM";
  name: string;
  tagline: string;
  price: string;
  billingPeriod: string;
  targetAudience: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
}

export interface ClientInquiry {
  id: string;
  clientName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber?: string;
  businessName?: string;
  requiredService: string;
  projectDescription: string;
  budget: string;
  expectedDeadline: string;
  referenceWebsite?: string;
  status: InquiryStatus;
  createdAt: string;
  notes?: string;
  emailSent?: boolean;
}

export interface PaymentRecord {
  id: string;
  clientName: string;
  email: string;
  phoneNumber?: string;
  amount: string;
  transactionId: string;
  projectReference: string;
  paymentMethod: "UPI" | "Razorpay" | "Bank Transfer";
  notes?: string;
  screenshotUrl?: string;
  status: PaymentStatus;
  createdAt: string;
  verifiedAt?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  projectTitle: string;
}

export interface TechnicalSkill {
  id: string;
  name: string;
  level: number; // 0 - 100
  category: string; // e.g. Frontend, Backend, AI, Mobile, Cloud
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  year?: string;
  details?: string;
}

export interface AdminProfile {
  name: string;
  roleTitle: string; // "Founder & Developer"
  organization?: string; // "AKSHAJ WEB STUDIO"
  tagline?: string; // "Turning Ideas Into Digital Reality."
  photoUrl: string; // Profile photo (uploadable)
  personalPhotoUrl?: string;
  professionalPhotoUrl?: string;
  bioIntro: string; // Short introduction
  fullBio: string; // Detailed biography
  businessJourney?: string; // Digital business journey
  areasOfInterest?: string[]; // Areas of interest
  goals?: string; // Business & technical goals
  businessVision: string;
  skills: TechnicalSkill[]; // Individually addable, editable, removable skills
  education?: EducationEntry[]; // Optional education details
  achievements?: string[]; // Achievements list
  experienceYears?: number;
  projectsCompleted?: number;
  clientSatisfaction?: number;
  location?: string;
  availableForHire?: boolean;
}

export interface ContactInfo {
  personalPhone: string;
  businessPhone: string;
  phone: string;
  whatsapp: string;
  instagramUsername: string;
  instagramUrl: string;
  instagramEnabled?: boolean;
  twitterUsername?: string;
  twitterUrl?: string;
  twitterEnabled?: boolean;
  businessEmail: string;
  personalEmail: string;
  email: string;
  address: string;
  workingHours: string;
  upiId: string;
  upiHolderName: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook?: string;
    youtube?: string;
  };
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  heroHeadline: string;
  heroIntroduction: string;
  heroSubheadline: string;
  footerAboutText: string;
  googleSiteVerification?: string;
  googleAnalyticsId?: string;
  logoUrl?: string;
  faviconUrl?: string;
  metaDescription?: string;
}
