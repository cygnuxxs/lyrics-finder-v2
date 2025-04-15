import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Lyrics Finder - Discover Song Lyrics Easily",
    template: "%s | Lyrics Finder",
  },
  description:
    "Find lyrics for your favorite songs with Lyrics Finder. Search by song title, artist, or album, and explore a vast collection of music lyrics. Built by Cygnuxxs.",
  keywords: [
    "lyrics finder",
    "song lyrics",
    "music lyrics",
    "search lyrics",
    "artist lyrics",
    "album lyrics",
    "Cygnuxxs",
  ],
  authors: [{ name: "Cygnuxxs", url: "https://github.com/cygnuxxs" }],
  creator: "Cygnuxxs",
  publisher: "Cygnuxxs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Lyrics Finder - Discover Song Lyrics Easily",
    description:
      "Search and explore song lyrics from your favorite artists and albums with Lyrics Finder. Built by Cygnuxxs.",
    url: "https://lyrics-finder-v2.vercel.app",
    siteName: "Lyrics Finder",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyrics Finder - Discover Song Lyrics",
    description:
      "Find lyrics for any song with Lyrics Finder. Search by title, artist, or album. Built by Cygnuxxs.",
    creator: "@AshyGany",
  },
  robots: {
    index: true,
    follow: true, 
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lyrics-finder-v2.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableColorScheme
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}