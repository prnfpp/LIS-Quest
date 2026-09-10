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

Tutto il lessico sta nell'oggetto `SIGNS` dentro `index.html`, insieme alla sua descrizione in
italiano in `USO`. Un segno è descritto dai quattro parametri formazionali:

```js
mela: {
  g:  'MELA',       // glossa, in maiuscolo
  h:  'pinza',      // configurazione della mano (chiave di HAND)
  l:  'guancia',    // luogo sul corpo (chiave di LOC)
  m:  'ruota',      // movimento (una delle animazioni .mv-*)
  r:  -20,          // orientamento, in gradi
  nm: 'neutro'      // componente non manuale: la faccia
}
```

E la voce corrispondente nel dizionario:

```js
mela: ['Mela', 'Il frutto. La prima cosa che hai trovato sulla spiaggia e che le è piaciuta.']
```

Il primo elemento è la parola con cui il gioco cerca il segno su Spread the Sign; il secondo è il
testo che il giocatore legge.

### Quando arrivano i video veri

Il disegno parametrico è un ripiego. Appena esiste la clip, al segno si aggiunge un campo:

```js
mela: { g:'MELA', video:'segni/mela.webm', poster:'segni/mela.jpg', /* ...i parametri restano come riserva... */ }
```

e `renderSign()` mostra il video invece del disegno. I parametri non si cancellano: servono ancora
per generare i **distrattori** dei mini-giochi (vedi sotto).

## Aggiungere una scena

Le scene sono array di *beat* dentro `buildScena(n)`. I tipi disponibili:

| Beat | Cosa fa |
|---|---|
| `narr(testo)` | narrazione, avanza al tocco |
| `say(segno, testo)` | Nima esegue un segno, che entra nel Guscio |
| `{t:'act', label, sign, xp, learn}` | un'azione del giocatore con un pulsante |
| `{t:'spell', word, text}` | Nima compita una parola |
| `{t:'guscio', text}` | consegna o apertura del dizionario |
| `{t:'game', game, ...}` | un mini-gioco: `spell`, `riddle`, `syntax` |
| `{t:'reward', xp, learn, text}` | chiusura di un beat, XP e segni acquisiti |

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
BERE, SÌ, NO — più le 21 lettere dell'alfabeto manuale e la parola NIMA compitata.

## Pull request

Il progetto è una pagina sola: niente build, niente test automatici, per ora. Prima di aprire una
PR, apri `index.html` e **gioca la demo dall'inizio alla fine**, su schermo largo e su telefono.
Nella descrizione scrivi cosa hai cambiato e cosa hai provato.
