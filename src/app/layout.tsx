import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "FocalPoint",
  description: "Projeto de teste para Legalplan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="@/assets/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
