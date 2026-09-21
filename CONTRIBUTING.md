# Contribuire a LIS Quest

Grazie. Prima di tutto: **il contributo più prezioso non è codice.** È qualcuno che guarda il
lessico e dice "questo segno è sbagliato", o un bambino che si annoia alla terza schermata e ce lo
fa sapere.

## Le tre regole che non si toccano

1. **Nessun segno entra nel gioco senza validazione da parte di una persona sorda segnante.**
   Nemmeno "provvisoriamente", nemmeno "tanto poi lo cambiamo".
2. **Niente audio necessario.** Nessuna informazione indispensabile per giocare può passare dal
   suono. Il gioco funziona a volume zero, sempre.
3. **Nessun fallimento punitivo.** Il tempo che scade fa perdere un bonus, mai un progresso. Niente
   vite, niente game over, niente serie che puniscono chi salta un giorno.

## Aggiungere un segno

Tutto il lessico sta nell'oggetto `SIGNS` dentro `index.html`. Un segno è descritto dai parametri
formazionali:

```js
mela: {
  g:  'MELA',       // glossa, in maiuscolo
  h:  'coppa',      // configurazione della mano (chiave di HAND)
  or: 'dorso',      // orientamento del palmo: 'dorso' | 'palmo' | 'taglio'
  l:  'bocca',      // luogo sul corpo (chiave di LOC)
  m:  'suDue',      // movimento (una delle animazioni .mv-*)
  r:  -6,           // rotazione della mano nel piano, in gradi
  nm: 'neutro'      // componente non manuale: la faccia
}
```

Tre parametri in più, che servono a segni che senza non si possono scrivere:

| Parametro | A cosa serve |
|---|---|
| `or` | che faccia della mano vediamo. `dorso` = il palmo guarda Nima; `palmo` = guarda avanti, verso chi legge; `taglio` = guarda di lato o verso terra, e la mano si vede di costa; `trequarti` = a metà fra le due, quando di costa pura due dita finirebbero una dietro l'altra |
| `scorcio` | la mano vista di punta, fra 0 e 1: accorcia le dita lungo il loro asse. Senza, «palmo verso il basso, dita in avanti» diventerebbe una mano che punta in giù, che è un altro segno |
| `due` | la seconda mano: `{h, or, l, r, m}`. Il disegno viene specchiato, perché una mano sinistra non è una destra girata di lato |
| `fasi` | un segno composto da più momenti, ciascuno con i suoi parametri: si disegnano tutti e si alternano. NON ADESSO è così — le mani che scendono, poi il segno NO |

### I personaggi

Nima non resterà sola: i capitoli che vengono portano altri personaggi, e tutti
devono segnare con le stesse mani, leggibili nello stesso modo. Quello che cambia
da un personaggio all'altro è la **tavolozza**, e sta in `PERSONAGGI`; il modo di
disegnare una mano non cambia mai.

I colori pieni passano da variabili CSS (`--pelle`, `--bordo-pelle`, `--capelli`
…), quindi le funzioni di disegno non sanno chi stanno disegnando. Le sfumature,
che le variabili CSS non possono attraversare, sono generate una per personaggio.
Si sceglie con `renderSign(segno, {chi:'nima'})`, o con `chi:` sul segno.

**Cosa manca ancora:** la *geometria* di testa, capelli, orecchie e abito è
ancora quella di Nima. Un secondo personaggio, oggi, sarebbe Nima con un altro
colore di pelle. Serve chi la disegna — e quando ci sarà, il posto dove metterla
è `PERSONAGGI`, non una copia di `faceSVG`.

### Da che parte segna Nima

Nima è destra ed è vista **di fronte**: la sua mano destra sta perciò a **sinistra** di chi guarda.
Nel disegno la testa è centrata in `x=107`, quindi le x che crescono vanno verso la *sinistra* di
Nima e le x che calano verso la sua *destra*. «Verso il fuori», per la sua mano destra, vuol dire
verso le x che calano — ed è così che è scritta l'animazione `.mv-scorriFuori`. Chi impara si trova
davanti a una persona che segna e la rispecchia: è quello che succede anche in aula.

E la voce corrispondente nel dizionario, che però sta in **`dialoghi.js`**, dentro `parole`:

```js
mela: {cerca:'Mela', testo:'Il frutto. La prima cosa che la marea ti ha lasciato.'}
```

`cerca` è la parola con cui il gioco cerca il segno su Spread the Sign; `testo` è quello che il
giocatore legge nel Guscio.

I valori disponibili per `l` (il luogo) e per `m` (il movimento) sono le chiavi di `LOC` e le classi
`.mv-*` in cima allo stesso file: si aggiungono lì, con un nome che dica dove sta la mano o cosa fa,
non come si chiama l'animazione. Per esempio `sottoMento` + `scorriFuori` sono il luogo e il
movimento di NOME: due dita appoggiate sotto il mento che scorrono verso l'esterno.

### Come sono disegnate le mani

Un segno non è un'illustrazione fissa: è composto a partire dai parametri, con gli stessi mattoni
usati per l'alfabeto manuale — un tratto di bordo sotto e uno di pelle sopra, così due dita
accostate restano due anche a 40 px.

| Funzione | Cosa fa |
|---|---|
| `dito(percorso, spessore)` | un dito, in quattro passate: bordo, pelle, ombra da un lato, luce dall'altro |
| `piegaDito` / `unghiaDito` | il solco della falange e l'unghia: dicono quante dita ci sono e da che parte guardano |
| `ditoSegno(i, stato, apertura, k, vista)` | un dito: `0` chiuso sul palmo, `1` teso, `2` ricurvo, `3` (solo pollice) di traverso |
| `palmoSegno(vista)` | la sagoma del palmo, sfumata, con nocche e tendini (dorso), pieghe e cuscinetto (palmo) o la costa (taglio) |
| `manoSegno(nome, vista)` | palmo, polsino, dita e pollice per una configurazione di `HAND` |
| `braccio(spalla, x, y, fuori)` | il braccio dalla spalla al **polso**, con il gomito calcolato |
| `polsoDi(x, y, r, scorcio)` | dove cade il polso, data la posa della mano |
| `tracciaMov(movimento)` | la freccia del movimento, presa da `TRACCE` |

### Il movimento è un dato, non un'animazione

Un movimento non è il nome di un'animazione scritta a mano: è la descrizione di
quello che la mano fa, e sta in `MOVIMENTI`. Da quel dato si ricavano **due**
cose che prima erano scritte separatamente — e che quindi uscivano dall'accordo
ogni volta che si cambiava un segno:

- i fotogrammi, che suona l'orologio dei segni;
- la **freccia**, generata dal percorso invece di essere piazzata a occhio.

Un movimento è un elenco di **tappe**. Ogni tappa è `[dx, dy, gradi, scala]`:
dove va la mano, di quanto gira, e quanto si avvicina a chi guarda; gradi e
scala si possono omettere. Le coordinate sono **relative al centro del palmo e
allineate allo schermo** — è il movimento visto da chi guarda, non dalla mano.

```js
/* NOME: parte al contatto sotto il mento e scorre verso il fuori, poi aspetta */
scorriFuori: {tappe:[[3,0],[-15,1,-5,1.03]], attesa:.22, durata:2200},
```

| Campo | Cosa fa |
|---|---|
| `volte` | quante volte ripete l'andata e il ritorno in un ciclo |
| `attesa` | frazione di ciclo tenuta ferma alla fine, come una pausa |
| `chiuso` | il percorso torna da sé al punto di partenza (un cerchio): non si ripercorre all'indietro |
| `durata` · `ritmo` | millisecondi di un ciclo, e l'accelerazione fra le tappe |
| `perno` | origine della rotazione, se non è il centro della mano (SÌ gira sul polso) |
| `freccia` | forza la freccia: `una`, `due`, `coppia`, `nessuna` |
| `fotogrammi` | via di fuga, per quello che non è una mano che si muove nello spazio: una scia, una fase |

**La freccia si ricava, non si disegna.** Lo spostamento vero è di pochi punti e
finirebbe sempre sotto la mano, quindi la forma del percorso viene ingrandita a
una lunghezza leggibile e scostata di fianco, dalla parte in cui la mano non
c'è — che si calcola da dove puntano le dita. Una rotazione diventa un arco
appena oltre le punte; se le dita puntano verso la testa l'arco passa dalla
parte opposta, perché sull'occhio coprirebbe l'espressione. Un movimento in
profondità non si può disegnare di fronte e si indica di sbieco.

La punta è **singola** su una traslazione: di un movimento che va e torna conta
il verso dell'andata, e due punte lo renderebbero ambiguo. È doppia solo sulle
vere alternanze — un dondolio fra due estremi in un colpo solo. Sotto la freccia
c'è un orlo scuro: dorata su un viso chiaro, sparirebbe.

### L'orologio dei segni

Tutte le mani stanno su un orologio solo, tenuto dalla **Web Animations API**
(`MOTO`) invece che da classi CSS. Serve a tre cose che prima non si potevano
fare: rallentare davvero, fermare l'immagine, e andare **avanti a passi** — che
per imparare un segno conta più del rallentatore.

```js
MOTO.velocizza(.3);   // rallentatore
MOTO.ferma();         // fermo immagine
MOTO.passo(.08);      // un passo avanti, a immagine ferma
```

`comandoMoto()` restituisce la barra di comandi già collegata: sta nel Guscio,
che è la superficie dove un segno si studia — e dove lo guarda chi lo valida.

Due regole:

- **Ogni battuta rifà il suo pezzo di pagina da zero**, quindi dopo aver scritto
  dei segni in un contenitore va chiamato `MOTO.accendi(contenitore)`. Chi non lo
  chiama ottiene un segno fermo.
- **Il contorno del gioco resta su CSS.** Onde, lucciole, ali e stelle non
  entrano nell'orologio: sono decorazione, e non devono rallentare con i segni.
  È la stessa distinzione che regge la regola su `prefers-reduced-motion`.

### Il non manuale è a canali

In LIS l'espressione non è un'emozione: è grammatica. E i suoi canali sono
indipendenti — le sopracciglia segnano la domanda, la bocca l'intensità, il capo
l'affermazione o la negazione — e si combinano fra loro.

Per questo stanno separati in `SOPRACCIGLIA`, `BOCCA`, `OCCHI` e `CAPO`. Un
volto con un nome (`VOLTI`) è una **combinazione** di canali, non un disegno a
sé: aggiungere una domanda negativa non vuol dire disegnare una settima faccia,
vuol dire mettere insieme due canali che già esistono. Un segno può anche
scriverseli sul posto:

```js
nm: {sopracciglia:'alzate', bocca:'stretta', capo:'inclinato'}
```

Il capo è l'unico canale che si muove, ed è giusto che si muova: lo scuotimento
del capo **è** la negazione e il cenno **è** l'affermazione, quindi NO e SÌ ce
l'hanno, e stanno sullo stesso orologio delle mani.

### Perché la mano ha un volume

Non ci sarà una versione con i video: questo disegno è il contenuto finale, e
deve dire da che parte guarda una mano. Lo fa con quattro indizi che si sommano,
e conviene non toglierne nessuno:

- **il tubo** — ogni dito è disegnato quattro volte sullo stesso percorso (bordo,
  pelle, ombra, luce): è quello che lo fa leggere come un volume e non una linea;
- **l'unghia** — si vede da dorso e da tre quarti, mai dal palmo: è il segnale
  più rapido di quale faccia stiamo guardando;
- **nocche e tendini** contro **pieghe e cuscinetto del pollice** — il dorso e il
  palmo hanno due superfici diverse, e si riconoscono anche in miniatura;
- **l'ombra portata** (`.hand{filter:drop-shadow(...)}`) — dice quale delle due,
  mano o viso, sta davanti. Senza, una mano sulla guancia sembra disegnata sulla
  guancia.
| `faceSVG(nm)` | il volto: sopracciglia, occhi, bocca e inclinazione del capo insieme |
| `renderSign(segno, opzioni)` | la figura intera; con `{compatto:true}` ritaglia su testa e mano |

Due cose da non rompere:

- **La mano si disegna dopo il volto.** Nei segni che stanno sulla guancia, sul mento o sulla fronte
  la mano è davanti alla faccia: invertire l'ordine la fa sparire dietro la testa.
- **Il braccio finisce al polso, non al centro del palmo.** `polsoDi()` lo calcola dalla rotazione
  della mano; saltarlo lascia la manica staccata dall'avambraccio.
- **`{compatto:true}` è quello che si usa nei mini-giochi e nel dizionario.** Lì conta vedere com'è
  fatta la mano, non quanto è graziosa la fata: il riquadro si calcola sul luogo del segno, così la
  mano è grande qualunque cosa stia facendo.

### Come è disegnata l'isola

`scenery(notte, nodo)` costruisce il fondale a strati dentro un qualunque contenitore — il palco o
la copertina. Gli strati si dividono in due famiglie, e la divisione conta:

- quelli che si possono **stirare** (bande di mare, onde, schiuma) stanno in un SVG unico con
  `preserveAspectRatio="none"`: restano giusti a qualunque larghezza;
- quelli che stirati diventerebbero ovali (luna, sole, palme, capanna) hanno **ciascuno il proprio
  riquadro**, posizionato in percentuale, e conservano le proporzioni.

Palme e capanna sono misurate sull'**altezza** del palco, non sulla larghezza: il pannello del
dialogo occupa sempre la stessa fetta in basso, e solo così la chioma resta visibile anche su un
telefono stretto. L'orizzonte sta al 25% e la battigia comincia al 42%: se sposti l'uno devi spostare
anche le fermate della sfumatura di `.stage`, altrimenti il mare finisce sulla sabbia.

### Quando arrivano i video veri

Il disegno parametrico è un ripiego. Appena esiste la clip, al segno si aggiunge un campo:

```js
mela: { g:'MELA', video:'segni/mela.webm', poster:'segni/mela.jpg', /* ...i parametri restano come riserva... */ }
```

e `renderSign()` mostra il video invece del disegno. I parametri non si cancellano: servono ancora
per generare i **distrattori** dei mini-giochi (vedi sotto).

## Cambiare i dialoghi

Tutte le parole del gioco stanno in **`dialoghi.js`**, non in `index.html`. Ci si lavora con un
editor di testo, senza sapere programmare: il file spiega in testa come è fatto. Se ci finisce un
errore di battitura, il gioco mostra un messaggio che dice dove guardare invece di restare muto.

È un `.js` e non un `.json` per una ragione precisa: un `.json` va letto con `fetch()`, che i browser
bloccano quando la pagina è aperta con un doppio clic da `file://`. Il gioco deve restare apribile
senza server. Il contenuto resta dati e basta — nessuna logica, nessuna funzione: se ti viene voglia
di metterci un `if`, va nel motore.

## Aggiungere una scena

Una scena è una voce dentro `scene` in `dialoghi.js`: un `titolo` per la barra in alto, un `momento`
(`notte` o `giorno`) e un elenco di `battute`. I tipi di battuta:

| Tipo | Cosa fa | Vuole |
|---|---|---|
| `racconto` | narrazione in corsivo, avanza al tocco | `testo` |
| `segno` | Nima esegue un segno, che entra nel Guscio | `segno`, `testo`, e `chi` se non parla lei |
| `azione` | un'azione del giocatore, con un pulsante | `etichetta`, `segno`, `testo`, `xp`, `impara` |
| `compita` | Nima compita una parola lettera per lettera | `parola`, `testo` |
| `guscio` | consegna o apertura del dizionario | `testo` |
| `prova` | un mini-gioco: `compita`, `indovina`, `frase` | `prova`, `testo`, più i suoi parametri |
| `premio` | chiusura di un beat, XP e segni acquisiti | `testo`, `xp`, `impara` |

In `parola` si può scrivere `@nome` per usare il nome del giocatore.

I nomi italiani delle battute vengono tradotti nei tipi interni dal motore, in `battuta()` dentro
`index.html`: è l'unico punto da toccare se serve un tipo nuovo.

## Progettare un mini-gioco che non si può barare

Il rischio numero uno di un gioco così è che il bambino impari a vincere **senza capire il segno**:
memorizza la posizione dell'oggetto giusto, o l'ordine dei blocchi. Contromisure obbligatorie:

- **Enigma Visivo** — la disposizione degli oggetti si rimescola a ogni istanza e a ogni ritentativo.
  I distrattori non sono casuali: almeno uno deve avere *la stessa configurazione della mano* del
  bersaglio ma un luogo diverso, e almeno uno *lo stesso movimento* con configurazione diversa. È
  così che i parametri formazionali si insegnano per contrasto, senza mai nominarli a un bambino.
- **Costruzione Sintattica** — sui blocchi non si scrive mai la parola italiana. Se c'è scritto
  "mela", il giocatore riordina l'italiano e il gioco insegna *italiano segnato*, non LIS. I blocchi
  sono clip più icona; le glosse sono un aiuto opzionale.
- **Ordini multipli** — la LIS ammette sia soggetto-oggetto-verbo sia soggetto-verbo-oggetto, e nelle
  costruzioni locative si segna prima il luogo e poi l'oggetto localizzato. Ogni frase ha quindi una
  **lista** di sequenze accettate, con tre esiti: naturale, comprensibile ma meno tipica, non
  grammaticale. Non enunciare mai "la regola SOV": non esiste in quella forma.

## Accessibilità: cosa verifico prima di aprire una PR

- Ogni trascinamento ha l'alternativa tocca-elemento → tocca-destinazione, e funziona da tastiera.
- Bersagli di tocco da almeno 44 px.
- Contrasto 4,5:1 sul testo, 3:1 sugli elementi interattivi; nessuno stato affidato al solo colore.
- `prefers-reduced-motion` spegne transizioni e particelle **ma non i segni**: quelli sono contenuto,
  non decorazione. Questa distinzione va rispettata nel codice.
- Massimo 5 nuovi segni e una sola nuova regola per scena.

## Girare le clip del lessico

Se puoi segnare davanti a una camera, questo è quello che serve. Bastano un telefono e un'ora.

| | |
|---|---|
| Chi | segnanti sordi madrelingua, non interpreti udenti |
| Inquadratura | dal bacino a ~20 cm sopra la testa, formato 4:5 |
| Frame rate | 50 fps in ripresa, 30 in consegna |
| Otturatore | tempi brevi: nessuna scia sulle mani |
| Sfondo e abiti | tinta unita in contrasto con l'incarnato, maniche lunghe scure |
| Luce | frontale morbida, nessuna ombra su viso o mani |
| Montaggio | 200 ms di stasi in testa e in coda, mai un taglio dentro il segno |
| Consegna | WebM VP9 + MP4 di riserva, 300–600 KB, con poster JPEG |

**Lessico mancante per le scene 1–2:** CIAO, IO, TU, NOME, FAME, MANGIARE, MELA, PESCE, ACQUA,
BERE, SÌ, NO, NON ADESSO — più le 21 lettere dell'alfabeto manuale e la parola NIMA compitata.

Dieci segni — NOME, FAME, MANGIARE, MELA, PESCE, ACQUA, BERE, SÌ, NO e NON ADESSO — sono disegnati
su descrizioni esplicite di chi segna: forma della mano, orientamento del palmo, luogo, movimento.
Il disegno resta comunque da guardare e correggere, perché una descrizione non dice l'ampiezza di
uno scorrimento, quanto sono curve le dita di una mano a tazza, né cosa fa il viso mentre la mano si
muove. Le clip qui sopra servono da riferimento per chi disegna, anche se il gioco continuerà a
mostrare i disegni: chi valida guarda il disegno accanto al video e dice dove sbaglia.

## Pull request

Il progetto è una pagina sola: niente build, niente test automatici, per ora. Prima di aprire una
PR, apri `index.html` e **gioca la demo dall'inizio alla fine**, su schermo largo e su telefono.
Nella descrizione scrivi cosa hai cambiato e cosa hai provato.
