"use client";

import { useState, useEffect } from "react";
import {
  AdminProfile,
  ClientInquiry,
  ContactInfo,
  PaymentRecord,
  PricingCategory,
  ProjectItem,
  ServiceItem,
  SiteSettings,
  TestimonialItem,
  InquiryStatus,
  PaymentStatus,
} from "./types";
import {
  initialContactInfo,
  initialPricingCategories,
  initialProfile,
  initialProjects,
  initialServices,
  initialSiteSettings,
  initialTestimonials,
} from "./data";
import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const STORAGE_KEYS = {
  PROFILE: "aws_store_profile_v3",
  CONTACT: "aws_store_contact_v3",
  SERVICES: "aws_store_services_v3",
  PROJECTS: "aws_store_projects_v3",
  PRICING: "aws_store_pricing_v3",
  INQUIRIES: "aws_store_inquiries_v3",
  PAYMENTS: "aws_store_payments_v3",
  TESTIMONIALS: "aws_store_testimonials_v3",
  SETTINGS: "aws_store_settings_v3",
  ADMIN_SESSION: "aws_store_admin_auth_v3",
};

class StudioStore {
  private listeners: Set<() => void> = new Set();

  profile: AdminProfile = initialProfile;
  contact: ContactInfo = initialContactInfo;
  services: ServiceItem[] = initialServices;
  projects: ProjectItem[] = initialProjects;
  pricing: PricingCategory[] = initialPricingCategories;
  inquiries: ClientInquiry[] = [];
  payments: PaymentRecord[] = [];
  testimonials: TestimonialItem[] = initialTestimonials;
  settings: SiteSettings = initialSiteSettings;
  isAdminLoggedIn: boolean = false;
  isInitialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage();
      this.initFirebaseSync();
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private loadFromStorage() {
    try {
      const getStored = <T>(key: string, fallback: T): T => {
        const item = localStorage.getItem(key);
        if (!item) return fallback;
        try {
          return { ...fallback, ...JSON.parse(item) };
        } catch {
          return fallback;
        }
      };

      this.profile = getStored(STORAGE_KEYS.PROFILE, initialProfile);
      this.contact = getStored(STORAGE_KEYS.CONTACT, initialContactInfo);

      // Reconcile official verified contact credentials
      if (!this.contact.businessEmail || this.contact.businessEmail.includes("contact@akshajwebstudio.com")) {
        this.contact.businessEmail = "akshajlodhi21@gmail.com";
      }
      if (!this.contact.email || this.contact.email.includes("contact@akshajwebstudio.com")) {
        this.contact.email = "akshajlodhi21@gmail.com";
      }
      if (!this.contact.personalEmail || this.contact.personalEmail.includes("akshaj.dev@gmail.com")) {
        this.contact.personalEmail = "akshajlodhi21@gmail.com";
      }
      if (!this.contact.socials?.linkedin || this.contact.socials.linkedin.includes("akshajwebstudio")) {
        this.contact.socials = {
          ...this.contact.socials,
          linkedin: "https://www.linkedin.com/in/lucky-bro-b4ab043a1/",
        };
      }
      this.services = getStored(STORAGE_KEYS.SERVICES, initialServices);
      this.projects = getStored(STORAGE_KEYS.PROJECTS, initialProjects);
      this.pricing = getStored(STORAGE_KEYS.PRICING, initialPricingCategories);
      this.inquiries = getStored(STORAGE_KEYS.INQUIRIES, [
        {
          id: "AWS-REQ-9482",
          clientName: "Rohan Varma",
          email: "rohan@fintechapex.io",
          phoneNumber: "+91 98200 11223",
          whatsappNumber: "+91 98200 11223",
          businessName: "FinTech Apex Solutions",
          requiredService: "AI Website Development",
          projectDescription: "Need a high-converting landing page with integrated AI customer bot and financial dashboard.",
          budget: "₹30,000 - ₹60,000 (Professional Growth)",
          expectedDeadline: "Normal (2 - 4 Weeks)",
          referenceWebsite: "https://stripe.com",
          status: "Confirmed",
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          notes: "Confirmed milestone 1 sprint with client.",
        },
        {
          id: "AWS-REQ-7821",
          clientName: "Meera Sen",
          email: "meera@auraglobal.org",
          phoneNumber: "+91 97112 44556",
          whatsappNumber: "+91 97112 44556",
          businessName: "Aura Global Foundation",
          requiredService: "Business Website Development",
          projectDescription: "Looking to redesign our institutional website with impact tracker and payment readiness.",
          budget: "₹15,000 - ₹30,000 (Starter / MVP)",
          expectedDeadline: "Normal (2 - 4 Weeks)",
          referenceWebsite: "https://unicef.org",
          status: "Contacted",
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          notes: "Contacted via official WhatsApp, preparing architecture draft.",
        },
      ]);
      this.payments = getStored(STORAGE_KEYS.PAYMENTS, [
        {
          id: "AWS-PAY-1082",
          clientName: "Rohan Varma",
          email: "rohan@fintechapex.io",
          phoneNumber: "+91 98200 11223",
          amount: "15000",
          transactionId: "UPI411234908129",
          projectReference: "AWS-REQ-9482 (AI Web Dev Advance)",
          paymentMethod: "UPI",
          notes: "Advance 50% project deposit transferred via PhonePe UPI.",
          status: "Pending Verification",
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: "AWS-PAY-0951",
          clientName: "Elena Rostova",
          email: "elena@auraluxe.com",
          phoneNumber: "+91 99887 76655",
          amount: "34999",
          transactionId: "UPI399812451001",
          projectReference: "Fine Jewelry E-Commerce Milestone",
          paymentMethod: "UPI",
          notes: "Full milestone payment verified by bank statement.",
          status: "Verified",
          createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
          verifiedAt: new Date(Date.now() - 3600000 * 70).toISOString(),
        },
      ]);
      this.testimonials = getStored(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
      this.settings = getStored(STORAGE_KEYS.SETTINGS, initialSiteSettings);
      this.isAdminLoggedIn = Boolean(sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION));
      this.isInitialized = true;
      this.notify();
    } catch (e) {
      console.error("Failed to load store data:", e);
    }
  }

  private saveToStorage(key: string, value: any) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage quota or error:", e);
    }
  }

  private async initFirebaseSync() {
    // 1. Permanent Server Storage sync via /api/profile
    if (typeof window !== "undefined") {
      fetch("/api/profile")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.profile) {
            this.profile = { ...this.profile, ...data.profile };
            this.saveToStorage(STORAGE_KEYS.PROFILE, this.profile);
            this.notify();
          }
        })
        .catch(() => {});
    }

    if (!isFirebaseConfigured || !db) return;

    try {
      // Sync Profile from Firestore
      const profileDoc = await getDoc(doc(db, "site_data", "profile"));
      if (profileDoc.exists()) {
        this.profile = { ...this.profile, ...(profileDoc.data() as AdminProfile) };
        this.saveToStorage(STORAGE_KEYS.PROFILE, this.profile);
      }

      // Sync Contact from Firestore
      const contactDoc = await getDoc(doc(db, "site_data", "contact"));
      if (contactDoc.exists()) {
        this.contact = { ...this.contact, ...(contactDoc.data() as ContactInfo) };
        this.saveToStorage(STORAGE_KEYS.CONTACT, this.contact);
      }

      // Sync Inquiries from Firestore
      const inquiriesSnap = await getDocs(collection(db, "inquiries"));
      if (!inquiriesSnap.empty) {
        const fetchedInquiries: ClientInquiry[] = [];
        inquiriesSnap.forEach((d) => fetchedInquiries.push(d.data() as ClientInquiry));
        this.inquiries = fetchedInquiries;
        this.saveToStorage(STORAGE_KEYS.INQUIRIES, this.inquiries);
      }

      // Sync Projects from Firestore
      const projectsSnap = await getDocs(collection(db, "projects"));
      if (!projectsSnap.empty) {
        const fetchedProjects: ProjectItem[] = [];
        projectsSnap.forEach((d) => fetchedProjects.push(d.data() as ProjectItem));
        this.projects = fetchedProjects;
        this.saveToStorage(STORAGE_KEYS.PROJECTS, this.projects);
      }

      // Sync Services from Firestore
      const servicesSnap = await getDocs(collection(db, "services"));
      if (!servicesSnap.empty) {
        const fetchedServices: ServiceItem[] = [];
        servicesSnap.forEach((d) => fetchedServices.push(d.data() as ServiceItem));
        this.services = fetchedServices;
        this.saveToStorage(STORAGE_KEYS.SERVICES, this.services);
      }

      this.notify();
    } catch (e) {
      console.warn("Firestore sync skipped:", e);
    }
  }

  // Admin Auth
  loginAdmin(token: string = "session_token") {
    this.isAdminLoggedIn = true;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, token);
    }
    this.notify();
  }

  logoutAdmin() {
    this.isAdminLoggedIn = false;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
    this.notify();
  }

  // Profile Management with Permanent Firestore & Server Persistence
  updateProfile(profile: Partial<AdminProfile>) {
    this.profile = { ...this.profile, ...profile };
    this.saveToStorage(STORAGE_KEYS.PROFILE, this.profile);
    this.notify();

    // 1. Permanent Firebase Firestore sync
    if (isFirebaseConfigured && db) {
      setDoc(doc(db, "site_data", "profile"), this.profile, { merge: true }).catch((err) =>
        console.warn("Firestore profile sync error:", err)
      );
    }

    // 2. Permanent Server storage sync via /api/profile
    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION)
          : null;
      fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(this.profile),
      }).catch((e) => console.warn("API profile sync skipped:", e));
    } catch (e) {
      console.warn("Profile persistence API warning:", e);
    }
  }

  // Contact Info Management with Permanent Firestore sync
  updateContact(contact: Partial<ContactInfo>) {
    this.contact = { ...this.contact, ...contact };
    this.saveToStorage(STORAGE_KEYS.CONTACT, this.contact);
    this.notify();

    if (isFirebaseConfigured && db) {
      setDoc(doc(db, "site_data", "contact"), this.contact, { merge: true }).catch(console.warn);
    }
  }

  // Settings Management with Permanent Firestore sync
  updateSettings(settings: Partial<SiteSettings>) {
    this.settings = { ...this.settings, ...settings };
    this.saveToStorage(STORAGE_KEYS.SETTINGS, this.settings);
    this.notify();

    if (isFirebaseConfigured && db) {
      setDoc(doc(db, "site_data", "settings"), this.settings, { merge: true }).catch(console.warn);
    }
  }

  // Services Management
  updateService(id: string, updated: Partial<ServiceItem>) {
    this.services = this.services.map((s) => (s.id === id ? { ...s, ...updated } : s));
    this.saveToStorage(STORAGE_KEYS.SERVICES, this.services);
    this.notify();

    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, "services", id), updated).catch(console.warn);
    }
  }

  addService(service: ServiceItem) {
    this.services = [service, ...this.services];
    this.saveToStorage(STORAGE_KEYS.SERVICES, this.services);
    this.notify();

    if (isFirebaseConfigured && db) {
      setDoc(doc(db, "services", service.id), service).catch(console.warn);
    }
  }

  deleteService(id: string) {
    this.services = this.services.filter((s) => s.id !== id);
    this.saveToStorage(STORAGE_KEYS.SERVICES, this.services);
    this.notify();

    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, "services", id)).catch(console.warn);
    }
  }

  // Projects Management
  addProject(project: ProjectItem) {
    this.projects = [project, ...this.projects];
    this.saveToStorage(STORAGE_KEYS.PROJECTS, this.projects);
    this.notify();

    if (isFirebaseConfigured && db) {
      setDoc(doc(db, "projects", project.id), project).catch(console.warn);
    }
  }

  updateProject(id: string, updated: Partial<ProjectItem>) {
    this.projects = this.projects.map((p) => (p.id === id ? { ...p, ...updated } : p));
    this.saveToStorage(STORAGE_KEYS.PROJECTS, this.projects);
    this.notify();

    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, "projects", id), updated).catch(console.warn);
    }
  }

  deleteProject(id: string) {
    this.projects = this.projects.filter((p) => p.id !== id);
    this.saveToStorage(STORAGE_KEYS.PROJECTS, this.projects);
    this.notify();

    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, "projects", id)).catch(console.warn);
    }
  }

  // Pricing Categories Management
  updatePricingCategory(id: "STARTER" | "PROFESSIONAL" | "PREMIUM", updated: Partial<PricingCategory>) {
    this.pricing = this.pricing.map((p) => (p.id === id ? { ...p, ...updated } : p));
    this.saveToStorage(STORAGE_KEYS.PRICING, this.pricing);
    this.notify();
  }

  // Inquiries Management
  addInquiry(inquiry: ClientInquiry) {
    this.inquiries = [inquiry, ...this.inquiries];
    this.saveToStorage(STORAGE_KEYS.INQUIRIES, this.inquiries);
    this.notify();

    if (isFirebaseConfigured && db) {
      setDoc(doc(db, "inquiries", inquiry.id), inquiry).catch(console.warn);
    }
  }

  updateInquiryStatus(id: string, status: InquiryStatus, notes?: string) {
    this.inquiries = this.inquiries.map((inq) =>
      inq.id === id
        ? {
            ...inq,
            status,
            ...(notes !== undefined ? { notes } : {}),
          }
        : inq
    );
    this.saveToStorage(STORAGE_KEYS.INQUIRIES, this.inquiries);
    this.notify();

    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, "inquiries", id), { status, ...(notes ? { notes } : {}) }).catch(console.warn);
    }
  }

  deleteInquiry(id: string) {
    this.inquiries = this.inquiries.filter((inq) => inq.id !== id);
    this.saveToStorage(STORAGE_KEYS.INQUIRIES, this.inquiries);
    this.notify();

    if (isFirebaseConfigured && db) {
      deleteDoc(doc(db, "inquiries", id)).catch(console.warn);
    }
  }

  // Payments Management
  addPayment(payment: PaymentRecord) {
    this.payments = [payment, ...this.payments];
    this.saveToStorage(STORAGE_KEYS.PAYMENTS, this.payments);
    this.notify();

    if (isFirebaseConfigured && db) {
      setDoc(doc(db, "payments", payment.id), payment).catch(console.warn);
    }
  }

  updatePaymentStatus(id: string, status: PaymentStatus) {
    this.payments = this.payments.map((p) =>
      p.id === id
        ? {
            ...p,
            status,
            verifiedAt: status === "Verified" ? new Date().toISOString() : undefined,
          }
        : p
    );
    this.saveToStorage(STORAGE_KEYS.PAYMENTS, this.payments);
    this.notify();

    if (isFirebaseConfigured && db) {
      updateDoc(doc(db, "payments", id), {
        status,
        verifiedAt: status === "Verified" ? new Date().toISOString() : null,
      }).catch(console.warn);
    }
  }

  // Testimonials Management
  addTestimonial(testimonial: TestimonialItem) {
    this.testimonials = [testimonial, ...this.testimonials];
    this.saveToStorage(STORAGE_KEYS.TESTIMONIALS, this.testimonials);
    this.notify();
  }

  updateTestimonial(id: string, updated: Partial<TestimonialItem>) {
    this.testimonials = this.testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t));
    this.saveToStorage(STORAGE_KEYS.TESTIMONIALS, this.testimonials);
    this.notify();
  }

  deleteTestimonial(id: string) {
    this.testimonials = this.testimonials.filter((t) => t.id !== id);
    this.saveToStorage(STORAGE_KEYS.TESTIMONIALS, this.testimonials);
    this.notify();
  }
}

export const studioStore = new StudioStore();

export function useStudioStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = studioStore.subscribe(() => {
      setTick((t) => t + 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return studioStore;
}
