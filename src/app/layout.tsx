import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ivanjudezrafales.com";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Iván Júdez Ráfales — AI/ML Engineer & Industrial Engineer | Portfolio",
    template: "%s | Iván Júdez Ráfales"
  },
  description:
    "Iván Júdez Ráfales — AI/ML Engineer at Letsinnovate, Industrial Engineer with an MSc in Connected Industry from Comillas ICAI. Portfolio showcasing AI, machine learning, automation and IoT projects.",
  keywords: [
    "Iván Júdez Ráfales",
    "Ivan Judez Rafales",
    "AI Engineer",
    "AI/ML Engineer",
    "Machine Learning Engineer",
    "Industrial Engineer",
    "Letsinnovate",
    "Comillas ICAI",
    "MSc Connected Industry",
    "MSc Smart Industry",
    "Master Industria Conectada",
    "Master Industria Inteligente",
    "AI Engineer Madrid",
    "AI Engineer Spain",
    "LangChain",
    "RAG",
    "LLM",
    "AI Chatbot",
    "Automation",
    "IoT",
    "Digital Twin",
    "Python",
    "Next.js",
    "FastAPI",
    "Portfolio",
  ],
  authors: [
    {
      name: "Iván Júdez Ráfales",
      url: SITE_URL,
    },
  ],
  creator: "Iván Júdez Ráfales",
  publisher: "Iván Júdez Ráfales",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Iván Júdez Ráfales — AI/ML Engineer & Industrial Engineer",
    description:
      "AI/ML Engineer at Letsinnovate, Industrial Engineer with an MSc in Connected Industry from Comillas ICAI. Portfolio with AI, automation and IoT projects.",
    siteName: "Iván Júdez Ráfales",
    images: [
      {
        url: `${SITE_URL}/portfolio.png`,
        width: 1200,
        height: 630,
        alt: "Iván Júdez Ráfales — AI/ML Engineer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iván Júdez Ráfales — AI/ML Engineer & Industrial Engineer",
    description:
      "Portfolio of Iván Júdez Ráfales — AI/ML Engineer at Letsinnovate. AI, machine learning, automation and IoT projects.",
    images: [{
      url: `${SITE_URL}/portfolio.png`,
      alt: "Iván Júdez Ráfales — AI/ML Engineer Portfolio"
    }],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      }
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  classification: "Portfolio Website",
  ...(GSC_VERIFICATION
    ? { verification: { google: GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Iván Júdez Ráfales",
              "alternateName": "Ivan Judez Rafales",
              "givenName": "Iván",
              "familyName": "Júdez Ráfales",
              "jobTitle": "AI/ML Engineer",
              "url": SITE_URL,
              "image": `${SITE_URL}/profile.jpeg`,
              "email": "mailto:ijudezrafales@gmail.com",
              "nationality": {
                "@type": "Country",
                "name": "Spain"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ES"
              },
              "knowsLanguage": ["es", "en"],
              "sameAs": [
                "https://github.com/Mrchuki",
                "https://www.linkedin.com/in/ivanjudez/"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Letsinnovate",
                "url": "https://www.letsinnovate.es/"
              },
              "alumniOf": [
                {
                  "@type": "CollegeOrUniversity",
                  "name": "Universidad Pontificia Comillas (ICAI)",
                  "url": "https://www.comillas.edu/",
                  "department": {
                    "@type": "EducationalOrganization",
                    "name": "MSc in Connected Industry (now MSc in Smart Industry)",
                    "url": "https://www.comillas.edu/postgrados/master-universitario-en-industria-inteligente/"
                  }
                }
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "AI Engineering",
                "Large Language Models",
                "Retrieval Augmented Generation",
                "LangChain",
                "Industrial Automation",
                "IoT Systems",
                "Digital Twin",
                "Python Development",
                "Full Stack Development",
                "Next.js",
                "FastAPI",
                "MLOps"
              ],
              "description":
                "AI/ML Engineer at Letsinnovate. Industrial Engineer with an MSc in Connected Industry (Comillas ICAI). Builds AI, automation and IoT solutions with measurable business impact."
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle />
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
