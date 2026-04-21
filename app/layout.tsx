import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Outpro.India — Corporate Digital Presence",
  description: "Modern, high-performance corporate website for Outpro.India. Services, portfolio, team, and business capabilities.",
  keywords: ["Outpro", "India", "corporate", "digital", "web development", "services"],
  openGraph: {
    title: "Outpro.India",
    description: "Modern corporate digital presence platform",
    url: "https://outpro-india.vercel.app",
    siteName: "Outpro.India",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050d1f] text-slate-200">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
