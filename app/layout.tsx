import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Pulse",
  description: "The Valuable Moment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.ico" sizes="32x32" />
      </Head>
      <body className={`bg-black-1 antialiased font-poppins`}>{children}</body>
    </html>
  );
}
