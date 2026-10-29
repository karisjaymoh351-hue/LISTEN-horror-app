import { notFound } from "next/navigation";
import { getStories } from "@/lib/stories";
import { StoryPlayer } from "@/components/StoryPlayer";
export const dynamic = "force-dynamic";
export default async function StoryPage({ params }: { params: { id: string } }) {
  const stories = await getStories(); const story = stories.find(s=>s.id===params.id);
  if (!story) notFound();
  return <div className="mx-auto max-w-5xl px-4 py-8"><StoryPlayer story={story} /></div>;
}
