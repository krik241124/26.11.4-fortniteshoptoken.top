/* Original, reproducible editorial diagrams. Raster output uses Next's installed sharp. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public/images');
const vectors = path.join(root, 'assets/diagrams');
const C = { bg: '#0c1512', panel: '#17271f', border: '#3e5541', text: '#f0f0e6', soft: '#c0ceba', lime: '#d1f378', blue: '#80d9dd', gold: '#f2bb73' };
const escape = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const text = (x,y,s,size=26,color=C.text,weight=400) => `<text x="${x}" y="${y}" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}">${escape(s)}</text>`;
const lines = (x,y,items,size=24,color=C.soft,gap=34) => items.map((s,i)=>text(x,y+i*gap,s,size,color)).join('');
const box = (x,y,w,h,fill=C.panel,r=18) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${C.border}"/>`;
const line = (x1,y1,x2,y2,color=C.border,width=2,extra='') => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" ${extra}/>`;
const arrow = (x,y,w=55) => line(x,y,x+w,y,C.lime,3)+`<path d="m${x+w-9} ${y-8} 9 8-9 8" fill="none" stroke="${C.lime}" stroke-width="3"/>`;
const token = (x,y,scale=1) => `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M0-44 38-22v44L0 44-38 22v-44Z" fill="#293e28" stroke="${C.lime}" stroke-width="3"/><path d="M0-28 8-8 28 0 8 8 0 28-8 8-28 0-8-8Z" fill="${C.lime}"/><circle r="6" fill="${C.bg}"/></g>`;
const chest = (x,y,scale=1) => `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M-65 0v58h130V0Z" fill="#243c2d" stroke="${C.lime}" stroke-width="3"/><path d="M-65 0v-30Q0-82 65-30V0Z" fill="#375536" stroke="${C.lime}" stroke-width="3"/><path d="M-34-45V58M34-45V58M-65 4H65" fill="none" stroke="${C.gold}" stroke-width="6"/><rect x="-12" y="-6" width="24" height="29" rx="4" fill="${C.gold}"/><circle cy="4" r="4" fill="${C.bg}"/><path d="M0-100v-16M-62-81l-10-12M62-81l10-12" stroke="${C.lime}" stroke-width="4"/></g>`;
const clock = (x,y,r=49) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#203728" stroke="${C.lime}" stroke-width="3"/>`+line(x,y,x,y-r*.55,C.lime,4)+line(x,y,x+r*.42,y+r*.22,C.lime,4)+`<circle cx="${x}" cy="${y}" r="5" fill="${C.lime}"/>`;
const frame = (kicker,title,subtitle,body,foot) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><rect width="1200" height="675" fill="${C.bg}"/><path d="M1060 0 1200 140M1120 0 1200 80" stroke="${C.border}" stroke-width="1"/>${text(48,47,kicker.toUpperCase(),17,C.lime,700)}${text(48,105,title,40,C.text,700)}${text(48,146,subtitle,23,C.soft)}${body}${line(48,611,1152,611)}${text(48,645,foot,17,C.soft)}${text(960,645,'SHOP TOKEN / 2026',16,C.lime,700)}</svg>`;
const illustrations = {};
illustrations['pirate-shop-token-overview'] = frame('The reward, at a glance','Find access. Choose your 14 days.','A reported random reward, followed by an activation you control.',
  box(48,193,330,364)+box(435,193,330,364)+box(822,193,330,364)+
  chest(213,308,.9)+token(600,296,1.2)+clock(987,296,52)+
  text(76,421,'01 / OPEN CHESTS',23,C.lime,700)+lines(76,461,['Random discovery','No guaranteed chest'],24)+
  text(463,421,'02 / RECEIVE ACCESS',23,C.lime,700)+lines(463,461,['Check your rewards','Read the account terms'],24)+
  text(850,421,'03 / ACTIVATE',23,C.lime,700)+lines(850,461,['14 days per activation','Claim eligible items'],24)+arrow(386,300,38)+arrow(773,300,38),
  'Original explanatory diagram · reported mechanics · not a game screenshot');
illustrations['pirate-shop-token-steps'] = frame('Acquisition / four steps','From your next drop to the reward screen','A useful routine creates attempts. It does not guarantee a token.',
  [[48,190,'01','Check the event',['Confirm the current playlist','and event rules in Fortnite.']], [612,190,'02','Plan a survivable route',['Choose nearby chests, equipment','and an exit if the landing is busy.']], [48,391,'03','Open eligible chests',['Ordinary chests are reported eligible.','There is no verified best chest type.']], [612,391,'04','Review your reward',['Watch for the access notification.','Read terms before you activate.']]].map(([x,y,n,t,ls])=>box(x,y,540,181)+text(x+26,y+43,n,24,C.lime,700)+text(x+82,y+44,t,29,C.text,700)+lines(x+27,y+93,ls,23)).join(''),
  'Based on cited reporting in the guide · confirm current rules in your game');
const px = n => 126+n/2000*718;
const py = p => 529-p/.8*310;
const curve = p => Array.from({length:81},(_,i)=>`${i?'L':'M'}${px(i*25).toFixed(1)} ${py(-Math.expm1(i*25*Math.log1p(-p))).toFixed(1)}`).join(' ');
illustrations['pirate-shop-token-odds'] = frame('Probability / compare assumptions','2,000 chests still do not mean certainty','Chance of at least one success, assuming independent openings at a fixed rate.',
  [0,.2,.4,.6,.8].map(p=>line(126,py(p),844,py(p))+text(62,py(p)+7,`${Math.round(p*100)}%`,19,C.soft)).join('')+
  [0,500,1000,1500,2000].map(n=>text(px(n)-20,563,n.toLocaleString('en-US'),19,C.soft)).join('')+
  `<path d="${curve(1/2000)}" fill="none" stroke="${C.lime}" stroke-width="5"/><path d="${curve(1/700000)}" fill="none" stroke="${C.blue}" stroke-width="5"/>`+
  text(360,594,'Chests opened',20,C.soft)+box(882,209,270,334)+
  text(902,246,'AT 2,000 CHESTS',18,C.soft,700)+text(902,294,'63.22%',43,C.lime,700)+text(902,326,'If p = 1 / 2,000',21,C.soft)+
  text(902,390,'0.2853%',40,C.blue,700)+text(902,423,'If p = 1 / 700,000',20,C.soft)+lines(902,476,['Both rates unverified.','Neither is a guarantee.'],18,C.soft,27),
  'Original calculation: 1 − (1 − p)^n · assumptions are not measured drop rates');
illustrations['pirate-shop-token-route-checklist'] = frame('Route planning / a fair comparison','Count completed openings, not map pins.','Measure comparable sessions, including travel and unsuccessful landings.',
  box(48,192,520,370)+box(594,192,558,370)+
  ['Chests actually opened','All elapsed minutes','Mode and date','Failed or contested landings'].map((s,i)=>`<circle cx="88" cy="${243+i*78}" r="15" fill="#2b432d"/>`+text(82,249+i*78,String(i+1),17,C.lime,700)+text(118,251+i*78,s,25,C.text)).join('')+
  text(624,243,'ILLUSTRATIVE EXAMPLE',18,C.lime,700)+text(624,304,'24 openings ÷ 12 minutes',30,C.text,700)+
  text(624,386,'2',72,C.lime,700)+text(683,381,'openings / minute',28,C.text)+
  lines(624,446,['Compare several sessions.','A faster route gives more attempts;','it does not prove better per-chest odds.'],23),
  'Method diagram, not a verified route or map · example counts are invented for explanation');
illustrations['pirate-shop-token-access'] = frame('Access / what the reward means','Two activations. Separate claim windows.','Reported access rules; your own activation screen takes priority.',
  box(48,192,540,202)+box(612,192,540,202)+token(108,267,.7)+token(672,267,.7)+
  text(164,249,'2026 activation',28,C.text,700)+text(164,296,'14 days',44,C.lime,700)+text(164,345,'Activate before the displayed deadline.',20,C.soft)+
  text(728,249,'2027 activation',28,C.text,700)+text(728,296,'14 days',44,C.lime,700)+text(728,345,'Confirm the separate dates in-game.',20,C.soft)+
  box(48,420,1104,150)+text(78,465,'ELIGIBILITY MATTERS',19,C.lime,700)+
  lines(78,507,['Eligible V-Bucks cosmetics · exclusions include cash purchases and gifts','Not every Fortnite item is included. Check each offer and your account terms.'],24),
  'Original mechanism diagram · no promise of a particular item or future shop rotation');
illustrations['pirate-shop-token-timeline'] = frame('Activation / all times UTC','Your 14-day clock starts at activation.','Worked example: November 6 at 12:00 UTC → November 20 at 12:00 UTC.',
  box(48,192,1104,237)+line(131,297,1069,297,C.lime,6)+
  `<circle cx="131" cy="297" r="12" fill="${C.lime}"/><circle cx="1069" cy="297" r="12" fill="${C.lime}"/>`+
  text(78,244,'ACTIVATE',20,C.lime,700)+text(866,244,'WINDOW ENDS',20,C.lime,700)+text(468,279,'336 hours',36,C.text,700)+
  lines(78,355,['Nov 6, 2026','12:00 UTC'],24)+lines(867,355,['Nov 20, 2026','12:00 UTC'],24)+
  box(48,453,1104,119)+text(76,494,'A separate limit: when you can start',25,C.gold,700)+
  text(76,537,'Reported 2026 deadline: before Dec 16, 00:00 UTC (Dec 15, 18:00 GMT−6).',23,C.text),
  'Illustrative start date · reported deadline · your in-game terms and timer take priority');
illustrations['item-shop-reading-guide'] = frame('Item shop / read a listing','Three checks before you choose an item','Use the catalogue to compare. Confirm the actual offer inside Fortnite.',
  [48,425,802].map(x=>box(x,192,350,378)).join('')+
  clock(223,278,43)+text(76,370,'01 / DATA DATE',23,C.lime,700)+lines(76,414,['Read the snapshot time.','After reset, yesterday’s','list may be out of date.'],23)+
  token(600,278,.95)+text(453,370,'02 / OFFER PRICE',23,C.lime,700)+lines(453,414,['Prices are in V-Bucks.','Bundle contents differ.','No fixed cash equivalent.'],23)+
  `<rect x="932" y="238" width="90" height="82" rx="10" fill="#243b2b" stroke="${C.lime}" stroke-width="3"/><path d="m951 278 14 14 39-39" stroke="${C.lime}" stroke-width="5" fill="none"/>`+
  text(830,370,'03 / IN-GAME CHECK',23,C.lime,700)+lines(830,414,['Review availability,','included items and your','account-specific price.'],23),
  'Original reading guide · the catalogue uses third-party Fortnite-API data');
(async()=>{
  fs.mkdirSync(output,{recursive:true}); fs.mkdirSync(vectors,{recursive:true});
  for(const [name,svg] of Object.entries(illustrations)) {
    fs.writeFileSync(path.join(vectors,name+'.svg'),svg);
    const file=path.join(output,name+'.webp');
    await sharp(Buffer.from(svg)).webp({quality:87,effort:6}).toFile(file);
    const bytes=fs.statSync(file).size;
    if(bytes>150*1024)throw new Error(name+' exceeds 150KB');
    console.log(`${name}: ${Math.round(bytes/1024)} KB, 1200 x 675`);
  }
  await sharp(path.join(root,'public/token-mark.svg')).resize(512,512).png().toFile(path.join(root,'public/logo-512.png'));
})().catch(error=>{console.error(error);process.exitCode=1;});
