import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import ModalProvider from "./ModalProvider";

export const metadata: Metadata = {
  title: "PokeBooster",
  description: "Opening Booster Simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased`}
    >
      <body data-theme="ObsidianLight" className="main w-full min-h-screen">
        <Header />
        <main className="mx-auto max-w-3xl p-5">
          <ModalProvider />
          {children}
        </main>
      </body>
    </html>
  );
}
