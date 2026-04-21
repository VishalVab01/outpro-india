"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-16 mesh-bg">
      {/* Hero */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-tag block mb-4">Get In Touch</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5">
            Let&apos;s Build <span className="gradient-text">Together</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tell us about your project. We respond within 24 hours with a detailed proposal.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Info cards */}
          <div className="space-y-5">
            {[
              { icon: Mail, label: "Email Us", val: "hello@outpro.india", sub: "We reply within 24h" },
              { icon: Phone, label: "Call Us", val: "+91 12345 67890", sub: "Mon–Fri, 10am–7pm IST" },
              { icon: MapPin, label: "Visit Us", val: "New Delhi, India", sub: "By appointment only" },
            ].map(({ icon: Icon, label, val, sub }) => (
              <div key={label} className="card flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-brand-400" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-0.5">{label}</p>
                  <p className="text-white font-medium text-sm">{val}</p>
                  <p className="text-slate-500 text-xs">{sub}</p>
                </div>
              </div>
            ))}

            <div className="card">
              <h4 className="font-heading font-semibold text-white mb-3">What happens next?</h4>
              <ul className="space-y-2">
                {[
                  { icon: MessageSquare, text: "We review your brief" },
                  { icon: Clock, text: "24h response with proposal" },
                  { icon: CheckCircle, text: "Kickoff call scheduled" },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                    <Icon size={14} className="text-brand-400" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 card">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-slate-400">We&apos;ll get back to you within 24 hours with a detailed response.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-heading text-xl font-bold text-white mb-2">Send Us a Message</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "name", label: "Full Name *", type: "text", placeholder: "John Doe" },
                    { name: "email", label: "Email Address *", type: "email", placeholder: "john@company.com" },
                    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
                    { name: "company", label: "Company Name", type: "text", placeholder: "Acme Corp" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-slate-400 text-xs mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={(form as any)[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        required={f.label.includes("*")}
                        className="w-full bg-brand-950/60 border border-brand-800/40 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Project Brief *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, timeline, and budget..."
                    required
                    rows={5}
                    className="w-full bg-brand-950/60 border border-brand-800/40 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
                )}
                <button type="submit" disabled={status === "sending"} className="btn-primary w-full justify-center">
                  {status === "sending" ? "Sending..." : (<>Send Message <Send size={16} /></>)}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
