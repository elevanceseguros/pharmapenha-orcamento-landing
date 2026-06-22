import type { Metadata } from 'next';
import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
