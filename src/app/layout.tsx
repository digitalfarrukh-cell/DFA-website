import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DFA — Digital Fluxx Academics | Digital Marketing Course Pakistan",
  description:
    "Digital Marketing seekho aur Advanced Paid Ads se international earning shuru karo. DFA — Pakistan ki practical digital marketing academy.",
  keywords: [
    "digital marketing course Pakistan",
    "online marketing course",
    "paid ads course",
    "DFA",
    "Digital Fluxx Academics",
  ],
  openGraph: {
    title: "DFA — Digital Fluxx Academics",
    description:
      "Digital Marketing seekho aur Advanced Paid Ads se international earning shuru karo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
