// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Mi Proyecto ATF",
  description: "Sitio web oficial del proyecto ATF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        {/* <Header /> */}
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
