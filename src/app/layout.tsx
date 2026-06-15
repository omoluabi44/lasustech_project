import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "LASUSTECH Student Consultative Assembly",
  description: "Official Student Consultative Assembly of LASUSTECH",
  icons: {
    icon: "/LSCA-LOGO.jpg",
    apple: "/LSCA-LOGO.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-body bg-background text-foreground antialiased no-scrollbar`}>
        {children}
      </body>
    </html>
  );
}
