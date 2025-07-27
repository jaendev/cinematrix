import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Cinematrix",
  description: "CineMatrix - Your Ultimate Movie Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
