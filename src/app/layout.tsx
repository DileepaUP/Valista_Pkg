import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valista Packaging",
  description: "Corrugated packaging manufacturer — spec-rich products, real certifications, and a fast quote tool.",
  icons: {
    icon: "/icon",
  },
};

// Root layout only owns <html>/<body> + fonts, shared by both the public
// site and the admin CMS. Nav/Footer/WhatsAppButton live in
// (public)/layout.tsx so /admin/* never inherits them — see the CMS
// implementation plan §2 (admin needs its own shell, not the public chrome).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
