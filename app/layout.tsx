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
  title: 'Orçamento Pharmapenha | Manipulação pelo WhatsApp',
  description: 'Envie sua receita ou solicitação e receba atendimento da equipe Pharmapenha pelo WhatsApp.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Orçamento Pharmapenha',
    description: 'Solicite seu orçamento de manipulação pelo WhatsApp.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
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
