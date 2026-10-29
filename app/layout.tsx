import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import { PWARegister } from "@/components/PWARegister";
export const metadata: Metadata = {
  title: "LISTEN — Stories That Don't Let You Sleep",
  description: "Dark roads. Quiet villages. Stories that follow you home.",
  manifest: "/manifest.json",
  applicationName: "LISTEN"
};
export const viewport: Viewport = { themeColor: "#d20f2f", width: "device-width", initialScale: 1, maximumScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><AuthProvider><PWARegister /><Header /><main className="min-h-[80vh]">{children}</main><footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-zinc-600">LISTEN · Stories That Don't Let You Sleep · Made for the dark hours.</footer></AuthProvider></body></html>;
}
