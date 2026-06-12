"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Settings,
  FileText,
  Layout,
  Plus,
  Trash2,
  Edit,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Save,
  X,
  ArrowLeft,
  ChevronRight,
  PlusCircle,
  MapPin,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("settings"); // "settings" | "homepage" | "blogs"
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ success: false, message: "", show: false });

  // Data states
  const [adminData, setAdminData] = useState<any>(null);
  const [siteData, setSiteData] = useState<any>(null);
  const [blogs, setBlogs] = useState<any[]>([]);

  // Blog modal / form states
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>({
    id: "",
    slug: "",
    title: "",
    excerpt: "",
    date: "",
    author: "Dallas Siding Experts",
    category: "Buying Guide",
    readTime: "5 min read",
    image: "/images/dallas_siding_hero.png",
    content: [""]
  });
  const [blogBodyText, setBlogBodyText] = useState("");
  const [confirmDeleteSlug, setConfirmDeleteSlug] = useState<string | null>(null);

  // Check session storage on mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("admin_auth");
    if (storedAuth === "admin") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const showNotification = (message: string, success = true) => {
    setSaveStatus({ success, message, show: true });
    setTimeout(() => {
      setSaveStatus((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      sessionStorage.setItem("admin_auth", "admin");
      setIsAuthenticated(true);
      setLoginError("");
      fetchData();
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setAdminData(null);
    setSiteData(null);
    setBlogs([]);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin", {
        headers: {
          "x-admin-password": "admin",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAdminData(data.admin);
        setSiteData(data.siteData);
        setBlogs(data.blogs);
      } else {
        setLoginError("Failed to fetch site data. Try logging in again.");
        handleLogout();
      }
    } catch (err: any) {
      setLoginError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (action: string, updatedData: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": "admin",
        },
        body: JSON.stringify({ action, data: updatedData }),
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        showNotification(resData.message || "Saved successfully!");
        fetchData();
      } else {
        showNotification(resData.error || "Failed to save.", false);
      }
    } catch (err: any) {
      showNotification("Error: " + err.message, false);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // ADMIN SETTINGS ACTION
  // ----------------------------------------------------
  const handleAdminDataChange = (field: string, value: string) => {
    setAdminData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSaveAdminData = (e: React.FormEvent) => {
    e.preventDefault();
    // Update phoneRaw based on phone input dynamically
    const rawPhone = "tel:" + adminData.phone.replace(/[^0-9+]/g, "");
    const finalData = { ...adminData, phoneRaw: rawPhone };
    saveSettings("update-admin", finalData);
  };

  // ----------------------------------------------------
  // HOMEPAGE SECTIONS ACTIONS
  // ----------------------------------------------------
  const handleHeroChange = (field: string, value: string) => {
    setSiteData((prev: any) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const handleFAQItemChange = (index: number, field: string, value: string) => {
    const updatedFAQs = [...siteData.faq.items];
    updatedFAQs[index] = { ...updatedFAQs[index], [field]: value };
    setSiteData((prev: any) => ({
      ...prev,
      faq: { ...prev.faq, items: updatedFAQs }
    }));
  };

  const handleAddFAQ = () => {
    const newId = `faq-${siteData.faq.items.length + 1}`;
    const newFAQ = { id: newId, question: "New FAQ Question?", answer: "New FAQ Answer." };
    setSiteData((prev: any) => ({
      ...prev,
      faq: { ...prev.faq, items: [...prev.faq.items, newFAQ] }
    }));
  };

  const handleDeleteFAQ = (index: number) => {
    const updatedFAQs = siteData.faq.items.filter((_: any, idx: number) => idx !== index);
    setSiteData((prev: any) => ({
      ...prev,
      faq: { ...prev.faq, items: updatedFAQs }
    }));
  };

  const handleNeighborhoodChange = (index: number, value: string) => {
    const updatedN = [...siteData.serviceAreas.neighborhoods];
    updatedN[index] = value;
    setSiteData((prev: any) => ({
      ...prev,
      serviceAreas: { ...prev.serviceAreas, neighborhoods: updatedN }
    }));
  };

  const handleAddNeighborhood = () => {
    setSiteData((prev: any) => ({
      ...prev,
      serviceAreas: { ...prev.serviceAreas, neighborhoods: [...prev.serviceAreas.neighborhoods, "New Neighborhood"] }
    }));
  };

  const handleDeleteNeighborhood = (index: number) => {
    const updatedN = siteData.serviceAreas.neighborhoods.filter((_: any, idx: number) => idx !== index);
    setSiteData((prev: any) => ({
      ...prev,
      serviceAreas: { ...prev.serviceAreas, neighborhoods: updatedN }
    }));
  };

  const handleCTAReasonChange = (index: number, value: string) => {
    const updatedR = [...siteData.cta.reasons];
    updatedR[index] = value;
    setSiteData((prev: any) => ({
      ...prev,
      cta: { ...prev.cta, reasons: updatedR }
    }));
  };

  const handleSaveSiteData = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings("update-site-data", siteData);
  };

  // ----------------------------------------------------
  // BLOG POST ACTIONS
  // ----------------------------------------------------
  const openNewBlogModal = () => {
    setCurrentBlog({
      id: "blog-" + Date.now(),
      slug: "",
      title: "",
      excerpt: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: "Dallas Siding Experts",
      category: "Buying Guide",
      readTime: "5 min read",
      image: "/images/dallas_siding_hero.png",
      content: [""]
    });
    setBlogBodyText("");
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (blog: any) => {
    setCurrentBlog(blog);
    setBlogBodyText(blog.content.join("\n\n"));
    setIsBlogModalOpen(true);
  };

  const handleBlogTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setCurrentBlog((prev: any) => ({
      ...prev,
      title: val,
      slug: prev.slug === "" || prev.slug === undefined ? slug : prev.slug // auto-slug if empty
    }));
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBlog.title || !currentBlog.slug) {
      showNotification("Title and Slug are required.", false);
      return;
    }
    const paragraphs = blogBodyText.split("\n\n").map((p) => p.trim()).filter((p) => p !== "");
    const blogToSave = { ...currentBlog, content: paragraphs };
    setIsBlogModalOpen(false);
    await saveSettings("save-blog", blogToSave);
  };

  const handleDeleteBlog = async (slug: string) => {
    setConfirmDeleteSlug(null);
    await saveSettings("delete-blog", { slug });
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070d19] flex items-center justify-center px-4 relative hero-pattern">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-[120px]" />
        </div>
        <div className="relative w-full max-w-md bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
            <p className="text-blue-200/60 text-xs mt-1">Dallas Siding Experts Content Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-blue-100 text-xs font-bold uppercase tracking-wider mb-2" htmlFor="password">
                Enter Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-orange text-sm font-bold uppercase tracking-wider py-3.5 px-4 justify-center shadow-lg shadow-brand-orange/20 rounded-xl"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-blue-200/50 hover:text-brand-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070d19] text-gray-100 font-sans flex flex-col">
      {/* Toast Notification */}
      {saveStatus.show && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 ${
          saveStatus.success 
            ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-100" 
            : "bg-red-950/90 border-red-500/30 text-red-100"
        }`}>
          {saveStatus.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <span className="text-sm font-semibold">{saveStatus.message}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="bg-brand-blue border-b border-white/5 py-4 px-6 sm:px-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white hover:text-brand-orange transition-colors flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-black text-sm text-white">
              D
            </div>
            <span className="font-extrabold text-base hidden sm:inline">Dallas Siding Experts</span>
          </Link>
          <span className="text-white/20">|</span>
          <span className="bg-white/5 text-brand-orange text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-white/10">
            Console
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-2 px-3 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-brand-orange" />
          Sign Out
        </button>
      </header>

      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Admin Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-brand-blue/50 border-r border-white/5 lg:py-6 p-4 space-y-2 flex-shrink-0">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/30 px-3.5 mb-2 hidden lg:block">CMS Navigation</p>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/10"
                : "text-blue-100/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className="w-4 h-4" />
            General Settings
          </button>
          
          <div className="pt-4 pb-1">
            <p className="text-[10px] uppercase tracking-widest font-black text-white/30 px-3.5">Homepage Content</p>
          </div>

          <button
            onClick={() => setActiveTab("hero")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "hero"
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/10"
                : "text-blue-100/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layout className="w-4 h-4" />
            Hero Section Content
          </button>
          
          <button
            onClick={() => setActiveTab("neighborhoods")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "neighborhoods"
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/10"
                : "text-blue-100/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <MapPin className="w-4 h-4" />
            Dallas Neighborhoods
          </button>

          <button
            onClick={() => setActiveTab("faqs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "faqs"
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/10"
                : "text-blue-100/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            FAQ Accordion
          </button>

          <button
            onClick={() => setActiveTab("cta")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "cta"
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/10"
                : "text-blue-100/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            CTA Checklist
          </button>

          <div className="pt-4 pb-1">
            <p className="text-[10px] uppercase tracking-widest font-black text-white/30 px-3.5">Blog Articles</p>
          </div>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "blogs"
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/10"
                : "text-blue-100/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4" />
            Manage Siding Blog
          </button>
        </aside>

        {/* Content Pane */}
        <main className="flex-grow p-6 sm:p-8 lg:p-10 max-w-5xl overflow-y-auto">
          {loading && !adminData ? (
            <div className="flex flex-col items-center justify-center h-64 text-blue-200/50">
              <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm font-semibold">Loading data from system files...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: GENERAL SETTINGS */}
              {activeTab === "settings" && adminData && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-white">General Contact & Settings</h2>
                    <p className="text-xs text-blue-200/50 mt-1">
                      Updates to these variables populate immediately in the website headers, footers, CTAs, and metadata.
                    </p>
                  </div>

                  <form onSubmit={handleSaveAdminData} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={adminData.companyName}
                          onChange={(e) => handleAdminDataChange("companyName", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Year Established</label>
                        <input
                          type="text"
                          value={adminData.yearEstablished}
                          onChange={(e) => handleAdminDataChange("yearEstablished", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Phone Number</label>
                        <input
                          type="text"
                          value={adminData.phone}
                          onChange={(e) => handleAdminDataChange("phone", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Business Email</label>
                        <input
                          type="email"
                          value={adminData.email}
                          onChange={(e) => handleAdminDataChange("email", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Office Address</label>
                        <input
                          type="text"
                          value={adminData.address}
                          onChange={(e) => handleAdminDataChange("address", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Operating Hours</label>
                        <input
                          type="text"
                          value={adminData.hours}
                          onChange={(e) => handleAdminDataChange("hours", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-orange text-sm px-6 py-3 shadow-lg shadow-brand-orange/20 rounded-xl cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save Settings"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: HERO SECTION CONTENT */}
              {activeTab === "hero" && siteData && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-white">Hero Section Content</h2>
                    <p className="text-xs text-blue-200/50 mt-1">
                      Edit marketing values, badges, and headers shown at the very top of the homepage.
                    </p>
                  </div>

                  <form onSubmit={handleSaveSiteData} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Hero Badge Tagline</label>
                        <input
                          type="text"
                          value={siteData.hero.badge}
                          onChange={(e) => handleHeroChange("badge", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Title Prefix</label>
                          <input
                            type="text"
                            value={siteData.hero.titlePrefix}
                            onChange={(e) => handleHeroChange("titlePrefix", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Title Highlight (Gold)</label>
                          <input
                            type="text"
                            value={siteData.hero.titleHighlight}
                            onChange={(e) => handleHeroChange("titleHighlight", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Title Suffix</label>
                          <input
                            type="text"
                            value={siteData.hero.titleSuffix}
                            onChange={(e) => handleHeroChange("titleSuffix", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Main Description</label>
                        <textarea
                          value={siteData.hero.description}
                          onChange={(e) => handleHeroChange("description", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange h-24"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-orange text-sm px-6 py-3 shadow-lg shadow-brand-orange/20 rounded-xl cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save Hero Content"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: NEIGHBORHOODS COVERAGE */}
              {activeTab === "neighborhoods" && siteData && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-white">Dallas Neighborhood Coverage</h2>
                      <p className="text-xs text-blue-200/50 mt-1">
                        Manage target local SEO neighborhoods that show in the Service Areas grid.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddNeighborhood}
                      className="flex items-center gap-1.5 text-xs text-brand-orange font-bold uppercase hover:underline cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" /> Add Area
                    </button>
                  </div>

                  <form onSubmit={handleSaveSiteData} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {siteData.serviceAreas.neighborhoods.map((n: string, index: number) => (
                        <div key={index} className="flex gap-2 items-center bg-white/5 p-2 rounded-xl border border-white/5">
                          <input
                            type="text"
                            value={n}
                            onChange={(e) => handleNeighborhoodChange(index, e.target.value)}
                            className="flex-grow bg-transparent border-0 text-white text-sm focus:ring-0 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteNeighborhood(index)}
                            className="text-red-400 hover:text-red-300 p-1.5 cursor-pointer"
                            aria-label="Delete neighborhood"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-orange text-sm px-6 py-3 shadow-lg shadow-brand-orange/20 rounded-xl cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save Areas"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: FAQ ACCORDION */}
              {activeTab === "faqs" && siteData && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-white">FAQ Accordion Items</h2>
                      <p className="text-xs text-blue-200/50 mt-1">
                        Edit questions and answers, or create new items for the FAQ section.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddFAQ}
                      className="flex items-center gap-1.5 text-xs text-brand-orange font-bold uppercase hover:underline cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" /> Add FAQ Item
                    </button>
                  </div>

                  <form onSubmit={handleSaveSiteData} className="space-y-6">
                    <div className="space-y-6">
                      {siteData.faq.items.map((item: any, index: number) => (
                        <div key={item.id} className="relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                          <div className="absolute top-6 right-6">
                            <button
                              type="button"
                              onClick={() => handleDeleteFAQ(index)}
                              className="text-red-400 hover:text-red-300 p-2 bg-red-950/20 border border-red-500/15 rounded-xl cursor-pointer transition-colors"
                              aria-label="Delete FAQ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="w-[calc(100%-48px)]">
                            <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Question {index + 1}</label>
                            <input
                              type="text"
                              value={item.question}
                              onChange={(e) => handleFAQItemChange(index, "question", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-orange"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Answer</label>
                            <textarea
                              value={item.answer}
                              onChange={(e) => handleFAQItemChange(index, "answer", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-orange h-24 leading-relaxed"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-orange text-sm px-6 py-3 shadow-lg shadow-brand-orange/20 rounded-xl cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save FAQs"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 5: CTA CHECKLIST */}
              {activeTab === "cta" && siteData && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-white">Footer CTA Checklist</h2>
                    <p className="text-xs text-blue-200/50 mt-1">
                      Edit the bulleted marketing items shown in the bottom call-to-action panel.
                    </p>
                  </div>

                  <form onSubmit={handleSaveSiteData} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="space-y-4">
                      {siteData.cta.reasons.map((reason: string, index: number) => (
                        <div key={index}>
                          <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Bullet Point {index + 1}</label>
                          <input
                            type="text"
                            value={reason}
                            onChange={(e) => handleCTAReasonChange(index, e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-orange text-sm px-6 py-3 shadow-lg shadow-brand-orange/20 rounded-xl cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save CTA Checklist"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: MANAGE BLOGS */}
              {activeTab === "blogs" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-white">Siding Insights & Advice Blog</h2>
                      <p className="text-xs text-blue-200/50 mt-1">
                        Add, edit, or delete dynamic articles from blogs.json.
                      </p>
                    </div>
                    <button
                      onClick={openNewBlogModal}
                      className="flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer shadow-md shadow-brand-orange/15"
                    >
                      <Plus className="w-4 h-4" /> Add New Article
                    </button>
                  </div>

                  {/* Blog articles list */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.01]">
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-200/50">Article Info</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-200/50">Category</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-200/50">Publish Date</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-200/50 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {blogs.map((blog) => (
                            <tr key={blog.slug} className="hover:bg-white/[0.01] transition-colors">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-10 rounded-lg overflow-hidden bg-brand-blue-mid flex-shrink-0 border border-white/10">
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <span className="block font-bold text-white text-sm leading-snug">{blog.title}</span>
                                    <span className="block text-[10px] text-blue-200/50 mt-0.5">/{blog.slug}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="inline-block bg-blue-950/50 border border-blue-500/20 text-brand-blue-light text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  {blog.category}
                                </span>
                              </td>
                              <td className="p-4 text-xs font-medium text-gray-400">
                                {blog.date}
                              </td>
                              <td className="p-4 text-right">
                                <div className="inline-flex gap-2 items-center">
                                  {confirmDeleteSlug === blog.slug ? (
                                    <>
                                      <span className="text-[11px] text-red-400 font-semibold mr-1">Delete?</span>
                                      <button
                                        onClick={() => handleDeleteBlog(blog.slug)}
                                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                                      >
                                        Yes, Delete
                                      </button>
                                      <button
                                        onClick={() => setConfirmDeleteSlug(null)}
                                        className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => openEditBlogModal(blog)}
                                        className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg cursor-pointer transition-colors"
                                        aria-label="Edit post"
                                      >
                                        <Edit className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => setConfirmDeleteSlug(blog.slug)}
                                        className="p-2 bg-red-950/20 border border-red-500/10 hover:bg-red-900/40 text-red-400 hover:text-red-300 rounded-lg cursor-pointer transition-colors"
                                        aria-label="Delete post"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* MODAL BLOG FORM */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b1329] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/5 bg-brand-blue flex items-center justify-between">
              <h3 className="font-extrabold text-white text-base uppercase tracking-wider">
                {currentBlog.title ? "Edit Siding Article" : "Create New Siding Article"}
              </h3>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveBlog} className="p-6 overflow-y-auto space-y-5 flex-grow">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">Article Title</label>
                  <input
                    type="text"
                    value={currentBlog.title}
                    onChange={(e) => handleBlogTitleChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-orange"
                    placeholder="Choosing Siding for..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">Slug URL</label>
                  <input
                    type="text"
                    value={currentBlog.slug}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, slug: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-orange"
                    placeholder="choosing-siding-for-dallas"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">Category</label>
                  <select
                    value={currentBlog.category}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                    className="w-full bg-[#070d19] border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-orange"
                  >
                    <option value="Buying Guide">Buying Guide</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Insurance Guide">Insurance Guide</option>
                    <option value="Comparison">Comparison</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={currentBlog.readTime}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, readTime: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-orange"
                    placeholder="5 min read"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">Date</label>
                  <input
                    type="text"
                    value={currentBlog.date}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={currentBlog.author}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, author: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">Cover Image (Local Path or Web URL)</label>
                <input
                  type="text"
                  value={currentBlog.image}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, image: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-orange"
                  placeholder="e.g. /images/siding_installation_crew.png or https://example.com/siding-photo.jpg"
                />
                <p className="text-[10px] text-gray-500 mt-1.5">
                  Supports relative assets from the <code>public/images/</code> folder or any direct web image link.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">Brief Excerpt</label>
                <textarea
                  value={currentBlog.excerpt}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-orange h-16"
                  placeholder="Enter a brief SEO meta snippet describing this post..."
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200">Article Content Body</label>
                  <span className="text-[10px] text-gray-500 font-medium">Use double newlines (\n\n) to start a new paragraph or section.</span>
                </div>
                <textarea
                  value={blogBodyText}
                  onChange={(e) => setBlogBodyText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-orange h-52 font-mono leading-relaxed"
                  placeholder="Enter the article content. For headers, prefix with ### like this:&#10;### Section Heading Name&#10;Then write content under it."
                  required
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-orange text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-xl cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {loading ? "Saving..." : "Save Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
