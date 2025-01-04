// Hooks / Packages
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

// Providers
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zustand Todo List",
  description: "This is a practical project for creating a todo list using Zustand and DND-Kit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <>
          <Header />
          {children}
          <Footer />
        </>
      </ThemeProvider>
    </body>
  </html>
  );
}
