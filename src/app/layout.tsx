import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/shared/footer";
import { HashScrollHandler } from "@/components/shared/hash-scroll-handler";
import { Header } from "@/components/shared/header";
import { JsonLd } from "@/components/shared/json-ld";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { VercelObservability } from "@/components/shared/vercel-observability";
import { createMetadata } from "@/lib/seo";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          <HashScrollHandler />
          <VercelObservability />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
