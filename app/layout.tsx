import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neuroform - Mental Wellness Journal",
  description: "Transform your mental wellness journey through therapeutic journaling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
