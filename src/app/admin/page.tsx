"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Phone,
  Briefcase,
  Layers,
  DollarSign,
  Inbox,
  CreditCard,
  MessageSquare,
  Globe,
  Share2,
  LogOut,
  Download,
  Trash2,
  Edit,
  Plus,
  CheckCircle2,
  AlertCircle,
  Save,
  Search,
  Upload,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  Trophy,
  Video,
  Instagram,
  Settings,
  Crop,
  GraduationCap,
  Code2,
  Target,
  Compass,
} from "lucide-react";
import XIcon from "@/components/XIcon";
import { useStudioStore } from "@/lib/store";
import { exportToCSV, generateId } from "@/lib/utils";
import {
  InquiryStatus,
  PaymentStatus,
  ProjectItem,
  ServiceItem,
  TestimonialItem,
  TechnicalSkill,
  EducationEntry,
} from "@/lib/types";
import { uploadImageFile } from "@/lib/storage";

export default function AdminDashboardPage() {
  const router = useRouter();
  const store = useStudioStore();

  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "profile"
    | "contact"
    | "services"
    | "projects"
    | "pricing"
    | "inquiries"
    | "payments"
    | "testimonials"
    | "website"
    | "settings"
  >("overview");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Route protection
  useEffect(() => {
    if (store.isInitialized && !store.isAdminLoggedIn) {
      router.push("/admin/login");
    }
  }, [store.isInitialized, store.isAdminLoggedIn, router]);

  // Handle Logout
  const handleLogout = () => {
    store.logoutAdmin();
    router.push("/admin/login");
  };

  // Profile Form State
  const [profileForm, setProfileForm] = useState(store.profile);
  useEffect(() => {
    setProfileForm(store.profile);
  }, [store.profile]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateProfile(profileForm);
    showToast("Profile settings saved successfully!");
  };

  // Image Upload to Permanent Storage (Firebase Storage + Server Storage fallback)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<string | null>(null);

  const handleProfilePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "photoUrl" | "personalPhotoUrl" | "professionalPhotoUrl"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(field);
    showToast("Uploading photograph to permanent storage...");

    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("aws_store_admin_auth_v2") || undefined
          : undefined;
      const result = await uploadImageFile(file, "profile", token);

      setProfileForm((prev) => ({ ...prev, [field]: result.url }));
      store.updateProfile({ [field]: result.url });

      const storageName =
        result.source === "firebase" ? "Firebase Storage" : "Persistent Server Storage";
      showToast(`Photograph permanently saved to ${storageName}!`);
    } catch (err: any) {
      console.error("Profile photo upload failed:", err);
      showToast(err?.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploadingPhoto(null);
    }
  };

  // Profile Skills management state
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Frontend");
  const [newSkillLevel, setNewSkillLevel] = useState(90);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) {
      showToast("Please enter a skill name");
      return;
    }
    const skillItem: TechnicalSkill = {
      id: `skill-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: Number(newSkillLevel) || 85,
    };
    const updatedSkills = [...(profileForm.skills || []), skillItem];
    setProfileForm((prev) => ({ ...prev, skills: updatedSkills }));
    store.updateProfile({ skills: updatedSkills });
    setNewSkillName("");
    showToast(`Added skill "${skillItem.name}"!`);
  };

  const handleDeleteSkill = (skillId: string) => {
    const updatedSkills = (profileForm.skills || []).filter((s) => s.id !== skillId);
    setProfileForm((prev) => ({ ...prev, skills: updatedSkills }));
    store.updateProfile({ skills: updatedSkills });
    showToast("Skill removed successfully!");
  };

  const handleUpdateSkillLevel = (skillId: string, level: number) => {
    const updatedSkills = (profileForm.skills || []).map((s) =>
      s.id === skillId ? { ...s, level } : s
    );
    setProfileForm((prev) => ({ ...prev, skills: updatedSkills }));
    store.updateProfile({ skills: updatedSkills });
  };

  // Education management state
  const [newEduDegree, setNewEduDegree] = useState("");
  const [newEduInstitution, setNewEduInstitution] = useState("");
  const [newEduYear, setNewEduYear] = useState("");
  const [newEduDetails, setNewEduDetails] = useState("");

  const handleAddEducation = () => {
    if (!newEduDegree.trim() || !newEduInstitution.trim()) {
      showToast("Please enter degree and institution");
      return;
    }
    const eduItem: EducationEntry = {
      id: `edu-${Date.now()}`,
      degree: newEduDegree.trim(),
      institution: newEduInstitution.trim(),
      year: newEduYear.trim() || undefined,
      details: newEduDetails.trim() || undefined,
    };
    const updatedEducation = [...(profileForm.education || []), eduItem];
    setProfileForm((prev) => ({ ...prev, education: updatedEducation }));
    store.updateProfile({ education: updatedEducation });
    setNewEduDegree("");
    setNewEduInstitution("");
    setNewEduYear("");
    setNewEduDetails("");
    showToast("Added education credential!");
  };

  const handleDeleteEducation = (eduId: string) => {
    const updatedEducation = (profileForm.education || []).filter((e) => e.id !== eduId);
    setProfileForm((prev) => ({ ...prev, education: updatedEducation }));
    store.updateProfile({ education: updatedEducation });
    showToast("Education entry removed!");
  };

  // Achievements management state
  const [newAchievement, setNewAchievement] = useState("");

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    const updatedAchievements = [...(profileForm.achievements || []), newAchievement.trim()];
    setProfileForm((prev) => ({ ...prev, achievements: updatedAchievements }));
    store.updateProfile({ achievements: updatedAchievements });
    setNewAchievement("");
    showToast("Achievement added!");
  };

  const handleDeleteAchievement = (index: number) => {
    const updatedAchievements = (profileForm.achievements || []).filter((_, idx) => idx !== index);
    setProfileForm((prev) => ({ ...prev, achievements: updatedAchievements }));
    store.updateProfile({ achievements: updatedAchievements });
    showToast("Achievement removed!");
  };

  // Areas of Interest management state
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    const updatedInterests = [...(profileForm.areasOfInterest || []), newInterest.trim()];
    setProfileForm((prev) => ({ ...prev, areasOfInterest: updatedInterests }));
    store.updateProfile({ areasOfInterest: updatedInterests });
    setNewInterest("");
    showToast("Area of interest added!");
  };

  const handleDeleteInterest = (index: number) => {
    const updatedInterests = (profileForm.areasOfInterest || []).filter((_, idx) => idx !== index);
    setProfileForm((prev) => ({ ...prev, areasOfInterest: updatedInterests }));
    store.updateProfile({ areasOfInterest: updatedInterests });
    showToast("Interest removed!");
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState(store.contact);
  useEffect(() => {
    setContactForm(store.contact);
  }, [store.contact]);

  const handleContactSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateContact(contactForm);
    showToast("Contact and social channels updated!");
  };

  // Website Settings Form State
  const [settingsForm, setSettingsForm] = useState(store.settings);
  useEffect(() => {
    setSettingsForm(store.settings);
  }, [store.settings]);

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings(settingsForm);
    showToast("Website brand settings and SEO updated!");
  };

  // Inquiries Search & Filter
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>("All");
  const [inquirySearch, setInquirySearch] = useState("");

  const filteredInquiries = store.inquiries.filter((inq) => {
    const matchesStatus =
      inquiryStatusFilter === "All" || inq.status === inquiryStatusFilter;
    const matchesSearch =
      inq.clientName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.requiredService.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.id.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportCSV = () => {
    const rows = store.inquiries.map((inq) => ({
      "Tracking ID": inq.id,
      "Client Name": inq.clientName,
      Email: inq.email,
      Phone: inq.phoneNumber,
      WhatsApp: inq.whatsappNumber || "N/A",
      Company: inq.businessName || "N/A",
      "Required Service": inq.requiredService,
      Budget: inq.budget,
      Deadline: inq.expectedDeadline,
      "Reference Link": inq.referenceWebsite || "N/A",
      Status: inq.status,
      "Date Submitted": inq.createdAt,
      Notes: inq.notes || "",
    }));
    exportToCSV(`akshaj-studio-inquiries-${new Date().toISOString().slice(0, 10)}.csv`, rows);
    showToast("Client inquiries exported as CSV!");
  };

  // Project Modal / Editing State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<ProjectItem>>({
    title: "",
    category: "Web Development",
    description: "",
    fullOverview: "",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    videoUrl: "",
    liveUrl: "",
    githubUrl: "",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    clientName: "",
  });

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      store.updateProject(editingProject.id, projectForm);
      showToast("Project updated successfully!");
    } else {
      store.addProject({
        id: generateId("AWS-PRJ"),
        title: projectForm.title || "Untitled Project",
        category: (projectForm.category as any) || "Web Development",
        description: projectForm.description || "",
        fullOverview: projectForm.fullOverview || "",
        imageUrl: projectForm.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
        videoUrl: projectForm.videoUrl,
        liveUrl: projectForm.liveUrl,
        githubUrl: projectForm.githubUrl,
        technologies: projectForm.technologies || ["Next.js"],
        clientName: projectForm.clientName,
      });
      showToast("New project added to portfolio!");
    }
    setEditingProject(null);
    setIsAddingProject(false);
  };

  const [isUploadingProjectImage, setIsUploadingProjectImage] = useState(false);

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingProjectImage(true);
    showToast("Uploading project image to permanent storage...");

    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("aws_store_admin_auth_v2") || undefined
          : undefined;
      const result = await uploadImageFile(file, "projects", token);

      setProjectForm((prev) => ({ ...prev, imageUrl: result.url }));
      const storageName =
        result.source === "firebase" ? "Firebase Storage" : "Persistent Server Storage";
      showToast(`Project screenshot saved to ${storageName}!`);
    } catch (err: any) {
      console.error("Project image upload error:", err);
      showToast(err?.message || "Failed to upload project screenshot.");
    } finally {
      setIsUploadingProjectImage(false);
    }
  };

  // Service Edit State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      store.updateService(editingService.id, editingService);
      setEditingService(null);
      showToast("Service details & price updated!");
    }
  };

  // Testimonial Edit State
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [testForm, setTestForm] = useState<Partial<TestimonialItem>>({
    clientName: "",
    clientRole: "",
    clientCompany: "",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
    quote: "",
    rating: 5,
    projectTitle: "",
  });

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      store.updateTestimonial(editingTestimonial.id, testForm);
      showToast("Testimonial updated!");
    } else {
      store.addTestimonial({
        id: generateId("AWS-TST"),
        clientName: testForm.clientName || "Valued Client",
        clientRole: testForm.clientRole || "Executive",
        clientCompany: testForm.clientCompany || "Enterprise",
        avatarUrl: testForm.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
        quote: testForm.quote || "",
        rating: testForm.rating || 5,
        projectTitle: testForm.projectTitle || "Digital Solution",
      });
      showToast("New testimonial added!");
    }
    setEditingTestimonial(null);
    setIsAddingTestimonial(false);
  };

  if (!store.isInitialized || !store.isAdminLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gold-400">
        <div className="flex items-center gap-3 text-sm">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Verifying encrypted administrative session...</span>
        </div>
      </div>
    );
  }

  // Analytics Metrics
  const totalInquiries = store.inquiries.length;
  const newInquiries = store.inquiries.filter((i) => i.status === "New").length;
  const confirmedInquiries = store.inquiries.filter((i) => i.status === "Confirmed").length;
  const inProgressInquiries = store.inquiries.filter((i) => i.status === "In Progress").length;
  const verifiedPaymentsCount = store.payments.filter((p) => p.status === "Verified").length;
  const verifiedPaymentsTotal = store.payments
    .filter((p) => p.status === "Verified")
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-[1550px] mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-gold-500 text-dark-950 text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-gold-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center text-dark-950 font-black text-xl shadow-gold-sm">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">
                AKSHAJ <span className="text-gold-gradient">STUDIO</span> CONTROL CONSOLE
              </h1>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase">
                Active Session
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Enterprise digital agency & business operations dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-xl border border-white/10 hover:border-gold-500/40 text-xs text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-xs font-bold text-red-300 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Admin Navigation Tabs (Covering Sections A through I) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
        {[
          { id: "overview", label: "Overview & Analytics", icon: LayoutDashboard },
          { id: "profile", label: "A. Profile & Photos", icon: User },
          { id: "contact", label: "B. Contact & Socials", icon: Phone },
          { id: "website", label: "C. Website Content", icon: Globe },
          { id: "services", label: `D. Services (${store.services.length})`, icon: Layers },
          { id: "projects", label: `E. Projects (${store.projects.length})`, icon: Briefcase },
          { id: "inquiries", label: `F. Client Enquiries (${newInquiries} New)`, icon: Inbox },
          { id: "payments", label: `G. Payments & Razorpay`, icon: CreditCard },
          { id: "testimonials", label: "H. Testimonials", icon: MessageSquare },
          { id: "pricing", label: "Pricing Packages", icon: DollarSign },
          { id: "settings", label: "I. SEO & Google Search", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-gold-500 text-dark-950 font-bold shadow-gold-sm"
                  : "bg-dark-900 border border-white/10 text-gray-400 hover:text-white hover:border-gold-500/30"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          SECTION: OVERVIEW & ANALYTICS
         ======================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fade-in">
          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">
                Total Client Inquiries
              </span>
              <div className="text-3xl font-black text-white mt-1">
                {totalInquiries}
              </div>
              <div className="text-xs text-gold-400 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <span>{newInquiries} New • {confirmedInquiries} Confirmed</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">
                Verified Inbound Revenue
              </span>
              <div className="text-3xl font-black text-gold-gradient mt-1">
                ₹{verifiedPaymentsTotal.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{verifiedPaymentsCount} verified milestone payments</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">
                Services Offered
              </span>
              <div className="text-3xl font-black text-white mt-1">
                {store.services.length}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                All prices and images editable
              </div>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">
                Published Portfolio Projects
              </span>
              <div className="text-3xl font-black text-white mt-1">
                {store.projects.length}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Live case studies & video demos
              </div>
            </div>
          </div>

          {/* Quick Shortcuts & Inquiries Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Recent Client Enquiries</h3>
                  <p className="text-xs text-gray-400">Latest submissions awaiting response</p>
                </div>
                <button
                  onClick={() => setActiveTab("inquiries")}
                  className="text-xs text-gold-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View All Inquiries</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {store.inquiries.slice(0, 4).map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-2xl bg-dark-900 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {inq.clientName}
                        </span>
                        <span className="font-mono text-[10px] text-gray-500">
                          {inq.id}
                        </span>
                      </div>
                      <div className="text-gray-400 mt-0.5">
                        {inq.requiredService} • Budget: {inq.budget}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === "New"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : inq.status === "Confirmed"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                            : inq.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                        }`}
                      >
                        {inq.status}
                      </span>
                      <button
                        onClick={() => setActiveTab("inquiries")}
                        className="px-3 py-1 rounded-lg border border-white/10 hover:border-gold-500/40 text-gray-300 hover:text-white"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/20 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Operations Quick Actions</h3>
                <p className="text-xs text-gray-400 mb-6">Frequently used management controls</p>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setActiveTab("projects");
                      setIsAddingProject(true);
                      setEditingProject(null);
                    }}
                    className="w-full btn-gold py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Portfolio Project</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="w-full py-2.5 rounded-xl border border-white/10 hover:border-gold-500/40 text-xs font-semibold text-gray-200 hover:text-white bg-dark-900 flex items-center justify-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>Export Enquiries as CSV</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("profile")}
                    className="w-full py-2.5 rounded-xl border border-white/10 hover:border-gold-500/40 text-xs font-semibold text-gray-200 hover:text-white bg-dark-900 flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-gold-400" />
                    <span>Upload Profile Photos</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-gray-500">
                Connected Storage: Local Storage + Cloud Firestore Active
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SECTION A: PROFILE MANAGEMENT (FOUNDER DETAILS & CAPABILITIES)
         ======================================================== */}
      {activeTab === "profile" && (
        <div className="space-y-8 animate-fade-in max-w-4xl">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
            <h3 className="text-xl font-bold text-white mb-1">
              Section A: Founder Profile & Identity Management
            </h3>
            <p className="text-xs text-gray-400">
              Manage your full name, official designation, profile photographs, biography, individual technical skills, optional education, key achievements, and direct social channels.
            </p>
          </div>

          {/* 1 & 2. Photographs Management: Upload & Change */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-gradient flex items-center gap-2">
                <Upload className="w-4 h-4 text-gold-400" />
                <span>1 & 2. Profile Photographs (Upload & Change)</span>
              </h4>
              <span className="text-[10px] font-mono text-gold-400">Instant Preview Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Professional Profile Photograph */}
              <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/10 flex flex-col items-center text-center">
                <span className="text-xs font-bold uppercase text-gold-400 mb-3 font-mono">
                  Professional Profile Photo
                </span>
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-dark-950 border-2 border-gold-400 mb-4 shadow-gold-sm">
                  <Image
                    src={profileForm.professionalPhotoUrl || profileForm.photoUrl}
                    alt="Professional Photo"
                    fill
                    className="object-cover"
                  />
                </div>
                <label className="btn-gold-outline w-full py-2 rounded-xl text-xs font-bold cursor-pointer mb-2 flex items-center justify-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photograph</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleProfilePhotoUpload(e, "professionalPhotoUrl")}
                    className="hidden"
                  />
                </label>
                <input
                  type="url"
                  value={profileForm.professionalPhotoUrl || ""}
                  onChange={(e) => {
                    setProfileForm({ ...profileForm, professionalPhotoUrl: e.target.value });
                    store.updateProfile({ professionalPhotoUrl: e.target.value });
                  }}
                  placeholder="Or paste direct image URL"
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              {/* Personal Photograph */}
              <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/10 flex flex-col items-center text-center">
                <span className="text-xs font-bold uppercase text-gold-400 mb-3 font-mono">
                  Personal Profile Photo
                </span>
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-dark-950 border-2 border-gold-400 mb-4 shadow-gold-sm">
                  <Image
                    src={profileForm.personalPhotoUrl || profileForm.photoUrl}
                    alt="Personal Photo"
                    fill
                    className="object-cover"
                  />
                </div>
                <label className="btn-gold-outline w-full py-2 rounded-xl text-xs font-bold cursor-pointer mb-2 flex items-center justify-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photograph</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleProfilePhotoUpload(e, "personalPhotoUrl")}
                    className="hidden"
                  />
                </label>
                <input
                  type="url"
                  value={profileForm.personalPhotoUrl || ""}
                  onChange={(e) => {
                    setProfileForm({ ...profileForm, personalPhotoUrl: e.target.value });
                    store.updateProfile({ personalPhotoUrl: e.target.value });
                  }}
                  placeholder="Or paste direct image URL"
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* 3, 4 & 5. Core Profile Details & Biography Form */}
          <form onSubmit={handleProfileSave} className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-gradient flex items-center gap-2">
              <User className="w-4 h-4 text-gold-400" />
              <span>3, 4 & 5. Name, Designation & Detailed Biography</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  3. Full Name * (e.g. Akshaj Lodhi)
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  4. Designation / Professional Title *
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.roleTitle}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, roleTitle: e.target.value })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Short Introduction (Hero Tagline & Summary)
              </label>
              <textarea
                rows={2}
                value={profileForm.bioIntro}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, bioIntro: e.target.value })
                }
                className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                5. Detailed Biography (Full Narrative)
              </label>
              <textarea
                rows={4}
                value={profileForm.fullBio}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, fullBio: e.target.value })
                }
                placeholder="Write your professional background and software engineering philosophy..."
                className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Digital Business Journey
              </label>
              <textarea
                rows={3}
                value={profileForm.businessJourney || ""}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, businessJourney: e.target.value })
                }
                placeholder="Explain the origin, milestones, and development journey of AKSHAJ WEB STUDIO..."
                className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Business & Technical Goals
                </label>
                <textarea
                  rows={3}
                  value={profileForm.goals || ""}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, goals: e.target.value })
                  }
                  placeholder="Outline your future software initiatives, client goals, and studio targets..."
                  className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Business Vision
                </label>
                <textarea
                  rows={3}
                  value={profileForm.businessVision || ""}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, businessVision: e.target.value })
                  }
                  placeholder="Statement of studio vision and values..."
                  className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
                />
              </div>
            </div>

            {/* Areas of Interest Manager */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <label className="block text-xs font-bold text-gray-300">
                Areas of Interest & Specialization
              </label>

              <div className="flex flex-wrap gap-2 mb-3">
                {profileForm.areasOfInterest?.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-dark-900 border border-gold-500/30 text-xs text-gray-200"
                  >
                    <span>{interest}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteInterest(idx)}
                      className="text-gray-400 hover:text-red-400 p-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add new area of interest (e.g., AI Engineering, Next.js Platforms)"
                  className="flex-1 bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="btn-gold-outline px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Interest</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Name, Bio & Vision</span>
            </button>
          </form>

          {/* 6. Technical Skills: Add, Edit and Remove Individually */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-gradient flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-gold-400" />
                  <span>6. Technical Skills (Add, Edit & Remove Individually)</span>
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Manage individual competencies with live proficiency percentages and categories.
                </p>
              </div>
              <span className="text-xs font-mono text-gold-400">
                {profileForm.skills?.length || 0} Skills Active
              </span>
            </div>

            {/* Existing Skills List with Delete and Level Edit */}
            <div className="space-y-3">
              {profileForm.skills?.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-2xl bg-dark-900/90 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm">{skill.name}</span>
                      <span className="px-2 py-0.5 rounded-md bg-gold-500/10 border border-gold-500/20 text-[10px] font-mono text-gold-400">
                        {skill.category}
                      </span>
                    </div>
                    {/* Level slider */}
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={skill.level}
                        onChange={(e) =>
                          handleUpdateSkillLevel(skill.id, Number(e.target.value))
                        }
                        className="w-36 accent-gold-500 cursor-pointer h-1.5 bg-dark-950 rounded-lg"
                      />
                      <span className="font-mono text-gold-400 font-bold">{skill.level}%</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors flex items-center gap-1.5 text-xs font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Skill Form */}
            <div className="p-4 rounded-2xl bg-dark-950/80 border border-gold-500/20 space-y-3">
              <span className="text-xs font-bold text-white block">Add New Technical Skill</span>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Skill name (e.g. Next.js, Python, Flutter)"
                  className="sm:col-span-5 bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="sm:col-span-3 bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="AI Engineering">AI Engineering</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Design">Design</option>
                  <option value="Database">Database</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Other">Other</option>
                </select>
                <div className="sm:col-span-2 flex items-center gap-2 bg-dark-900 border border-white/15 rounded-xl px-3 py-2">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                    className="w-full bg-transparent text-xs text-white font-mono"
                  />
                  <span className="text-xs text-gold-400 font-mono">%</span>
                </div>
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="sm:col-span-2 btn-gold py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* 7. Education Information: Add & Remove (Optional) */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-gradient flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gold-400" />
                  <span>7. Education Information (Optional)</span>
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Update or add degrees, institutions, and dates. This section is optional and displays only if entries exist.
                </p>
              </div>
              <span className="text-xs font-mono text-gold-400">
                {profileForm.education?.length || 0} Entries
              </span>
            </div>

            {/* Existing Education Entries List */}
            {profileForm.education && profileForm.education.length > 0 ? (
              <div className="space-y-3">
                {profileForm.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-4 rounded-2xl bg-dark-900/90 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{edu.degree}</div>
                      <div className="text-gold-300 mt-0.5">
                        {edu.institution} {edu.year && `• ${edu.year}`}
                      </div>
                      {edu.details && (
                        <div className="text-gray-400 mt-1 text-[11px]">{edu.details}</div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors flex items-center gap-1 text-xs shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-dark-900/50 border border-white/5 text-xs text-gray-400 text-center">
                No education entries currently saved. Add an entry below or leave blank.
              </div>
            )}

            {/* Add New Education Entry Form */}
            <div className="p-4 rounded-2xl bg-dark-950/80 border border-gold-500/20 space-y-3">
              <span className="text-xs font-bold text-white block">Add Academic Credential</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newEduDegree}
                  onChange={(e) => setNewEduDegree(e.target.value)}
                  placeholder="Degree / Certificate (e.g. B.Tech in Computer Science)"
                  className="bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={newEduInstitution}
                  onChange={(e) => setNewEduInstitution(e.target.value)}
                  placeholder="University / College / Institute Name"
                  className="bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={newEduYear}
                  onChange={(e) => setNewEduYear(e.target.value)}
                  placeholder="Year / Duration (e.g. 2020 – 2024)"
                  className="bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={newEduDetails}
                  onChange={(e) => setNewEduDetails(e.target.value)}
                  placeholder="Specialization / Honors (optional)"
                  className="bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <button
                type="button"
                onClick={handleAddEducation}
                className="btn-gold px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Education Entry</span>
              </button>
            </div>
          </div>

          {/* 8. Achievements: Add & Remove */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-gradient flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gold-400" />
                  <span>8. Key Achievements (Add & Remove)</span>
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Display notable milestones, awards, client delivery records, and agency accomplishments.
                </p>
              </div>
              <span className="text-xs font-mono text-gold-400">
                {profileForm.achievements?.length || 0} Achievements
              </span>
            </div>

            {/* Existing Achievements List */}
            <div className="space-y-2.5">
              {profileForm.achievements?.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-dark-900/90 border border-white/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-lg bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center shrink-0 text-xs">
                      ★
                    </span>
                    <span className="text-gray-200">{ach}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteAchievement(idx)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Achievement */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Enter new milestone or achievement..."
                className="flex-1 bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="btn-gold px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Achievement</span>
              </button>
            </div>
          </div>

          {/* 9. Completed Projects Shortcut */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-gradient flex items-center gap-2 mb-1">
                <Briefcase className="w-4 h-4 text-gold-400" />
                <span>9. Completed Projects Showcase ({store.projects.length} Published)</span>
              </h4>
              <p className="text-xs text-gray-400">
                Manage screenshots, descriptions, live demo links, and technologies for all client projects.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("projects");
                  setIsAddingProject(true);
                  setEditingProject(null);
                }}
                className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Project</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className="btn-gold-outline px-4 py-2.5 rounded-xl text-xs font-semibold"
              >
                <span>Manage All Projects</span>
              </button>
            </div>
          </div>

          {/* 10. Social Media Links Synchronization */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-gradient flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-gold-400" />
                  <span>10. Social Media Links (Reflects Across Entire Site)</span>
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Update direct profile links: Email, WhatsApp, Instagram, LinkedIn, and GitHub.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  store.updateContact(contactForm);
                  showToast("Social media channels synchronized!");
                }}
                className="btn-gold px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-gold-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Socials</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={contactForm.businessEmail || contactForm.email}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      businessEmail: e.target.value,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  WhatsApp Direct Number *
                </label>
                <input
                  type="text"
                  value={contactForm.whatsapp}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, whatsapp: e.target.value })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-pink-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Instagram Profile & Settings
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={contactForm.instagramEnabled !== false}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            instagramEnabled: e.target.checked,
                          })
                        }
                        className="rounded accent-pink-500 w-3.5 h-3.5"
                      />
                      <span className="text-gray-300 font-medium">
                        {contactForm.instagramEnabled !== false ? "Enabled" : "Disabled"}
                      </span>
                    </label>

                    <a
                      href={contactForm.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 hover:text-white border border-pink-500/40 text-[11px] font-semibold transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Preview Profile</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Instagram Username *
                    </label>
                    <input
                      type="text"
                      value={contactForm.instagramUsername}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, instagramUsername: e.target.value })
                      }
                      placeholder="luckybro_9198"
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Instagram Profile URL *
                    </label>
                    <input
                      type="url"
                      value={contactForm.instagramUrl}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, instagramUrl: e.target.value })
                      }
                      placeholder="https://www.instagram.com/luckybro_9198/"
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 p-4 rounded-2xl bg-white/5 border border-white/20 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <XIcon className="w-4 h-4 text-gray-200" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Twitter / X Profile & Settings
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={contactForm.twitterEnabled !== false}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            twitterEnabled: e.target.checked,
                          })
                        }
                        className="rounded accent-gold-500 w-3.5 h-3.5"
                      />
                      <span className="text-gray-300 font-medium">
                        {contactForm.twitterEnabled !== false ? "Enabled" : "Disabled"}
                      </span>
                    </label>

                    <a
                      href={contactForm.twitterUrl || "https://x.com/LuckyBro199620"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white border border-white/20 text-[11px] font-semibold transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Preview Profile</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Twitter / X Username *
                    </label>
                    <input
                      type="text"
                      value={contactForm.twitterUsername || ""}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, twitterUsername: e.target.value })
                      }
                      placeholder="LuckyBro199620"
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Twitter / X Profile URL *
                    </label>
                    <input
                      type="url"
                      value={contactForm.twitterUrl || contactForm.socials.twitter || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContactForm({
                          ...contactForm,
                          twitterUrl: val,
                          socials: { ...contactForm.socials, twitter: val },
                        });
                      }}
                      placeholder="https://x.com/LuckyBro199620"
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  LinkedIn Profile URL *
                </label>
                <input
                  type="url"
                  value={contactForm.socials.linkedin}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      socials: { ...contactForm.socials, linkedin: e.target.value },
                    })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  GitHub Profile URL *
                </label>
                <input
                  type="url"
                  value={contactForm.socials.github}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      socials: { ...contactForm.socials, github: e.target.value },
                    })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SECTION B: CONTACT MANAGEMENT (PHONES, WHATSAPP, INSTAGRAM)
         ======================================================== */}
      {activeTab === "contact" && (
        <div className="space-y-6 animate-fade-in max-w-4xl">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
            <h3 className="text-xl font-bold text-white mb-1">
              Section B: Contact Management & Official Channels
            </h3>
            <p className="text-xs text-gray-400">
              Manage personal & business phone numbers, WhatsApp, Instagram ID, emails, and social links.
            </p>
          </div>

          <form onSubmit={handleContactSave} className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  1. Personal Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.personalPhone || ""}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, personalPhone: e.target.value })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  2. Business Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.businessPhone || ""}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, businessPhone: e.target.value })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  3. WhatsApp Number
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.whatsapp}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, whatsapp: e.target.value })
                  }
                  placeholder="+919198562197"
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-pink-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      4 & 5. Instagram Profile & Social Settings
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={contactForm.instagramEnabled !== false}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            instagramEnabled: e.target.checked,
                          })
                        }
                        className="rounded accent-pink-500 w-3.5 h-3.5"
                      />
                      <span className="text-gray-300 font-medium">
                        {contactForm.instagramEnabled !== false ? "Enabled" : "Disabled"}
                      </span>
                    </label>

                    <a
                      href={contactForm.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 hover:text-white border border-pink-500/40 text-[11px] font-semibold transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Preview Profile</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Instagram Username
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.instagramUsername || ""}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, instagramUsername: e.target.value })
                      }
                      placeholder="luckybro_9198"
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      required
                      value={contactForm.instagramUrl || ""}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, instagramUrl: e.target.value })
                      }
                      placeholder="https://www.instagram.com/luckybro_9198/"
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 p-4 rounded-2xl bg-white/5 border border-white/20 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <XIcon className="w-4 h-4 text-gray-200" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Twitter / X Profile & Settings
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={contactForm.twitterEnabled !== false}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            twitterEnabled: e.target.checked,
                          })
                        }
                        className="rounded accent-gold-500 w-3.5 h-3.5"
                      />
                      <span className="text-gray-300 font-medium">
                        {contactForm.twitterEnabled !== false ? "Enabled" : "Disabled"}
                      </span>
                    </label>

                    <a
                      href={contactForm.twitterUrl || "https://x.com/LuckyBro199620"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white border border-white/20 text-[11px] font-semibold transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Preview Profile</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Twitter / X Username
                    </label>
                    <input
                      type="text"
                      value={contactForm.twitterUsername || ""}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, twitterUsername: e.target.value })
                      }
                      placeholder="LuckyBro199620"
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Twitter / X Profile URL
                    </label>
                    <input
                      type="url"
                      value={contactForm.twitterUrl || contactForm.socials.twitter || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContactForm({
                          ...contactForm,
                          twitterUrl: val,
                          socials: { ...contactForm.socials, twitter: val },
                        });
                      }}
                      placeholder="https://x.com/LuckyBro199620"
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  6. Business Email Address
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.businessEmail || ""}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, businessEmail: e.target.value })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  7. Personal Email Address
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.personalEmail || ""}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, personalEmail: e.target.value })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  8. Facebook Profile URL
                </label>
                <input
                  type="url"
                  value={contactForm.socials.facebook || ""}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      socials: { ...contactForm.socials, facebook: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/..."
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  9. LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={contactForm.socials.linkedin}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      socials: { ...contactForm.socials, linkedin: e.target.value },
                    })
                  }
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  10. YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={contactForm.socials.youtube || ""}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      socials: { ...contactForm.socials, youtube: e.target.value },
                    })
                  }
                  placeholder="https://youtube.com/@..."
                  className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Official Studio UPI ID
              </label>
              <input
                type="text"
                required
                value={contactForm.upiId}
                onChange={(e) =>
                  setContactForm({ ...contactForm, upiId: e.target.value })
                }
                className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
            >
              <Save className="w-4 h-4" />
              <span>Update Contact Details</span>
            </button>
          </form>
        </div>
      )}

      {/* ========================================================
          SECTION C: WEBSITE CONTENT MANAGEMENT
         ======================================================== */}
      {activeTab === "website" && (
        <div className="space-y-6 animate-fade-in max-w-4xl">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
            <h3 className="text-xl font-bold text-white mb-1">
              Section C: Website Content & Homepage Headings
            </h3>
            <p className="text-xs text-gray-400">
              Customize headline, official tagline, and introduction copy without editing code.
            </p>
          </div>

          <form onSubmit={handleSettingsSave} className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Website Brand Display Name
              </label>
              <input
                type="text"
                value={settingsForm.siteName}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, siteName: e.target.value })
                }
                className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Official Tagline
              </label>
              <input
                type="text"
                value={settingsForm.tagline}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, tagline: e.target.value })
                }
                className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Homepage Introduction Text
              </label>
              <textarea
                rows={3}
                value={settingsForm.heroIntroduction}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, heroIntroduction: e.target.value })
                }
                className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Footer Mission & About Description
              </label>
              <textarea
                rows={3}
                value={settingsForm.footerAboutText}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, footerAboutText: e.target.value })
                }
                className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
            >
              <Save className="w-4 h-4" />
              <span>Update Homepage Content</span>
            </button>
          </form>
        </div>
      )}

      {/* ========================================================
          SECTION D: SERVICES MANAGEMENT
         ======================================================== */}
      {activeTab === "services" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
            <h3 className="text-xl font-bold text-white mb-1">
              Section D: Service Management & Starting Prices
            </h3>
            <p className="text-xs text-gray-400">
              Modify starting prices, upload service images, and adjust deliverables for each service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {store.services.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-3xl glass-panel border border-gold-500/20 flex flex-col justify-between"
              >
                <div>
                  {srv.imageUrl && (
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-dark-900 mb-4 border border-white/5">
                      <Image
                        src={srv.imageUrl}
                        alt={srv.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-gold-400 uppercase">
                      {srv.category}
                    </span>
                    <span className="text-lg font-black text-gold-gradient font-mono">
                      {srv.startingPrice}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2">{srv.name}</h4>
                  <p className="text-xs text-gray-400 mb-4">{srv.shortDescription}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">
                    Est: {srv.turnaroundTime}
                  </span>
                  <button
                    onClick={() => setEditingService(srv)}
                    className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Price & Image</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Service Edit Modal */}
          {editingService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="relative w-full max-w-lg bg-dark-950 border border-gold-500/40 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4">
                  Edit Service: {editingService.name}
                </h3>
                <form onSubmit={handleSaveService} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Starting Price (Editable)
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.startingPrice}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          startingPrice: e.target.value,
                        })
                      }
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Service Image URL
                    </label>
                    <input
                      type="url"
                      value={editingService.imageUrl || ""}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          imageUrl: e.target.value,
                        })
                      }
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingService.shortDescription}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          shortDescription: e.target.value,
                        })
                      }
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Features (Comma separated)
                    </label>
                    <textarea
                      rows={3}
                      value={editingService.features.join(", ")}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          features: e.target.value
                            .split(",")
                            .map((f) => f.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="px-4 py-2 rounded-xl border border-white/10 text-xs text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-gold px-5 py-2 rounded-xl text-xs font-bold"
                    >
                      Save Service Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SECTION E: PROJECT MANAGEMENT (IMAGES & VIDEOS)
         ======================================================== */}
      {activeTab === "projects" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Section E: Project Management</h3>
              <p className="text-xs text-gray-400">
                Upload screenshots, photographs, and add project videos.
              </p>
            </div>
            <button
              onClick={() => {
                setIsAddingProject(true);
                setEditingProject(null);
                setProjectForm({
                  title: "",
                  category: "Web Development",
                  description: "",
                  fullOverview: "",
                  imageUrl:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
                  videoUrl: "",
                  liveUrl: "",
                  githubUrl: "",
                  technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
                  clientName: "",
                });
              }}
              className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {store.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-3xl glass-panel border border-gold-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-dark-900 mb-4">
                    <Image
                      src={proj.imageUrl}
                      alt={proj.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-dark-950/80 border border-gold-500/30 text-[10px] text-gold-300">
                      {proj.category}
                    </span>
                    {proj.videoUrl && (
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-dark-950/80 border border-gold-500/30 text-[10px] text-gold-300 flex items-center gap-1">
                        <Video className="w-3 h-3 text-gold-400" />
                        <span>Video</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">{proj.title}</h4>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setEditingProject(proj);
                      setProjectForm(proj);
                      setIsAddingProject(true);
                    }}
                    className="p-2 rounded-lg bg-dark-900 border border-white/10 hover:border-gold-500/40 text-xs text-gold-300 flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete project "${proj.title}"?`)) {
                        store.deleteProject(proj.id);
                        showToast("Project deleted");
                      }
                    }}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Project Add/Edit Modal */}
          {isAddingProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
              <div className="relative w-full max-w-2xl bg-dark-950 border border-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, title: e.target.value })
                        }
                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Category
                      </label>
                      <select
                        value={projectForm.category}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            category: e.target.value as any,
                          })
                        }
                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="AI Solutions">AI Solutions</option>
                        <option value="Android App">Android App</option>
                        <option value="Custom Software">Custom Software</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Upload Project Screenshot / Photograph
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProjectImageUpload}
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-gray-400 mb-2"
                    />
                    <input
                      type="url"
                      value={projectForm.imageUrl}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, imageUrl: e.target.value })
                      }
                      placeholder="Or paste screenshot URL"
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Project Video URL (YouTube embed or video URL)
                    </label>
                    <input
                      type="url"
                      value={projectForm.videoUrl || ""}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, videoUrl: e.target.value })
                      }
                      placeholder="e.g. https://www.youtube.com/watch?v=..."
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Live Website URL
                      </label>
                      <input
                        type="url"
                        value={projectForm.liveUrl}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, liveUrl: e.target.value })
                        }
                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={projectForm.clientName}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, clientName: e.target.value })
                        }
                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={projectForm.technologies?.join(", ")}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          technologies: e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="px-4 py-2 rounded-xl border border-white/10 text-xs text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-gold px-5 py-2 rounded-xl text-xs font-bold"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SECTION F: CLIENT MANAGEMENT & ENQUIRIES
         ======================================================== */}
      {activeTab === "inquiries" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                Section F: Client Management & Enquiries
              </h3>
              <p className="text-xs text-gray-400">
                Track, audit, update inquiry status (all 7 statuses), and export as CSV.
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 shadow-gold-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export Enquiries as CSV</span>
            </button>
          </div>

          {/* Filter Bar with all 7 requested statuses */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                "All",
                "New",
                "Contacted",
                "Discussion",
                "Confirmed",
                "In Progress",
                "Completed",
                "Cancelled",
              ].map((st) => (
                <button
                  key={st}
                  onClick={() => setInquiryStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    inquiryStatusFilter === st
                      ? "bg-gold-500 text-dark-950 font-bold"
                      : "bg-dark-900 border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                placeholder="Search by client, ID, service..."
                className="w-full bg-dark-900 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="rounded-3xl glass-panel border border-gold-500/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-dark-900 border-b border-white/10 text-gray-400 font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">ID & Date</th>
                    <th className="py-4 px-6">Client Details</th>
                    <th className="py-4 px-6">Service & Scope</th>
                    <th className="py-4 px-6">Budget & Deadline</th>
                    <th className="py-4 px-6">Inquiry Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono font-bold text-gold-300 block">
                          {inq.id}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-sm">{inq.clientName}</div>
                        <div className="text-gray-400 text-[11px]">{inq.email}</div>
                        <div className="text-gray-500 text-[11px]">{inq.phoneNumber}</div>
                        {inq.whatsappNumber && (
                          <div className="text-emerald-400 text-[10px]">
                            WA: {inq.whatsappNumber}
                          </div>
                        )}
                        {inq.businessName && (
                          <div className="text-gold-400/80 text-[10px]">
                            {inq.businessName}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6 max-w-xs">
                        <span className="font-semibold text-white block">
                          {inq.requiredService}
                        </span>
                        <p className="text-gray-400 text-[11px] line-clamp-2 mt-0.5">
                          {inq.projectDescription}
                        </p>
                        {inq.referenceWebsite && (
                          <a
                            href={inq.referenceWebsite}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gold-400 hover:underline text-[10px] flex items-center gap-1 mt-1"
                          >
                            <span>Ref: {inq.referenceWebsite}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <span className="text-gold-300 font-mono block">{inq.budget}</span>
                        <span className="text-gray-400 text-[10px]">
                          {inq.expectedDeadline}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <select
                          value={inq.status}
                          onChange={(e) => {
                            store.updateInquiryStatus(
                              inq.id,
                              e.target.value as InquiryStatus
                            );
                            showToast(`Status updated to ${e.target.value}`);
                          }}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none cursor-pointer ${
                            inq.status === "New"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : inq.status === "Confirmed"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                              : inq.status === "Completed"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : inq.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                              : "bg-dark-900 text-white border border-white/15"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Discussion">Discussion</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${(inq.whatsappNumber || inq.phoneNumber).replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => {
                              if (confirm(`Delete inquiry ${inq.id}?`)) {
                                store.deleteInquiry(inq.id);
                                showToast("Inquiry deleted");
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredInquiries.length === 0 && (
                <div className="text-center py-12 text-gray-500 text-xs">
                  No enquiries found matching the selected filter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SECTION G: PAYMENT MANAGEMENT & RAZORPAY
         ======================================================== */}
      {activeTab === "payments" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                Section G: Payment Records & Gateway Verification
              </h3>
              <p className="text-xs text-gray-400">
                Audit client-submitted UPI transaction IDs and track verified revenue.
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">
                Total Verified Revenue
              </span>
              <span className="text-xl font-black text-gold-gradient">
                ₹{verifiedPaymentsTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="rounded-3xl glass-panel border border-gold-500/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-dark-900 border-b border-white/10 text-gray-400 font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Payment ID</th>
                    <th className="py-4 px-6">Client & Email</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Transaction ID (UTR)</th>
                    <th className="py-4 px-6">Project Ref</th>
                    <th className="py-4 px-6">Audit Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {store.payments.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-4 px-6 font-mono font-bold text-gold-300">
                        {p.id}
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-white">{p.clientName}</div>
                        <div className="text-gray-400 text-[11px]">{p.email}</div>
                      </td>

                      <td className="py-4 px-6 font-mono font-black text-white text-sm">
                        ₹{Number(p.amount).toLocaleString("en-IN")}
                      </td>

                      <td className="py-4 px-6 font-mono text-gold-300">
                        {p.transactionId}
                      </td>

                      <td className="py-4 px-6 text-gray-300">
                        {p.projectReference}
                      </td>

                      <td className="py-4 px-6">
                        <select
                          value={p.status}
                          onChange={(e) => {
                            store.updatePaymentStatus(p.id, e.target.value as PaymentStatus);
                            showToast(`Payment status updated to ${e.target.value}`);
                          }}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none cursor-pointer ${
                            p.status === "Verified"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : p.status === "Rejected"
                              ? "bg-red-500/20 text-red-300 border border-red-500/40"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          }`}
                        >
                          <option value="Pending Verification">Pending Verification</option>
                          <option value="Verified">Verified</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => {
                            store.updatePaymentStatus(p.id, "Verified");
                            showToast("Payment verified!");
                          }}
                          className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[11px] font-bold mr-2"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SECTION H: TESTIMONIAL MANAGEMENT
         ======================================================== */}
      {activeTab === "testimonials" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Section H: Testimonials</h3>
              <p className="text-xs text-gray-400">
                Manage executive endorsements and client reviews.
              </p>
            </div>
            <button
              onClick={() => {
                setIsAddingTestimonial(true);
                setEditingTestimonial(null);
                setTestForm({
                  clientName: "",
                  clientRole: "",
                  clientCompany: "",
                  avatarUrl:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
                  quote: "",
                  rating: 5,
                  projectTitle: "",
                });
              }}
              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {store.testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl glass-panel border border-gold-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-dark-900 border border-gold-500/30">
                      <Image
                        src={t.avatarUrl}
                        alt={t.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.clientName}</h4>
                      <p className="text-[11px] text-gray-400">
                        {t.clientRole}, {t.clientCompany}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setEditingTestimonial(t);
                      setTestForm(t);
                      setIsAddingTestimonial(true);
                    }}
                    className="p-1.5 rounded-lg text-xs text-gold-300 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      store.deleteTestimonial(t.id);
                      showToast("Testimonial removed");
                    }}
                    className="p-1.5 rounded-lg text-xs text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Modal */}
          {isAddingTestimonial && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="relative w-full max-w-lg bg-dark-950 border border-gold-500/40 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4">
                  {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
                </h3>

                <form onSubmit={handleSaveTestimonial} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={testForm.clientName}
                      onChange={(e) =>
                        setTestForm({ ...testForm, clientName: e.target.value })
                      }
                      className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={testForm.clientRole}
                        onChange={(e) =>
                          setTestForm({ ...testForm, clientRole: e.target.value })
                        }
                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={testForm.clientCompany}
                        onChange={(e) =>
                          setTestForm({ ...testForm, clientCompany: e.target.value })
                        }
                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Review Quote
                    </label>
                    <textarea
                      rows={3}
                      value={testForm.quote}
                      onChange={(e) =>
                        setTestForm({ ...testForm, quote: e.target.value })
                      }
                      className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingTestimonial(false)}
                      className="px-4 py-2 rounded-xl border border-white/10 text-xs text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-gold px-5 py-2 rounded-xl text-xs font-bold"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          PRICING PACKAGES
         ======================================================== */}
      {activeTab === "pricing" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
            <h3 className="text-xl font-bold text-white mb-1">
              Pricing Packages (Starter, Professional, Premium)
            </h3>
            <p className="text-xs text-gray-400">
              Customize prices and features without code modifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {store.pricing.map((tier) => (
              <div
                key={tier.id}
                className="p-6 rounded-3xl glass-panel border border-gold-500/20 space-y-4"
              >
                <div className="text-xs font-mono text-gold-400 font-bold uppercase">
                  {tier.id}
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 font-mono mb-1">
                    Display Price
                  </label>
                  <input
                    type="text"
                    value={tier.price}
                    onChange={(e) => {
                      store.updatePricingCategory(tier.id, { price: e.target.value });
                    }}
                    className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-base font-bold text-gold-gradient"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 font-mono mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={tier.tagline}
                    onChange={(e) => {
                      store.updatePricingCategory(tier.id, { tagline: e.target.value });
                    }}
                    className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 font-mono mb-1">
                    Features (one per line)
                  </label>
                  <textarea
                    rows={6}
                    value={tier.features.join("\n")}
                    onChange={(e) => {
                      store.updatePricingCategory(tier.id, {
                        features: e.target.value.split("\n").filter(Boolean),
                      });
                    }}
                    className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Auto-saved to store & sync</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SECTION I: WEBSITE SETTINGS, SEO & GOOGLE SEARCH CONSOLE
         ======================================================== */}
      {activeTab === "settings" && (
        <div className="space-y-6 animate-fade-in max-w-4xl">
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
            <h3 className="text-xl font-bold text-white mb-1">
              Section I: Website Settings, SEO & Google Search Console
            </h3>
            <p className="text-xs text-gray-400">
              Configure Google Search verification, Google Analytics, meta descriptions, and sitemap settings.
            </p>
          </div>

          <form onSubmit={handleSettingsSave} className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Google Search Console Verification Token
              </label>
              <input
                type="text"
                value={settingsForm.googleSiteVerification || ""}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, googleSiteVerification: e.target.value })
                }
                placeholder="Paste token from Google Search Console (e.g. google-site-verification=...)"
                className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Used to verify site ownership in Google Search Console to index all pages in Google Search.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                value={settingsForm.googleAnalyticsId || ""}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, googleAnalyticsId: e.target.value })
                }
                placeholder="G-XXXXXXXXXX"
                className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Primary SEO Meta Description
              </label>
              <textarea
                rows={3}
                value={settingsForm.metaDescription || ""}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, metaDescription: e.target.value })
                }
                placeholder="Appears in Google Search results..."
                className="w-full bg-dark-900 border border-white/15 rounded-xl p-3 text-xs text-white"
              />
            </div>

            {/* Google Search Console Step-by-Step Instructions */}
            <div className="p-5 rounded-2xl bg-dark-900/90 border border-gold-500/30 text-xs text-gray-300 space-y-3">
              <span className="font-bold text-gold-400 uppercase font-mono block">
                Google Search Console Publishing Steps:
              </span>
              <ol className="list-decimal list-inside space-y-2 text-gray-400">
                <li>Deploy your website on Vercel with your custom domain.</li>
                <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-gold-300 underline">Google Search Console</a> and add your domain property.</li>
                <li>Copy the HTML verification meta tag content into the input field above and click Save.</li>
                <li>In Google Search Console, submit your sitemap URL: <code className="text-white">https://yourdomain.com/sitemap.xml</code>.</li>
                <li>Google will inspect and index all 10 services and project pages for search results.</li>
              </ol>
            </div>

            <button
              type="submit"
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
            >
              <Save className="w-4 h-4" />
              <span>Update SEO & Settings</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
