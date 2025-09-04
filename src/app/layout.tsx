import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLatestDDragonVersion } from "@/lib/getLatestDDragonVersion";
import { VersionProvider } from "@/context/VersionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FF15 GG",
  description: "Search League of Legends Summoners",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const version = await getLatestDDragonVersion();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg flex flex-col min-h-screen scroll-smooth`}
      >
        <VersionProvider version={version}>
          <NavBar />
          <main className="my-16">{children}</main>
          <Footer />
        </VersionProvider>
      </body>
    </html>
  );
}
