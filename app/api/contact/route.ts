import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { sendContactNotification, sendAutoReply } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Name, email, and message are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address." }, { status: 400 });
    }

    const contact = await Contact.create({ name, email, phone, company, message });

    // Send emails in background (don't fail if email is not configured)
    try {
      await Promise.all([
        sendContactNotification({ name, email, phone, company, message }),
        sendAutoReply(email, name),
      ]);
    } catch (emailErr) {
      console.warn("Email sending skipped (not configured):", emailErr);
    }

    return NextResponse.json({ success: true, message: "Your message has been received!", id: contact._id }, { status: 201 });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json({ success: false, error: "Server error. Please try again later." }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts, count: contacts.length });
  } catch (err) {
    console.error("Contact GET error:", err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
