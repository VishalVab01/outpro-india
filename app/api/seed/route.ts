import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import Testimonial from "@/models/Testimonial";

// GET /api/seed  — Run this ONCE to fill your database with sample data
export async function GET() {
  // Safety: only allow in development
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_SEED !== "true") {
    return NextResponse.json({ error: "Seed is disabled in production." }, { status: 403 });
  }

  try {
    await connectDB();

    // Clear existing data
    await Portfolio.deleteMany({});
    await Testimonial.deleteMany({});

    // Seed Portfolio
    await Portfolio.insertMany([
      {
        title: "FinTech Analytics Dashboard",
        description: "A real-time financial analytics platform with custom charting, role-based access, and MongoDB-powered data pipelines. Built for a Series-A startup in Bengaluru.",
        category: "Web Application",
        tags: ["Next.js", "MongoDB", "Node.js", "Tailwind CSS"],
        kpis: ["+180% User Engagement", "< 1.8s Load Time", "99.9% Uptime"],
        featured: true,
      },
      {
        title: "E-Commerce Platform Relaunch",
        description: "Full redesign and development of a fashion e-commerce store with dynamic filters, wishlist, and Razorpay payment integration.",
        category: "E-Commerce",
        tags: ["Next.js", "PostgreSQL", "Razorpay", "Figma"],
        kpis: ["+320% Conversions", "97 PageSpeed Score", "+210% Mobile Sales"],
        featured: true,
      },
      {
        title: "SaaS Marketing Landing Page",
        description: "High-converting landing page for a B2B SaaS product with A/B tested hero sections, live chat integration, and HubSpot CRM.",
        category: "Marketing Website",
        tags: ["Next.js", "Tailwind CSS", "HubSpot", "GA4"],
        kpis: ["95+ PageSpeed", "+44% Demo Bookings", "< 2s TTI"],
        featured: true,
      },
      {
        title: "Corporate Portfolio — Law Firm",
        description: "A trust-driven corporate website for a leading Delhi law firm, featuring case study pages, secure contact forms, and SEO optimization.",
        category: "Corporate Website",
        tags: ["Next.js", "MongoDB", "Nodemailer"],
        kpis: ["+60% Client Inquiries", "Top 3 Google Rankings"],
        featured: false,
      },
      {
        title: "EdTech Course Platform",
        description: "Online learning platform with video embedding, progress tracking, quiz engine, and PDF certificate generation for 5000+ students.",
        category: "Web Application",
        tags: ["React", "Node.js", "MongoDB", "AWS S3"],
        kpis: ["5000+ Active Students", "4.9★ Average Rating"],
        featured: false,
      },
      {
        title: "Healthcare Appointment System",
        description: "Doctor booking system with real-time slot availability, SMS reminders via Twilio, and admin dashboard for clinic management.",
        category: "Healthcare",
        tags: ["Next.js", "MongoDB", "Twilio", "Tailwind CSS"],
        kpis: ["+200% Online Bookings", "40% Reduced No-Shows"],
        featured: false,
      },
    ]);

    // Seed Testimonials
    await Testimonial.insertMany([
      {
        name: "Priya Sharma",
        designation: "CEO",
        company: "TechVentures India",
        content: "Outpro delivered a world-class website in under 3 weeks. Our lead generation increased by 240% within the first month. The attention to detail in both design and performance was outstanding.",
        rating: 5,
      },
      {
        name: "Arjun Mehta",
        designation: "Founder",
        company: "GrowthLab",
        content: "The attention to brand consistency and performance was exceptional. Our PageSpeed scores went from 54 to 97 on mobile. Clients constantly compliment our new website.",
        rating: 5,
      },
      {
        name: "Riya Kapoor",
        designation: "Marketing Head",
        company: "NovaCorp",
        content: "Best investment we made this year. The CMS is intuitive, the design is stunning, and the team was professional throughout. Highly recommend Outpro.India.",
        rating: 5,
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      seeded: { portfolio: 6, testimonials: 3 },
    });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ success: false, error: "Seed failed." }, { status: 500 });
  }
}
