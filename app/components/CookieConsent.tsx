'use client';
import { useEffect, useState } from 'react';
const KEY='pharmapenha_analytics_consent_v1';
const GA='G-0CMMHZ0X0F';
function loadAnalytics(){
 if(document.getElementById('pharmapenha-ga-script'))return;
 window.dataLayer=window.dataLayer||[];
 window.gtag=function(){window.dataLayer!.push(arguments as unknown as Record<string,unknown>);};
 window.gtag('js',new Date());
 window.gtag('config',GA,{send_page_view:true});
 const s=document.createElement('script');s.id='pharmapenha-ga-script';s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA;document.head.appendChild(s);
}
declare global{interface Window{dataLayer?:Record<string,unknown>[];gtag?:(...args:unknown[])=>void;}}
export default function CookieConsent(){
 const [choice,setChoice]=useState<'accepted'|'rejected'|null>(null);
 const [open,setOpen]=useState(false);
 useEffect(()=>{const saved=localStorage.getItem(KEY);if(saved==='accepted'){setChoice('accepted');loadAnalytics();}else if(saved==='rejected'){setChoice('rejected');}const handler=()=>setOpen(true);window.addEventListener('pharmapenha-cookie-preferences',handler);return()=>window.removeEventListener('pharmapenha-cookie-preferences',handler);},[]);
 function save(next:'accepted'|'rejected'){localStorage.setItem(KEY,next);setChoice(next);setOpen(false);if(next==='accepted')loadAnalytics();else if(document.getElementById('pharmapenha-ga-script')){window.location.reload();}}
 if(choice!==null&&!open)return null;
 return <aside role="dialog" aria-label="Preferências de cookies" className="cookieNotice"><strong>Sua privacidade importa</strong><p>Utilizamos cookies opcionais de análise para entender visitas e cliques no atendimento. Você pode recusar sem prejudicar o uso do site. <a href="/politica-de-cookies">Saiba mais</a>.</p><div className="cookieButtons"><button type="button" onClick={()=>save('rejected')}>Recusar</button><button type="button" onClick={()=>save('accepted')}>Aceitar análise</button></div></aside>;
}