import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    const items = await Testimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items, count: items.length });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    if (!body.name || !body.content) {
      return NextResponse.json({ success: false, error: "Name and content required." }, { status: 400 });
    }
    const item = await Testimonial.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
