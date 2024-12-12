import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextAuthProvider } from './providers'
import "./globals.css";
import { Header } from "./components/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Repostly",
  description: "One post, lots of content.",
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
         <NextAuthProvider>
          <Header />
          {children}
         </NextAuthProvider>
      </body>
    </html>
  );
}
