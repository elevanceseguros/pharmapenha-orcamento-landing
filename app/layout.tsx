import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';

const defaultGaMeasurementId = 'G-0CMMHZ0X0F';

const googleTagIds = [
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || defaultGaMeasurementId,
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
].filter(Boolean) as string[];

const primaryGoogleTagId = googleTagIds[0];

export const metadata: Metadata = {
  title: 'Orçamento Pharmapenha | Farmácia de Manipulação na Penha/SP',
  description: 'Solicite orçamento de manipulação pelo WhatsApp. Mais de 35 anos na Penha/SP. Envie sua receita e receba atendimento farmacêutico com agilidade.',
  robots: { index: true, follow: true },
  keywords: ['farmácia de manipulação penha', 'manipulação penha sp', 'orçamento manipulação whatsapp', 'pharmapenha', 'fórmulas manipuladas são paulo'],
  alternates: {
    canonical: 'https://orcamentopharmapenha.online'
  },
  openGraph: {
    title: 'Orçamento Pharmapenha | Farmácia de Manipulação na Penha/SP',
    description: 'Solicite orçamento de manipulação pelo WhatsApp. Mais de 35 anos na Penha/SP.',
    type: 'website',
    url: 'https://orcamentopharmapenha.online',
    siteName: 'Pharmapenha',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://orcamentopharmapenha.online/images/og-pharmapenha.jpg',
        width: 1200,
        height: 630,
        alt: 'Pharmapenha – Farmácia de Manipulação na Penha/SP'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orçamento Pharmapenha | Farmácia de Manipulação',
    description: 'Solicite orçamento de manipulação pelo WhatsApp. Mais de 35 anos na Penha/SP.',
    images: ['https://orcamentopharmapenha.online/images/og-pharmapenha.jpg']
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Pharmacy",
              "name": "Pharmapenha – Farmácia de Manipulação",
              "url": "https://orcamentopharmapenha.online",
              "logo": "https://orcamentopharmapenha.online/images/logo-pharmapenha.png",
              "image": "https://orcamentopharmapenha.online/images/og-pharmapenha.jpg",
              "description": "Farmácia de manipulação com mais de 35 anos de tradição na Penha, São Paulo. Atendimento pelo WhatsApp para orçamentos.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Praça Nossa Senhora da Penha, 95",
                "addressLocality": "São Paulo",
                "addressRegion": "SP",
                "postalCode": "03632-010",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -23.5394,
                "longitude": -46.5553
              },
              "telephone": "+5511991830136",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                  "opens": "08:00",
                  "closes": "18:15"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday"],
                  "opens": "08:00",
                  "closes": "13:00"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+5511991830136",
                "contactType": "customer service",
                "availableLanguage": "Portuguese"
              },
              "sameAs": [
                "https://wa.me/5511991830136"
              ]
            })
          }}
        />
        {children}

        {primaryGoogleTagId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${primaryGoogleTagId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-tag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  ${googleTagIds.map((id) => `gtag('config', '${id}', { send_page_view: true });`).join('\n')}
                `
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
