import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export async function GET() {
  try {
    await connectDB();
    const items = await Portfolio.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items, count: items.length });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json({ success: false, error: "Title, description, and category are required." }, { status: 400 });
    }
    const item = await Portfolio.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
