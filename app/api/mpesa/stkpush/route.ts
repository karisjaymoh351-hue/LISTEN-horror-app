import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(request: Request) {
  // SECURITY: this is intentionally a safe placeholder. Implement OAuth, STK Push,
  // server-side phone/amount validation, signed callback verification and idempotent
  // subscription writes before accepting real payments.
  try {
    const { phone, amount } = await request.json();
    if (!phone || !/^(\+?254|0)?[17]\d{8}$/.test(String(phone).replace(/\s/g,"")) || Number(amount)!==99) {
      return NextResponse.json({ error: "Enter a valid Kenyan mobile number and KES 99 amount." }, { status: 400 });
    }
    if (!process.env.MPESA_CONSUMER_KEY || !process.env.MPESA_CONSUMER_SECRET || !process.env.MPESA_PASSKEY || !process.env.MPESA_CALLBACK_URL) {
      return NextResponse.json({ message: "Daraja is not configured yet. Add server-side keys to Vercel environment variables." }, { status: 501 });
    }
    return NextResponse.json({ message: "Daraja credentials detected, but live STK push is intentionally not implemented. Add the OAuth + STK request and callback verification before taking payments." }, { status: 501 });
  } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
}
