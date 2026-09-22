# LIS Quest 

**È un'avventura in cui si cerca di imparare la Lingua dei Segni Italiana attraverso un piccolo gioco di ruolo.**

LIS Quest è un gioco narrativo per bambini e ragazzi (+8 anni) che avvicina alla LIS attraverso una storia, non attraverso un dizionario. 
Il giocatore approda su un'isola dove una fata,
Nima, comunica solo in LIS: gli ostacoli di trama si superano capendo, componendo e riconoscendo i
segni, dentro mini-giochi che si giocano con tocco e trascinamento.

## 🎮 Provalo

| | |
|---|---|
| **Demo giocabile** (capitolo 1, scene 1–2) | [`/`](./index.html) |
| **Game Design Document** completo | [`gdd.html`](./gdd.html) |

GitHub Pages - demo online su **https://prnfpp.github.io/LIS-Quest/**
e il documento su **https://prnfpp.github.io/LIS-Quest/gdd.html**.

In locale bastano due click: apri `index.html` in un browser.
Non serve nessuna build, nessun server, nessun pacchetto da installare.

**Per essere precisi**, perché è il genere di dettaglio su cui questo progetto non vuole arrotondare:
i file da scaricare per giocare sono **due** — `index.html` e `dialoghi.js` — e devono stare nella
stessa cartella (nel deposito ce n'è dell'altro, ma è roba per chi sviluppa). E `index.html`
chiede a Google i caratteri della pagina: **senza rete il gioco parte lo stesso**, con i caratteri di
sistema al posto dei suoi. Sul computer di scuola filtrato che è la ragione di tutta questa
architettura, quindi, funziona — ma quella richiesta a Google parte, ed è una cosa da sapere prima di
installarlo in una classe.

## 👀 Sei sordo o sorda, o interprete LIS? Guarda i segni

**[Apri la pagina di revisione →](https://prnfpp.github.io/LIS-Quest/#validazione)**

Tutti e quaranta i disegni — i segni delle parole e le ventisei lettere dell'alfabeto manuale — su una
schermata sola, in movimento, con rallentatore e fermo immagine. Sotto ognuno ci sono i cinque parametri
formazionali con cui l'abbiamo costruito, così puoi dire non solo *che* è sbagliato ma **quale parametro**
lo è. Alla fine scarichi un file e ce lo mandi.

Servono circa dieci minuti, non serve installare niente, e le risposte restano sul tuo computer finché
non decidi di mandarle. Dicci come vuoi essere accreditato.

## ⚠️ Cosa è vero e cosa no

Questa è la cosa più importante di tutto il repository, e va letta prima di far giocare qualcuno.

**L'alfabeto manuale è quasi corretto, e non ancora validato.** Le 26 lettere sono disegnate sulle
descrizioni della dattilologia italiana — configurazione delle dita, posizione del pollice,
orientamento del palmo, e il movimento per J, K, X, Y e Z, dove il movimento fa parte della lettera.
Sono le stesse mani dei segni: un modello della mano in tre dimensioni, non ventisei disegni a sé.
È un'approssimazione ragionata, non una fonte. Una descrizione scritta non dice quanto le dita sono
ricurve nella E, che angolo esatto prende il pollice nella T, quanto è ampio il gancio della J: è lì
che si nascondono gli errori, e servono **occhi sordi madrelingua** per trovarli. Finché non succede,
l'alfabeto va considerato *quasi* corretto — e in una lingua la differenza fra quasi e corretto è
tutta.

**I segni delle parole sono segnaposto.** CIAO, MELA, PESCE e gli altri sono disegni parametrici che
rispettano la *struttura* di un segno — configurazione della mano, luogo sul corpo, movimento,
espressione del viso — perché su quella struttura si reggono i mini-giochi. Il contenuto linguistico,
però, è inventato.

Fanno eccezione parziale dieci segni — **NOME, FAME, MANGIARE, MELA, PESCE, ACQUA, BERE, SÌ, NO**
e **NON ADESSO** — ridisegnati su descrizioni esplicite di chi segna: configurazione della mano,
orientamento del palmo, luogo sul corpo, movimento. Prima erano inventati (NOME stava sulla fronte,
FAME sulla pancia, MELA sulla guancia) e quindi semplicemente sbagliati. Adesso sono *più vicini*,
il che non vuol dire validati: una descrizione scritta non dice quanto è ampio uno scorrimento,
quanto sono curve le dita di una mano a tazza, né cosa fa il viso mentre la mano si muove.

Nima è destra ed è vista di fronte: la sua mano destra sta a sinistra di chi guarda, come quando si
è seduti davanti a una persona che segna.

**Le mani sono guardate di tre quarti, non di fronte, ed è una scelta.** Un orientamento vero può
essere illeggibile: una mano con il palmo verso la propria destra, vista esattamente di fronte, è
una lama, e non si vede quale dito è teso né quanti sono. I dizionari di LIS non la fotografano di
fronte — la fotografano di tre quarti. Qui la scena è girata di tre quarti e presa da trenta gradi
più in alto, **una volta sola e uguale per tutte le mani**: il segno non cambia, cambia il posto da
cui lo si guarda, e siccome il posto è lo stesso per tutti due segni restano confrontabili fra loro.
L'alternativa era mentire sull'orientamento del palmo di un segno per volta per renderlo leggibile,
e quella sì avrebbe insegnato qualcosa di falso.

Dove un segno è un **contatto** — FAME che colpisce il fianco, MANGIARE che arriva alla bocca — la
figura ferma mostra l'avvicinamento, non il tocco, e la freccia dice dove va: al momento del tocco
la mano è schiacciata contro il corpo e non si legge.

Insegnare un segno sbagliato è peggio che non insegnarne nessuno: resta addosso e poi va
disimparato. Il lessico reale va ancora girato con **segnanti e/o interpreti** e validato da loro prima
di finire in mano a un bambino. Nel codice ogni segno ha già lo slot per la clip video: quando i
video ci sono, si cambia la sorgente, non il gioco.

Nel frattempo il dizionario interno del gioco — *Il Guscio* — rimanda per ogni voce a
[Spread the Sign](https://www.spreadthesign.com/it.it/search/), il dizionario multilingue del
[European Sign Language Centre](https://www.signlanguage.eu/en/), dove il segno vero c'è in video.
I loro filmati **non sono ridistribuiti qui**: sono sotto licenza proprietaria, e il rimando è un
semplice collegamento.


## 📁 Struttura

```
.
├── index.html          il gioco: motore, mini-giochi, disegno dei segni
├── dialoghi.js         tutte le parole della storia — si modifica senza toccare il codice
├── gdd.html            Game Design Document completo
├── SEGNI.md            dove andranno le clip video del lessico, e con che requisiti
├── CONTRIBUTING.md     come aggiungere un segno, una scena, un capitolo
├── tools/              attrezzi per chi sviluppa — il gioco non li usa e non li carica
├── LICENSE             MIT, per il codice
└── README.md
```

Per **giocare** servono due file e basta, `index.html` e `dialoghi.js`, nella stessa cartella:
`index.html` carica `dialoghi.js` all'avvio. Tutto il resto è per chi il gioco lo scrive.

`tools/` contiene un solo attrezzo: le **istantanee**, che apre la pagina in un browser e controlla
che nessun disegno si sia mosso senza che qualcuno l'abbia voluto — utile perché qui ogni mano e
ogni lettera escono da numeri, e un numero cambiato in fondo al motore ne sposta quaranta insieme.
Vuole Node e un Chrome già installato, non scarica niente, e chi gioca non lo incontra mai. Si
spiega da solo in [`tools/LEGGIMI.md`](./tools/LEGGIMI.md).

Le clip dei segni andranno in una cartella `segni/` che si creerà quando ci sarà il primo video.

## ✍️ Cambiare la storia senza programmare

Tutte le parole del gioco — battute, titoli delle scene, istruzioni e risposte dei mini-giochi,
descrizioni delle classi e del dizionario — stanno in **[`dialoghi.js`](./dialoghi.js)**. Si apre con
un editor di testo qualunque, si cambia il testo fra apici, si salva e si ricarica la pagina. Il
file spiega in testa come è fatto e quali tre errori evitare; se ne fai uno, il gioco non resta muto:
mostra un messaggio che dice cosa guardare.

Perché un file `.js` e non un `.json`, che sarebbe più pulito? Perché un `.json` si legge solo con
`fetch()`, e i browser lo bloccano quando la pagina è aperta con un doppio clic da `file://`. Il
gioco smetterebbe di funzionare in locale senza un server — ed è proprio la cosa che questo progetto
promette di non chiedere. Il contenuto di `dialoghi.js` resta comunque dati e basta: nessuna logica,
nessuna funzione.

## 🗺️ A che punto siamo

- [x] Game Design Document del capitolo 1
- [x] Demo giocabile delle scene 1–2 con i tre mini-giochi
- [x] *Il Guscio*: dizionario interno con alfabeto sempre consultabile
- [x] Alfabeto manuale disegnato sulle descrizioni della dattilologia (26 lettere, con i movimenti)
- [ ] **Validazione dell'alfabeto con segnanti sordi madrelingua** — il passo che manca per primo
- [ ] Lessico girato in video con segnanti sordi (12 segni + 26 lettere)
- [ ] Validazione linguistica delle frasi dei mini-giochi
- [ ] Scene 3–6 del capitolo 1
- [x] Dialoghi separati dal motore, modificabili senza toccare il codice
- [x] Dieci segni ridisegnati su descrizioni di chi segna, con orientamento del palmo, seconda mano e segni composti
- [x] Mano modellata in tre dimensioni: venti giunti, scorcio, occlusione e orientamento ricavati, non scelti a mano
- [x] Alfabeto e segni disegnati dallo stesso modello: ventisei lettere che non sono più ventisei disegni a sé
- [x] Una sola luce per tutta la figura, con alone controluce e falda d'ombra: la mano non è più incollata sopra a un altro disegno
- [x] Occlusione ambientale nelle fessure fra le dita: quattro dita accostate restano quattro anche in miniatura
- [x] Traslucenza ricavata dallo spessore, e le membrane fra le dita: la mano è piena di sangue, non di gesso
- [x] Movimento con massa inerziale: quattro dinamiche — contatto, trasporto, pendolo, allontanamento — invece di una curva per tutti
- [x] Un dito molto flesso si disegna come massa e non come profilo: il pugno non è più un fascio di stecchi
- [x] Una mano è una sagoma sola, non cinque accostate: contorno dell'unione, bordo morbido, palmo e masse arrotondati
- [x] Il pollice esce dal fianco del palmo e non dal polso: il metacarpo sta dentro la massa della mano
- [x] Volume ricavato dalla sagoma: la trasparenza fa da superficie e due filtri di luce SVG le danno rilievo — **tarato su Chromium**, altrove si torna al disegno piatto
- [x] Le lettere ad anello mostrano il loro anello: O, C, F e D girate perché il cerchio si veda in faccia, e l'interno scurito come l'incavo che è
- [x] A, E, S e T non sono più lo stesso pugno: il pollice esce dalla massa e tiene il suo contorno
- [x] Movimento descritto come dato: freccia ricavata dal percorso, non piazzata a occhio
- [x] Rallentatore, fermo immagine e passo a passo su ogni segno, lettere comprese
- [x] Non manuale a canali indipendenti: il capo scuote e annuisce come vuole la grammatica
- [x] Tavolozza dei personaggi separata dal disegno, per i capitoli che vengono
- [x] Passaggio grafico: isola a strati (giorno e notte), Nima ridisegnata, mani leggibili nelle prove
- [ ] Geometria dei personaggi oltre Nima: oggi un secondo personaggio è Nima con un'altra tavolozza
- [ ] Passaggio a struttura modulare per capitoli (una scena per file)
- [ ] Capitolo 2: il viaggio in nave

## 📜 Licenze

- **Codice** (`index.html`, logica di gioco, motore dei mini-giochi): [MIT](./LICENSE).
- **Contenuti** (testi, narrativa, illustrazioni, design dei personaggi):
  [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it) — usali, modificali,
  ma non per farci soldi e con la stessa licenza.
- **Video dei segni**: quando ci saranno, la licenza sarà decisa **insieme alle persone che li hanno
  segnati**. Il volto e le mani di qualcuno non si licenziano a sua insaputa.
