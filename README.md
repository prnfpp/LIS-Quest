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
Non serve nessuna build, nessuna dipendenza, nessun server — è una singola pagina HTML con tutto dentro.

## ⚠️ Cosa è vero e cosa no

Questa è la cosa più importante di tutto il repository, e va letta prima di far giocare qualcuno.

**L'alfabeto manuale è quasi corretto, e non ancora validato.** Le 26 lettere sono disegnate sulle
descrizioni della dattilologia italiana — configurazione delle dita, posizione del pollice,
orientamento del palmo, e il movimento per J, K, X, Y e Z, dove il movimento fa parte della lettera.
È un'approssimazione ragionata, non una fonte. Una descrizione scritta non dice quanto le dita sono
ricurve nella E, che angolo esatto prende il pollice nella T, quanto è ampio il gancio della J: è lì
che si nascondono gli errori, e servono **occhi sordi madrelingua** per trovarli. Finché non succede,
l'alfabeto va considerato *quasi* corretto — e in una lingua la differenza fra quasi e corretto è
tutta.

**I segni delle parole sono segnaposto.** CIAO, MELA, PESCE e gli altri sono disegni parametrici che
rispettano la *struttura* di un segno — configurazione della mano, luogo sul corpo, movimento,
espressione del viso — perché su quella struttura si reggono i mini-giochi. Il contenuto linguistico,
però, è inventato.

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
├── LICENSE             MIT, per il codice
└── README.md
```

I due file vanno tenuti nella stessa cartella: `index.html` carica `dialoghi.js` all'avvio.

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
- [ ] Passaggio a struttura modulare per capitoli (una scena per file)
- [ ] Capitolo 2: il viaggio in nave

## 📜 Licenze

- **Codice** (`index.html`, logica di gioco, motore dei mini-giochi): [MIT](./LICENSE).
- **Contenuti** (testi, narrativa, illustrazioni, design dei personaggi):
  [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it) — usali, modificali,
  ma non per farci soldi e con la stessa licenza.
- **Video dei segni**: quando ci saranno, la licenza sarà decisa **insieme alle persone che li hanno
  segnati**. Il volto e le mani di qualcuno non si licenziano a sua insaputa.
