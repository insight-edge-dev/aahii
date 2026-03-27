import { Inter } from "next/font/google";
import "./globals.css";
import PopupBanner from "@/components/PopupBanner";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PopupBanner />   
        {children}
        </body>
    </html>
  );
}
