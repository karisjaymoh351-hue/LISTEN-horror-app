import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
export type Story = {
  id: string; title: string; category: string; coverUrl: string; audioUrl: string;
  text: string; description?: string; duration?: string; premium?: boolean;
};
export const demoStories: Story[] = [
  { id: "500am", title: "5:00AM", category: "Road Stories", coverUrl: "/covers/500am.svg", audioUrl: "", duration: "8 min", description: "The road was empty. Then the headlights behind him went out.", text: "At exactly five in the morning, Kamau started his usual walk to the stage. The road was quiet, and the mist lay low across the tarmac. He heard footsteps behind him. When he turned, nobody was there. Then a voice from the darkness whispered his name.", premium: false },
  { id: "last-matatu", title: "The Last Matatu", category: "True Horror", coverUrl: "/covers/matatu.svg", audioUrl: "", duration: "12 min", description: "One last passenger. One stop too far.", text: "The conductor counted the fare twice. There were six passengers, but the mirror showed seven. The extra passenger sat at the back, dripping rainwater onto a dry floor.", premium: true },
  { id: "village-well", title: "The Village Well", category: "Village Stories", coverUrl: "/covers/well.svg", audioUrl: "", duration: "10 min", description: "The elders warned everyone never to answer from the well.", text: "Every village had a rule. In this one, nobody went near the old well after sunset. Nobody called into it. And nobody, no matter how familiar the voice sounded, answered when it called back.", premium: true },
  { id: "black-road", title: "The Black Road", category: "Road Stories", coverUrl: "/covers/road.svg", audioUrl: "", duration: "9 min", description: "The shortcut saved twenty minutes. It cost him the rest of the night.", text: "The shortcut did not appear on any map. The boda rider knew that. But the passenger offered double fare, and the road was only dark—not dangerous. At least, that was what he told himself.", premium: true }
];
export async function getStories(): Promise<Story[]> {
  if (!db) return demoStories;
  try {
    const snap = await getDocs(query(collection(db, "stories"), orderBy("createdAt", "desc")));
    if (snap.empty) return demoStories;
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Story));
  } catch { return demoStories; }
}
