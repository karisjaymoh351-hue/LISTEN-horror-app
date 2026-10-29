"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { getFavoriteIds } from "@/lib/user-data";
import { getStories, type Story } from "@/lib/stories";
import { StoryCard } from "@/components/StoryCard";
export default function FavoritesPage(){
 const {user,loading}=useAuth();const [stories,setStories]=useState<Story[]>([]);
 useEffect(()=>{if(user)getFavoriteIds(user.uid).then(ids=>getStories().then(all=>setStories(all.filter(s=>ids.includes(s.id))))).catch(()=>{});},[user]);
 return <div className="mx-auto max-w-7xl px-4 py-10"><p className="text-xs font-bold uppercase tracking-[.25em] text-blood">Your collection</p><h1 className="distressed mt-2 text-5xl">Favorites</h1>{!user&&!loading?<p className="mt-5 text-zinc-400">Sign in to save and sync your favorite stories. <Link className="text-blood underline" href="/login">Sign in</Link></p>:<div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">{stories.map(s=><StoryCard key={s.id} story={s}/>)}</div>}{user&&stories.length===0&&<p className="mt-5 text-zinc-500">No favorites yet. Open a story and tap the heart.</p>}</div>
}
