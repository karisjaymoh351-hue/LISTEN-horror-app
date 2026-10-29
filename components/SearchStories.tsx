"use client";
import { useMemo, useState } from "react";
import type { Story } from "@/lib/stories";
import { StoryCard } from "./StoryCard";
const categories = ["All", "True Horror", "Road Stories", "Village Stories"];
export function SearchStories({ stories }: { stories: Story[] }) {
  const [term, setTerm] = useState(""); const [category, setCategory] = useState("All");
  const results = useMemo(() => stories.filter(s => (category === "All" || s.category === category) && `${s.title} ${s.description || ""} ${s.category}`.toLowerCase().includes(term.toLowerCase())), [stories,term,category]);
  return <section id="stories" className="mt-8">
    <div className="flex flex-col gap-3 sm:flex-row"><input className="field" aria-label="Search stories" placeholder="Search a story, road, village..." value={term} onChange={e=>setTerm(e.target.value)} /><div className="flex gap-2 overflow-x-auto pb-1">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${category===c?"bg-blood text-white":"border border-white/10 bg-panel text-zinc-400"}`}>{c}</button>)}</div></div>
    {(term || category!=="All") && <div className="mt-5"><p className="mb-3 text-xs text-zinc-500">{results.length} matching stories</p><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{results.map(s=><StoryCard key={s.id} story={s}/>)}</div>{!results.length&&<p className="py-8 text-center text-zinc-500">No stories found. Try another search.</p>}</div>}
  </section>;
}
