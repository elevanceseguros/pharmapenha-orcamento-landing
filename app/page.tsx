'use client';

import type { MouseEvent, ReactNode } from 'react';

const WHATSAPP_NUMBER = '5511991830136';
const BASE_MESSAGE = 'Olá! Tudo bem? Gostaria de solicitar um orçamento de manipulação com a Pharmapenha. Posso enviar minha receita ou as informações por aqui?';
const DEFAULT_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(BASE_MESSAGE)}`;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function getTrackingParams() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || 'google_ads',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
    gclid: params.get('gclid') || ''
  };
}

function buildWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(BASE_MESSAGE)}`;
}

function trackWhatsApp(button: string) {
  if (typeof window === 'undefined') return;
  const trackingParams = getTrackingParams();
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_orcamento_click',
    button_label: button,
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...trackingParams
  });
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_orcamento_click', {
      event_category: 'lead',
      event_label: button,
      transport_type: 'beacon',
      ...trackingParams
    });
  }
}

function LogoMark() {
  return (
    <div className="logoMark" aria-label="Pharmapenha">
      <img src="/images/logo-pharmapenha.png" alt="Pharmapenha" width={40} height={40} style={{width:'40px',height:'40px',objectFit:'contain',display:'block'}} />
    </div>
  );
}

function Icon({ name }: { name: 'recipe' | 'team' | 'chat' | 'store' | 'truck' | 'shield' | 'spark' | 'leaf' | 'clock' | 'map' | 'check' }) {
  const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true };
  const stroke = { stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const icons = {
    recipe: <svg {...common}><path {...stroke} d="M7 3h7l3 3v15H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path {...stroke} d="M14 3v4h4M8 11h8M8 15h8M8 19h5"/></svg>,
    team: <svg {...common}><path {...stroke} d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle {...stroke} cx="9.5" cy="7" r="4"/><path {...stroke} d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    chat: <svg {...common}><path {...stroke} d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.8 8.8 0 0 1-3.8-.86L3 20l1.1-4.1A8.2 8.2 0 1 1 21 11.5Z"/><path {...stroke} d="M8 11h8M8 15h5"/></svg>,
    store: <svg {...common}><path {...stroke} d="M4 10h16l-1-5H5l-1 5Z"/><path {...stroke} d="M6 10v10h12V10M9 20v-6h6v6"/></svg>,
    truck: <svg {...common}><path {...stroke} d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle {...stroke} cx="7" cy="18" r="2"/><circle {...stroke} cx="17" cy="18" r="2"/></svg>,
    shield: <svg {...common}><path {...stroke} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path {...stroke} d="m9 12 2 2 4-5"/></svg>,
    spark: <svg {...common}><path {...stroke} d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></svg>,
    leaf: <svg {...common}><path {...stroke} d="M20 4c-7.5 0-13 4.5-13 10a6 6 0 0 0 6 6c5.5 0 9-7 7-16Z"/><path {...stroke} d="M4 20c3-5.5 7.5-8.5 13-10"/></svg>,
    clock: <svg {...common}><circle {...stroke} cx="12" cy="12" r="9"/><path {...stroke} d="M12 7v5l3 2"/></svg>,
    map: <svg {...common}><path {...stroke} d="M12 21s7-4.9 7-11a7 7 0 1 0-14 0c0 6.1 7 11 7 11Z"/><circle {...stroke} cx="12" cy="10" r="2.5"/></svg>,
    check: <svg {...common}><path {...stroke} d="m5 12 4 4L19 6"/></svg>
  };
  return <span className="iconWrap">{icons[name]}</span>;
}

function WhatsAppButton({ children, button, secondary = false, compact = false }: { children: ReactNode; button: string; secondary?: boolean; compact?: boolean }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href = buildWhatsAppUrl();
    trackWhatsApp(button);
  }
  return (
    <a className={`${secondary ? 'button buttonSecondary' : 'button'}${compact ? ' buttonCompact' : ''}`} href={DEFAULT_WHATSAPP_URL} onClick={handleClick} target="_blank" rel="noopener noreferrer" data-conversion="whatsapp_orcamento_click" data-button={button} data-whatsapp-number={WHATSAPP_NUMBER}>
      <span className="waIcon"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></span>{children}<span>→</span>
    </a>
  );
}

const stats = [
  { value: '35+', title: 'anos de tradição na Penha/SP', icon: 'spark' as const },
  { value: 'Atendimento ágil', title: 'orçamento prático pelo WhatsApp', icon: 'chat' as const },
  { value: 'Farmácia regularizada', title: 'com responsável técnico habilitado', icon: 'shield' as const }
];

const steps = [
  { icon: 'recipe' as const, title: 'Envie sua receita ou solicitação', text: 'Mande sua receita ou descreva o que você precisa diretamente pelo WhatsApp.' },
  { icon: 'team' as const, title: 'Nossa equipe analisa', text: 'A Pharmapenha avalia as informações e organiza o atendimento para orçamento.' },
  { icon: 'chat' as const, title: 'Receba o retorno', text: 'Você recebe orientação para orçamento e combina retirada na loja ou entrega sob consulta.' }
];

const services = [
  { icon: 'recipe' as const, title: 'Fórmulas manipuladas', text: 'Formulações sob solicitação, conforme necessidade apresentada.' },
  { icon: 'spark' as const, title: 'Suplementos personalizados', text: 'Opções manipuladas de acordo com a solicitação do cliente.' },
  { icon: 'leaf' as const, title: 'Vitaminas manipuladas', text: 'Atendimento para fórmulas vitamínicas personalizadas.' },
  { icon: 'shield' as const, title: 'Dermocosméticos', text: 'Soluções manipuladas para cuidados tópicos e rotina de pele.' },
  { icon: 'leaf' as const, title: 'Fitoterápicos', text: 'Solicitações em manipulação com acompanhamento da equipe.' }
];

const benefits = [
  { icon: 'spark' as const, title: 'Mais de 35 anos na Penha/SP' },
  { icon: 'chat' as const, title: 'Atendimento pelo WhatsApp' },
  { icon: 'store' as const, title: 'Loja física e equipe preparada' },
  { icon: 'truck' as const, title: 'Retirada na loja ou entrega sob consulta' },
  { icon: 'shield' as const, title: 'Cuidado farmacêutico responsável' },
  { icon: 'team' as const, title: 'Atendimento próximo e humano' }
];

const faq = [
  { title: 'Preciso de receita?', text: 'Quando houver prescrição, você pode enviar a receita pelo WhatsApp para avaliação da equipe.' },
  { title: 'Posso pedir orçamento pelo WhatsApp?', text: 'Sim. O atendimento começa pelo WhatsApp para facilitar o envio das informações e o retorno da equipe.' },
  { title: 'Vocês entregam?', text: 'A retirada pode ser feita na loja e as opções de entrega são informadas conforme região e disponibilidade.' },
  { title: 'Onde fica a loja?', text: 'Estamos na Praça Nossa Senhora da Penha, 95, na Penha de França, em São Paulo.' }
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="heroGlow heroGlowOne" />
        <div className="heroGlow heroGlowTwo" />
        <nav className="nav">
          <a className="brand" href="#top" aria-label="Pharmapenha">
            <LogoMark />
            <div>
              <strong>Pharmapenha</strong>
              <span>Farmácia de Manipulação • Penha/SP</span>
            </div>
          </a>
          <div className="navActions">
            <a className="navLink" href="#como-funciona">Como funciona</a>
            <WhatsAppButton button="Cabeçalho" compact>WhatsApp</WhatsAppButton>
          </div>
        </nav>

        <div className="heroGrid" id="top">
          <div className="heroCopy">
            <div className="badge">Atendimento pelo WhatsApp</div>
            <h1>Solicite seu orçamento de manipulação pelo WhatsApp</h1>
            <p className="lead">Envie sua receita ou solicitação e receba atendimento da equipe Pharmapenha com orientação farmacêutica.</p>
            <div className="heroActions">
              <WhatsAppButton button="Hero principal">Enviar receita pelo WhatsApp</WhatsAppButton>
              <a className="textLink" href="#servicos">Ver o que posso solicitar</a>
            </div>
            <div className="trustLine">
              <span>Mais de 35 anos na Penha/SP</span>
              <span>Atendimento farmacêutico</span>
              <span>Retirada ou entrega sob consulta</span>
            </div>
          </div>

          <div className="heroCard">
            <div className="heroCardTop">
              <LogoMark />
              <span>Orçamento rápido pelo WhatsApp</span>
            </div>
            <h2>Fale com a Pharmapenha</h2>
            <p>Envie sua receita ou sua solicitação e receba atendimento prático pelo WhatsApp.</p>
            <div className="heroChecklist">
              <div><Icon name="recipe" /><span>Envie sua receita ou fórmula desejada</span></div>
              <div><Icon name="team" /><span>Receba retorno com orientação para orçamento</span></div>
              <div><Icon name="truck" /><span>Combine retirada na loja ou entrega sob consulta</span></div>
            </div>
            <WhatsAppButton button="Card lateral" secondary>Solicitar orçamento agora</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="section stats">
        {stats.map((stat) => <div className="statCard" key={stat.value}><Icon name={stat.icon} /><strong>{stat.value}</strong><span>{stat.title}</span></div>)}
      </section>

      <section className="section visualProof">
        <div className="visualIntro">
          <span className="eyebrow">Ambiente Pharmapenha</span>
          <h2>Um ambiente pensado para cuidado, confiança e qualidade</h2>
          <p>Na Pharmapenha, unimos atendimento acolhedor, estrutura organizada e cuidado farmacêutico para oferecer uma experiência mais segura e prática.</p>
        </div>
        <div className="visualGrid">
          <figure className="visualCard visualCardLarge">
            <img src="/images/recepcao-pharmapenha.webp" alt="Recepção moderna de farmácia de manipulação" loading="lazy" />
            <figcaption><strong>Atendimento acolhedor</strong><span>Recepção organizada e atendimento próximo para quem busca praticidade e confiança.</span></figcaption>
          </figure>
          <figure className="visualCard">
            <img src="/images/laboratorio-pharmapenha.webp" alt="Laboratório moderno de farmácia de manipulação" loading="lazy" />
            <figcaption><strong>Manipulação com cuidado</strong><span>Ambiente limpo, estruturado e preparado para atender cada solicitação com atenção.</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="section split" id="como-funciona">
        <div className="sectionIntro">
          <span className="eyebrow">Processo simples</span>
          <h2>Como solicitar seu orçamento</h2>
          <p>Um processo simples, rápido e pensado para facilitar seu atendimento.</p>
          <div className="sideCta"><WhatsAppButton button="Como funciona">Enviar informações pelo WhatsApp</WhatsAppButton></div>
        </div>
        <div className="steps">
          {steps.map((step, index) => <div className="stepCard" key={step.title}><Icon name={step.icon} /><b>{String(index + 1).padStart(2, '0')}</b><h3>{step.title}</h3><p>{step.text}</p></div>)}
        </div>
      </section>

      <section className="section services" id="servicos">
        <span className="eyebrow">O que você pode solicitar</span>
        <h2>O que você pode solicitar na Pharmapenha</h2>
        <p className="sectionLead">Atendimento para diferentes tipos de necessidades em manipulação e cuidado personalizado.</p>
        <div className="serviceGrid">
          {services.map((service) => <div className="serviceCard" key={service.title}><Icon name={service.icon} /><h3>{service.title}</h3><p>{service.text}</p></div>)}
        </div>
        <p className="note">A manipulação é realizada conforme solicitação, disponibilidade e avaliação farmacêutica.</p>
        <div className="centerCta"><WhatsAppButton button="Serviços">Solicitar orçamento pelo WhatsApp</WhatsAppButton></div>
      </section>

      <section className="section greenPanel">
        <div className="panelIntro">
          <span className="eyebrow light">Diferenciais</span>
          <h2>Por que escolher a Pharmapenha?</h2>
          <p>Tradição, atendimento e praticidade em um só lugar.</p>
        </div>
        <div className="benefits">
          {benefits.map((benefit) => <div className="benefitCard" key={benefit.title}><Icon name={benefit.icon} /><span>{benefit.title}</span></div>)}
        </div>
      </section>

      <section className="section location" id="localizacao">
        <div className="locationIntro">
          <span className="eyebrow">Atendimento e localização</span>
          <h2>Estamos prontos para te atender</h2>
          <p>Fale conosco pelo WhatsApp ou venha até nossa loja na Penha/SP. Nossa equipe está pronta para orientar seu atendimento e orçamento.</p>
        </div>
        <div className="locationGrid">
          <div className="locationCard"><Icon name="map" /><strong>Endereço</strong><p>Praça Nossa Senhora da Penha, 95<br />Penha de França - São Paulo - SP<br />CEP: 03632-010</p></div>
          <div className="locationCard"><Icon name="clock" /><strong>Horário</strong><p>Segunda a sexta: 8h às 18h15<br />Sábados: 8h às 13h</p></div>
          <div className="locationCard locationAction"><Icon name="chat" /><strong>Atendimento</strong><p>WhatsApp: (11) 99183-0136</p><WhatsAppButton button="Localização" compact>Falar com a Pharmapenha</WhatsAppButton></div>
        </div>
      </section>

      <section className="section faq">
        <span className="eyebrow">Dúvidas frequentes</span>
        <h2>Algumas informações importantes antes de falar com nossa equipe</h2>
        <div className="faqGrid">
          {faq.map((item) => <div className="faqCard" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}
        </div>
      </section>

      <section className="section finalCta">
        <LogoMark />
        <h2>Pronto para solicitar seu orçamento?</h2>
        <p>Fale com a Pharmapenha pelo WhatsApp e envie as informações da sua fórmula.</p>
        <WhatsAppButton button="CTA final">Falar com a Pharmapenha</WhatsAppButton>
      </section>

      <footer>
        <div className="footerGrid">
          <div><div className="footerBrand"><LogoMark /><div><strong>Pharmapenha</strong><span>Farmácia de Manipulação • Penha/SP</span></div></div><p>Atendimento farmacêutico com seriedade, tradição e cuidado.</p></div>
          <div><strong>Contato</strong><span>WhatsApp: (11) 99183-0136</span><span>Praça Nossa Senhora da Penha, 95</span><span>Penha de França - São Paulo/SP</span></div>
          <div><strong>Informações institucionais</strong><span>CNPJ 60.348.547/0001-04</span><span>Responsável técnico: Rodrigo Farias Diogo</span><span>CRF-SP nº 62207</span></div>
        </div>
      </footer>

      <div className="mobileSticky"><WhatsAppButton button="Botão fixo mobile">Solicitar orçamento</WhatsAppButton></div>
    </main>
  );
}
