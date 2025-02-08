import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  // This is the default configuration.
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Uber Ride - Your Reliable Ride Sharing App",
  description: "Experience the convenience of Uber Ride, your reliable ride-sharing app. Get safe, affordable, and fast rides at your fingertips. Download now and start your journey!",
  icons: {
    icon: "../public/assets/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
