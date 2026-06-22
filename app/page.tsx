'use client';

const WHATSAPP_NUMBER = '5511991830136';
const BASE_MESSAGE = 'Olá! Vim pela página de orçamento da Pharmapenha e gostaria de solicitar uma cotação.';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function buildWhatsAppUrl(button: string) {
  if (typeof window === 'undefined') return '#';
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source') || 'Google Ads';
  const campaign = params.get('utm_campaign');
  const term = params.get('utm_term');
  const content = params.get('utm_content');

  const details = [
    'Origem: Landing Orçamento',
    `Fonte: ${source}`,
    campaign ? `Campanha: ${campaign}` : null,
    term ? `Termo: ${term}` : null,
    content ? `Anúncio: ${content}` : null,
    `Botão: ${button}`
  ].filter(Boolean).join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${BASE_MESSAGE}\n\n${details}`)}`;
}

function trackWhatsApp(button: string) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_orcamento_click',
    button_label: button,
    page_location: window.location.href,
    page_path: window.location.pathname
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_orcamento_click', {
      event_category: 'lead',
      event_label: button
    });
  }
}

function LogoMark() {
  return (
    <div className="logoMark" aria-label="Pharmapenha">
      <span>P</span><span>P</span>
    </div>
  );
}

function WhatsAppButton({ children, button, secondary = false }: { children: React.ReactNode; button: string; secondary?: boolean }) {
  return (
    <a
      className={secondary ? 'button buttonSecondary' : 'button'}
      href={buildWhatsAppUrl(button)}
      onClick={() => trackWhatsApp(button)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="waIcon">✆</span>
      {children}
      <span>→</span>
    </a>
  );
}

const services = [
  'Fórmulas manipuladas sob solicitação',
  'Suplementos personalizados',
  'Vitaminas manipuladas',
  'Dermocosméticos',
  'Fitoterápicos'
];

const faq = [
  {
    title: 'Preciso ter receita?',
    text: 'Quando houver prescrição, envie a receita pelo WhatsApp para avaliação da equipe. Também é possível solicitar informações sobre disponibilidade e orçamento.'
  },
  {
    title: 'Vocês entregam?',
    text: 'A retirada pode ser feita na loja e as opções de entrega são informadas pela equipe conforme região e disponibilidade.'
  },
  {
    title: 'O orçamento é feito pelo WhatsApp?',
    text: 'Sim. O atendimento começa pelo WhatsApp para facilitar o envio das informações e o retorno da equipe.'
  }
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
              <span>Farmácia de manipulação</span>
            </div>
          </a>
          <a className="navLink" href="#como-funciona">Como funciona</a>
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
              <span>Orçamento rápido</span>
            </div>
            <h2>Fale com a Pharmapenha</h2>
            <p>Envie as informações da sua fórmula e nossa equipe retorna pelo WhatsApp.</p>
            <ul>
              <li>Receita ou solicitação</li>
              <li>Dados para orçamento</li>
              <li>Retirada ou entrega sob consulta</li>
            </ul>
            <WhatsAppButton button="Card lateral" secondary>Solicitar orçamento agora</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="section stats">
        <div className="statCard"><strong>35+</strong><span>anos de atuação na Penha/SP</span></div>
        <div className="statCard"><strong>WhatsApp</strong><span>atendimento prático para orçamento</span></div>
        <div className="statCard"><strong>CRF-SP</strong><span>responsável técnico informado no rodapé</span></div>
      </section>

      <section className="section split" id="como-funciona">
        <div>
          <span className="eyebrow">Processo simples</span>
          <h2>Como funciona</h2>
          <p>Uma experiência direta para quem quer solicitar orçamento sem preencher formulários longos.</p>
        </div>
        <div className="steps">
          <div><b>1</b><h3>Envie sua receita ou solicitação</h3><p>Clique no botão e mande as informações pelo WhatsApp.</p></div>
          <div><b>2</b><h3>A equipe avalia</h3><p>As informações são verificadas conforme disponibilidade e avaliação farmacêutica.</p></div>
          <div><b>3</b><h3>Receba o orçamento</h3><p>Combine retirada na loja ou consulte opções de entrega.</p></div>
        </div>
      </section>

      <section className="section services" id="servicos">
        <span className="eyebrow">O que você pode solicitar</span>
        <h2>Manipulação sob solicitação, com atendimento farmacêutico</h2>
        <div className="serviceGrid">
          {services.map((service) => <div className="serviceCard" key={service}>✓ {service}</div>)}
        </div>
        <p className="note">A manipulação é realizada conforme solicitação, disponibilidade e avaliação farmacêutica. Não fazemos promessas de resultado ou orientação médica pela página.</p>
      </section>

      <section className="section split greenPanel">
        <div>
          <span className="eyebrow light">Diferenciais</span>
          <h2>Por que falar com a Pharmapenha?</h2>
        </div>
        <div className="benefits">
          <p>✓ Loja física na Penha/SP</p>
          <p>✓ Atendimento pelo WhatsApp</p>
          <p>✓ Experiência em manipulação</p>
          <p>✓ Parcelamento conforme condições disponíveis</p>
          <p>✓ Retirada na loja ou entrega sob consulta</p>
        </div>
      </section>

      <section className="section faq">
        <span className="eyebrow">Dúvidas rápidas</span>
        <h2>Antes de enviar sua solicitação</h2>
        <div className="faqGrid">
          {faq.map((item) => (
            <div className="faqCard" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section finalCta">
        <LogoMark />
        <h2>Pronto para solicitar seu orçamento?</h2>
        <p>Fale com a Pharmapenha pelo WhatsApp e envie as informações da sua fórmula.</p>
        <WhatsAppButton button="CTA final">Falar com a Pharmapenha</WhatsAppButton>
      </section>

      <footer>
        <strong>Pharmapenha</strong>
        <span>CNPJ 60.348.547/0001-04</span>
        <span>Responsável técnico: Rodrigo Farias Diogo — CRF-SP nº 62207</span>
      </footer>

      <div className="mobileSticky">
        <WhatsAppButton button="Botão fixo mobile">Solicitar orçamento</WhatsAppButton>
      </div>
    </main>
  );
}
