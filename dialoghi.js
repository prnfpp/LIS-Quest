/* ==========================================================================
   I DIALOGHI DELL'AVVENTURA

   Tutte le parole del gioco stanno qui dentro. Per cambiare la storia si
   modifica questo file: non serve toccare index.html, e non serve saper
   programmare.

   COME SI MODIFICA
   1. Apri questo file con un editor di testo qualunque (Blocco note, TextEdit,
      VS Code: va bene tutto).
   2. Cambia solo il testo fra apici singoli: 'cosi''.
   3. Salva, e ricarica la pagina del gioco nel browser.

   LE TRE REGOLE DA NON SBAGLIARE
   · Un apostrofo dentro una battuta va scritto \' — con la barra rovesciata
     davanti. Scrivere «non c'è» senza barra rompe il gioco; «non c\'è» no.
     In alternativa usa l'apostrofo tipografico ’ , che non ha bisogno di nulla.
   · La virgola alla fine di ogni riga serve. L'ultima di un elenco non la vuole.
   · Le parentesi graffe { } e quadre [ ] vanno sempre chiuse.

   Se dopo una modifica il gioco non parte, la pagina te lo dice e spiega dove
   guardare: quasi sempre è uno dei tre punti qui sopra.

   I TIPI DI BATTUTA
   Ogni voce dentro «battute» ha un «tipo», che decide cosa succede a schermo:

     racconto  la voce dell'isola, in corsivo. Vuole: testo
     segno     Nima fa un segno mentre parla.   Vuole: segno, testo — e chi, se
                                                a parlare non è lei
     azione    tocca al giocatore fare un segno. Vuole: etichetta, segno, testo,
                                                e se vuoi xp e impara
     compita   Nima compita una parola lettera per lettera. Vuole: parola, testo
     guscio    consegna il dizionario al giocatore. Vuole: testo
     prova     parte un mini-gioco. Vuole: prova, testo — e quello che serve al
                                                mini-gioco (vedi sotto)
     premio    ricompensa dopo una prova. Vuole: testo, e se vuoi xp e impara

   I TRE MINI-GIOCHI, dentro una battuta di tipo «prova»:
     prova:'compita'  parola: la parola da compitare. Scrivi @nome per usare il
                      nome del giocatore. senzaTempo:true toglie il cronometro.
     prova:'indovina' soluzione: la cosa giusta. scelte: l'elenco fra cui cercarla.
     prova:'frase'    non vuole altro: la frase è definita nel codice.

   «segno» e «impara» si riferiscono ai segni del lessico: i nomi disponibili
   sono quelli elencati in «parole», in fondo a questo file.

   «xp» sono i punti esperienza. Toglili o cambiali liberamente.
   ========================================================================== */

window.DIALOGHI = {

  /* ======================= LE SCENE ======================= */
  scene: [

    {
      titolo: 'Scena 1 · Il primo sguardo',
      momento: 'notte',            /* 'notte' o 'giorno': cambia i colori dell'isola */
      battute: [

        {tipo:'racconto', testo:'Ti svegli con la sabbia in bocca. Non ricordi come sei arrivato qui, e la barca non c\'è più.'},

        {tipo:'racconto', testo:'Tra le foglie, qualcosa di piccolo si muove. E ti sta guardando.'},

        {tipo:'segno', segno:'ciao', testo:'Nima ti saluta. Non dice niente: lo fa con la mano.'},

        {tipo:'racconto', testo:'Apri la bocca per rispondere. Lei ti guarda le mani, non la faccia. Qui le parole non servono a nulla.'},

        {tipo:'azione', etichetta:'Salutala anche tu', segno:'ciao',
         testo:'Provi a copiarla. Viene male, ma lei ride.',
         xp:20, impara:['ciao']},

        {tipo:'segno', segno:'io', testo:'Si indica. Questo vuol dire: io.'},

        {tipo:'segno', segno:'nome', testo:'Poi porta due dita alla fronte. Nome.'},

        {tipo:'compita', parola:'NIMA',
         testo:'E compita il suo nome, lettera per lettera, con la mano. N, I, M, A. Nima.'},

        {tipo:'racconto', testo:'Ti accorgi che non stai stando dietro. Lei se ne accorge prima di te: si toglie una conchiglia dalla cintura e te la mette in mano.'},

        {tipo:'guscio', testo:'Dentro la conchiglia ci sono tutte le lettere, ferme, che puoi guardare quanto vuoi. Da adesso è nella barra in alto: aprila quando ti serve, anche durante una prova.'},

        {tipo:'segno', segno:'tu', testo:'Adesso indica te.', chi:'Nima'},

        {tipo:'segno', segno:'nome', testo:'E rifà il segno di prima. Vuole sapere come ti chiami.'},

        {tipo:'racconto', testo:'Dietro di lei, mezza sepolta nella sabbia, c\'è una capanna. Sulla porta un sigillo di conchiglie, chiuso.'},

        {tipo:'prova', prova:'compita', parola:'@nome', senzaTempo:true,
         testo:'Il sigillo si apre solo con il tuo nome. Nessuna fretta: qui il tempo non corre.'},

        {tipo:'premio', xp:60, impara:['ciao','io','tu','nome'],
         testo:'Il sigillo si illumina e la porta cede. Dentro c\'è una branda, una lanterna, e la prima notte tranquilla da quando sei qui.'}

      ]
    },

    {
      titolo: 'Scena 2 · Fame',
      momento: 'giorno',
      battute: [

        {tipo:'racconto', testo:'Mattina. La luce entra dalle fessure della capanna e Nima è seduta sul tuo petto, che ti fissa.'},

        {tipo:'segno', segno:'fame', testo:'Si passa la mano sulla pancia, con la faccia di chi non scherza.'},

        {tipo:'segno', segno:'mangiare', testo:'Poi porta le dita alla bocca, due volte.'},

        {tipo:'racconto', testo:'Fuori, la marea della notte ha lasciato delle cose sulla spiaggia.'},

        {tipo:'segno', segno:'mela', testo:'Nima ti mostra una cosa sola, e aspetta che tu capisca quale.'},

        {tipo:'prova', prova:'indovina', soluzione:'mela',
         scelte:['mela','conchiglia','granchio','pesce','legno'],
         testo:'Guarda il segno e tocca la cosa giusta sulla spiaggia.'},

        {tipo:'premio', xp:40, impara:['fame','mangiare','mela'],
         testo:'Le porti la mela. Sparisce in quattro morsi: non sembrava così piccola, prima.'},

        {tipo:'segno', segno:'si', testo:'Fa segno di sì con tutta la testa.'},

        {tipo:'racconto', testo:'Poi ti guarda. Tocca a te: adesso è lei a chiederti cosa vuoi mangiare.'},

        {tipo:'segno', segno:'pesce', testo:'Indica il mare, e fa il segno di quello che ci nuota dentro.'},

        {tipo:'prova', prova:'frase',
         testo:'Dille che vuoi mangiare il pesce. Componi la frase con i suoi segni, nell\'ordine che ha senso in LIS.'},

        {tipo:'premio', xp:70, impara:['pesce','si','io'],
         testo:'Nima capisce, alza gli occhi al cielo come per dire "e va bene", e vola verso gli scogli. Torna con un pesce più grande di lei.'},

        {tipo:'racconto', testo:'Mangiate insieme, seduti sulla sabbia. Da qualche parte oltre gli scogli, una campana suona due volte.'}

      ]
    }

  ],

  /* ======================= LE PROVE =======================
     Quello che Nima dice dentro i mini-giochi: istruzioni, incoraggiamenti,
     correzioni. È la sua voce quanto le battute della storia. */
  prove: {

    compita: {
      titolo:      'Il sigillo delle conchiglie',
      guarda:      'Guarda con calma: il tuo nome, lettera per lettera.',
      tocca:       'Adesso tocca a te: le stesse forme, nello stesso ordine.',
      toccaCalmo:  'Adesso tocca a te: le stesse forme, nello stesso ordine. Prenditi il tempo che vuoi.',
      centroRuota: 'tocca la forma<br>della mano<br>o trascinala',
      sbagliata:   'Non è quella. Guarda dove stanno le dita.',
      perdonata:   'Dita Rapide: il sigillo ti perdona questa. Ne resta',
      vinto:       'Il sigillo si apre.',
      tempoFinito: 'Tempo finito — non hai perso niente. Si ricomincia più piano.',
      riguarda:    'Riguarda con calma. Il tempo qui non ti fa perdere niente.',
      bottoneRivedi: '🔁 Rivedi le lettere',
      bottoneAvanti: 'Entra ▸'
    },

    indovina: {
      titolo:     'Cosa vuole Nima?',
      istruzioni: 'Il segno è lì sopra, in loop. Tocca la cosa giusta — o trascinagliela sopra — prima che la luce si spenga.',
      giusto:     'Sì. È quella.',
      sbagliato:  'No. Riguarda il segno.',
      sbagliato2: 'Guarda dove sta la mano, non solo come è fatta: è quello che cambia.',
      arreso:     'Te la mostro io. Poi riproviamo insieme.',
      tempoFinito:'La luce si è spenta — non succede niente. Nima ripete più piano.',
      bottoneAvanti:  'Continua ▸',
      bottoneArreso:  'Ho capito ▸',
      bottoneRallenta:'🔍 Fermo immagine (Occhio di Lince)',
      rallentato:     'Rallentato'
    },

    frase: {
      titolo:     'Dillo a Nima',
      istruzioni: 'Tocca un segno, poi tocca la casella dove va — oppure trascinalo con il dito. Nessun tempo: pensaci.',
      perfetto:   'Nima capisce subito. È l\'ordine che userebbe lei.',
      accettabile:'Va bene: si capisce. Nima però lo direbbe mettendo il pesce prima del verbo.',
      sbagliato:  'Nima inclina la testa: così non le arriva. Prova a spostare qualcosa.',
      bottoneAvanti: 'Guarda cosa fa ▸',
      bottoneAiuto:  'Chiedi a Nima (Voce di Mano)',
      aiuto:         'Nima ti indica: chi fa l\'azione va per primo.'
    },

    comune: {
      bottoneGuscio: '🐚 Apri il Guscio'
    }

  },

  /* ======================= LE VOCI =======================
     L'etichetta sopra ogni battuta: dice chi sta parlando. E le due parole
     scritte sui pulsanti che fanno andare avanti la storia. */
  voci: {
    isola:   'L\'isola',        /* per le battute di tipo «racconto» */
    nima:    'Nima',            /* per «segno» e «compita», se non scrivi «chi» */
    tu:      'Tu',              /* per «azione»: sta parlando il giocatore */
    guscio:  'Il Guscio',       /* per «guscio» */
    prova:   'Prova',           /* per «prova» */
    premio:  '…',               /* per «premio» */
    avanti:  'Continua ▸',
    apri:    'Aprila ▸',
    tocca:   'tocca per continuare'
  },

  /* ======================= LE CLASSI =======================
     Che tipo di viaggiatore si può essere. «id» è il nome interno: non
     cambiarlo, il codice lo usa per sapere quale aiuto dare. */
  classi: [
    {id:'lince', titolo:'Occhio di Lince', ruolo:'Osservatrice / Osservatore',
     testo:'Vedi i dettagli che sfuggono. Più tempo negli enigmi visivi, e una volta per sfida puoi rivedere il segno al rallentatore.'},

    {id:'canta', titolo:'Voce di Mano', ruolo:'Cantastorie',
     testo:'Metti le parole al loro posto. Nelle frasi puoi chiedere a Nima quale blocco va per primo — solo quello.'},

    {id:'dita', titolo:'Dita Rapide', ruolo:'Scassinatrice / Scassinatore',
     testo:'Le mani vanno più veloci della testa. Più tempo per lettera, e ogni lucchetto ti perdona un errore.'},

    {id:'passo', titolo:'Passo Curioso', ruolo:'Esploratrice / Esploratore',
     testo:'Nessun aiuto nei mini-giochi: in cambio vedi le cose nascoste nelle scene, e ogni scoperta vale segni e XP in più.'}
  ],

  /* ======================= LE PAROLE =======================
     Le voci del Guscio, il dizionario interno. Per ogni segno: come si cerca
     su Spread the Sign, e cosa il gioco ne racconta.
     Il nome a sinistra (ciao, io, tu...) è quello da usare in «segno» e in
     «impara» nelle battute qui sopra. */
  parole: {
    ciao:      {cerca:'Ciao',      testo:'Il saluto. Il primo segno che Nima ti ha fatto, prima ancora di sapere chi eri.'},
    io:        {cerca:'Io',        testo:'Se stessi. Si indica il proprio petto: in LIS lo spazio davanti al corpo dice chi fa cosa.'},
    tu:        {cerca:'Tu',        testo:'La persona con cui stai parlando. Nima lo usa ogni volta che ti fa una domanda.'},
    nome:      {cerca:'Nome',      testo:'Il nome di qualcuno. Dopo questo segno di solito arriva la compitazione lettera per lettera.'},
    fame:      {cerca:'Fame',      testo:'Avere fame. Nima lo ha fatto con una faccia che non lasciava molti dubbi.'},
    mangiare:  {cerca:'Mangiare',  testo:'L\'azione di mangiare. Nella frase può stare prima o dopo la cosa che si mangia.'},
    mela:      {cerca:'Mela',      testo:'Il frutto. La prima cosa che hai trovato sulla spiaggia e che le è piaciuta.'},
    pesce:     {cerca:'Pesce',     testo:'L\'animale, e anche quello che finisce nel piatto. Nima lo ha preso tra gli scogli.'},
    acqua:     {cerca:'Acqua',     testo:'Da bere, o quella del mare. Sull\'isola serve spesso.'},
    bere:      {cerca:'Bere',      testo:'L\'azione di bere. Va insieme ad acqua, ma non è la stessa cosa.'},
    si:        {cerca:'Sì',        testo:'Affermare. La testa conta quanto la mano: senza il movimento del capo non è un sì.'},
    no:        {cerca:'No',        testo:'Negare. Anche qui la faccia e la testa fanno metà del lavoro grammaticale.'},
    conchiglia:{cerca:'Conchiglia',testo:'Quello che si trova sulla battigia. L\'hai notata solo perché guardi bene.'}
  }

};
