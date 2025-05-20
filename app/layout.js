import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "블로그",
  description: "블로그 CRUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Link>HOME</Link>
        <Link href>글 작성</Link>
      </body>
    </html>
  );
}
