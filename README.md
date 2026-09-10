# LIS Quest

**Un'avventura in cui non impari la Lingua dei Segni Italiana per vincere: vinci perché l'hai capita.**

LIS Quest è un gioco narrativo gratuito per bambini e ragazzi (8–14 anni) che avvicina alla LIS
attraverso una storia, non attraverso un dizionario. Il giocatore approda su un'isola dove una fata,
Nima, comunica solo in LIS: gli ostacoli di trama si superano capendo, componendo e riconoscendo i
segni, dentro mini-giochi che si giocano con tocco e trascinamento.

Nasce a Bologna dall'idea di due persone, una delle quali interprete LIS. Non c'è un ente dietro,
non c'è un modello di business: il progetto è e resta gratuito.

## 🎮 Provalo

| | |
|---|---|
| **Demo giocabile** (capitolo 1, scene 1–2) | [`/`](./index.html) |
| **Game Design Document** completo | [`/gdd/`](./gdd/index.html) |

Con GitHub Pages attivo, la demo è online su **https://prnfpp.github.io/LIS-Quest/**
e il documento su **https://prnfpp.github.io/LIS-Quest/gdd/**.

In locale bastano due click: apri `index.html` in un browser. Non serve nessuna build, nessuna
dipendenza, nessun server — è una singola pagina HTML con tutto dentro.

## ⚠️ I segni che vedi non sono LIS

Questa è la cosa più importante di tutto il repository.

Le animazioni dei segni nella demo sono **segnaposto**: disegni parametrici che rispettano la
*struttura* di un segno — configurazione della mano, luogo sul corpo, movimento, espressione del
viso — perché su quella struttura si reggono i mini-giochi. Il contenuto linguistico, però, è
inventato.

Insegnare un segno sbagliato è peggio che non insegnarne nessuno: resta addosso e poi va
disimparato. Il lessico reale va girato con **segnanti sordi madrelingua** e validato da loro prima
di finire in mano a un bambino. Nel codice ogni segno ha già lo slot per la clip video: quando i
video ci sono, si cambia la sorgente, non il gioco.

Nel frattempo il dizionario interno del gioco — *Il Guscio* — rimanda per ogni voce a
[Spread the Sign](https://www.spreadthesign.com/it.it/search/), il dizionario multilingue del
[European Sign Language Centre](https://www.signlanguage.eu/en/), dove il segno vero c'è in video.
I loro filmati **non sono ridistribuiti qui**: sono sotto licenza proprietaria, e il rimando è un
semplice collegamento.

## 🙋 Cerchiamo

**Se sei sordo o sorda, o interprete LIS** — è di te che il progetto ha bisogno per primo:
guardare il lessico delle prime due scene e dire cosa non va, segnare davanti a una camera o
indicare chi potrebbe farlo, validare quali ordini di frase sono naturali e quali sbagliati, dirci
dove il tono della storia scivola nel paternalismo.

**Se sei un genitore, o una famiglia CODA** — serve sapere se un bambino ci gioca davvero: dieci
minuti di prova osservata valgono più di mille questionari.

**Se disegni, animi o sviluppi** — la struttura c'è, il mestiere manca: illustrazione e animazione
dei fondali e di Nima, front-end (la demo è vanilla, la versione vera è modulare per capitoli),
riprese e montaggio del lessico.

Apri una issue, o scrivi a **`info.pirini.filippo@gmail.com`**.

## 📁 Struttura

```
.
├── index.html          demo giocabile del capitolo 1 (pagina singola, zero dipendenze)
├── gdd/index.html      Game Design Document completo
├── segni/              dove andranno le clip video del lessico — vedi segni/README.md
├── CONTRIBUTING.md     come aggiungere un segno, una scena, un capitolo
├── LICENSE             MIT, per il codice
└── README.md
```

## 🗺️ A che punto siamo

- [x] Game Design Document del capitolo 1
- [x] Demo giocabile delle scene 1–2 con i tre mini-giochi
- [x] *Il Guscio*: dizionario interno con alfabeto sempre consultabile
- [ ] Lessico girato in video con segnanti sordi (12 segni + 21 lettere per le scene 1–2)
- [ ] Validazione linguistica delle frasi dei mini-giochi
- [ ] Scene 3–6 del capitolo 1
- [ ] Passaggio a struttura modulare per capitoli (dati JSON separati dal motore)
- [ ] Capitolo 2: il viaggio in nave

## 📜 Licenze

- **Codice** (`index.html`, logica di gioco, motore dei mini-giochi): [MIT](./LICENSE).
- **Contenuti** (testi, narrativa, illustrazioni, design dei personaggi):
  [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it) — usali, modificali,
  ma non per farci soldi e con la stessa licenza.
- **Video dei segni**: quando ci saranno, la licenza sarà decisa **insieme alle persone che li hanno
  segnati**. Il volto e le mani di qualcuno non si licenziano a sua insaputa.

## Non è un corso

LIS Quest è un'introduzione ludica, non un percorso formativo e non rilascia niente. Per imparare
davvero la LIS servono corsi riconosciuti e insegnanti sordi: il punto di partenza è
l'[Ente Nazionale Sordi](https://www.ens.it/).
