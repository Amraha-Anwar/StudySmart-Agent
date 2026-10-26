import type { Metadata } from "next";
import { Literata, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";

// Interface type
const grotesk = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
// Reading type, used only for the student's own material
const literata = Literata({ subsets: ["latin"], variable: "--font-literata", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "StudySmart Agent",
  description: "Summarize your PDF notes and quiz yourself on them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${literata.variable}`}>
      <body className="min-h-screen overflow-x-clip bg-paper font-sans text-on-page antialiased">
        <div className="backdrop" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
