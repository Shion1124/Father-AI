import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "お父さんAI - キャリアカウンセリング",
  description: "小中学生のための進路提案AIエージェント",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
