import Link from "next/link";
import { getStories } from "@/lib/stories";
import { StoryCard } from "@/components/StoryCard";
import { SearchStories } from "@/components/SearchStories";
export const dynamic = "force-dynamic";
export default async function Home() {
  const stories = await getStories();
  return <div className="mx-auto max-w-7xl px-4 pb-16">
    <section className="relative -mx-4 mb-10 overflow-hidden border-b border-white/10 bg-[#100709] px-5 py-12 sm:mx-0 sm:mt-6 sm:rounded-2xl sm:px-10 sm:py-16">
      <div className="absolute inset-0 opacity-30"><img src="/covers/500am.svg" alt="" className="h-full w-full object-cover object-center" /></div><div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
      <div className="relative max-w-2xl"><p className="mb-3 text-xs font-black tracking-[.3em] text-blood">DARKNESS HAS A VOICE</p><h1 className="distressed text-6xl leading-[.9] sm:text-8xl">LISTEN<span className="text-blood">.</span></h1><p className="mt-4 max-w-lg text-lg text-zinc-300">Stories That Don&apos;t Let You Sleep.</p><p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">Roadside whispers. Village secrets. True-feeling nightmares. Put on your headphones—if you dare.</p><div className="mt-6 flex flex-wrap gap-3"><Link className="red-button" href="/story/500am">▶ Play 5:00AM</Link><Link className="ghost-button" href="/subscribe">Unlock all stories · KES 99/week</Link></div></div>
    </section>
    <SearchStories stories={stories} />
    <section className="mt-10"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-blood">Enter if you dare</p><h2 className="distressed mt-1 text-3xl">All Stories</h2></div><span className="text-xs text-zinc-600">{stories.length} stories</span></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{stories.map(s => <StoryCard key={s.id} story={s} />)}</div></section>
    <section className="mt-12 grid gap-3 sm:grid-cols-3">{["True Horror","Road Stories","Village Stories"].map((c,i)=><a key={c} href={`/?category=${encodeURIComponent(c)}#stories`} className="rounded-xl border border-white/10 bg-panel p-5 hover:border-blood"><span className="text-xs text-blood">0{i+1} / CATEGORY</span><h3 className="distressed mt-2 text-2xl">{c}</h3><p className="mt-1 text-sm text-zinc-500">Enter the stories.</p></a>)}</section>
  </div>;
}
