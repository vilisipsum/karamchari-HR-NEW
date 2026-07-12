import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono, Noto_Sans_Devanagari } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-numbers",
  weight: ["400", "500", "600", "700"],
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "KaramcharHR | India's AI-Powered HRMS Platform",
  description: "Manage payroll, attendance, recruitment, leave, performance and employee experience from one intelligent cloud platform. Built for Indian enterprises with ₹ currency, regional holidays, CL/SL/EL, and automated compliance.",
  keywords: ["HRMS India", "Payroll Software India", "Attendance Software", "Leave Management", "Employee Management", "HR Software", "Cloud HRMS", "AI HRMS", "Recruitment Software"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} ${devanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-bg-light dark:bg-bg-dark text-foreground">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
