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
  title: {
    default: "KaramcharHR | India's AI-Powered HRMS Platform",
    template: "%s | KaramcharHR"
  },
  description: "Next-gen Employee-first HRMS platform for Indian businesses. Automated payroll with tax deductions, geo-fenced attendance, AI resume screening, Leave management (CL/SL/EL), and statutory compliance (PF/ESI/PT/TDS).",
  keywords: [
    "HRMS India",
    "Payroll Software India",
    "Attendance Tracker with GPS",
    "Statutory Compliance India",
    "Employee Leave Management",
    "AI Resume Screening",
    "Indian HR Payroll System",
    "PF ESI compliance tool",
    "Karamchar HRMS",
    "HR Portal India",
    "Performance Appraisal Software"
  ],
  authors: [{ name: "KaramcharHR Team", url: "https://karamcharhr.online" }],
  creator: "KaramcharHR",
  publisher: "KaramcharHR",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://karamcharhr.online",
    title: "KaramcharHR | India's AI-Powered HRMS Platform",
    description: "Manage payroll, attendance, recruitment, leave, performance and employee experience from one intelligent cloud platform. Built for Indian enterprises with ₹ currency, regional holidays, CL/SL/EL, and automated compliance.",
    siteName: "KaramcharHR",
    images: [
      {
        url: "https://karamcharhr.online/next.svg",
        width: 1200,
        height: 630,
        alt: "KaramcharHR Platform Dashboard Preview",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KaramcharHR | India's AI-Powered HRMS Platform",
    description: "Built for Indian enterprises with ₹ currency, regional holidays, CL/SL/EL, and automated compliance.",
    images: ["https://karamcharhr.online/next.svg"],
  },
  alternates: {
    canonical: "https://karamcharhr.online",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} ${devanagari.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "KaramcharHR",
              "operatingSystem": "All",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "128"
              },
              "description": "Next-gen Employee-first HRMS platform for Indian businesses. Automated payroll with tax deductions, geo-fenced attendance, AI resume screening, Leave management, and statutory compliance (PF/ESI/PT/TDS).",
              "publisher": {
                "@type": "Organization",
                "name": "KaramcharHR",
                "url": "https://karamcharhr.online"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body bg-bg-light dark:bg-bg-dark text-foreground">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
