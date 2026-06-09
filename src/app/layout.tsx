import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custo Material - Flores Artesanais",
  description: "Sistema para cadastro de materiais e cálculo de custo de buquês artesanais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-4xl items-center gap-6 px-6 py-3">
            <Link href="/" className="text-lg font-bold text-pink-600">
              Custo Material
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/materiais" className="text-gray-600 hover:text-pink-600">
                Materiais
              </Link>
              <Link href="/flores" className="text-gray-600 hover:text-pink-600">
                Flores
              </Link>
              <Link href="/buques" className="text-gray-600 hover:text-pink-600">
                Buquês
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
