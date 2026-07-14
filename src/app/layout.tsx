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
    default: "KaramcharHR | Best HRMS Software for Startups in India",
    template: "%s | KaramcharHR"
  },
  description: "Affordable cloud-based HRMS platform and employee-first HR software in India. Automate Indian payroll with EPF, ESIC, PT, and TDS compliance. Includes real-time attendance tracking, leaves management, and AI-powered recruitment tools.",
  keywords: [
    "best HRMS software for startups in India",
    "employee-first HR software India",
    "HR portal for Indian SMEs",
    "affordable HRMS platform India",
    "cloud-based HR management system India",
    "best payroll software for small business India",
    "automated payroll with EPF ESIC compliance",
    "Indian statutory compliance software TDS PT",
    "real-time employee attendance tracking portal",
    "AI resume screening and candidate ranking tool",
    "AI-powered HR copilot assistant",
    "leaves and holiday management system India",
    "employee self-service (ESS) portal online",
    "how to process payroll with TDS deduction India",
    "employer guide to EPF and ESIC registration",
    "latest professional tax rates in India by state",
    "simplifying payroll compliance for Indian startups"
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
    title: "KaramcharHR | Best HRMS Software for Startups in India",
    description: "Affordable cloud-based HRMS platform and employee-first HR software in India. Automate Indian payroll with EPF, ESIC, PT, and TDS compliance. Includes real-time attendance tracking, leaves management, and AI-powered recruitment tools.",
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
    title: "KaramcharHR | Best HRMS Software for Startups in India",
    description: "Affordable cloud-based HRMS platform and employee-first HR software in India. Automate Indian payroll with EPF, ESIC, PT, and TDS compliance. Includes real-time attendance tracking, leaves management, and AI-powered recruitment tools.",
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
