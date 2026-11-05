(() => {
'use strict';
const cfg=window.INVITATION;
const $=(s)=>document.querySelector(s);
const all=(s)=>document.querySelectorAll(s);
const set=(s,value)=>{const el=$(s);if(el)el.textContent=value};
const months=['YANVAR','FEVRAL','MART','APREL','MAY','İYUN','İYUL','AVQUST','SENTYABR','OKTYABR','NOYABR','DEKABR'];
const weekdays=['Bazar günü','Bazar ertəsi','Çərşənbə axşamı','Çərşənbə','Cümə axşamı','Cümə','Şənbə'];
const [yr,mo,dy]=cfg.date.split('-').map(Number);
const dateObj=new Date(`${cfg.date}T${cfg.time}:00${cfg.timezone}`);
const localDay=new Date(Date.UTC(yr,mo-1,dy)).getUTCDay();
all('[data-bride]').forEach(e=>e.textContent=cfg.couple.bride);
all('[data-groom]').forEach(e=>e.textContent=cfg.couple.groom);
set('#heroYear',yr);set('#heroYear2',yr);set('#heroDay',String(dy).padStart(2,'0'));set('#heroMonth',months[mo-1]);
set('#bigDate',`${String(dy).padStart(2,'0')}.${String(mo).padStart(2,'0')}.${yr}`);
set('#weekday',`${weekdays[localDay]} · ${cfg.time}`);
set('#venueName',cfg.venue);set('#venueHall',cfg.hall);set('#venueAddress',cfg.address);
document.title=`${cfg.couple.bride} & ${cfg.couple.groom} — Toy dəvətnaməsi`;
$('#mapLink').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(cfg.address);
const timeline=$('#timeline');
cfg.schedule.forEach(([time,event])=>{const r=document.createElement('div');r.className='timeline-row';const t=document.createElement('div');t.className='timeline-time';t.textContent=time;const d=document.createElement('div');d.className='timeline-dot';const n=document.createElement('div');n.className='timeline-event';n.textContent=event;r.append(t,d,n);timeline.appendChild(r)});
if(cfg.photoFile){$('#photoBlock').hidden=false;$('#couplePhoto').src=cfg.photoFile;}
function tick(){const left=Math.max(0,dateObj.getTime()-Date.now());const days=Math.floor(left/86400000);const h=Math.floor(left/3600000)%24;const m=Math.floor(left/60000)%60;const s=Math.floor(left/1000)%60;set('#days',String(days).padStart(2,'0'));set('#hours',String(h).padStart(2,'0'));set('#minutes',String(m).padStart(2,'0'));set('#seconds',String(s).padStart(2,'0'));$('#eventPassed').hidden=left!==0;}
tick();setInterval(tick,1000);
let toastTimer;
function toast(msg){const e=$('#toast');e.textContent=msg;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),5000)}
const main=$('#main'),cover=$('#cover');
$('#openInvite').addEventListener('click',()=>{cover.classList.add('hide');main.inert=false;document.body.classList.remove('locked');setTimeout(()=>{cover.hidden=true},1150)});
const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});all('.reveal').forEach(el=>observer.observe(el));
function sendWhatsApp(message){const phone=String(cfg.whatsapp||'').replace(/\D/g,'');if(!/^\d{9,15}$/.test(phone)){toast('WhatsApp nömrəsini config.js faylına əlavə edin.');return;}window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer')}
$('#rsvpForm').addEventListener('submit',(e)=>{e.preventDefault();const f=new FormData(e.currentTarget);const name=String(f.get('name')||'').trim();if(!name)return;sendWhatsApp(`Salam! ${cfg.couple.bride} və ${cfg.couple.groom} toy dəvətnaməsinə cavabım:\nAd: ${name}\nQonaq sayı: ${f.get('count')}\nİştirak: ${f.get('attendance')}`)});
function icsDate(d){return d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}
function icsEsc(s){return String(s).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;')}
$('#calendarBtn').addEventListener('click',()=>{const end=new Date(dateObj.getTime()+6*3600000);const content=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding Invite//AZ//EN','BEGIN:VEVENT',`UID:wedding-${cfg.date}-${cfg.time.replace(':','')}@invitation`,`DTSTAMP:${icsDate(new Date())}`,`DTSTART:${icsDate(dateObj)}`,`DTEND:${icsDate(end)}`,`SUMMARY:${icsEsc(cfg.couple.bride+' & '+cfg.couple.groom+' — Toy')}`,`LOCATION:${icsEsc(cfg.venue+' — '+cfg.address)}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');const url=URL.createObjectURL(new Blob([content],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='toy-devetnamesi.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)});
if(cfg.musicFile){const audio=new Audio(cfg.musicFile);audio.loop=true;const btn=$('#musicBtn');btn.hidden=false;let playing=false;btn.addEventListener('click',async()=>{try{if(playing){audio.pause();playing=false}else{await audio.play();playing=true}btn.textContent=playing?'Ⅱ':'♫';btn.setAttribute('aria-label',playing?'Musiqini dayandır':'Musiqini aç')}catch{toast('Musiqi səsləndirilə bilmədi.')}})}
})();
