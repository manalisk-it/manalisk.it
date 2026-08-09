# Proponi redesign pagina Chi siamo

- Thread ID: `019fa973-9eeb-7123-9445-41f4a5bc58d1`
- Progetto: Sito web
- Creata: 2026-07-28T15:59:14.000Z
- Ultimo aggiornamento disponibile: 2026-07-28T16:47:38.000Z
- Esportata: 2026-08-10

> Trascrizione leggibile dei messaggi visibili. Sono esclusi ragionamento interno, istruzioni di sistema, chiamate agli strumenti e relativi output. I percorsi locali sono stati redatti.

## Turno 1

### Utente

Lavora sul branch manalisk-personality. Prima controlla lo stato Git e studia le modifiche già presenti, in particolare modern-catalogue.scss, ai-services-modern.scss e le pagine sperimentali AI2, Cybersecurity2 e Formazione2.
Vorrei ridisegnare la pagina CHI SIAMO mantenendola coerente con la nuova direzione Manalisk:
font Inter per corpo e titoli;
testi diretti, concreti e meno da agenzia;
spazi compatti;
alternanza tra bianco e il gradiente tenue linear-gradient(145deg, #fbfdfd, #f2f8f9);
pochi colori decorativi;
pulsanti con cta-button, senza ombra di base e con ombra solo in hover;
link secondari con modern-text-link;
riutilizza classi, variabili e componenti esistenti; non creare stili duplicati specifici per questa pagina;
tutto il copy modificabile deve stare nel content/front matter, mentre il layout deve contenere solo struttura riutilizzabile;
preserva tutte le informazioni utili esistenti.
Crea prima una versione sperimentale separata, draft: true e noindex: true, senza cambiare navbar o pagina in produzione. Costruisci il sito con Hugo e verifica desktop, mobile, allineamenti e overflow. Non committare finché non approvo il risultato.
in questa pagina chi siamo deve emergere veramente che siamo professionisti e non fuffaguru dell'AI. Prima di cambiare il testo e ridurlo parliamone qui e proponi cosa cambieresti

### Assistente — Aggiornamento

Parto senza toccare file: verifico branch e working tree, poi confronto gli stili condivisi e le tre pagine sperimentali con l’attuale “Chi siamo”. Prima di qualsiasi modifica al copy ti restituisco una proposta ragionata, indicando cosa conserverei, cosa renderei più concreto e cosa eviterei.

### Assistente — Aggiornamento

Il branch corretto è già attivo e il working tree è pulito: non ci sono modifiche locali da preservare in questo momento. Ora ricostruisco la direzione già introdotta nel branch, inclusa la pagina AI2 (il nome file potrebbe non contenere esattamente “AI2”), e analizzo il copy attuale di “Chi siamo” senza modificarlo.

### Assistente — Aggiornamento

La direzione delle pagine “2” è molto chiara: il tono migliore non prova a sembrare autorevole con aggettivi, ma mostra metodo, limiti e risultati attesi. Per “Chi siamo” proporrei quindi di far emergere la competenza attraverso fatti verificabili — formazione, ricerca, lavoro tecnico e didattica — e una posizione esplicita: l’AI non è la risposta automatica a ogni problema. Sto controllando anche il blocco contatti esistente, perché la nuova versione dovrà distinguere bene call ed email senza trascinarsi copy promozionale hardcoded.

### Assistente — Risposta

Il branch `manalisk-personality` è già attivo e il working tree è pulito. Non ho modificato alcun file.

La pagina attuale contiene ottime credenziali, ma le diluisce con espressioni generiche come “soluzioni tecnologiche avanzate”, “aziende moderne”, “passione per l’innovazione” e “guidiamo i clienti nel futuro”. Inoltre, formule come “garantire sicurezza e privacy” e “più alti standard” risultano troppo assolute. È proprio quel linguaggio a farla sembrare più “agenzia AI” di quanto Manalisk sia realmente.

Proporrei questa struttura e questo tono.

### Apertura

**Chi siamo**

# Professionisti dell’AI e della cybersecurity

> Manalisk riunisce professionisti con esperienza nella ricerca, nello sviluppo software, nella sicurezza informatica e nella formazione. Lavoriamo con aziende e organizzazioni per applicare l’AI dove può produrre un risultato concreto e verificabile, senza presentarla come la risposta a ogni problema.

Preferisco “Manalisk riunisce professionisti” a “siamo un network di liberi professionisti”: conserva il significato, ma suona più solido e meno commerciale.

### Posizionamento

## Prima il problema, poi la tecnologia

> Partiamo dal processo, dai dati disponibili e dai vincoli tecnici e organizzativi. Verifichiamo le ipotesi su casi reali e valutiamo il risultato prima di estendere un progetto. Se l’AI non serve, oppure non è sufficientemente affidabile per quel contesto, lo diciamo.

Questa sarebbe la frase centrale della pagina: comunica serietà senza dover dichiarare “non siamo fuffaguru”.

A seguire userei quattro principi compatti, coerenti con le pagine AI2 e Cybersecurity2:

- **Capire il contesto** — persone, processi, strumenti e risultato atteso.
- **Verificare prima di promettere** — dati, fattibilità, rischi e limiti.
- **Provare su casi reali** — prototipi circoscritti e risultati osservabili.
- **Documentare e trasferire** — soluzioni comprensibili anche a chi dovrà utilizzarle.

### Competenze

## Competenze tecniche, ricerca e lavoro sul campo

Dividerei le informazioni esistenti in tre blocchi:

- **Intelligenza artificiale applicata**

  Machine learning, deep learning, modelli linguistici, RAG, analisi dei dati e automazione di processi.

- **Cybersecurity e infrastrutture**

  Vulnerability assessment, penetration testing, analisi delle vulnerabilità, sicurezza cloud, privacy e protezione dei dati.

- **Ricerca e formazione**

  Esperienza accademica e industriale, attività didattica per aziende e università, capacità di tradurre argomenti tecnici per pubblici differenti.

Qui non inserirei superlativi, promesse o nuove statistiche. Le competenze parlano da sole.

### Profili

Conserverei tutte le informazioni attuali, ma renderei le biografie più brevi, leggibili e in terza persona.

**Pier Paolo Tricomi, Ph.D.**

> Ha conseguito un dottorato di ricerca in AI & Cybersecurity all’Università di Padova. Ha studiato e svolto attività di ricerca presso Vrije Universiteit Amsterdam, University of California, Irvine e Northwestern University.
>
> Si occupa di machine e deep learning, analisi dei dati, privacy, AI classica e generativa. Lavora con aziende e professionisti e insegna da diversi anni temi di intelligenza artificiale e cybersecurity in aziende e università.

**Simeone Pizzi**

> Ha conseguito la laurea magistrale in Informatica con lode all’Università di Padova. Ha lavorato nel trasferimento tecnologico e nello sviluppo SaaS, occupandosi di sistemi di rilevamento del phishing basati su LLM, estrazione di dati da testo, penetration testing, vulnerability assessment, sviluppo back-end e infrastrutture AWS.
>
> Come assegnista di ricerca ha lavorato su tecniche di analisi statica per individuare vulnerabilità nelle applicazioni Android. Ha inoltre svolto attività didattica come Teaching Assistant e Tutor Didattico.

CV e LinkedIn rimarrebbero disponibili come link secondari `modern-text-link`.

### Chiusura

## Hai un problema concreto da valutare?

> Possiamo partire da una call o da una mail con qualche informazione sul contesto. Capiremo se possiamo essere utili e quale primo passo ha senso fare.

- Pulsante `cta-button`: **Prenota una call gratuita**
- Link `modern-text-link`: **Scrivi a info@manalisk.it**

Eliminerei quindi completamente la vecchia “missione”: ripete concetti già espressi e contiene le parti più promozionali. Le informazioni utili su sicurezza, crescita e applicazione dell’AI verrebbero conservate, ma trasformate in metodo e competenze concrete.

Dopo la tua approvazione creerei una pagina sperimentale separata, presumibilmente `about2`, con `draft: true` e `noindex: true`, senza toccare produzione o navbar. Tutto il copy, i profili, i principi e le CTA resteranno nel front matter; il layout conterrà soltanto struttura riutilizzabile. Nessun commit finché non approvi anche il risultato visivo.

## Turno 2

### Utente

Ok però mi sa che la parte di missione l'hai un po' persa: sicurezza e privacy, sviluppi e prototipi veloci, crescita etc.

### Assistente — Risposta

Hai ragione: eliminandola del tutto perderemmo una parte importante del posizionamento. La manterrei, ma trasformata da dichiarazione promozionale a impegni concreti.

## Il nostro modo di lavorare

> Vogliamo rendere l’intelligenza artificiale comprensibile e utilizzabile nei processi reali, senza separarla dai temi della sicurezza, della privacy e della sostenibilità tecnica. L’obiettivo non è introdurre AI a ogni costo, ma costruire strumenti che possano essere verificati, utilizzati e mantenuti nel tempo.

La articolerei poi in tre punti:

- **Sicurezza e privacy fin dall’inizio**

  Consideriamo dati, accessi, infrastruttura e possibili vulnerabilità già durante l’analisi e la progettazione, non soltanto alla fine del progetto.

- **Prototipi rapidi, decisioni informate**

  Realizziamo prove circoscritte su dati e casi d’uso rappresentativi. Questo permette di verificare presto fattibilità, qualità dei risultati e limiti, prima di investire in uno sviluppo più ampio.

- **Crescita sostenibile**

  Progettiamo soluzioni che possano integrarsi negli strumenti esistenti, essere comprese da chi le utilizza ed evolvere insieme alle esigenze dell’organizzazione. Crescere, qui, non significa semplicemente “usare più AI”, ma migliorare processi, competenze e capacità operative.

Così recuperiamo i tre concetti originari:

- sicurezza e privacy;
- velocità di sviluppo;
- crescita;

ma evitiamo promesse assolute come “garantiamo i più alti standard”, “riduciamo i tempi grazie a tecnologie all’avanguardia” o “assicuriamo un vantaggio competitivo”.

La struttura completa diventerebbe quindi:

1. **Professionisti dell’AI e della cybersecurity**
2. **Prima il problema, poi la tecnologia**
3. **Il nostro modo di lavorare** — sicurezza, prototipi rapidi, crescita sostenibile
4. **Competenze tecniche, ricerca e lavoro sul campo**
5. **Il team**
6. **Contatto**

Terrei separati “Prima il problema, poi la tecnologia” e la missione: il primo blocco comunica l’atteggiamento anti-fuffa; il secondo spiega positivamente che cosa vogliamo ottenere e quali responsabilità ci assumiamo nel lavoro. Non ho ancora modificato i file.

## Turno 3

### Utente

dici che il team vada cosi in basso? non so se è meglio alzarno più in alto, dimmi tu cosa è più giusto. poi applica le modifiche

### Assistente — Aggiornamento

Sì: in una pagina “Chi siamo” il team deve comparire prima della missione estesa. Lo metto subito dopo l’apertura e un breve blocco di posizionamento, così le credenziali personali sostengono immediatamente il messaggio “professionisti, non promotori”. Metodo, missione e competenze verranno dopo, come prova di come lavoriamo.

Per la verifica userò la skill di controllo del browser, perché serve testare davvero la pagina Hugo a più viewport, inclusi allineamenti e overflow. Prima ne leggo le istruzioni, poi implemento la versione sperimentale senza toccare produzione o navbar.

### Assistente — Aggiornamento

La scelta sarà quindi: apertura breve, subito il team, poi missione/metodo. In questo modo il visitatore vede prima nomi, percorsi e attività verificabili; solo dopo legge i principi di lavoro. La pagina non userà statistiche nuove né credenziali inventate, e manterrà anche ricerca scientifica, sicurezza/privacy, rapidità dei prototipi e crescita sostenibile.

### Assistente — Aggiornamento

La prima versione è implementata come `/about2/`, `draft: true` e `noindex: true`. La pagina di produzione e la navbar non sono state toccate. Ho usato un layout a profili riutilizzabile e componenti generici del catalogo, lasciando il vecchio `about.scss` esclusivamente alla pagina attuale. Ora eseguo la build Hugo con i draft inclusi e controllo il markup generato.

### Assistente — Aggiornamento

La build con `hugo --buildDrafts` è riuscita e il `noindex` è presente nel markup. Sono comparsi soltanto gli avvisi Sass/Bootstrap già noti nel repository; nessun nuovo errore. Passo ora al controllo visivo reale: desktop, mobile e una larghezza intermedia, verificando asse dei container, ordine dei profili, CTA, link e `scrollWidth`.

### Assistente — Aggiornamento

La pagina locale risponde correttamente, ma in questa sessione il browser grafico non è disponibile: il controllo automatico non trova alcun browser collegabile. Non sostituirò quella verifica con una simulazione poco attendibile. Completo comunque tutti i controlli che posso fare in modo affidabile ora — build produzione/draft, presenza dei target locali, struttura responsive e assenza di overflow evidente nel CSS — e ti segnalerò con precisione l’unica verifica rimasta manuale.

### Assistente — Risposta

Ho applicato il redesign sperimentale. Il team ora compare subito dopo l’apertura e il breve posizionamento “Prima il problema, poi la tecnologia”, prima di missione e competenze. È l’ordine più credibile per questa pagina: prima le persone e le esperienze verificabili, poi il metodo.

Modifiche:

- nuova pagina [`about2.md`](../../content/about2.md), con `draft: true`, `noindex: true` e URL `/about2/`;
- nuovo layout strutturale riutilizzabile [`catalogue-profile.html`](../../layouts/_default/catalogue-profile.html);
- componenti generici aggiunti al design system in [`modern-catalogue.scss`](../../assets/sass/modern-catalogue.scss).

La pagina comprende:

- posizionamento anti-fuffa;
- team e biografie complete;
- sicurezza e privacy fin dalla progettazione;
- prototipi rapidi e verificabili;
- crescita sostenibile;
- competenze AI, cybersecurity, ricerca e formazione;
- call ed email come alternative distinte.

Verifiche eseguite:

- build Hugo con draft riuscita;
- build di produzione riuscita e `/about2/` correttamente esclusa;
- `noindex` presente;
- immagini, CV e pagina di prenotazione rispondono correttamente;
- `git diff --check` superato;
- nessun errore nuovo, solo gli avvisi Sass/Bootstrap preesistenti.

Il browser grafico non era disponibile nella sessione, quindi la verifica visiva effettiva a desktop/mobile e il confronto `scrollWidth/clientWidth` restano da completare. Non ho modificato navbar o pagina in produzione e non ho effettuato commit.

## Turno 4

### Utente

Allora non mi piace "**Competenze che si possono verificare", mi sembra che non c'entra niente con "IL TEAM". Non mi piace nelle sezioni "modo di lavorare" e "competenze" il layout orizzontale, tienilo verticale. il parliamone dovrebbe esere centtrato come nelle schermate dei servizi. mi piacevano le iconcine di linkedin. vorrei che si capisse che siamo liberi professionisti perché legalmente non siamo una srl, quindi vorrei evitare misunderstanding**

### Assistente — Aggiornamento

Ricevuto. Rendo esplicita la natura di Manalisk senza formule ambigue: “siamo liberi professionisti indipendenti, non una società”. Cambio il titolo del team con qualcosa che descriva davvero le persone, trasformo missione e competenze in una lettura verticale, ripristino l’icona LinkedIn e centro l’intero blocco finale come nelle pagine servizi.

### Assistente — Aggiornamento

Le modifiche richieste sono applicate. Ho usato la formulazione esplicita “siamo liberi professionisti indipendenti, non una società”, così non resta spazio per interpretazioni sulla forma giuridica. Ora ricostruisco e controllo che struttura verticale, icone e centratura siano presenti nel CSS e nel markup generato.

### Assistente — Risposta

Modifiche applicate:

- titolo del team cambiato in “Chi lavora nei progetti Manalisk”;
- chiarito esplicitamente: “siamo liberi professionisti indipendenti, non una società”;
- “Modo di lavorare” e “Competenze” ora hanno elementi disposti verticalmente;
- ripristinate le icone LinkedIn accanto ai relativi link;
- blocco finale “Parliamone” completamente centrato, CTA comprese.

La build Hugo con i draft è riuscita e il markup generato contiene tutte le modifiche. Restano soltanto gli avvisi Sass preesistenti. Produzione e navbar non sono state toccate; nessun commit effettuato.

## Turno 5

### Utente

ok fai commit.

### Assistente — Aggiornamento

Procedo con un commit limitato ai tre file della nuova pagina sperimentale e del design system condiviso. Prima ricontrollo il diff, poi stage e commit; non includerò altri file e non farò push.

### Assistente — Aggiornamento

Ho rilevato anche modifiche non appartenenti a “Chi siamo” in pagine e stili dei servizi; le lascio fuori. Nel perimetro del commit includo soltanto `about2.md`, il layout profili e le aggiunte condivise in `modern-catalogue.scss`, mantenendo anche gli ultimi ritocchi già presenti su questi tre file. Rifaccio una build sull’esatto stato che verrà committato.

### Assistente — Risposta

Commit creato sul branch `manalisk-personality`:

`17d2c6e Add experimental about page redesign`

Include esclusivamente i tre file di “Chi siamo”. Build Hugo riuscita. Le modifiche già presenti nelle pagine e negli stili dei servizi restano non committate. Nessun push effettuato.

::git-stage{cwd="<PROJECT_ROOT>"}
::git-commit{cwd="<PROJECT_ROOT>"}
