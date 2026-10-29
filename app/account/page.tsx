"use client";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
export default function AccountPage(){const {user,loading}=useAuth();return <div className="mx-auto max-w-xl px-4 py-12"><h1 className="distressed text-5xl">Your account</h1>{loading?<p className="mt-4 text-zinc-500">Loading…</p>:user?<div className="mt-6 rounded-xl border border-white/10 bg-panel p-5"><p>{user.email||user.phoneNumber}</p><p className="mt-2 text-xs text-zinc-500">Subscription status is not verified until payment callbacks and entitlement checks are configured.</p><Link href="/subscribe" className="red-button mt-5 inline-block">Manage Premium</Link><button className="ghost-button ml-2 mt-5" onClick={()=>auth&&signOut(auth)}>Sign out</button></div>:<p className="mt-4 text-zinc-400">You&apos;re not signed in. <Link className="text-blood underline" href="/login">Sign in here</Link>.</p>}</div>}
