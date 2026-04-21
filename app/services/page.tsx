import Link from "next/link";
import { Globe, Zap, BarChart3, Shield, TrendingUp, Users, Code2, Palette, Search, Database, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    tagline: "React & Next.js Powered",
    desc: "We build fast, scalable, SEO-ready websites using the latest frontend technologies. Every project includes mobile-first responsive design and pixel-perfect implementation.",
    features: ["Next.js / React", "TypeScript", "Tailwind CSS", "API Integration", "CMS Setup", "Performance Optimization"],
    color: "blue",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    tagline: "Figma & Adobe XD",
    desc: "Premium interface design rooted in user research and brand strategy. We deliver complete design systems with handover-ready Figma files before development begins.",
    features: ["Figma Design Files", "Design System", "Wireframes", "Prototyping", "Brand Consistency", "User Research"],
    color: "purple",
  },
  {
    icon: Search,
    title: "SEO & Performance",
    tagline: "PageSpeed 95+ Guaranteed",
    desc: "Technical SEO, meta optimization, structured data, and Core Web Vitals tuning. We build sites that rank and load in under 2.5 seconds.",
    features: ["Google Analytics 4", "Search Console", "Core Web Vitals", "Lazy Loading", "CDN Setup", "Schema Markup"],
    color: "green",
  },
  {
    icon: Database,
    title: "Backend & Database",
    tagline: "Node.js + MongoDB",
    desc: "Robust APIs, authentication, and database architecture using Node.js and MongoDB. Scalable infrastructure designed for future growth.",
    features: ["RESTful APIs", "MongoDB / PostgreSQL", "Auth Systems", "File Uploads", "Email Integration", "Admin Panels"],
    color: "orange",
  },
  {
    icon: Shield,
    title: "Hosting & Deployment",
    tagline: "Vercel / AWS / Google Cloud",
    desc: "Seamless deployment with DNS setup, domain mapping, SSL installation, and CI/CD pipelines. We handle everything from development to live.",
    features: ["Vercel Deployment", "AWS / GCP", "SSL Certificates", "DNS Management", "CI/CD Pipelines", "Monitoring"],
    color: "red",
  },
  {
    icon: TrendingUp,
    title: "Digital Strategy",
    tagline: "Growth-First Thinking",
    desc: "CRM integration, lead generation funnels, and analytics dashboards that turn your website into a business development engine.",
    features: ["HubSpot / Zoho CRM", "Lead Forms", "Live Chat", "Email Marketing", "Conversion Funnels", "KPI Dashboards"],
    color: "teal",
  },
];

const colorMap: Record<string, string> = {
  blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  green: "text-green-400 bg-green-400/10 border-green-400/20",
  orange: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  red: "text-red-400 bg-red-400/10 border-red-400/20",
  teal: "text-teal-400 bg-teal-400/10 border-teal-400/20",
};

export default function ServicesPage() {
  return (
    <div className="pt-16 mesh-bg">
      {/* Hero */}
      <section className="py-28 max-w-7xl mx-auto px-6 text-center">
        <span className="section-tag block mb-4">What We Build</span>
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Full-Spectrum <span className="gradient-text">Digital Services</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          From the first wireframe to post-launch support — we handle every layer of your digital presence with precision and care.
        </p>
      </section>

      {/* Services grid */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            const cls = colorMap[s.color];
            return (
              <div key={s.title} className="card flex flex-col group hover:scale-[1.01] transition-transform">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${cls}`}>
                  <Icon size={22} />
                </div>
                <p className="font-mono text-xs text-slate-500 mb-1">{s.tagline}</p>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <ul className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <CheckCircle size={11} className="text-brand-400 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 border-y border-brand-900/20 bg-[#03080f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag block mb-3">How We Work</span>
            <h2 className="font-heading text-4xl font-bold text-white">Our Delivery Process</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Discovery", desc: "We understand your business, audience, and goals." },
              { step: "02", title: "Design", desc: "Figma prototypes aligned with your brand guidelines." },
              { step: "03", title: "Develop", desc: "Clean, fast, scalable code — reviewed and tested." },
              { step: "04", title: "Deploy", desc: "Live on your domain with SSL, DNS, and monitoring." },
              { step: "05", title: "Support", desc: "Maintenance plan, security updates, and backups." },
            ].map((p) => (
              <div key={p.step} className="card text-center relative">
                <p className="font-heading font-bold text-4xl text-brand-900 mb-2">{p.step}</p>
                <h4 className="font-heading font-semibold text-white mb-2">{p.title}</h4>
                <p className="text-slate-500 text-xs">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl font-bold text-white mb-5">Ready to Get Started?</h2>
        <p className="text-slate-400 mb-8">Book a free discovery call and get a custom proposal within 48 hours.</p>
        <Link href="/contact" className="btn-primary">
          Request a Proposal <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
