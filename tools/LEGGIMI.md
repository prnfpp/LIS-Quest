# Gli attrezzi

Qui dentro non c'è gioco. Il gioco è `index.html` più `dialoghi.js`, si apre
con un doppio clic e non ha bisogno di niente: questa cartella sta fuori da
quella promessa, e chi gioca non la incontra mai.

## Le istantanee

    node tools/istantanee.mjs            confronta
    node tools/istantanee.mjs --scrivi   registra lo stato di adesso

Serve Node 22 o più recente (per `WebSocket`) e un Chrome o Chromium già
installato — nessuna dipendenza da scaricare. Se il browser sta in un posto
insolito, diglielo con la variabile `CHROME`.

### Perché

Ogni mano, ogni lettera e ogni segno di questo gioco escono da numeri: non
c'è nessuna immagine da qualche parte che qualcuno ha disegnato e che resta
com'è. Questo vuol dire che una correzione in fondo al motore — la lunghezza
di un osso, l'angolo della camera, il modo di tagliare il riquadro — si porta
dietro decine di disegni tutti insieme, e nessuno lo dice.

È già successo due volte, e tutte e due le volte se n'è accorto un occhio
umano per caso: quando è stata corretta la cinematica del pollice, diciassette
configurazioni sono uscite sbagliate e il pollice pendeva come una coda;
quando è cambiato il taglio stretto, i mini-giochi hanno cominciato a mostrare
mani senza mento. Da qui in poi se ne accorge questo strumento.

### Come

Apre `index.html` in un browser vero — il disegno lo fa il browser, quindi
è il browser che va interrogato — e attraverso `window.LISQ` si fa dare il
disegno **generato** di tutto: i segni interi, gli stessi segni nel taglio
stretto che usano i mini-giochi, le ventisei lettere dell'alfabeto manuale,
e ogni configurazione di mano vista sia dal palmo sia dal dorso. Sono circa
centotrenta disegni.

Di ognuno registra cinque cose, una riga per disegno:

    nome | riquadro | disegno (x y larghezza altezza) | elementi | impronta

Le prime quattro si leggono: dicono dove sta il disegno, quanto è grande e di
quanti pezzi è fatto. Sono quelle che in una revisione fanno capire *cosa* è
cambiato — un riquadro che si sposta, un contorno che sparisce. L'impronta
serve a non lasciar passare niente: è il riassunto di tutto il disegno, e
cambia anche se si muove una curva che le quattro misure non vedono.

### Perché l'SVG e non i pixel

Confrontare immagini sarebbe la cosa ovvia, e sarebbe la cosa sbagliata. I
pixel cambiano quando cambia la versione del browser, e un controllo che
fallisce da solo smette di essere letto nel giro di due settimane. L'SVG no:
è lo stesso testo che ha generato il gioco, si legge in una differenza, si
discute in una revisione e dice esattamente quale numero si è mosso.

Per la stessa ragione l'impronta si calcola sul disegno *normalizzato*, con
ogni numero arrotondato a un decimo di unità: due versioni di browser possono
differire sull'ultima cifra di un seno, e un decimo di unità non lo vede
nessuno.

### Cosa NON fa

Non dice se un segno è **giusto**. Un disegno può essere identico a ieri e
sbagliato da sempre: che la LIS sia resa bene lo può dire solo chi la LIS la
conosce, ed è per quello che c'è la pagina di revisione
(`#validazione`) e il piano di `SEGNI.md`. Questo strumento risponde a una
domanda sola, ma a quella risponde bene: *è cambiato qualcosa che non volevo
cambiare?*
