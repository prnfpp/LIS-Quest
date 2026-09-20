/* ==========================================================================
   I DIALOGHI DELL'AVVENTURA

   Tutte le parole del gioco stanno qui dentro. Per cambiare la storia si
   modifica questo file: non serve toccare index.html, e non serve saper
   programmare.

   COME SI MODIFICA
   1. Apri questo file con un editor di testo qualunque (Blocco note, TextEdit,
      VS Code: va bene tutto).
   2. Cambia solo il testo fra apici singoli: 'cosi'.
   3. Salva, e ricarica la pagina del gioco nel browser.

   LE TRE REGOLE DA NON SBAGLIARE
   · Un apostrofo dentro una battuta va scritto \' — con la barra rovesciata
     davanti. Scrivere «non c'è» senza barra rompe il gioco; «non c\'è» no.
     In alternativa usa l'apostrofo tipografico ’ , che non ha bisogno di nulla.
     (In questo file si usa sempre ’ : è più sicuro.)
   · La virgola alla fine di ogni riga serve. L'ultima di un elenco non la vuole.
   · Le parentesi graffe { } e quadre [ ] vanno sempre chiuse.

   Se dopo una modifica il gioco non parte, la pagina te lo dice e spiega dove
   guardare: quasi sempre è uno dei tre punti qui sopra.

   I TIPI DI BATTUTA
   Ogni voce dentro «battute» ha un «tipo», che decide cosa succede a schermo:

   racconto   la voce dell'isola, in corsivo. Vuole: testo
   segno      Nima fa un segno mentre parla. Vuole: segno, testo — e chi, se
              a parlare non è lei
   azione     tocca al giocatore fare un segno. Vuole: etichetta, segno, testo,
              e se vuoi xp e impara
   compita    Nima compita una parola lettera per lettera. Vuole: parola, testo
   guscio     consegna il dizionario al giocatore. Vuole: testo
   prova      parte un mini-gioco. Vuole: prova, testo — e quello che serve al
              mini-gioco (vedi sotto)
   premio     ricompensa dopo una prova. Vuole: testo, e se vuoi xp e impara

   I TRE MINI-GIOCHI, dentro una battuta di tipo «prova»:
   prova:'compita'   parola: la parola da compitare. Scrivi @nome per usare il
                     nome del giocatore. senzaTempo:true toglie il cronometro.
   prova:'indovina'  soluzione: la cosa giusta. scelte: l'elenco fra cui cercarla.
   prova:'frase'     non vuole altro: la frase è definita nel codice.

   «segno» e «impara» si riferiscono ai segni del lessico: i nomi disponibili
   sono quelli elencati in «parole», in fondo a questo file.
   «xp» sono i punti esperienza. Toglili o cambiali liberamente.
   ========================================================================== */

window.DIALOGHI = {

  /* ======================= LE SCENE ======================= */
  scene: [

    {
      titolo: 'Scena 1 · La spiaggia fatta di parole',
      momento: 'notte', /* 'notte' o 'giorno': cambia i colori dell'isola */
      battute: [

        {tipo:'racconto', testo:'Ti svegli con la bocca piena di sabbia e la testa vuota. Della barca non resta un’asse. Del mare, solo il sapore.'},

        {tipo:'racconto', testo:'La spiaggia è bianca e non finisce mai. Di cosa sia fatta davvero, lo scoprirai fra poco.'},

        {tipo:'racconto', testo:'Tra le foglie qualcosa di piccolo si sposta. Ha due ali sottili come foglie, e non fanno rumore. Ti guarda da un pezzo.'},

        {tipo:'segno', segno:'ciao', testo:'Esce allo scoperto e alza una mano. Non dice niente: il saluto lo fa la mano.'},

        {tipo:'racconto', testo:'Apri la bocca. Provi a dire ciao.'},

        {tipo:'racconto', testo:'La parola ti esce, resta un attimo per aria, poi cade sulla spiaggia e si sbriciola con un rumore sottile, come zucchero. Ecco di cosa è fatta la sabbia, qui: di tutte le parole che i naufraghi prima di te hanno buttato via.'},

        {tipo:'segno', segno:'no', testo:'Alza l’indice, il palmo in avanti, e lo fa andare da una parte all’altra. Non è arrabbiata. Ti sta solo dicendo che da quella parte non si passa.'},

        {tipo:'racconto', testo:'Poi ti prende i polsi e te li solleva fino all’altezza del petto. Ti guarda le mani, non la faccia. Su quest’isola si parla da questa parte.'},

        {tipo:'azione', etichetta:'Salutala anche tu', segno:'ciao',
         testo:'Copi la sua mano. Ti viene storto. Lei ride senza fare rumore: le tremano le ali, e si capisce lo stesso.',
         xp:20, impara:['ciao']},

        {tipo:'segno', segno:'io', testo:'Si indica il petto. Questo vuol dire: io.'},

        {tipo:'segno', segno:'nome', testo:'Poi porta la mano sotto il mento — pugno chiuso, indice e medio stesi e attaccati, il palmo rivolto al petto — e la fa scorrere in fuori. Nome.'},

        {tipo:'compita', parola:'NIMA',
         testo:'E scrive il suo nome nell’aria, una lettera alla volta. N, I, M, A. Nima.'},

        {tipo:'racconto', testo:'Lo rifà. Più lento. Poi ancora più lento. Tu ti perdi sempre a metà, e lei se ne accorge prima di te.'},

        {tipo:'segno', segno:'conchiglia', testo:'Si stacca dalla cintura una conchiglia grande come il tuo palmo.'},

        {tipo:'guscio', testo:'Dentro ci sono tutte le lettere, ferme, che aspettano. Le mani di Nima corrono; queste no. Da adesso il Guscio è nella barra in alto: aprilo quando ti serve, anche in mezzo a una prova.'},

        {tipo:'segno', segno:'tu', testo:'Adesso indica te.', chi:'Nima'},

        {tipo:'segno', segno:'nome', testo:'E rifà il segno di prima: indice e medio sotto il mento, che scorrono in fuori. Vuole sapere chi sei.'},

        {tipo:'racconto', testo:'Dietro di lei, mezza sepolta, c’è una capanna. Sulla porta un sigillo di conchiglie, chiuso da chissà quanto tempo.'},

        {tipo:'racconto', testo:'Nima ci appoggia sopra una mano e fa una faccia che spiega tutto: questa porta non si apre con la forza. Si apre con un nome.'},

        {tipo:'prova', prova:'compita', parola:'@nome', senzaTempo:true,
         testo:'Il sigillo aspetta il tuo nome, lettera per lettera. Qui il tempo non corre: prenditelo tutto.'},

        {tipo:'premio', xp:60, impara:['ciao','io','tu','nome','conchiglia'],
         testo:'Le conchiglie si accendono una dopo l’altra e la porta cede con un sospiro. Dentro c’è una branda, una lanterna e il primo silenzio che non ti fa paura da quando sei qui.'},

        {tipo:'racconto', testo:'Nima si siede sul davanzale, le ali chiuse, e resta lì. Fuori la spiaggia luccica ancora, piena di parole che qualcun altro ha sprecato.'}
      ]
    },

    {
      titolo: 'Scena 2 · Quello che porta la marea',
      momento: 'giorno',
      battute: [

        {tipo:'racconto', testo:'Mattina. La luce entra a strisce dalle fessure della capanna. Nima è seduta sul tuo petto e ti fissa da un tempo imprecisato.'},

        {tipo:'segno', segno:'fame', testo:'Si batte il fianco con la mano stesa, il palmo verso terra e il pollice appoggiato sul palmo. La faccia che fa non lascia molti dubbi.'},

        {tipo:'segno', segno:'mangiare', testo:'Poi unisce tutte le dita a becco e le porta alla bocca, con le punte in avanti. Due volte. Non è una domanda.'},

        {tipo:'racconto', testo:'Fuori, la marea della notte ha lasciato le sue cose sulla battigia, allineate come su una bancarella.'},

        {tipo:'segno', segno:'mela', testo:'Nima ti mostra un segno solo, e aspetta. Vuole vedere se hai imparato a guardare.'},

        {tipo:'prova', prova:'indovina', soluzione:'mela',
         scelte:['mela','conchiglia','granchio','pesce','legno'],
         testo:'Guarda il segno e tocca la cosa giusta sulla battigia.'},

        {tipo:'premio', xp:40, impara:['fame','mangiare','mela'],
         testo:'Gliela porti. Sparisce in quattro morsi. Non sembrava così piccola, prima.'},

        {tipo:'segno', segno:'si', testo:'Fa sì con tutta la testa, e le briciole le cadono dalle ginocchia.'},

        {tipo:'racconto', testo:'Poi si pulisce le mani sulle ali e te le apre davanti, vuote. Adesso tocca a te chiedere.'},

        {tipo:'segno', segno:'pesce', testo:'Indica il mare, poi tiene indice e medio stesi e attaccati, la mano di taglio, e li fa ondeggiare come qualcosa che ci nuota dentro. Un suggerimento nemmeno troppo nascosto.'},

        {tipo:'prova', prova:'frase',
         testo:'Dille che vuoi mangiare il pesce. Metti i suoi segni nell’ordine che ha senso in LIS.'},

        {tipo:'premio', xp:70, impara:['pesce','si','io'],
         testo:'Nima capisce al primo colpo. Alza gli occhi al cielo come per dire «e va bene», e parte verso gli scogli. Torna con un pesce più lungo di lei, tenuto per la coda con tutte e due le mani.'},

        {tipo:'racconto', testo:'Mangiate seduti sulla sabbia, con le dita, senza dirvi niente. Dopo il pesce ti viene una sete che non ti ricordavi di poter avere.'},

        {tipo:'segno', segno:'acqua', testo:'Nima indica un punto fra le palme, dove qualcosa luccica, e ti fa un segno nuovo: mano aperta, dita separate, il pollice appoggiato alla guancia e la mano che va in avanti. Acqua.'},

        {tipo:'segno', segno:'bere', testo:'Poi un altro, diverso: pugno chiuso, pollice steso, e la mano che sale alla bocca — è il pollice ad arrivarci per primo. Bere. Non sono la stessa cosa, e lei ci tiene parecchio che tu lo veda.'},

        {tipo:'azione', etichetta:'Chiedile da bere', segno:'bere',
         testo:'Fai il segno. Lei annuisce come una maestra soddisfatta e ti porta a una pozza d’acqua dolce nascosta sotto una roccia.',
         xp:30, impara:['acqua','bere']},

        {tipo:'racconto', testo:'Bevi finché non ti fa male la fronte. Nima intanto guarda il mare, ferma, con le ali chiuse.'},

        {tipo:'racconto', testo:'Poi, da qualche parte oltre gli scogli, una campana suona. Due rintocchi. Come le due sillabe di un nome che non conosci ancora.'},

        {tipo:'segno', segno:'nonAdesso', testo:'Le chiedi con gli occhi che cosa sia. Lei apre le mani, i palmi verso il basso, e le abbassa davanti al petto; poi fa no con l’indice. Non vuol dire «non lo so»: vuol dire «non adesso».'},

        {tipo:'racconto', testo:'Si infila una conchiglia nella cintura, guarda l’orizzonte, e per la prima volta da quando ti ha trovato non ride.'}
      ]
    }
  ],

  /* ======================= LE PROVE =======================
     Quello che Nima dice dentro i mini-giochi: istruzioni, incoraggiamenti,
     correzioni. È la sua voce quanto le battute della storia. */
  prove: {

    compita: {
      titolo:       'Il sigillo delle conchiglie',
      guarda:       'Guarda con calma. Il tuo nome, una lettera alla volta.',
      tocca:        'Adesso tu. Le stesse forme, nello stesso ordine.',
      toccaCalmo:   'Adesso tu. Le stesse forme, nello stesso ordine — e tutto il tempo che vuoi.',
      centroRuota:  'tocca la forma<br>della mano<br>o trascinala',
      sbagliata:    'Non è quella. Guarda dove stanno le dita.',
      perdonata:    'Dita Rapide: il sigillo chiude un occhio. Ne resta',
      vinto:        'Le conchiglie si accendono. La porta è tua.',
      tempoFinito:  'Tempo finito, e non hai perso niente. Si ricomincia più piano.',
      riguarda:     'Riguarda con calma. Qui il tempo non toglie niente a nessuno.',
      bottoneRivedi:'🔁 Rivedi le lettere',
      bottoneAvanti:'Entra ▸'
    },

    indovina: {
      titolo:        'Cosa vuole Nima?',
      istruzioni:    'Il segno è lì sopra e si ripete. Tocca la cosa giusta — o trascinagliela sopra — prima che la luce si spenga.',
      giusto:        'Sì. È quella.',
      sbagliato:     'No. Riguarda il segno.',
      sbagliato2:    'Guarda dove sta la mano, non solo com’è fatta: è quello che cambia tutto.',
      arreso:        'Te la mostro io. Poi la rifacciamo insieme.',
      tempoFinito:   'La luce si è spenta, e non è successo niente. Nima ripete più piano.',
      bottoneAvanti: 'Continua ▸',
      bottoneArreso: 'Ho capito ▸',
      bottoneRallenta:'🔍 Fermo immagine (Occhio di Lince)',
      rallentato:    'Rallentato'
    },

    frase: {
      titolo:       'Dillo a Nima',
      istruzioni:   'Tocca un segno, poi la casella dove va — oppure trascinalo con il dito. Nessun tempo: pensaci.',
      perfetto:     'Nima capisce subito. È l’ordine che userebbe lei.',
      accettabile:  'Si capisce, e va bene così. Lei però metterebbe il pesce prima del verbo.',
      sbagliato:    'Nima inclina la testa: così non le arriva. Prova a spostare qualcosa.',
      bottoneAvanti:'Guarda cosa fa ▸',
      bottoneAiuto: 'Chiedi a Nima (Voce di Mano)',
      aiuto:        'Nima ti indica, poi indica la prima casella: chi fa l’azione va per primo.'
    },

    comune: {
      bottoneGuscio: '🐚 Apri il Guscio'
    }
  },

  /* ======================= LE VOCI =======================
     L'etichetta sopra ogni battuta: dice chi sta parlando. E le due parole
     scritte sui pulsanti che fanno andare avanti la storia. */
  voci: {
    isola:  'L’isola',      /* per le battute di tipo «racconto» */
    nima:   'Nima',         /* per «segno» e «compita», se non scrivi «chi» */
    tu:     'Tu',           /* per «azione»: sta parlando il giocatore */
    guscio: 'Il Guscio',    /* per «guscio» */
    prova:  'Prova',        /* per «prova» */
    premio: '…',            /* per «premio» */
    avanti: 'Continua ▸',
    apri:   'Aprila ▸',
    tocca:  'tocca per continuare'
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
    ciao:      {cerca:'Ciao',       testo:'Il saluto. Il primo segno che hai visto, prima ancora di capire dove eri finito.'},
    io:        {cerca:'Io',         testo:'Se stessi. Si indica il petto: in LIS lo spazio davanti al corpo dice chi fa cosa.'},
    tu:        {cerca:'Tu',         testo:'La persona che hai davanti. Nima lo usa ogni volta che ti fa una domanda, e te ne fa molte.'},
    nome:      {cerca:'Nome',       testo:'Il nome di qualcuno. Mano sotto il mento, palmo verso il petto, pugno chiuso tranne indice e medio stesi e attaccati; poi la mano scorre verso il fuori. Chi segna con la destra la porta da sinistra a destra, chi segna con la sinistra fa il contrario. Dopo questo segno quasi sempre arrivano le lettere, una per una.'},
    fame:      {cerca:'Fame',       testo:'Avere fame. Mano stesa con il pollice appoggiato sul palmo, palmo verso terra, che colpisce il fianco. Nima te lo ha fatto all’alba, seduta sul tuo petto, senza chiedere permesso.'},
    mangiare:  {cerca:'Mangiare',   testo:'L’azione di mangiare. Tutte le dita unite a becco, le punte verso la bocca, e la mano che si avvicina. Nella frase può stare prima o dopo la cosa che si mangia.'},
    mela:      {cerca:'Mela',       testo:'Il frutto. Mano a tazza davanti alla bocca, palmo verso la faccia, che sale lungo la bocca due volte. La prima cosa che la marea ti ha lasciato, e la prima che le è piaciuta.'},
    pesce:     {cerca:'Pesce',      testo:'L’animale. Mano di taglio, palmo verso il lato, indice e medio stesi e attaccati che ondeggiano come un pesce nell’acqua. Lei lo prende fra gli scogli.'},
    acqua:     {cerca:'Acqua',      testo:'Quella dolce e quella salata. Mano aperta con le dita separate, palmo in avanti, il pollice che tocca la guancia e poi va avanti. Sull’isola la differenza fra le due conta parecchio.'},
    bere:      {cerca:'Bere',       testo:'L’azione di bere. Pugno chiuso e pollice steso, mano che sale alla bocca: è il pollice il primo a toccarla. Cammina insieme ad acqua, ma non è la stessa cosa — guarda bene le mani.'},
    si:        {cerca:'Sì',         testo:'Affermare. La testa conta quanto la mano: senza il movimento del capo non è un sì.'},
    no:        {cerca:'No',         testo:'Negare. Indice teso e mano chiusa, palmo in avanti, che va da una parte all’altra e torna. Anche qui faccia e testa fanno metà del lavoro.'},
    nonAdesso: {cerca:'Non adesso', testo:'«Non ora, più tardi.» Due segni di fila: prima le mani aperte con il palmo in basso che scendono davanti al petto, poi il segno NO. Nima lo usa quando la campana suona oltre gli scogli, e non ha voglia di spiegare.'},
    conchiglia:{cerca:'Conchiglia', testo:'Quello che si trova sulla battigia. Una te l’ha messa in mano lei, ed è diventata il tuo dizionario.'}
  }
};
