import { NextResponse } from "next/server";
export async function POST() {
  // Do not grant subscriptions from an unverified callback. Implement Safaricom
  // callback parsing, amount/phone/checkout ID checks, and idempotent persistence.
  return NextResponse.json({ ResultCode: 1, ResultDesc: "Callback handler not configured" }, { status: 501 });
}
