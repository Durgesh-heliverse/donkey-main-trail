import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const SHEETDB_URL = process.env.SHEETDB_API_URL_CONTACT;
    if (!SHEETDB_URL) {
      return NextResponse.json(
        { error: "SheetDB URL not configured." },
        { status: 500 }
      );
    }
    const response = await fetch(SHEETDB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: body }),
    });
    if (!response.ok) {
      return NextResponse.json({ error: response.statusText }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
