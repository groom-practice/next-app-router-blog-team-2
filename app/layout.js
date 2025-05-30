import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "블로그",
  description: "블로그 CRUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="border-b shadow-[0_1px_3px_#8f8f8f]">
          <nav className="space-x-3 p-4 font-semibold">
            <Link href="/">HOME</Link>
            <Link href="/write">글 작성</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
