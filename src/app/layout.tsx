import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: "400",
  variable: "--font-dm--mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zynx - Your Digital Business Card",
  description:
    "Zynx helps you instantly share your professional identity through elegant and easily accessible digital business cards.",
  keywords: [
    "Zynx",
    "digital business card",
    "kartu nama online",
    "profil profesional",
    "networking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
