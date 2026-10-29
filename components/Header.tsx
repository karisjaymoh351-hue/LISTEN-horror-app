"use client";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
export function Header() {
  const { user } = useAuth();
  return <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
      <Link href="/" className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded bg-blood font-black">L</span><span><span className="distressed block text-xl leading-none">LISTEN</span><span className="block pt-1 text-[9px] tracking-[.18em] text-zinc-500">STORIES THAT DON'T LET YOU SLEEP</span></span></Link>
      <nav className="flex items-center gap-3 text-sm text-zinc-300"><Link className="hidden sm:block hover:text-white" href="/subscribe">Premium</Link><Link className="hidden sm:block hover:text-white" href="/favorites">♥ Saved</Link><Link className="rounded-full border border-white/15 px-3 py-2 hover:border-blood" href={user ? "/account" : "/login"}>{user ? "Account" : "Sign in"}</Link></nav>
    </div>
  </header>;
}
