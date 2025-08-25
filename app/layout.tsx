/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata, Viewport } from "next";
import { Inter, PT_Sans } from "next/font/google";
import { cookies } from "next/headers";

import TanstackProvider from "@/components/providers/tanstack-query-provider";
import "@/assets/globals.css";
import { Toaster } from "@/components/ui/sonner";
import MY_TOKEN_KEY from "@/lib/get-cookie-name";
import { apiServer } from "@/lib/api";
import AppContext from "@/components/contexts/app-context";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-ptSans-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kumar : UI Designer Agent",
  description:
    "Kumar is an AI-powered platform that simplifies website creation. Design, customize, and launch your site effortlessly—no coding required.",
  openGraph: {
    title: "Kumar : UI Designer Agent",
    description:
      "Kumar is an AI-powered platform that simplifies website creation. Design, customize, and launch your site effortlessly—no coding required.",
    url: "https://kumar.simbli.ai",
    siteName: "Kumar",
    images: [
      {
        url: "https://deepsite.hf.co/banner.png",
        width: 1200,
        height: 630,
        alt: "Kumar Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumar : UI Designer Agent",
    description:
      "Kumar is an AI-powered platform that simplifies website creation. Design, customize, and launch your site effortlessly—no coding required.",
    images: ["https://deepsite.hf.co/banner.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Kumar",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

async function getMe() {
  const cookieStore = await cookies();
  const token = cookieStore.get(MY_TOKEN_KEY())?.value;
  if (!token) return { user: null, errCode: null };
  try {
    const res = await apiServer.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { user: res.data.user, errCode: null };
  } catch (err: any) {
    return { user: null, errCode: err.status };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getMe();
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="https://kumar.simbli.ai/logo.png" />
        <link rel="apple-touch-icon" href="https://kumar.simbli.ai/logo.png" />
      </head>
      <Script
        defer
        data-domain="deepsite.hf.co"
        src="https://plausible.io/js/script.js"
      ></Script>
      <body
        className={`${inter.variable} ${ptSans.variable} antialiased bg-black dark h-[100dvh] overflow-hidden`}
      >
        <Toaster richColors position="bottom-center" />
        <TanstackProvider>
          <AppContext me={data}>{children}</AppContext>
        </TanstackProvider>
      </body>
    </html>
  );
}
