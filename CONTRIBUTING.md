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
  g:     'MELA',       // glossa, in maiuscolo
  h:     'coppa',      // configurazione della mano (chiave di CONFIG)
  dita:  'dentro',     // dove puntano le punte delle dita
  palmo: 'indietro',   // dove guarda il palmo
  l:     'bocca',      // luogo sul corpo (chiave di LOC)
  m:     'suDue',      // movimento (chiave di MOVIMENTI)
  nm:    'neutro'      // componente non manuale: la faccia
}
```

**L'orientamento sono due direzioni, e solo due.** Si scrivono con dei nomi, nel
mondo dello schermo:

| Nome | Dove punta |
|---|---|
| `su` / `giu` | in alto / in basso |
| `avanti` / `indietro` | verso chi guarda / dentro lo schermo |
| `fuori` / `dentro` | verso la destra di Nima / verso la sua sinistra |

Una lista somma le direzioni (`['su','fuori']` è a metà fra le due) e un nome
ripetuto pesa di più (`['avanti','avanti','fuori']` è quasi in avanti).

Prima al posto di `dita` c'erano una **rotazione nel piano** (`r`) e uno
**scorcio**, e quella coppia si poteva contraddire col palmo: «dita in basso» più
«palmo in basso» non è una mano, è una degenerazione, e da lì venivano le mani
ridotte a stecco. Due direzioni non si contraddicono: se non sono perpendicolari
il modello raddrizza il palmo attorno alle dita, che è il grado di libertà che
una mano ha davvero. L'angolo sullo schermo, quello che serve alle frecce, si
**ricava** proiettando `dita` (`angoloDita`), quindi non può più dire una cosa
diversa dal disegno.

Due parametri in più, che servono a segni che senza non si possono scrivere:

| Parametro | A cosa serve |
|---|---|
| `due` | la seconda mano: `{h, dita, palmo, l, m}`. Il disegno viene specchiato, perché una mano sinistra non è una destra girata di lato — e l'orientamento e la luce vengono dati già riflessi, così quello che si chiede è quello che si vede anche dopo lo specchio |
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
verso le x che calano — ed è così che è scritto il movimento `scorriFuori`. Chi impara si trova
davanti a una persona che segna e la rispecchia: è quello che succede anche in aula.

E la voce corrispondente nel dizionario, che però sta in **`dialoghi.js`**, dentro `parole`:

```js
mela: {cerca:'Mela', testo:'Il frutto. La prima cosa che la marea ti ha lasciato.'}
```

`cerca` è la parola con cui il gioco cerca il segno su Spread the Sign; `testo` è quello che il
giocatore legge nel Guscio.

I valori disponibili per `h`, `l` e `m` sono le chiavi di `CONFIG`, `LOC` e `MOVIMENTI` nello stesso
file: si aggiungono lì, con un nome che dica com'è fatta la mano, dove sta o cosa fa — non come si
chiama l'animazione. Per esempio `sottoMento` + `scorriFuori` sono il luogo e il movimento di NOME:
due dita appoggiate sotto il mento che scorrono verso l'esterno.

### L'alfabeto manuale è una tabella

Una lettera è tre dati — quale forma, dove puntano le dita, dove guarda il palmo —
e chi la disegna è il modello:

```js
C: {h:'c', dita:'su', palmo:'fuori'},
Z: {h:'indice', dita:'su', palmo:'avanti', m:'tap',
    tratto:'M -26 -33 L -6 -33 L -26 -17 L -6 -17'}
```

`m` è il movimento, dove il movimento **fa parte della lettera** (J, K, X, Y);
`tratto` è il disegno in aria di J e Z, nascosto da fermo e ricalcato dal
movimento `traccia`, che è la stessa idea della freccia dei segni.

Prima erano ventisei disegni piatti scritti a mano uno per uno, con il loro
spessore, il loro contorno e i loro errori: ognuno andava corretto da solo e
nessuno assomigliava all'altro. Adesso una lettera sbagliata si corregge
cambiando un nome, e la qualità del disegno è la stessa per tutte e ventisei,
perché il disegno è lo stesso codice.

Il riquadro (`ALFA_RIQUADRO`) è **uno per tutte e ventisei**, misurato
sull'unione delle sagome: chi compita il proprio nome vede le lettere una dopo
l'altra, e devono stare ferme invece di saltare di posto e di misura.

### Come sono disegnate le mani

La mano è un **oggetto in tre dimensioni**, non un disegno: uno scheletro di venti
giunti in millimetri veri, una posa fatta di angoli, un orientamento fatto di due
direzioni, e **una** proiezione che decide il resto. Le mani dei segni e le
ventisei lettere dell'alfabeto sono lo stesso codice.

Da lì escono da sé le tre cose che prima si scrivevano a mano e sbagliavano:

- **lo scorcio** — un dito che punta verso chi guarda si accorcia e si allarga;
- **l'occlusione** — le parti si ordinano in profondità, e la mano davanti copre
  quella dietro invece di essere disegnata sopra per caso;
- **l'orientamento** — le unghie si vedono quando il dorso guarda la telecamera,
  le pieghe del palmo quando lo guarda il palmo. Non si scelgono più.

| Funzione | Cosa fa |
|---|---|
| `catenaDito(dito, angoli)` / `catenaPollice(angoli)` | i giunti di un dito, dalla nocca alla punta |
| `posa({ind, med, anu, mig, pol})` | una configurazione: solo angoli, nessun disegno |
| `baseOrientata(dita, palmo, specchio)` | la base della mano nel mondo, messa in scena |
| `manoSVG(config, base, opzioni)` | la mano intera: parti ordinate in profondità e disegnate dal fondo in avanti |
| `handSVG(config, dita, palmo, movimento, specchio)` | la mano nel gruppo che l'orologio dei segni fa muovere |
| `braccio(spalla, x, y, fuori)` | il braccio dalla spalla al **polso**, con il gomito calcolato |
| `polsoDi(x, y, dita, palmo, specchio)` | dove cade il polso: si proietta il punto del carpo |
| `tracciaMov(movimento, angolo, x, y)` | la freccia del movimento, ricavata dal percorso |

#### Il pollice si oppone, e non è un dettaglio

Il pollice ha due angoli alla radice, e sono due cose diverse: l'**abduzione** lo
allontana dall'indice restando nel piano del palmo, l'**opposizione** lo porta
*davanti* al palmo, dove le sue punte possono incontrare quelle delle altre dita.
È l'opposizione che rende una mano una mano, e una C una C.

Si misura dalla sua radice vera — l'articolazione alla base del palmo — non dalla
nocca: senza i suoi quarantacinque millimetri di metacarpo la punta non arriva
alle altre dita, e le mani a pinza, a cerchio e a becco restano aperte a
mezz'aria. Gli angoli delle forme che devono *chiudere* non sono indovinati: si
dichiara dove deve arrivare la punta, rispetto alla punta del dito che incontra,
e si cercano gli angoli che ce la portano.

#### Una mano è UNA sagoma, non cinque accostate

Nei disegni morbidi che questa mano vuole raggiungere — quelli da emoji tridimensionale — palmo e dita
sono **un volume continuo**, e le dita si separano con valli d'ombra, non con contorni. Disegnando ogni
pezzo col suo contorno si ottiene l'opposto: cinque profili che si incontrano sul palmo, e quattro dita
accostate leggono come stecche parallele invece che come una mano.

Il contorno dell'unione si ottiene in tre passate, senza che nessuno la calcoli:

1. l'alone caldo controluce, sotto tutto;
2. **tutte** le sagome tracciate con una linea grossa;
3. **tutti** i pieni, in ordine di profondità, che coprono la metà interna di quelle linee.

Quello che resta visibile della seconda passata è soltanto il bordo esterno: dentro, ogni pieno ha
coperto il proprio. Le separazioni interne le fa l'occlusione ambientale. E l'ordine di profondità
resta, perché la terza passata lo rispetta.

Tre cose che vanno con questa scelta:

- **Le dita cominciano sotto la nocca, dentro il palmo.** La sagoma unica salda due profili solo se si
  sovrappongono: con la base esattamente sulla nocca si toccavano e basta, e un dito si appoggiava sul
  bordo del palmo come uno stecco incollato. Entrano di otto millimetri.
- **Il bordo è nel tono dell'ombra e trasparente, non un bruno pieno.** Con un bruno pieno la mano legge
  come un adesivo ritagliato. Toglierlo del tutto costa troppo: su un fondale scuro e a quaranta pixel
  la mano perde i suoi confini, e questa mano deve restare leggibile piccola.
- **Palmo e masse sono blob, non poligoni smussati** (`arrotonda` + `blob`). Un inviluppo convesso ha
  spigoli, e un palmo con gli spigoli legge come una fetta di pane. `contornoMorbido` da solo non basta:
  l'inviluppo del palmo ha sedici vertici, e un poligono di sedici lati è già quasi se stesso.

#### Il pollice si vede per metà, ed è giusto così

Il pollice si misura dalla sua radice vera — l'articolazione alla base del palmo — ma di quella radice
**non si disegna niente**: il metacarpo sta dentro la massa della mano, e il palmo lo include nel proprio
inviluppo (la radice, il punto a metà e la nocca). È quel cuscinetto che si chiama eminenza tenar.

Disegnandolo per intero il pollice sembrava partire dal **polso** e attraversare il palmo come un
bastone storto: era la cosa più sbagliata di tutta la mano. Di un pollice, guardandolo, si vedono due
falangi — corte e grosse.

#### Le proporzioni contano più dei millimetri

In una mano vera un indice è circa tre quarti del palmo, non quanto il palmo. Con dita lunghe come il
palmo la mano diventa un rastrello; corte e grosse legge come una mano. Vale anche per la larghezza: le
dita sottili fanno stecche, le dita cicciotte fanno una mano.

#### La sfumatura della pelle vale per la MANO, non per il pezzo

`gCarne` usa `gradientUnits="userSpaceOnUse"`, non `objectBoundingBox`. Con le coordinate relative al
riquadro di ciascun pezzo ogni dito si prendeva tutta la rampa, dal chiaro allo scuro, lungo i suoi
trenta millimetri — e una mano diventava cinque dita slavate ognuna con la sua luce. Le coordinate sono
nello spazio locale della mano, che è lo stesso per tutte le mani perché la posa la mette a posto una
traslazione di gruppo.

Ce ne vuole **una sola** perché la luce di questo disegno è fissa nello spazio dello schermo. È così che
si ha l'ombreggiatura morbida dei riferimenti senza una sfumatura per pezzo.

#### La pelle: occlusione, traslucenza, albedo, rugosità

Quattro cose che il modello **ricava**, non che qualcuno scrive:

| Funzione | Cosa fa e perché |
|---|---|
| `occlusione(d, k)` | il buio nelle fessure, con tre passate di contorno invece di un filtro gaussiano — un filtro su quaranta pezzi per mano è una rasterizzazione per pezzo, e su un telefono si paga. Va tenuto **stretto**: allargato diventa un'ombra portata e la mano finisce in una nuvola grigia |
| `traslucenza(mezzaLargh)` | quanto brilla un pezzo in controluce, dal suo spessore. Un dito sottile molto, il palmo niente |
| `membrane(pose, B)` | i cunei caldi alle radici delle dita. Si restringono da sé quando le dita si stringono, perché sono le basi a muoversi |
| `fascia(..., colore, opac)` | la luce lungo la catena. Il colore lo dice chi chiama: prima lo decideva il *segno* dello spostamento, e per cambiare la luce senza cambiare il lato non c'era modo |

#### Un dito chiuso è una massa, non tre cilindri

A pugno chiuso le tre falangi girano di più di mezzo giro. La catena diventa una spirale, e la sagoma
che la fascia **si auto-interseca**: il pieno tiene, ma il contorno disegna le proprie intersezioni e il
pugno viene fuori come un fascio di stecchi incrociati. È la compenetrazione poligonale, nella nostra
versione.

Spezzare il dito in tre volumi separati non funziona — provato: dodici falangi con dodici contorni sono
un graticcio peggiore della spirale. Un dito chiuso, guardato, non è tre cilindri: è **una** massa
compatta con le pieghe dentro. Quindi oltre `PIEGA_ROTTURA` gradi di flessione la sagoma diventa
l'inviluppo del dito intero — un solo contorno, che non si può auto-intersecare perché un inviluppo è
convesso — e le pieghe dei giunti si disegnano dentro.

Così le separazioni che si vedono sono quelle fra un **dito** e l'altro, che sono quelle che contano:
quante dita ci sono è l'informazione, dove finisce una falange no.

#### La messa in scena

Un orientamento vero può essere illeggibile. Una mano con il palmo verso la
propria destra, vista esattamente di fronte, è una lama: non si vede quale dito è
teso né quanti sono. I dizionari di LIS non la fotografano di fronte — la
fotografano di tre quarti, perché di tre quarti si legge.

Qui succede lo stesso, ma **una volta sola e per tutte le mani**: `SCENA_GIRO` e
`SCENA_ALTO` girano la scena di tre quarti e la prendono da trenta gradi più in
alto. Il segno non cambia — cambia il posto da cui lo si guarda, e il posto è lo
stesso per tutti, quindi due segni restano confrontabili fra loro.

I trenta gradi dall'alto sono quelli che salvano le mani col palmo a terra —
FAME, NON ADESSO. E costano poco alle altre: una mano frontale guardata da trenta
gradi si accorcia di un ottavo, e nient'altro. Era la scelta giusta contro
l'alternativa, che era **mentire sull'orientamento del palmo** per renderlo
leggibile.

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
| `durata` | millisecondi di un ciclo |
| `perno` | origine della rotazione, se non è il centro della mano (SÌ gira sul polso) |
| `dinamica` | come accelera: `contatto` \| `trasporto` \| `pendolo` \| `allontana`. È la **massa del braccio**, e cambia il senso: un braccio parte piano, prende velocità e per fermarsi frena — tranne quando finisce contro qualcosa, e allora si ferma di colpo. In LIS la dinamica è portatrice di significato, e un movimento a velocità costante si legge come sbagliato anche quando la traiettoria è giusta. Le curve stanno in `DINAMICHE` |
| `freccia` | forza la freccia: `una`, `due`, `coppia`, `nessuna` |
| `ritmo` | via di fuga: una curva di accelerazione scritta a mano, quando nessuna delle quattro dinamiche va bene |
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

### Il rapporto di ricerca sulla resa delle mani, e cosa ne è stato preso

Esiste un rapporto di ricerca commissionato su come rendere realisticamente le mani in LIS Quest.
Raccomanda uno stack preciso: Three.js con `WebGPURenderer`, shader in TSL con compute shader, materiali
PBR con texture 2K/4K, Subsurface Scattering in due passaggi, un avatar glTF 2.0/VRM con ventuno giunti
per mano e Dual Quaternion Skinning, acquisizione da webcam con MediaPipe, retargeting con Kalidokit e
un filtro One Euro sul segnale.

**Lo stack non è stato adottato, e la ragione non è pigrizia.**

Rompe la promessa scritta in cima al `README`: un file HTML, niente build, niente dipendenze, niente
server, si apre con due clic. Non è una preferenza di stile — è la condizione per cui una maestra o un
genitore possono aprire questo gioco su un computer di scuola senza chiedere niente a nessuno. WebGPU
non funziona su `file://`; un modello VRM con le sue texture è decine di megabyte di binari che nessuno
può leggere né correggere; MediaPipe scarica i pesi via `fetch`, che su `file://` falla. Prendere quello
stack vuol dire diventare un'altra cosa, e quella cosa va decisa, non subita.

Inoltre metà del rapporto descrive **un prodotto che non esiste**. MediaPipe, Kalidokit e il filtro One
Euro servono a catturare le mani *dell'utente* dalla webcam e rispecchiarle sull'avatar. Qui non c'è
input da webcam: chi gioca tocca e trascina. Lo stesso per VRM, Dual Quaternion Skinning e le blend
shape, che deformano una *mesh*: qui non c'è una mesh, c'è SVG generato a ogni fotogramma.

C'è anche un argomento del rapporto che va contro la sua stessa conclusione. Le pagine sui neuroni
specchio e sulla Uncanny Valley dicono che una rappresentazione *quasi* umana costa fatica cognitiva.
Un disegno dichiaratamente stilizzato ma anatomicamente e cinematicamente vero non entra in quella
valle; una mesh mezza realistica sì. La strada di questo progetto è più difendibile di quanto il
documento ammetta.

**Quello che invece è stato preso, tutto, tradotto nel nostro mezzo.** Il rapporto è un ottimo elenco di
difetti veri, e ognuno di questi era un difetto nostro:

| Il rapporto chiede | Qui è diventato |
|---|---|
| Ambient Occlusion, «essenziale per definire gli spazi interdigitali» | `occlusione()`: un alone scuro fuori da ogni sagoma. L'ordine di profondità fa il resto — dove due dita si toccano i due aloni si sommano e la fessura si scurisce da sé. Serve a **contare le dita**, che in LIS è l'informazione |
| Subsurface Scattering, «in controluce i bordi delle dita e le membrane interdigitali diventano traslucidi» | `traslucenza()`: l'alone caldo non è uniforme, la sua intensità viene dallo **spessore** del pezzo. Un mignolo brilla, il palmo no. Più i cunei caldi alle radici delle dita (`membrane()`), che sono la parte più sottile della mano |
| Albedo non omogeneo: caldo dove c'è sangue, freddo dove ci sono tendini | una scia calda dentro l'ultima falange, più marcata dal lato del palmo che dal dorso |
| Roughness: palmo 0.2–0.4, dorso 0.4–0.6 | la fascia di luce è **più stretta e più accesa** sulla faccia del palmo, più larga e smorzata sul dorso. Quale faccia vediamo lo dice la normale |
| Blend shape guidate dall'angolo dell'osso (l'eminenza tenar che si gonfia) | il punto del tenar nell'inviluppo del palmo si sposta in proporzione all'angolo di opposizione del pollice |
| Interpolazione non lineare, massa inerziale, «evitando movimenti robotici» | `DINAMICHE`: quattro curve — contatto, trasporto, pendolo, allontana — una per ogni storia che un braccio può raccontare, assegnate a ogni movimento |
| Coarticolazione: l'influenza di un segno su quelli adiacenti | le fasi di un segno composto **entrano ed escono** invece di dissolversi l'una nell'altra |
| Topologia che non perde volume sulle flessioni estreme, senza compenetrazione | un dito molto flesso non si disegna come un profilo unico (si auto-interseca: il pugno diventava un fascio di stecchi) ma come **una massa**, l'inviluppo del dito, con le pieghe dentro |
| Quaternioni per evitare il Gimbal Lock | non serviva: l'orientamento non passa da angoli di Eulero, è una base ortonormale costruita da due direzioni, e una base non ha blocchi cardanici |
| Ventuno giunti per mano | ci sono, e sono in millimetri veri |

Il filo è sempre lo stesso: quegli algoritmi consumano lo **spessore**, la **profondità** e la
**normale** di ogni pezzo. Noi quei tre numeri li abbiamo, perché la mano è un modello e non un disegno.
Quello che serviva era usarli — non una GPU.

### Una sola luce per tutta la figura

Non ci sarà una versione con i video: questo disegno è il contenuto finale.

La mano è illuminata in tre dimensioni da `LUCE`. Il resto — viso, capelli,
abito, braccia — è disegnato in piatto, e finché la sua luce non era la stessa la
mano sembrava incollata sopra a un altro disegno: due qualità diverse nella stessa
figura, che è la cosa che si nota per prima. Adesso la direzione di `LUCE` si
proietta sullo schermo una volta sola (`LUCE_XY`) e la usano tutti. Cambiare la
luce della scena vuol dire cambiare un vettore.

Gli indizi che dicono da che parte guarda una mano si sommano, e conviene non
toglierne nessuno:

- **le fasce** — luce, mezza luce, ombra lungo il profilo di ogni dito: è quello
  che lo fa leggere come un volume e non una linea;
- **l'unghia** — la disegna la normale della superficie, non una scelta: si vede
  quando il dorso guarda chi legge, mai dal palmo;
- **nocche** contro **pieghe del palmo** — due superfici diverse, e si riconoscono
  anche in miniatura;
- **l'alone caldo controluce** (`orlatura`) — la stessa sagoma, spostata dalla
  parte opposta alla luce e tinta di caldo, disegnata *prima* della forma così
  sbuca solo sul contorno. È quello che stacca Nima dal fondale: senza, è una
  decalcomania sul cielo;
- **la falda d'ombra** (`faldaOmbra`) — la forma ritagliata su se stessa e
  spostata verso la luce: quello che resta fuori è l'ombra, e segue il contorno
  senza che nessuno la disegni;
- **l'ombra portata** (`.hand{filter:drop-shadow(...)}`) — dice quale delle due,
  mano o viso, sta davanti. Senza, una mano sulla guancia sembra disegnata sulla
  guancia.
| `faceSVG(nm)` | il volto: sopracciglia, occhi, bocca e inclinazione del capo insieme |
| `renderSign(segno, opzioni)` | la figura intera; con `{compatto:true}` ritaglia su testa e mano |

Due cose da non rompere:

- **La mano si disegna dopo il volto.** Nei segni che stanno sulla guancia, sul mento o sulla fronte
  la mano è davanti alla faccia: invertire l'ordine la fa sparire dietro la testa.
- **Il braccio finisce al polso, non al centro del palmo.** `polsoDi()` proietta il punto del carpo
  del modello; saltarlo lascia la manica staccata dall'avambraccio.
- **`{compatto:true}` è quello che si usa nei mini-giochi e nel dizionario.** Lì conta vedere com'è
  fatta la mano, non quanto è graziosa la fata. La testa entra nel riquadro solo se **il viso porta
  informazione**: o il segno lo tocca (la guancia di ACQUA, il mento di NOME), o il segno ha un non
  manuale suo, e allora il viso è grammatica — NO si nega con la testa, SÌ si afferma, e tagliare la
  faccia butterebbe via metà del segno. Quando il viso non porta niente si ritaglia sulla mano e la
  mano viene grande, che è tutto quello che lì serve. Un riquadro che deve contenere la testa *e* una
  mano al fianco non ritaglia niente: viene grande quasi come la figura intera.

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
