"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Story } from "@/lib/stories";
import { useAuth } from "./AuthProvider";
import { addFavorite, isFavorite, removeFavorite } from "@/lib/user-data";
export function StoryPlayer({ story }: { story: Story }) {
  const audio = useRef<HTMLAudioElement>(null); const { user } = useAuth();
  const [speed,setSpeed]=useState("1"); const [timer,setTimer]=useState("0"); const [remaining,setRemaining]=useState(0);
  const [favorite,setFavorite]=useState(false); const [message,setMessage]=useState("");
  useEffect(()=>{ if(user) isFavorite(user.uid,story.id).then(setFavorite).catch(()=>{}); },[user,story.id]);
  useEffect(()=>{ if(!remaining)return; const id=setInterval(()=>setRemaining(v=>{if(v<=1){audio.current?.pause();return 0;}return v-1;}),1000);return()=>clearInterval(id);},[remaining>0]);
  function startTimer(){setRemaining(Number(timer)*60);}
  async function toggleFavorite(){if(!user){setMessage("Sign in to sync your favorites.");return;}if(favorite){await removeFavorite(user.uid,story.id);setFavorite(false);}else{await addFavorite(user.uid,story.id);setFavorite(true);}}
  return <div className="grid gap-8 md:grid-cols-[minmax(0,360px)_1fr]">
    <div><div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-red-950/20"><img src={story.coverUrl||"/covers/500am.svg"} alt={`${story.title} cover`} className="aspect-[3/4] w-full object-cover"/></div><button onClick={toggleFavorite} className="ghost-button mt-4 w-full">{favorite?"♥ Saved to Favorites":"♡ Add to Favorites"}</button>{message&&<p className="mt-2 text-xs text-zinc-400">{message} <Link href="/login" className="text-blood underline">Sign in</Link></p>}</div>
    <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[.25em] text-blood">{story.category}</p><h1 className="distressed mt-2 text-5xl sm:text-7xl">{story.title}</h1><p className="mt-4 text-zinc-400">{story.description}</p><div className="mt-7 rounded-2xl border border-white/10 bg-panel p-5">
      {story.audioUrl ? <audio ref={audio} controls preload="metadata" className="w-full" src={story.audioUrl}>Your browser does not support audio.</audio> : <div className="rounded-xl border border-dashed border-white/15 p-5 text-center"><p className="font-bold">Audio is not uploaded yet</p><p className="mt-1 text-sm text-zinc-500">Add the MP3 from the Admin page after configuring Firebase.</p></div>}
      <div className="mt-5 grid grid-cols-2 gap-3"><label className="text-xs text-zinc-400">Playback speed<select className="field mt-2" value={speed} onChange={e=>{setSpeed(e.target.value);if(audio.current)audio.current.playbackRate=Number(e.target.value);}}>{["0.75","1","1.25","1.5","1.75","2"].map(s=><option key={s} value={s}>{s}×</option>)}</select></label><label className="text-xs text-zinc-400">Sleep timer<select className="field mt-2" value={timer} onChange={e=>setTimer(e.target.value)}>{[["0","Off"],["5","5 minutes"],["10","10 minutes"],["15","15 minutes"],["30","30 minutes"],["45","45 minutes"],["60","60 minutes"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label></div>
      <div className="mt-3 flex flex-wrap items-center gap-3"><button className="red-button" onClick={startTimer} disabled={timer==="0"}>Start sleep timer</button>{remaining>0&&<span className="text-sm text-zinc-300">Pauses in {Math.floor(remaining/60)}:{String(remaining%60).padStart(2,"0")}</span>}</div>
      <p className="mt-4 text-xs leading-5 text-zinc-600">Background playback: keep the audio player running; most mobile browsers can continue audio with the screen locked, but OS battery settings and browser policies may affect this. Audio files are not cached offline by default.</p>
    </div>
    <article className="mt-8"><p className="text-xs font-bold uppercase tracking-[.25em] text-blood">The story</p><h2 className="distressed mt-2 text-3xl">Read along in the dark</h2><div className="mt-4 whitespace-pre-line text-base leading-8 text-zinc-300">{story.text||"Story text will appear here."}</div></article>
    </div>
  </div>;
}
