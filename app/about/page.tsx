import { Users, Target, Eye, Heart, Award, Briefcase } from "lucide-react";

const team = [
  { name: "Aryan Verma", role: "Founder & CEO", bio: "10+ years in digital product strategy and brand building." },
  { name: "Sneha Patel", role: "Lead Designer", bio: "Figma expert with a passion for pixel-perfect UI systems." },
  { name: "Rohan Das", role: "Full-Stack Engineer", bio: "Next.js & Node.js specialist, open-source contributor." },
  { name: "Meera Joshi", role: "SEO & Growth Lead", bio: "Data-driven marketer with expertise in GA4 and SEM." },
];

const values = [
  { icon: Target, title: "Precision", desc: "Every pixel, every line of code is intentional and purposeful." },
  { icon: Eye, title: "Clarity", desc: "We communicate clearly — with our clients and in our designs." },
  { icon: Heart, title: "Passion", desc: "We genuinely love what we build and it shows in the results." },
  { icon: Award, title: "Excellence", desc: "We don't ship unless we're proud of it. Quality is non-negotiable." },
];

export default function AboutPage() {
  return (
    <div className="pt-16 mesh-bg">
      {/* Hero */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="section-tag block mb-4">Who We Are</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            The Studio Behind<br />
            <span className="gradient-text">Outpro.India</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We are a collective of designers, engineers, and strategists obsessed with crafting digital experiences that don&apos;t just look great — they perform, convert, and scale. Founded in India, built for the world.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 border-y border-brand-900/20 bg-[#03080f]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag block mb-3">Our Story</span>
            <h2 className="font-heading text-3xl font-bold text-white mb-5">Started with a Mission to Elevate Indian Brands Online</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Outpro.India was founded with a single conviction: Indian businesses deserve world-class digital presence. Too many great companies were being held back by generic templates, slow websites, and agencies that didn&apos;t understand modern web standards.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We set out to change that — combining the best of Silicon Valley engineering culture with deep roots in Indian business sensibilities. The result is a studio that delivers premium, performance-first websites without compromise.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Briefcase, label: "Projects Completed", value: "150+" },
              { icon: Users, label: "Happy Clients", value: "80+" },
              { icon: Award, label: "Awards Won", value: "12" },
              { icon: Heart, label: "5-Star Reviews", value: "98%" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="card text-center">
                <Icon size={24} className="text-brand-400 mx-auto mb-3" />
                <p className="font-heading font-bold text-3xl text-white mb-1">{value}</p>
                <p className="text-slate-500 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card border-brand-500/30 bg-gradient-to-br from-brand-600/10 to-transparent">
            <Target size={28} className="text-brand-400 mb-4" />
            <h3 className="font-heading text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-slate-400 leading-relaxed">
              To build modern, high-performance digital experiences that clearly communicate our clients&apos; value, support lead generation, and strengthen their online presence — delivered with precision and care.
            </p>
          </div>
          <div className="card border-accent/20 bg-gradient-to-br from-accent/10 to-transparent">
            <Eye size={28} className="text-accent mb-4" />
            <h3 className="font-heading text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-slate-400 leading-relaxed">
              To become India&apos;s most trusted partner for corporate digital transformation — where every brand we touch becomes more credible, more visible, and more competitive in the global market.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#03080f] border-y border-brand-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-tag block mb-3">What Drives Us</span>
            <h2 className="font-heading text-4xl font-bold text-white">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card text-center group">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-500/20 transition-colors">
                  <Icon size={20} className="text-brand-400" />
                </div>
                <h4 className="font-heading font-semibold text-white mb-2">{title}</h4>
                <p className="text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-tag block mb-3">The People</span>
          <h2 className="font-heading text-4xl font-bold text-white">Meet the Team</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="card text-center group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-brand-600/20 border border-brand-600/30 flex items-center justify-center mx-auto mb-4 font-heading font-bold text-2xl text-brand-300">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h4 className="font-heading font-semibold text-white">{member.name}</h4>
              <p className="text-brand-400 text-xs font-mono mb-3">{member.role}</p>
              <p className="text-slate-400 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
