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
  description:
    "Sistema para cadastro de materiais e cálculo de custo de buquês artesanais",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="%23e11d48" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"><g fill="none"><circle cx="256" cy="256" r="32"/><path d="M256 128c32 0 64 16 64 48s-32 48-64 48-64-16-64-48 32-48 64-48z"/><path d="M256 384c-32 0-64-16-64-48s32-48 64-48 64 16 64 48-32 48-64 48z"/><path d="M114 240c16-27.7 48-40 72-24s12 48-16 72-48 12-72-16-16-32 16-32z"/><path d="M398 240c16 27.7 0 48-16 72-24 24-56 12-72-16s0-56 16-72 56-24 72 16z"/><path d="M144 352c-24-24-8-56 16-72s56 0 72 16 8 48-16 72-56 24-72-16z"/><path d="M368 352c-24 24-56 8-72-16s0-56 16-72 48-8 72 16 24 56-16 72z"/></g></svg>',
        type: "image/svg+xml",
      },
    ],
  },
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
      <body className="relative min-h-full flex flex-col text-rose-950">
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <header className="sticky top-0 z-20 border-b border-rose-200/70 bg-rose-50/85 shadow-sm shadow-rose-200/40 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <span
                className="grid h-9 w-9 place-items-center rounded-full bg-rose-200 text-rose-500"
                aria-hidden="true"
              >
                <ion-icon
                  name="flower-outline"
                  style={{ fontSize: 20 }}
                  suppressHydrationWarning
                ></ion-icon>
              </span>
              <span className="font-serif text-2xl font-semibold tracking-tight text-rose-800">
                Custo Material
              </span>
            </Link>
          </nav>
        </header>
        <main className="relative z-10 flex-1">{children}</main>
        <footer className="relative z-10 border-t border-rose-200/60 bg-rose-50/70 py-4 text-center text-xs font-medium text-rose-700/70 backdrop-blur-xl">
          Feito com amor para minha florista 🌸
        </footer>
      </body>
    </html>
  );
}
