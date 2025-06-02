import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Providers } from "@/components/ClientProviders";

const instrument = localFont({
  src: [
    {
      path: "../public/fonts/Unageo-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Unageo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Unageo-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Unageo-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Unageo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-unageo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guyversation - A safe space where boys connect with real male mentors",
  description: "A safe space where boys connect with real male mentors for guidance, growth, and honest conversations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${instrument.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}