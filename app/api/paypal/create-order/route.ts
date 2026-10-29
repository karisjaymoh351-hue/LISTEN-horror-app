import { NextResponse } from "next/server";
export async function POST() {
  // Placeholder: create a PayPal Orders API order server-side, then verify capture
  // via webhook before granting a subscription. Never trust a browser redirect alone.
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    return NextResponse.json({ message: "PayPal is not configured. Add credentials in Vercel environment variables." }, { status: 501 });
  }
  return NextResponse.json({ message: "PayPal credentials detected, but Orders API and webhook verification must be implemented before live payments." }, { status: 501 });
}
