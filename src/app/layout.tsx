import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast"; // Import do react-hot-toast

// Carregamento das fontes locais
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Filmes Favoritos",
  description: "Avalie e gerencie seus filmes preferidos com facilidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
        <Toaster position="top-right" /> {/* Habilita os toasts globais */}
      </body>
    </html>
  );
}
