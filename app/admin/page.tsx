"use client";
import { useState, useEffect, useCallback } from "react";
import { Mail, Briefcase, Star, Trash2, CheckCircle, Clock, MessageSquare, RefreshCw, Plus, X } from "lucide-react";

type Tab = "contacts" | "portfolio" | "testimonials";

type Contact = { _id: string; name: string; email: string; phone: string; company: string; message: string; status: string; createdAt: string };
type PortfolioItem = { _id: string; title: string; category: string; description: string; tags: string[]; kpis: string[]; featured: boolean };
type Testimonial = { _id: string; name: string; designation: string; company: string; content: string; rating: number };

const statusColor: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  read: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  replied: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({ title: "", category: "", description: "", tags: "", kpis: "", featured: false });
  const [newTestimonial, setNewTestimonial] = useState({ name: "", designation: "", company: "", content: "", rating: 5 });
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [c, p, t] = await Promise.all([
        fetch("/api/contact").then(r => r.json()),
        fetch("/api/portfolio").then(r => r.json()),
        fetch("/api/testimonials").then(r => r.json()),
      ]);
      setContacts(c.data || []);
      setPortfolio(p.data || []);
      setTestimonials(t.data || []);
    } catch { showToast("Failed to load data"); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const updateContactStatus = async (id: string, status: string) => {
    await fetch(`/api/contact/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
    showToast("Status updated");
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    setContacts(prev => prev.filter(c => c._id !== id));
    showToast("Message deleted");
  };

  const deletePortfolio = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    setPortfolio(prev => prev.filter(p => p._id !== id));
    showToast("Project deleted");
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setTestimonials(prev => prev.filter(t => t._id !== id));
    showToast("Testimonial deleted");
  };

  const addPortfolio = async () => {
    if (!newPortfolio.title || !newPortfolio.category || !newPortfolio.description) { showToast("Fill all required fields"); return; }
    const res = await fetch("/api/portfolio", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newPortfolio, tags: newPortfolio.tags.split(",").map(s => s.trim()), kpis: newPortfolio.kpis.split(",").map(s => s.trim()) }),
    });
    const data = await res.json();
    if (data.success) { setPortfolio(prev => [data.data, ...prev]); setShowAddPortfolio(false); setNewPortfolio({ title: "", category: "", description: "", tags: "", kpis: "", featured: false }); showToast("Project added!"); }
  };

  const addTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.content) { showToast("Fill all required fields"); return; }
    const res = await fetch("/api/testimonials", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTestimonial),
    });
    const data = await res.json();
    if (data.success) { setTestimonials(prev => [data.data, ...prev]); setShowAddTestimonial(false); setNewTestimonial({ name: "", designation: "", company: "", content: "", rating: 5 }); showToast("Testimonial added!"); }
  };

  const inputCls = "w-full bg-brand-950/60 border border-brand-800/40 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500";

  return (
    <div className="min-h-screen bg-[#050d1f] pt-20 px-4 pb-10">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 glass px-4 py-2.5 rounded-xl text-sm text-green-400 border border-green-500/20">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage contacts, portfolio, and testimonials</p>
          </div>
          <button onClick={fetchAll} disabled={loading} className="btn-outline text-sm py-2 px-4 gap-2 flex items-center">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Messages", value: contacts.length, icon: Mail, color: "text-blue-400", newCount: contacts.filter(c => c.status === "new").length },
            { label: "Projects", value: portfolio.length, icon: Briefcase, color: "text-accent" },
            { label: "Testimonials", value: testimonials.length, icon: Star, color: "text-yellow-400" },
          ].map(({ label, value, icon: Icon, color, newCount }) => (
            <div key={label} className="card flex items-center gap-4">
              <Icon size={24} className={color} />
              <div>
                <p className="font-heading font-bold text-2xl text-white">{value}</p>
                <p className="text-slate-500 text-xs">{label} {newCount ? <span className="text-blue-400">({newCount} new)</span> : ""}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-brand-900/30 pb-4">
          {(["contacts", "portfolio", "testimonials"] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white hover:bg-brand-900/30"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* CONTACTS */}
        {tab === "contacts" && (
          <div className="space-y-3">
            {contacts.length === 0 && <p className="text-slate-500 text-center py-12">No messages yet.</p>}
            {contacts.map(c => (
              <div key={c._id} className="card">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-heading font-semibold text-white">{c.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[c.status]}`}>{c.status}</span>
                      <span className="text-slate-600 text-xs">{new Date(c.createdAt).toLocaleDateString("en-IN")}</span>
                    </div>
                    <p className="text-brand-400 text-xs mb-1">{c.email} {c.phone ? `· ${c.phone}` : ""} {c.company ? `· ${c.company}` : ""}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{c.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {c.status === "new" && (
                      <button onClick={() => updateContactStatus(c._id, "read")} title="Mark as read" className="p-2 rounded-lg hover:bg-yellow-500/10 text-yellow-400 transition-colors">
                        <Clock size={15} />
                      </button>
                    )}
                    {c.status !== "replied" && (
                      <button onClick={() => updateContactStatus(c._id, "replied")} title="Mark as replied" className="p-2 rounded-lg hover:bg-green-500/10 text-green-400 transition-colors">
                        <CheckCircle size={15} />
                      </button>
                    )}
                    <a href={`mailto:${c.email}`} title="Reply via email" className="p-2 rounded-lg hover:bg-brand-500/10 text-brand-400 transition-colors">
                      <MessageSquare size={15} />
                    </a>
                    <button onClick={() => deleteContact(c._id)} title="Delete" className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PORTFOLIO */}
        {tab === "portfolio" && (
          <div>
            <button onClick={() => setShowAddPortfolio(true)} className="btn-primary text-sm py-2 mb-5">
              <Plus size={15} /> Add Project
            </button>

            {showAddPortfolio && (
              <div className="card mb-5 border-brand-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-white">Add New Project</h3>
                  <button onClick={() => setShowAddPortfolio(false)}><X size={18} className="text-slate-400" /></button>
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <input placeholder="Title *" value={newPortfolio.title} onChange={e => setNewPortfolio({...newPortfolio, title: e.target.value})} className={inputCls} />
                  <input placeholder="Category * (e.g. Web App)" value={newPortfolio.category} onChange={e => setNewPortfolio({...newPortfolio, category: e.target.value})} className={inputCls} />
                  <input placeholder="Tags (comma separated)" value={newPortfolio.tags} onChange={e => setNewPortfolio({...newPortfolio, tags: e.target.value})} className={inputCls} />
                  <input placeholder="KPIs (comma separated)" value={newPortfolio.kpis} onChange={e => setNewPortfolio({...newPortfolio, kpis: e.target.value})} className={inputCls} />
                </div>
                <textarea placeholder="Description *" value={newPortfolio.description} onChange={e => setNewPortfolio({...newPortfolio, description: e.target.value})} rows={3} className={`${inputCls} resize-none mb-3`} />
                <label className="flex items-center gap-2 text-slate-400 text-sm mb-4 cursor-pointer">
                  <input type="checkbox" checked={newPortfolio.featured} onChange={e => setNewPortfolio({...newPortfolio, featured: e.target.checked})} className="accent-blue-500" />
                  Featured project
                </label>
                <button onClick={addPortfolio} className="btn-primary text-sm py-2">Save Project</button>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {portfolio.map(p => (
                <div key={p._id} className="card">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-semibold text-white text-sm">{p.title}</h3>
                        {p.featured && <span className="text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">Featured</span>}
                      </div>
                      <p className="text-brand-400 text-xs mb-2">{p.category}</p>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.tags?.map(t => <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-brand-900/50 text-brand-300">{t}</span>)}
                      </div>
                    </div>
                    <button onClick={() => deletePortfolio(p._id)} className="p-1.5 rounded hover:bg-red-500/10 text-red-400 shrink-0"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS */}
        {tab === "testimonials" && (
          <div>
            <button onClick={() => setShowAddTestimonial(true)} className="btn-primary text-sm py-2 mb-5">
              <Plus size={15} /> Add Testimonial
            </button>

            {showAddTestimonial && (
              <div className="card mb-5 border-brand-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-white">Add Testimonial</h3>
                  <button onClick={() => setShowAddTestimonial(false)}><X size={18} className="text-slate-400" /></button>
                </div>
                <div className="grid md:grid-cols-3 gap-3 mb-3">
                  <input placeholder="Name *" value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} className={inputCls} />
                  <input placeholder="Designation" value={newTestimonial.designation} onChange={e => setNewTestimonial({...newTestimonial, designation: e.target.value})} className={inputCls} />
                  <input placeholder="Company" value={newTestimonial.company} onChange={e => setNewTestimonial({...newTestimonial, company: e.target.value})} className={inputCls} />
                </div>
                <textarea placeholder="Testimonial content *" value={newTestimonial.content} onChange={e => setNewTestimonial({...newTestimonial, content: e.target.value})} rows={3} className={`${inputCls} resize-none mb-3`} />
                <label className="text-slate-400 text-sm block mb-3">Rating: {newTestimonial.rating}★
                  <input type="range" min={1} max={5} value={newTestimonial.rating} onChange={e => setNewTestimonial({...newTestimonial, rating: Number(e.target.value)})} className="ml-3 accent-yellow-400 w-24" />
                </label>
                <button onClick={addTestimonial} className="btn-primary text-sm py-2">Save Testimonial</button>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map(t => (
                <div key={t._id} className="card">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({length: t.rating}).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-3 italic">&ldquo;{t.content}&rdquo;</p>
                      <p className="text-white text-sm font-medium">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.designation}{t.company ? ` · ${t.company}` : ""}</p>
                    </div>
                    <button onClick={() => deleteTestimonial(t._id)} className="p-1.5 rounded hover:bg-red-500/10 text-red-400 shrink-0"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
