/* La RACCOLTA: il codice che gira DENTRO la pagina.
   Chiede a window.LISQ ogni disegno che il gioco sa fare — i segni interi,
   gli stessi segni nel taglio stretto che usano i mini-giochi, le lettere
   dell'alfabeto manuale, le configurazioni di mano — e di ognuno prende
   quattro misure e un'impronta.

   Le quattro misure servono a chi legge la differenza in una revisione:
   dicono dove sta il disegno e di quanti pezzi e' fatto, e sono numeri che
   si capiscono. L'impronta serve a non lasciar passare niente: e' il
   riassunto di TUTTO il disegno, quindi cambia anche se si muove una curva
   che le misure non vedono.

   L'impronta si calcola sul disegno NORMALIZZATO: ogni numero arrotondato a
   un decimo di unita'. Due versioni di browser possono differire sull'ultima
   cifra di un seno, e un decimo di unita' di disegno non lo vede nessuno:
   senza questo arrotondamento la verifica fallirebbe da sola, e una verifica
   che fallisce da sola e' peggio di nessuna verifica. */
(() => {
  if(!window.LISQ) return {errore: 'window.LISQ non esiste: la pagina non e\' quella giusta, o non ha finito di caricare'};

  const banco = document.createElement('div');
  banco.setAttribute('style', 'position:absolute;left:-9999px;top:0;width:400px;height:400px');
  document.body.appendChild(banco);

  const n1 = v => Math.round(v*10)/10;
  const NUMERO = /-?\d+\.\d+/g;

  /* L'impronta si calcola QUI, dentro la pagina, e non la' fuori: rimandare
     indietro il testo di centotrenta disegni interi vuol dire far passare
     qualche megabyte per il filo che ci collega al browser, e quel filo non
     e' fatto per quello. Fuori torna un numero di sedici cifre.
     Non e' una funzione di sicurezza e non deve esserlo: deve solo cambiare
     quando cambia il disegno. FNV-1a, due volte con semi diversi. */
  function fnv(t, seme){
    let h = seme >>> 0;
    for(let i=0;i<t.length;i++){
      h ^= t.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8,'0');
  }
  const impronta = t => fnv(t, 0x811c9dc5) + fnv(t, 0x9e3779b9);

  function misura(svg){
    banco.innerHTML = svg;
    const s = banco.querySelector('svg');
    if(!s) throw new Error('il disegno non e\' un svg');
    const conta = {};
    s.querySelectorAll('*').forEach(e => { conta[e.tagName] = (conta[e.tagName]||0)+1; });
    let b = null;
    try{ b = s.getBBox(); }catch(e){}
    return {
      riquadro: s.getAttribute('viewBox') || '(senza riquadro)',
      disegno: b ? [n1(b.x), n1(b.y), n1(b.width), n1(b.height)].join(' ') : '(non misurabile)',
      elementi: Object.keys(conta).sort().map(k => k+':'+conta[k]).join(' '),
      impronta: impronta(svg.replace(NUMERO, m => String(n1(parseFloat(m)))))
    };
  }

  const fuori = {segni: {}, lettere: {}, mani: {}};
  const errori = [];
  const prova = (dove, chiave, fai) => {
    try{ fuori[dove][chiave] = misura(fai()); }
    catch(e){ errori.push(dove+'/'+chiave+': '+e.message); }
  };

  window.LISQ.segni().forEach(k => {
    prova('segni', k, ()=> window.LISQ.segno(k));
    prova('segni', k+' (compatto)', ()=> window.LISQ.segno(k, {compatto: true}));
  });
  window.LISQ.lettere().forEach(k => prova('lettere', k, ()=> window.LISQ.lettera(k)));
  /* Le configurazioni si guardano da due parti: col palmo verso chi legge e
     col dorso. Sono due disegni diversi — e' proprio la' che si nascondevano
     le M e le N che avevano il palmo dalla parte sbagliata. */
  /* Una configurazione da sola non ha un riquadro: nel gioco ce l'ha il segno
     o la lettera che la usa. Qui gliene diamo uno generoso e sempre lo stesso,
     cosi' il «disegno» misurato dice davvero quanto spazio occupa quella mano
     e non quanto gliene ha lasciato chi la incornicia. */
  const RIQUADRO = '-40 -46 84 90';
  const sola = svg => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+RIQUADRO+'">'+svg+'</svg>';
  window.LISQ.configurazioni().forEach(k => {
    prova('mani', k+' (palmo)', ()=> sola(window.LISQ.mano(k, 'su', 'avanti')));
    prova('mani', k+' (dorso)', ()=> sola(window.LISQ.mano(k, 'su', 'indietro')));
  });

  banco.remove();
  return {fuori: fuori, errori: errori};
})()
