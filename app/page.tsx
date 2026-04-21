import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp, Globe, Zap, Shield, BarChart3, Star, ChevronRight, Users } from "lucide-react";

interface Testimonial { _id: string; name: string; designation: string; company: string; content: string; rating: number; avatarInitials: string; }

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/testimonials`, { cache: "no-store" });
    const json = await res.json();
    return json.data ?? [];
  } catch { return []; }
}

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Industries Served" },
  { value: "5yr", label: "Industry Experience" },
];

const services = [
  { icon: Globe, title: "Web Development", desc: "React/Next.js powered websites built for speed, scalability, and conversion." },
  { icon: Zap, title: "UI/UX Design", desc: "Pixel-perfect Figma designs with brand consistency and premium aesthetics." },
  { icon: BarChart3, title: "SEO & Analytics", desc: "GA4 integration, Search Console, and performance-first architecture." },
  { icon: Shield, title: "Security & Hosting", desc: "SSL, CDN, DNS setup and deployment on Vercel/AWS/Google Cloud." },
  { icon: TrendingUp, title: "Digital Strategy", desc: "Lead generation funnels, CRM integration, and growth-focused campaigns." },
  { icon: Users, title: "Brand Identity", desc: "Cohesive visual systems: typography, color palette, and graphic language." },
];

const fallbackTestimonials = [
  { _id: "1", name: "Priya Sharma", designation: "CEO", company: "TechVentures India", content: "Outpro delivered a world-class website in under 3 weeks. Our lead generation increased by 240% within the first month.", rating: 5, avatarInitials: "PS" },
  { _id: "2", name: "Arjun Mehta", designation: "Founder", company: "GrowthLab", content: "The attention to brand consistency and performance was exceptional. PageSpeed scores are 97+ on mobile now.", rating: 5, avatarInitials: "AM" },
  { _id: "3", name: "Riya Kapoor", designation: "Marketing Head", company: "NovaCorp", content: "Best investment we made. The CMS is intuitive and the design is stunning. Highly recommend Outpro.India.", rating: 5, avatarInitials: "RK" },
];

export default async function Home() {
  const dbTestimonials = await getTestimonials();
  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  return (
    <div className="mesh-bg">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(#1a5cff 1px,transparent 1px),linear-gradient(90deg,#1a5cff 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag block mb-5">Corporate Digital Presence Platform</span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Build Your
              <span className="gradient-text block">Digital Identity</span>
              That Converts
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8">
              High-performance, visually premium corporate websites for forward-thinking brands. We combine design excellence with technical mastery to deliver measurable growth.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/contact" className="btn-primary">Start Your Project <ArrowRight size={18} /></Link>
              <Link href="/portfolio" className="btn-outline">View Portfolio</Link>
            </div>
            <div className="flex flex-wrap gap-5">
              {["Next.js", "Tailwind CSS", "MongoDB", "Vercel"].map((tech) => (
                <span key={tech} className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <CheckCircle size={14} className="text-brand-400" /> {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="glass rounded-3xl p-8 glow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-slate-500 font-mono text-xs">outpro.india — live</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-brand-900/60 rounded-full w-3/4" />
                <div className="h-4 bg-brand-900/60 rounded-full w-full" />
                <div className="h-4 bg-brand-900/60 rounded-full w-5/6" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {stats.map((s) => (
                  <div key={s.label} className="bg-brand-950/60 rounded-xl p-4 border border-brand-800/30">
                    <p className="font-heading font-bold text-2xl text-white">{s.value}</p>
                    <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <span className="text-green-400 text-sm font-medium">PageSpeed Score</span>
                <span className="font-heading font-bold text-green-400 text-xl">97</span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 glass px-4 py-2 rounded-xl animate-float">
              <span className="text-xs font-mono text-accent">✦ 5-Star Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-brand-900/30 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-heading font-bold text-4xl text-white mb-1">{s.value}</p>
              <p className="text-slate-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-tag block mb-3">What We Offer</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">End-to-End Digital Services</h2>
          <p className="text-slate-400 max-w-xl mx-auto">From design to deployment — everything your brand needs to dominate online.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5 group-hover:bg-brand-500/20 transition-colors">
                <Icon size={22} className="text-brand-400" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/services" className="btn-outline">View All Services <ChevronRight size={16} /></Link>
        </div>
      </section>

      {/* Testimonials — from DB */}
      <section className="py-24 bg-[#03080f] border-y border-brand-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag block mb-3">Client Love</span>
            <h2 className="font-heading text-4xl font-bold text-white">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t._id} className="card flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="text-accent fill-accent" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-brand-900/30 pt-4">
                  <div className="w-9 h-9 rounded-full bg-brand-600/30 flex items-center justify-center font-heading font-bold text-brand-300 text-sm">
                    {t.avatarInitials || t.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.designation}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-14 glow relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-accent/5 pointer-events-none" />
          <span className="section-tag block mb-4">Ready to Launch?</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 relative">
            Let&apos;s Build Something <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 relative">
            Tell us about your project and we&apos;ll respond within 24 hours with a detailed proposal.
          </p>
          <Link href="/contact" className="btn-primary relative">Start the Conversation <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
