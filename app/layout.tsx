import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';

const GA_ID = 'G-0CMMHZ0X0F';

export const metadata: Metadata = {
  title: 'Farmácia de Manipulação na Penha | Pharmapenha',
  description: 'Farmácia de manipulação tradicional na Penha/SP. Fale com a equipe Pharmapenha pelo WhatsApp e solicite um orçamento com atendimento local.',
  robots: { index: true, follow: true },
  keywords: ['pharmapenha', 'pharmapenha penha', 'orçamento pharmapenha', 'farmácia de manipulação penha', 'farmácia de manipulação zona leste', 'atendimento farmacêutico penha', 'whatsapp pharmapenha'],
  alternates: {
    canonical: 'https://orcamentopharmapenha.online'
  },
  openGraph: {
    title: 'Farmácia de Manipulação na Penha | Pharmapenha',
    description: 'Canal oficial da Pharmapenha para orçamento pelo WhatsApp. Mais de 35 anos na Penha/SP.',
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
    title: 'Farmácia de Manipulação na Penha | Pharmapenha',
    description: 'Solicite um orçamento pelo WhatsApp oficial da Pharmapenha.',
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
              "name": "Pharmapenha",
              "url": "https://orcamentopharmapenha.online",
              "logo": "https://orcamentopharmapenha.online/images/logo-pharmapenha.png",
              "image": "https://orcamentopharmapenha.online/images/og-pharmapenha.jpg",
              "description": "Canal oficial da Pharmapenha para atendimento local e orçamento na Penha, São Paulo.",
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

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
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
              gtag('config', '${GA_ID}', { send_page_view: true });
            `
          }}
        />
      </body>
    </html>
  );
}
