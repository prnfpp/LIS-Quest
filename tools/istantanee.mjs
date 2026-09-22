#!/usr/bin/env node
/* ============================================================
   LE ISTANTANEE
   ============================================================
   Questo gioco e' un disegno generato: ogni mano, ogni lettera, ogni segno
   escono da numeri, e un numero cambiato in fondo al motore si porta dietro
   quaranta disegni senza dirlo a nessuno. E' gia' successo due volte, e tutte
   e due le volte se n'e' accorto un occhio umano per caso: quando e' stata
   corretta la cinematica del pollice, diciassette configurazioni sono uscite
   sbagliate; quando e' cambiato il taglio stretto, i mini-giochi hanno
   iniziato a mostrare mani senza mento.

   Da qui in poi se ne accorge questo strumento. Apre la pagina in un browser
   vero, si fa dare da window.LISQ il disegno GENERATO di ogni cosa, e lo
   confronta con quello registrato in tools/istantanee/. Se qualcosa si e'
   mosso lo dice, e dice cosa.

   Si confronta l'SVG, non i PIXEL. I pixel cambiano quando cambia il browser,
   e una verifica che fallisce da sola smette di essere letta; l'SVG no, e in
   piu' si legge in una differenza, si discute in una revisione e dice
   esattamente quale numero si e' mosso.

   Uso:
     node tools/istantanee.mjs            confronta, e fallisce se qualcosa e' cambiato
     node tools/istantanee.mjs --scrivi   registra lo stato di adesso come nuovo riferimento

   Non ha dipendenze: solo Node (22 o piu' recente, per WebSocket) e un
   Chrome o Chromium gia' installato. Il gioco resta un file HTML che si apre
   con un doppio clic, e questo strumento sta fuori da quella promessa: chi
   gioca non lo incontra mai.
   ============================================================ */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const QUI     = path.dirname(fileURLToPath(import.meta.url));
const RADICE  = path.resolve(QUI, '..');
const PAGINA  = path.join(RADICE, 'index.html');
const CARTELLA= path.join(QUI, 'istantanee');
const SCRIVI  = process.argv.includes('--scrivi');

const CATEGORIE = {
  segni:   'segni.txt',
  lettere: 'lettere.txt',
  mani:    'mani.txt'
};

/* ---------- trovare un browser ---------- */
function cercaBrowser(){
  const nomi = [
    process.env.CHROME, process.env.CHROME_PATH, process.env.CHROMIUM_PATH,
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium', '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium'
  ].filter(Boolean);
  for(const n of nomi) if(fs.existsSync(n)) return n;
  /* Playwright ne tiene uno suo, e in molti ambienti e' l'unico che c'e' */
  const pw = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if(fs.existsSync(pw)){
    for(const d of fs.readdirSync(pw)){
      const c = path.join(pw, d, 'chrome-linux', 'chrome');
      if(fs.existsSync(c)) return c;
      const m = path.join(pw, d, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium');
      if(fs.existsSync(m)) return m;
    }
  }
  return null;
}

const dormi = ms => new Promise(r => setTimeout(r, ms));

/* ---------- parlare col browser ---------- */
async function apri(){
  const eseguibile = cercaBrowser();
  if(!eseguibile){
    console.error('Non trovo un Chrome o un Chromium. Installane uno, oppure indicane');
    console.error('il percorso nella variabile CHROME.');
    process.exit(2);
  }
  const profilo = fs.mkdtempSync(path.join(os.tmpdir(), 'lisq-'));
  const browser = spawn(eseguibile, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    '--no-first-run', '--no-default-browser-check', '--disable-extensions',
    '--force-device-scale-factor=1', '--window-size=1200,900',
    '--user-data-dir='+profilo, '--remote-debugging-port=0',
    'about:blank'
  ], {stdio: ['ignore','ignore','ignore']});

  /* la porta la sceglie lui e la scrive nel profilo: chiedergliene una fissa
     significa litigare con qualunque altra cosa stia girando */
  const fPorta = path.join(profilo, 'DevToolsActivePort');
  let porta = null;
  for(let i=0;i<80 && porta===null;i++){
    await dormi(120);
    if(fs.existsSync(fPorta)){
      const righe = fs.readFileSync(fPorta,'utf8').split('\n');
      if(righe[0] && righe[0].trim()) porta = righe[0].trim();
    }
  }
  if(!porta){ browser.kill(); throw new Error('il browser non si e\' aperto'); }

  let bersaglio = null;
  for(let i=0;i<40 && !bersaglio;i++){
    try{
      const r = await fetch('http://127.0.0.1:'+porta+'/json/list');
      bersaglio = (await r.json()).find(x => x.type === 'page');
    }catch(e){ await dormi(150); }
  }
  if(!bersaglio){ browser.kill(); throw new Error('il browser non risponde'); }

  const ws = new WebSocket(bersaglio.webSocketDebuggerUrl);
  await new Promise((ok, no) => {
    ws.addEventListener('open', ok);
    ws.addEventListener('error', () => no(new Error('non riesco a collegarmi al browser')));
  });
  let seq = 0;
  const attese = new Map();
  const errori = [];
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if(m.id && attese.has(m.id)){ attese.get(m.id)(m.result); attese.delete(m.id); }
    if(m.method === 'Runtime.exceptionThrown')
      errori.push(m.params.exceptionDetails.exception?.description ||
                  m.params.exceptionDetails.text);
    if(m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error')
      errori.push(m.params.args.map(a => a.value || a.description).join(' '));
  });
  const manda = (metodo, parametri={}) => {
    const n = ++seq;
    ws.send(JSON.stringify({id:n, method:metodo, params:parametri}));
    return new Promise(res => attese.set(n, res));
  };
  const chiudi = () => { try{ ws.close(); }catch(e){} browser.kill();
                         try{ fs.rmSync(profilo, {recursive:true, force:true}); }catch(e){} };
  return {manda, chiudi, errori};
}

/* ---------- raccogliere ---------- */
async function raccogli(){
  const b = await apri();
  try{
    await b.manda('Page.enable');
    await b.manda('Runtime.enable');
    await b.manda('Page.navigate', {url: 'file://'+PAGINA});
    /* il gioco si accende da solo: gli si lascia il tempo di farlo */
    await dormi(2500);
    const codice = fs.readFileSync(path.join(QUI,'raccolta.js'), 'utf8');
    const r = await b.manda('Runtime.evaluate',
      {expression: codice, returnByValue: true, awaitPromise: true});
    if(r.exceptionDetails)
      throw new Error('la raccolta e\' fallita: '+
        (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    const v = r.result.value;
    if(!v || v.errore) throw new Error(v ? v.errore : 'la raccolta non ha restituito niente');
    if(v.errori.length) console.error('disegni che non sono venuti:\n  '+v.errori.join('\n  '));
    if(b.errori.length) console.error('errori in console:\n  '+b.errori.join('\n  '));
    return v.fuori;
  } finally { b.chiudi(); }
}

/* ---------- registrare ---------- */
function inTesto(categoria, roba){
  const righe = [
    '# istantanee: '+categoria,
    '# generate da tools/istantanee.mjs — non si scrivono a mano.',
    '# nome | riquadro | disegno (x y larghezza altezza) | elementi | impronta',
    ''
  ];
  Object.keys(roba).sort().forEach(k => {
    const m = roba[k];
    righe.push([k, m.riquadro, m.disegno, m.elementi, m.impronta].join(' | '));
  });
  return righe.join('\n')+'\n';
}

function leggiRighe(file){
  if(!fs.existsSync(file)) return null;
  const mappa = new Map();
  fs.readFileSync(file,'utf8').split('\n').forEach(r => {
    if(!r.trim() || r.startsWith('#')) return;
    mappa.set(r.split(' | ')[0], r);
  });
  return mappa;
}

/* ---------- il confronto ---------- */
function confronta(nome, file, testo){
  const vecchie = leggiRighe(file);
  if(!vecchie){
    console.error('manca '+path.relative(RADICE,file)+': lancia --scrivi una volta per crearlo.');
    return 1;
  }
  /* non si rilegge il file: si confronta con il testo appena generato */
  const adesso = new Map();
  testo.split('\n').forEach(r => {
    if(!r.trim() || r.startsWith('#')) return;
    adesso.set(r.split(' | ')[0], r);
  });

  const mosse = [], nate = [], morte = [];
  adesso.forEach((r,k) => {
    if(!vecchie.has(k)) nate.push(k);
    else if(vecchie.get(k) !== r) mosse.push(k);
  });
  vecchie.forEach((r,k) => { if(!adesso.has(k)) morte.push(k); });

  if(!mosse.length && !nate.length && !morte.length){
    console.log('  '+nome+': '+adesso.size+' disegni, nessuno si e\' mosso');
    return 0;
  }
  console.log('  '+nome+': '+mosse.length+' cambiati, '+nate.length+' nuovi, '+morte.length+' spariti');
  mosse.forEach(k => {
    console.log('    ~ '+k);
    console.log('      prima:  '+vecchie.get(k).slice(k.length+3));
    console.log('      adesso: '+adesso.get(k).slice(k.length+3));
  });
  nate.forEach(k => console.log('    + '+k));
  morte.forEach(k => console.log('    - '+k));
  return mosse.length + nate.length + morte.length;
}

/* ---------- ---------- */
const roba = await raccogli();
fs.mkdirSync(CARTELLA, {recursive: true});

let differenze = 0;
for(const [categoria, file] of Object.entries(CATEGORIE)){
  const pieno = path.join(CARTELLA, file);
  const testo = inTesto(categoria, roba[categoria] || {});
  if(SCRIVI){
    fs.writeFileSync(pieno, testo);
    console.log('  scritto '+path.relative(RADICE, pieno)+
                ' ('+Object.keys(roba[categoria]||{}).length+' disegni)');
  } else {
    differenze += confronta(categoria, pieno, testo);
  }
}

if(SCRIVI){
  console.log('\nIstantanee registrate. Guarda la differenza prima di consegnarla:');
  console.log('un disegno che si muove senza che tu l\'abbia voluto e\' esattamente');
  console.log('quello che questo strumento esiste per farti vedere.');
  process.exit(0);
}
if(differenze){
  console.log('\n'+differenze+' disegni non sono piu\' quelli registrati.');
  console.log('Se il cambiamento e\' voluto, guardalo con i tuoi occhi e poi');
  console.log('registralo:  node tools/istantanee.mjs --scrivi');
  process.exit(1);
}
console.log('\nTutto al suo posto.');
