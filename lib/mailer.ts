import nodemailer from "nodemailer";

// Creates a reusable transporter using Gmail (or any SMTP)
export function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,   // your Gmail address
      pass: process.env.EMAIL_PASS,   // Gmail App Password (NOT your Gmail password)
    },
  });
}

// Send notification to site owner when someone fills the contact form
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) {
  // If email env vars are not set, skip silently
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Outpro.India Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#050d1f;color:#e2e8f0;border-radius:12px;">
        <h2 style="color:#4a88ff;margin-top:0;">New Message — Outpro.India</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#94a3b8;width:120px;">Name</td><td style="color:#fff;font-weight:600;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Email</td><td><a href="mailto:${data.email}" style="color:#4a88ff;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Phone</td><td style="color:#fff;">${data.phone || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Company</td><td style="color:#fff;">${data.company || "—"}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#0b1730;border-radius:8px;border-left:4px solid #4a88ff;">
          <p style="margin:0;color:#94a3b8;font-size:13px;margin-bottom:8px;">Message:</p>
          <p style="margin:0;color:#e2e8f0;">${data.message}</p>
        </div>
        <p style="margin-top:20px;font-size:12px;color:#475569;">Sent from outpro.india contact form</p>
      </div>
    `,
  });
}

// Send auto-reply to the person who submitted the form
export async function sendAutoReply(to: string, name: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Outpro.India" <${process.env.EMAIL_USER}>`,
    to,
    subject: "We received your message — Outpro.India",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#050d1f;color:#e2e8f0;border-radius:12px;">
        <h2 style="color:#4a88ff;margin-top:0;">Thanks, ${name}! 👋</h2>
        <p style="color:#94a3b8;line-height:1.7;">We've received your message and will get back to you within <strong style="color:#fff;">24 hours</strong>.</p>
        <p style="color:#94a3b8;line-height:1.7;">In the meantime, feel free to browse our work at <a href="https://outpro-india.vercel.app/portfolio" style="color:#4a88ff;">our portfolio</a>.</p>
        <div style="margin-top:24px;padding:16px;background:#0b1730;border-radius:8px;">
          <p style="margin:0;color:#475569;font-size:13px;">Outpro.India · New Delhi, India · hello@outpro.india</p>
        </div>
      </div>
    `,
  });
}
