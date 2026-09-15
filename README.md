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

## ⚠️ I segni che vedi non sono LIS

Questa è la cosa più importante di tutto il repository.

Le animazioni dei segni nella demo sono **segnaposto**: disegni parametrici che rispettano la
*struttura* di un segno — configurazione della mano, luogo sul corpo, movimento, espressione del
viso — perché su quella struttura si reggono i mini-giochi. Il contenuto linguistico, però, è
inventato.

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
├── index.html          demo giocabile del capitolo 1 (pagina singola, zero dipendenze)
├── gdd.html            Game Design Document completo
├── SEGNI.md            dove andranno le clip video del lessico, e con che requisiti
├── CONTRIBUTING.md     come aggiungere un segno, una scena, un capitolo
├── LICENSE             MIT, per il codice
└── README.md
```

Le clip dei segni andranno in una cartella `segni/` che si creerà quando ci sarà il primo video.

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
