import type { Metadata, Viewport } from "next";
import { StateProvider } from "../context/state-context";
import { AuthProvider } from "../context/auth-context";
import { Base44BadgeRemover } from "../components/base44-badge-remover";
import { PostAuthRedirect } from "../components/post-auth-redirect";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Ayunikah — Premium AI Marriage Preparation Dashboard",
  description: "An elegant and romantic AI-powered companion designed to guide engaged couples through wedding budgeting, marriage readiness courses, RSVP tracking, and invitation building.",
  keywords: ["wedding planner", "marriage preparation", "AI wedding coordinator", "wedding budget tracker", "digital invitation builder", "Lidya Ayu Sukamawandira"],
  authors: [{ name: "Lidya Ayu Sukamawandira" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ scrollBehavior: 'smooth' }}>
      <body className="antialiased min-h-screen relative gradient-bg">
        {/* Floating Ambient Glow Blobs */}
        <div className="floating-circle-1 pointer-events-none" />
        <div className="floating-circle-2 pointer-events-none" />
        
        <AuthProvider>
          <StateProvider>
            <PostAuthRedirect />
            {children}
            <Base44BadgeRemover />
          </StateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
