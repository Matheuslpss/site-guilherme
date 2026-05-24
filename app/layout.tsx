import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guilherme Studio | Archviz CGI",
  description:
    "Portfolio premium de visualização arquitetônica 3D, interiores, fachadas, CGI e renderização imobiliária."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/assets/hero-archviz-video.mp4" as="video" type="video/mp4" />
      </head>
      <body>{children}</body>
    </html>
  );
}
