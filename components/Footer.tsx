import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-brand-900/30 bg-[#030a18] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <p className="font-heading font-bold text-xl mb-3">
            <span className="text-white">Outpro</span>
            <span className="text-brand-400">.</span>
            <span className="text-accent">India</span>
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Building modern, high-performance digital experiences that drive business growth.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Github, href: "#" },
              { icon: Instagram, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-brand-400 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {[
              "Web Development",
              "UI/UX Design",
              "SEO Optimization",
              "Digital Strategy",
              "Brand Identity",
              "Performance Audit",
            ].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-brand-400 mt-0.5 shrink-0" />
              <span>New Delhi, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-brand-400 shrink-0" />
              <a href="mailto:hello@outpro.india" className="hover:text-white transition-colors">
                hello@outpro.india
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-brand-400 shrink-0" />
              <a href="tel:+911234567890" className="hover:text-white transition-colors">
                +91 12345 67890
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-900/20 px-6 py-5">
        <p className="text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} Outpro.India. All rights reserved. Built with Next.js + MongoDB.
        </p>
      </div>
    </footer>
  );
}
