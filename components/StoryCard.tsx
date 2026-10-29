import Link from "next/link";
import type { Story } from "@/lib/stories";
export function StoryCard({ story }: { story: Story }) {
  return <Link href={`/story/${story.id}`} className="group block min-w-0">
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-panel transition group-hover:-translate-y-1 group-hover:border-blood">
      {/* SVG covers are local lightweight placeholders; replace them from Admin. */}
      <img src={story.coverUrl || "/covers/500am.svg"} alt={`${story.title} cover`} className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      {story.premium && <span className="absolute left-2 top-2 rounded bg-blood px-2 py-1 text-[10px] font-black uppercase tracking-wider">Premium</span>}
      <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-10"><span className="distressed block text-lg">{story.title}</span><span className="mt-1 block text-xs text-zinc-400">{story.category} · {story.duration || "Audio story"}</span></span>
    </div>
    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">{story.description}</p>
  </Link>;
}
