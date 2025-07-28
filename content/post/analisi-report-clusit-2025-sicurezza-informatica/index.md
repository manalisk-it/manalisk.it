---
title: "La situazione della Cybersecurity in Italia - Analisi del Report Clusit 2025"
description: "In questo articolo analizziamo i principali dati del Rapporto Clusit 2025 sulla sicurezza informatica, con un focus sull’Italia e sulle PMI. Parleremo dei settori più colpiti dai cyber attacchi, del ruolo dell’Intelligenza Artificiale, degli obblighi introdotti dalla direttiva europea NIS2, e dei costi (spesso sottovalutati) di un incidente informatico. Approfondiamo la situazione della cybersecurity in Italia, capendo cosa si rischia e come proteggersi."
date: 2025-07-24
draft: true
images: ["hugo-logo.png"]
featured_image: "incidenti-cybersecurity-2020-2024.png"
featured_image_visible: False
categories: ["The Bootstrap Blog"]
tags: ["Bootstrap"]
keywords: ["bootstrap 5 3","bootstrap 5","bootstrap"]
authors: ["Pier Paolo Tricomi"]

---

**Nota**: Le immagini riportate in questo articolo provengono dal report Clusit consultabile al seguente link: [Report Clusit 2025](https://clusit.it/rapporto-clusit/)



## Chi è Clusit e da dove provengono i dati?

Il **Clusit – Associazione Italiana per la Sicurezza Informatica**, fondato nel 2000, è l’organizzazione di riferimento in Italia per la promozione della cultura della cybersecurity. È composto da esperti, accademici, aziende, istituzioni e professionisti del settore, ed è noto per il suo impegno nella divulgazione, nella formazione e nel supporto a imprese e pubbliche amministrazioni nella comprensione dei rischi cyber e delle strategie di protezione.

Uno dei contributi più importanti di Clusit è la pubblicazione annuale del **Rapporto Clusit sulla Sicurezza ICT in Italia e nel Mondo**, giunto nel 2025 alla sua **tredicesima edizione**. Questo rapporto è oggi considerato una **fonte autorevole e indipendente** a livello nazionale, consultata da giornalisti, decisori pubblici, dirigenti aziendali, consulenti e accademici.

Il documento fornisce un’analisi quantitativa e qualitativa dei principali incidenti cyber noti, interpretando i dati alla luce dei trend tecnologici, geopolitici e normativi. Il Clusit non si limita alla raccolta passiva delle informazioni, ma propone una **lettura critica dei dati**, integrata da riflessioni di esperti, case study e raccomandazioni pratiche.

### Da dove provengono i dati del Rapporto?

Il Clusit utilizza una combinazione di **fonti affidabili e trasparenti**, che rende il rapporto unico nel suo genere per profondità e rigore:

* **Fonti pubbliche certificate**, come comunicati stampa, rapporti ufficiali e database di incidenti confermati (il Clusit non include voci o notizie non verificate).
* **Security Operation Center (SOC) di Fastweb**, che fornisce dati tecnici e trend specifici sull’Italia, basati su monitoraggi attivi e incidenti realmente gestiti sul campo.
* **Polizia Postale e per la Sicurezza Cibernetica**, che contribuisce con segnalazioni, report di attività investigative e osservazioni operative sul territorio nazionale.
* **Survey e analisi sulle micro, piccole e medie imprese (mPMI)**, realizzate in collaborazione con DINTEC, Unioncamere, IIT-CNR e Camere di Commercio, attraverso strumenti come il **PID Cyber Check**.
* **Collaborazioni con aziende e centri di competenza** come Cisco, Palo Alto Networks, CrowdStrike, Netwrix, Fortinet e altri, che offrono approfondimenti specifici su settori verticali e tecnologie emergenti.

Questa pluralità di fonti garantisce una **visione olistica, trasversale e indipendente** del panorama della cybersecurity, permettendo di cogliere sia l'evoluzione del cybercrime che l’impatto concreto sugli ecosistemi economici e sociali.

📊 **Immagine consigliata da includere**:
**Fig. 1 - Andamento degli incidenti cyber nel periodo 2020-2024**
(mostra l’esplosione degli incidenti globali, passati da 1.874 nel 2020 a 3.541 nel 2024: +89%)

{{< blogfigure src="incidenti-cybersecurity-2020-2024.png" alt=" Andamento degli incidenti cyber nel periodo 2020-2024." caption=" Andamento degli incidenti cyber nel periodo 2020-2024." >}}

## La situazione italiana: siamo davvero sotto attacco?

La risposta è sì, e i numeri parlano chiaro. Nel **2024**, il Clusit ha registrato **357 attacchi gravi** contro organizzazioni italiane, con un incremento del **15,2% rispetto al 2023**. Una crescita continua che si inserisce in un trend allarmante: solo nel quinquennio 2020–2024, il numero complessivo di incidenti rilevati in Italia è **quasi decuplicato**, passando da 48 casi nel 2020 ai 357 attuali.

Ma ciò che più preoccupa è la **sproporzione tra l’impatto e la “dimensione” del nostro Paese**. Pur rappresentando solo lo **0,7% della popolazione mondiale** e circa l’**1,8% del PIL globale**, l’Italia ha subito il **10,1% di tutti gli attacchi informatici gravi noti nel mondo** nel 2024. Un dato allarmante, che ci posiziona tra i Paesi più colpiti in assoluto.

📊 **Immagine da includere**:
**Fig. 23 – Incidenti cyber in Italia 2020–2024**
(Evidenzia il salto da 70 incidenti nel 2021 ai 357 del 2024)

{{< blogfigure src="incidenti-cyber-italia-2024.png" alt="Distribuzione degli incidenti cyber in Italia nel periodo 2020-2024" caption="Distribuzione degli incidenti cyber in Italia nel periodo 2020-2024." >}}

📊 **Immagine da includere**:
**Fig. 25 – Incidenza degli incidenti in Italia rispetto al campione globale**
(Mostra la crescita costante del “peso” italiano nei dati globali)

{{< blogfigure src="incidenti-cyber-italia-vs-global.png" alt="Incidenza degli incidenti in Italia rispetto al campione globale - 2020-2024." caption="Incidenza degli incidenti in Italia rispetto al campione globale - 2020-2024." >}}

### Perché l’Italia è così esposta?

Il rapporto suggerisce alcune spiegazioni:

* **Digitalizzazione senza sicurezza**: molte imprese e pubbliche amministrazioni italiane hanno accelerato la trasformazione digitale (complice anche la pandemia) senza investire proporzionalmente nella sicurezza.
* **Cybercriminali sempre più abili**: grazie al modello “as-a-service”, gli strumenti di attacco sono diventati accessibili anche ai criminali meno esperti, moltiplicando i tentativi su scala.
* **Scarsa consapevolezza a livello di sistema-Paese**: in molti contesti, soprattutto tra le PMI, la cybersecurity non è ancora considerata un investimento strategico, ma un costo da ridurre al minimo.

### Che tipo di attacchi subiamo?

In Italia il **78% degli incidenti è attribuito al Cybercrime**, con tecniche come ransomware, phishing, malware e furto di credenziali. Il restante 22% è classificato come **Hacktivism**, spesso legato a conflitti internazionali e tensioni geopolitiche. A differenza di altri Paesi, in Italia non sono particolarmente rilevanti gli attacchi di spionaggio o guerra informatica di matrice statale (almeno tra quelli noti).

📊 **Approfondimento consigliato**:
**Fig. 26 – Tipologia di attaccanti in Italia nel 2024** (Cybercrime 78%, Hacktivism 22%)

{{< blogfigure src="attaccanti-italia-2024.png" alt="Attaccanti in Italia nel 2024." caption="Attaccanti in Italia nel 2024." >}}

### Un campanello d’allarme che non possiamo ignorare

Il quadro che emerge è chiaro: **l’Italia è vulnerabile** e rappresenta **un bersaglio privilegiato** per i cybercriminali, soprattutto quando si tratta di colpire realtà poco preparate. A fronte di questa evidenza, è urgente che aziende, enti pubblici e cittadini agiscano **non solo per reagire**, ma **per prevenire**.

Serve un cambio di mentalità: la sicurezza informatica non è un’opzione. È una priorità strategica per la sopravvivenza delle organizzazioni.


## Italia vs mondo: come stiamo messi?

Nel 2024, la cybersicurezza globale ha affrontato **una delle peggiori escalation di sempre**. Gli attacchi informatici noti sono cresciuti del **+27,4%** rispetto al 2023, raggiungendo il record storico di **3.541 incidenti gravi** a livello globale. La media è di **295 attacchi al mese**, quasi il doppio rispetto al 2020 (quando erano 156).

L’Italia, seppur con una crescita più contenuta **(+15,2%)**, continua a trovarsi **tra i Paesi più colpiti in assoluto**, confermando una posizione di vulnerabilità persistente. Con **357 attacchi** registrati, il nostro Paese ha subito oltre **un decimo di tutti gli incidenti noti al mondo**, un dato preoccupante in proporzione alla nostra dimensione economica e geopolitica.

📊 **Immagine da includere**:
**Fig. 28 – Distribuzione delle vittime italiane per categoria**

{{< blogfigure src="vittime-cybersecurity-italia-2024.png" alt="Distribuzione delle vittime in Italia nel 2024." caption="Distribuzione delle vittime in Italia nel 2024." >}}

### I settori italiani più colpiti

Una delle novità più sorprendenti del 2024 è il **sorpasso del settore News/Multimedia**, che balza in cima alla classifica delle vittime italiane con il **18% degli attacchi**. Il motivo? Un’impennata di attacchi “dimostrativi” legati a fenomeni di hacktivismo geopolitico, disinformazione e tentativi di manipolare l’opinione pubblica.

Seguono:

* 🏭 **Manufacturing (16%)**: un settore vitale per l’economia italiana, ma ancora troppo spesso sprovvisto di sistemi di difesa adeguati. Le aziende manifatturiere sono un bersaglio redditizio per i ransomware e l’estorsione.
* 🏛️ **Gov/Militare (10%)**: enti pubblici, comuni, ministeri, autorità sanitarie e forze dell’ordine restano obiettivi frequenti, spesso colpiti da attacchi DDoS o intrusioni con scopo dimostrativo o spionistico.
* 🚚 **Transportation/Storage (7%)** e **Professional/Scientific/Technical Services (6%)** completano la top 5 dei settori bersaglio.

Questi dati evidenziano come **nessun comparto possa più considerarsi “non interessante” per i criminali informatici**.


### Confronto internazionale: dove siamo rispetto agli altri?

* 🇫🇷 **Francia**: 4% degli attacchi globali
* 🇩🇪 **Germania**: 3%
* 🇬🇧 **Regno Unito**: 3%
* 🇮🇹 **Italia**: 10% (!)

Questa sproporzione non può essere spiegata solo da un maggiore livello di disclosure (cioè, il fatto che da noi si segnalano più incidenti rispetto ad altri Paesi). Si tratta piuttosto di un **indicatore di debolezza sistemica**: l’Italia è vista come un Paese in cui è facile ottenere risultati, per via della **scarsa preparazione media** e della **mancanza di cultura diffusa della sicurezza**.

### Un Paese troppo digitalizzato per essere fragile

Negli ultimi anni, l’Italia ha fatto grandi passi avanti nella digitalizzazione di servizi pubblici e processi aziendali. Ma **digitalizzare senza proteggere significa amplificare il rischio**. Il Rapporto Clusit conferma che **il gap tra digitalizzazione e cybersecurity è ancora troppo ampio**.

Per invertire la tendenza servono:

* Investimenti in formazione e cultura cyber (non solo tecnologia)
* Collaborazioni pubblico-privato per alzare il livello di difesa collettiva
* Un cambio di mentalità soprattutto nelle PMI, spesso viste come “anelli deboli” della supply chain

📣 *"Se l’Italia non rafforza la propria postura cyber, continuerà a essere il bersaglio preferito, non il danno collaterale."*
— Rapporto Clusit 2025

Fammi sapere se vuoi che prepari anche un'infografica con il confronto Italia/Europa/Mondo, o una sezione a parte sui settori che **sono usciti dalla top 5** ma restano comunque vulnerabili (come il finance).


Ecco l’espansione dettagliata della sezione **“Intelligenza Artificiale e Cybersecurity: alleata o minaccia?”**, con uno stile coinvolgente e orientato all’azione:


## Intelligenza Artificiale e Cybersecurity: alleata o minaccia?

Nel panorama della cybersicurezza del 2025, l’**Intelligenza Artificiale (AI)** gioca un ruolo sempre più centrale. È uno **strumento potentissimo**, ma anche **ambivalente**: può essere un’alleata formidabile nella difesa digitale, ma nelle mani sbagliate diventa un’arma devastante.

Il **Rapporto Clusit 2025** lo sottolinea chiaramente: l’AI è un **moltiplicatore di potenza**, sia per chi attacca che per chi difende.


### Come viene usata l’AI dai cybercriminali?

I criminali informatici stanno integrando l’AI nei loro arsenali in modo sempre più raffinato. Alcuni degli usi principali includono:

* **Phishing automatizzato e personalizzato**: grazie al Natural Language Processing (NLP), l’AI può generare email di phishing più credibili, simulate sulla base del linguaggio tipico di un’azienda o del profilo di una vittima.
* **Rilevamento e sfruttamento di vulnerabilità**: i modelli AI possono analizzare codice e reti per individuare falle in tempo reale e suggerire exploit.
* **Deepfake e voice cloning**: strumenti in grado di creare video o audio realistici utilizzati per truffe, frodi o campagne di disinformazione.
* **Malware polimorfico**: software malevoli che cambiano automaticamente aspetto o comportamento per eludere le difese tradizionali.

📉 Risultato? Più attacchi, più mirati, più difficili da intercettare, anche per chi ha già soluzioni di sicurezza in atto.


### Come può l’AI diventare un alleato nella difesa?

Fortunatamente, le stesse tecnologie possono (e devono) essere usate anche **per proteggere**:

* **Rilevamento delle minacce in tempo reale**: l’AI analizza milioni di log e segnali in pochi secondi, rilevando pattern anomali o segnali di compromissione invisibili all’occhio umano.
* **Prevenzione e risposta automatizzata (EDR/XDR)**: strumenti alimentati da AI possono isolare una macchina compromessa, bloccare una connessione sospetta o eseguire azioni correttive immediatamente.
* **Protezione degli ambienti cloud e ibridi**: con l’aumento della complessità dei sistemi IT, l’AI è in grado di offrire una “mappa dinamica” del rischio in ambienti distribuiti e multi-cloud.
* **Riduzione dei falsi positivi**: uno dei problemi principali della sicurezza tradizionale è la quantità di allarmi inutili. L’AI migliora la qualità delle segnalazioni, aiutando gli analisti a concentrarsi solo su quelle critiche.


### Rischio o opportunità? Dipende da chi agisce prima

Il vero punto non è se l’AI sia buona o cattiva. È **chi la adotta per primo**, e con quali risorse. Se le imprese italiane, in particolare le PMI, rimangono indietro, i criminali avranno sempre il vantaggio.

💡 **Il Clusit suggerisce una chiave fondamentale**: non è più sufficiente dotarsi di strumenti “tradizionali” di sicurezza. Serve **una postura proattiva, intelligente, adattiva**. E l’AI, se ben addestrata e governata, può fare la differenza.

📚 **Riferimento utile nel Rapporto Clusit**:
**“Intelligenza Artificiale nella Cybersecurity: opportunità e minacce” – pag. 177**

👉 In questa sezione, Palo Alto Networks analizza come l’AI stia trasformando la sicurezza IT, tra evoluzione delle minacce e nuovi paradigmi difensivi.


🎯 *Vuoi un consiglio pratico?*
Inizia con un assessment delle tue soluzioni attuali: quante sfruttano già l’AI? Sono aggiornate? I tuoi fornitori la stanno implementando seriamente?

L’AI è già qui. Sta a te decidere se subirla o sfruttarla.

Ecco l’espansione dettagliata della sezione **“I settori più attaccati: chi è davvero nel mirino?”** per il tuo articolo, con approfondimenti, tendenze e spunti pratici:


## I settori più attaccati: chi è davvero nel mirino?

Il cybercrime non colpisce più “a caso”. Anzi, **sceglie con estrema attenzione le sue vittime**, mirando dove può ottenere il massimo impatto – economico, politico o sociale. Secondo il **Rapporto Clusit 2025**, nel 2024 gli attacchi si sono concentrati su tre categorie principali, che da sole rappresentano **quasi la metà** del totale:

* 🎯 **Multiple Targets (18%)**
  Attacchi massivi e indiscriminati, spesso veicolati tramite campagne di phishing, ransomware o botnet, che colpiscono più aziende o settori contemporaneamente. Questi attacchi mirano a massimizzare i guadagni colpendo centinaia di bersagli in parallelo.

* 🏛️ **Governi, Forze Armate e Forze dell’Ordine (13%)**
  Settori istituzionali e sensibili, sempre più nel mirino per motivi geopolitici, sabotaggio, spionaggio o dimostrazioni di forza da parte di attivisti e gruppi state-sponsored. Gli attacchi qui spesso mirano alla paralisi di servizi essenziali o alla sottrazione di dati strategici.

* 🏥 **Sanità (13%)**
  Un settore sempre più critico, reso vulnerabile dalla digitalizzazione rapida e dalla mancanza di adeguate difese. I dati sanitari hanno un valore elevatissimo nel dark web e le strutture ospedaliere sono particolarmente esposte al rischio di ransomware.

📊 **Immagine da includere**:
**Fig. 5 – Distribuzione delle vittime nel 2024**
(Rappresentazione visuale dell’incidenza percentuale per ciascun settore)
{{< blogfigure src="vittime-cybersecurity-globali-2024.png" alt="Distribuzione della tipologia di vittime nel 2024." caption="Distribuzione della tipologia di vittime nel 2024." >}}


### I settori in crescita: chi sta salendo in classifica?

Oltre ai “soliti noti”, il 2024 ha visto una **forte crescita degli attacchi** anche in altri comparti strategici:

* 📈 **Education (+43%)**
  Università, scuole, centri di ricerca: vittime ideali per attacchi a scopo di furto di proprietà intellettuale o per la scarsa sicurezza interna. La crescita è stata vertiginosa.

* 🏭 **Manifattura (+38%)**
  Sempre più digitalizzata (grazie a Industria 4.0), ma non altrettanto protetta. I sistemi OT (Operational Technology) sono bersagli ideali per sabotaggi o estorsioni.

* 🧪 **Professional / Scientific / Technical (+40%)**
  Studi professionali, società di consulenza e ingegneria sono sotto pressione per l’alto valore dei dati gestiti e per essere spesso “anelli deboli” nella supply chain dei grandi clienti.

* 🛍️ **Wholesale / Retail (+92%)**
  Settore particolarmente colpito per la combinazione di e-commerce, transazioni digitali e carenza di sistemi avanzati di difesa. Il retail è diventato un bersaglio di alto valore per il furto di dati di pagamento.

📊 **Immagine da includere**:
**Fig. 6 – Top 10 vittime in 2020–2024**
(Utile per mostrare l’evoluzione temporale degli attacchi per categoria)

{{< blogfigure src="tipologie-vittime-globali-2020-2024.png" alt="- Distribuzione delle prime 10 tipologie di vittime dal 2020 al 2024." caption="- Distribuzione delle prime 10 tipologie di vittime dal 2020 al 2024." >}}



### Quali settori stanno migliorando?

Non mancano alcune **note positive**:

* Il settore **Finance/Insurance** ha registrato un **calo del 16%** negli incidenti. Questo potrebbe essere un primo effetto tangibile delle nuove regolamentazioni sulla resilienza operativa digitale, come **DORA** e le normative NIS.
* Anche l’**ICT (-10%)**, da sempre in cima alla lista delle vittime, ha visto un leggero miglioramento, probabilmente dovuto all’adozione progressiva di difese avanzate e al ruolo di avanguardia del settore.

### Nessuno è immune: anche i “piccoli” finiscono nel mirino

Il dato forse più importante da comprendere è questo: **nessun settore può considerarsi escluso**. Attività culturali, trasporti, energia, agricoltura, ospitalità... tutti sono stati colpiti, anche se con incidenze minori. La trasversalità del cybercrime rende essenziale che **ogni organizzazione, a prescindere dal settore o dalla dimensione, investa in prevenzione**.


🎯 *"Non importa chi sei, ma quanto sei esposto. Se hai dati digitali, sei un bersaglio."*
— Rapporto Clusit 2025


## NIS2: cos’è e perché riguarda anche te

Nel 2025 entrerà pienamente in vigore la **Direttiva NIS2**, la nuova normativa europea che rivoluziona il concetto di responsabilità digitale per aziende ed enti pubblici. A differenza della precedente direttiva NIS (Network and Information Security), che interessava solo un numero limitato di infrastrutture critiche, la NIS2 **estende il perimetro in modo molto ampio**, coinvolgendo anche **molte PMI** e realtà del settore privato.

**Se pensi che “non ti riguardi”, potresti scoprire il contrario.**


### Cos'è esattamente la NIS2?

La NIS2 (Direttiva UE 2022/2555) è la risposta dell’Unione Europea alla crescita esponenziale delle minacce informatiche, e ha un obiettivo preciso: **innalzare in modo uniforme la resilienza cibernetica** di tutti gli Stati membri.

Questa direttiva:

* Amplia il numero di **settori obbligati ad adottare misure minime di sicurezza** (tra cui sanità, energia, trasporti, telecomunicazioni, produzione critica, servizi digitali, pubblica amministrazione, etc.)
* Estende gli obblighi a **aziende medio-piccole** che, pur non essendo “grandi imprese”, svolgono attività essenziali o importanti per l’economia e la società.
* Rafforza il potere di **vigilanza e sanzione delle autorità competenti** (in Italia, probabilmente l’ACN – Agenzia per la Cybersicurezza Nazionale)


### Cosa prevede la NIS2?

Le organizzazioni che rientrano tra i soggetti obbligati dovranno:

🔒 **Adottare misure tecniche e organizzative** per la gestione del rischio (es. firewall, backup, crittografia, gestione accessi, formazione interna)

📢 **Notificare obbligatoriamente ogni incidente di sicurezza grave** entro **24 ore** dalla scoperta, pena sanzioni

📋 **Condurre valutazioni regolari dei rischi** e avere un piano documentato di gestione e risposta agli incidenti

👩‍⚖️ **Designare un responsabile interno per la sicurezza delle informazioni**

💶 **Affrontare sanzioni fino al 2% del fatturato annuo**, in caso di violazioni gravi o ripetute


### E se sei una PMI?

La NIS2 non è una normativa solo per le “grandi aziende”. Le **PMI che operano in settori considerati “essenziali” o “importanti”**, o che fanno parte di filiere strategiche (es. fornitori di servizi sanitari, digitali, produttori industriali), **possono rientrare tra gli obbligati** anche se non superano i 250 dipendenti.

📌 **Attenzione**: se fornisci servizi a un’azienda soggetta a NIS2, **potresti comunque essere coinvolto** attraverso obblighi contrattuali, audit o controlli di conformità.


### Perché agire subito?

Molte organizzazioni si stanno ancora chiedendo se saranno toccate dalla direttiva. Il problema è che **aspettare può costare caro**, sia in termini di sanzioni che di reputazione.

💡 **Consiglio pratico**:
Inizia oggi un **assessment dei tuoi rischi digitali**. Mappa i tuoi asset critici, verifica le vulnerabilità, e definisci un piano d’azione per rafforzare la sicurezza, con o senza obbligo formale.

🔎 Hai meno di 250 dipendenti?
Verifica comunque se operi in un **settore strategico** o se sei **fornitore di clienti “NIS2”**: potresti essere indirettamente coinvolto.


📚 **Sezione utile del Rapporto Clusit**:
*“Cybersecurity in sanità: incidenti in crescita e nuove misure di protezione e sanzioni con NIS2” – pag. 185*
In questo capitolo si mostra come proprio il settore sanitario – tra i più colpiti – sia tra i primi ad adeguarsi alla direttiva, spesso sotto la pressione diretta degli attacchi.


⚠️ *"Con la NIS2, la cybersecurity non è più una buona pratica. È un obbligo legale."*
— Rapporto Clusit 2025

## Le PMI italiane sono pronte?

Purtroppo, la risposta è **no**.

Le **micro, piccole e medie imprese (mPMI)** costituiscono la spina dorsale dell’economia italiana, ma in materia di **cybersecurity**, restano **drammaticamente indietro**. Questo le rende bersagli perfetti per i cybercriminali, che spesso preferiscono colpire realtà meno strutturate per ottenere risultati rapidi e, talvolta, catene di accesso ad aziende più grandi.

Nel **Rapporto Clusit 2025**, viene pubblicata un’importante **indagine realizzata dai PID delle Camere di Commercio italiane**, in collaborazione con DINTEC, Unioncamere, ENEA e il CNR, attraverso lo strumento **PID Cyber Check**. Il quadro che emerge è preoccupante.


### Cosa ci dice l'indagine?

Le evidenze raccolte su centinaia di aziende mostrano che:

* ❌ **Più del 50% non ha una policy di sicurezza informatica formalizzata**
* ❌ **Il 60% non ha mai fatto un vulnerability assessment** (cioè una valutazione tecnica delle proprie vulnerabilità)
* ❌ **Quasi il 70% non fa formazione specifica per il personale**
* ❌ **In pochissimi casi esistono piani di risposta agli incidenti o backup verificati**

In sostanza, le PMI italiane **non hanno strumenti concreti per reagire a un attacco**, né tantomeno per prevenirlo.

📊 **Suggerimento immagine**:
Grafico dal PID Cyber Check che mostra il livello medio di maturità cyber delle PMI (si evidenzia una prevalenza nelle fasce basse)


### Perché le PMI sono nel mirino?

I cybercriminali scelgono obiettivi che:

* Hanno **dati di valore** (clienti, ordini, fatture, accessi bancari)
* Sono **poco protetti**
* Hanno **pochi strumenti di reazione**
* Possono essere sfruttati per attaccare i clienti più grandi (effetto “cavallo di Troia” nella supply chain)

Le PMI italiane, spesso con infrastrutture obsolete, personale non formato e un approccio “fai da te”, rispondono perfettamente a questo profilo.

### Eppure difendersi si può (anche con risorse limitate)

Contrariamente a quanto si pensa, **proteggersi non richiede investimenti milionari**. Anche con budget contenuti, una PMI può fare molto:

* Implementare **backup sicuri e testati**
* Abilitare **l’autenticazione a più fattori (MFA)**
* Affidarsi a **servizi gestiti (MSSP)** per il monitoraggio e la protezione di base
* Formare i dipendenti con **moduli e simulazioni anti-phishing**
* Creare una **policy minima ma chiara** di gestione della sicurezza

💡 **Consiglio pratico**:
Se sei una PMI, inizia con il **PID Cyber Check** gratuito offerto dalle Camere di Commercio: è un primo passo semplice per capire dove sei esposto.


📚 **Sezione utile del Rapporto Clusit**:
*“Cybersecurity nelle mPMI: un quadro aggiornato dai dati del PID Cyber Check” – pag. 203*

📣 *"Le PMI sono la colonna vertebrale dell’Italia. Ma senza cybersecurity, rischiano il collasso al primo colpo."*
— Rapporto Clusit 2025

## Le PMI italiane sono pronte?

### (Spoiler: purtroppo, no)

In un Paese dove il **95% del tessuto economico è costituito da micro e piccole imprese**, la **cybersecurity non può più essere un lusso da grandi aziende**. Tuttavia, secondo quanto riportato nella **survey pubblicata nel Rapporto Clusit 2025**, la **stragrande maggioranza delle PMI italiane è impreparata a fronteggiare anche le minacce digitali più basilari**.

L’indagine si basa su oltre 2.000 audit effettuati dai **PID (Punti Impresa Digitale)** delle Camere di Commercio, utilizzando lo strumento di autovalutazione **PID Cyber Check** – sviluppato in collaborazione con DINTEC, IIT-CNR, ENEA e Unioncamere. I risultati evidenziano una **maturità cyber ancora troppo bassa**.


### Cosa manca alle PMI italiane?

Ecco alcuni dati chiave tratti dall’indagine:

* 🔒 **Mancanza di policy formalizzate**
  Oltre il **50% delle PMI non ha una politica di sicurezza informatica**, nemmeno a livello elementare. Nessuna regola scritta su password, backup, aggiornamenti o gestione degli accessi.

* 🧠 **Assenza di formazione per il personale**
  Circa **il 70% delle imprese non ha mai formato i propri dipendenti** sui rischi informatici, lasciando le persone – spesso il primo vettore d’attacco – completamente esposte a truffe, phishing e uso improprio degli strumenti aziendali.

* 🛠️ **Zero analisi del rischio o vulnerability assessment**
  Il **60% delle aziende non ha mai fatto una valutazione tecnica delle proprie vulnerabilità**. Ciò significa che non sanno nemmeno “dove sono fragili”.

📊 **Immagine suggerita da includere**:
*Grafico dal PID Cyber Check che mostra il livello medio di maturità delle PMI italiane – con percentuali molto elevate nei livelli “basso” o “molto basso”.*


### Perché le PMI sono diventate obiettivi preferenziali?

I cybercriminali hanno capito che le PMI:

* Hanno **dati preziosi**, ma spesso **non li proteggono**
* Non investono in difese strutturate
* Non hanno personale IT interno
* **Pagano i riscatti**, perché fermare l’operatività anche solo per 48 ore può significare perdita di clienti, ordini, reputazione

Attaccare una PMI **è spesso più semplice** che attaccare una grande azienda. E a volte, **serve proprio per entrare nella supply chain** di un fornitore più grande.


### Il rischio non è solo tecnico. È economico.

Un attacco informatico, anche piccolo, può avere **conseguenze disastrose** per una PMI:

* Fermare la produzione o l’operatività per giorni
* Perdere dati di clienti e ordini
* Subire danni reputazionali
* Esporsi a **sanzioni legali (es. GDPR)**
* Dover **chiudere l’azienda**, in casi estremi

Secondo il Clusit, il costo medio di un attacco ransomware a una PMI italiana può arrivare a **100.000 euro** (tra danni diretti e indiretti). Una cifra che per molte microimprese **significa non rialzarsi più**.


### Cosa fare? Iniziare è più semplice di quanto pensi

Non servono milioni di euro per alzare le difese. Ecco 5 azioni che **anche una piccola impresa può attivare subito**:

1. ✅ **Usa password forti e abilita l’autenticazione a due fattori**
2. ✅ **Fai backup regolari e testali**
3. ✅ **Aggiorna software e sistemi operativi**
4. ✅ **Fai almeno una formazione base sul phishing**
5. ✅ **Compila gratuitamente il PID Cyber Check**: in 30 minuti scopri il tuo livello di rischio

📚 **Sezione utile nel Rapporto Clusit**:
*“Cybersecurity nelle mPMI: un quadro aggiornato dall’analisi dei dati del PID Cyber Check” – pag. 203*

📣 *“La cybersecurity non è un optional. È sopravvivenza aziendale.”*
— Rapporto Clusit 2025


## Quanto può costare un attacco?

Molte imprese, soprattutto tra le PMI, sottovalutano l’impatto economico di un attacco informatico. Ma la realtà è che **un singolo incidente può mettere in ginocchio un’intera azienda**, anche se non si tratta di un attacco “sofisticato”.

Il **Rapporto Clusit 2025** evidenzia che i danni non si limitano al solo aspetto tecnico. Un cyber attacco può innescare **un effetto domino** devastante su tutta la struttura aziendale, con costi spesso insostenibili per le imprese meno preparate.

### Quali sono i costi reali?

Ecco le principali **voci di danno** che un’impresa può subire a seguito di un attacco:

🛑 **Fermi operativi prolungati**
Quando un ransomware o un attacco DDoS colpisce, l’azienda può restare bloccata **per giorni o settimane**, senza accesso ai sistemi gestionali, ai database clienti, alla contabilità o ai magazzini. Ogni giorno perso equivale a **mancati guadagni e ritardi a catena**.

💰 **Riscatti da pagare**
Nel caso di ransomware, gli attaccanti spesso chiedono **decine o centinaia di migliaia di euro** per decriptare i file. Pagare non garantisce la restituzione dei dati, ma **non pagare può significare perderli per sempre**.

📉 **Danni reputazionali**
Clienti, fornitori e stakeholder perdono fiducia in un’azienda colpita da un attacco, soprattutto se i dati sono stati trafugati o pubblicati. Questo può tradursi in **perdita di contratti, clienti storici e nuovi opportunità di business**.

⚖️ **Sanzioni legali e multe (es. GDPR)**
Se i dati personali dei clienti vengono violati e l’azienda non dimostra di aver adottato misure adeguate, può essere soggetta a **multe fino al 4% del fatturato annuo**, come previsto dal GDPR.

💻 **Costi di ripristino tecnico e legale**
Dopo un attacco, servono esperti per recuperare i sistemi, analizzare l’incidente, proteggere l’infrastruttura e gestire la comunicazione di crisi. Anche solo questo può costare **decine di migliaia di euro**.


### E per una PMI, quanto può costare tutto questo?

Il **Rapporto Clusit** stima che per una PMI italiana il costo medio di un attacco informatico grave può raggiungere **fino a 100.000 euro**, considerando solo:

* Interruzione delle attività
* Danni ai sistemi e dati persi
* Costi di consulenza e recupero
* Potenziali sanzioni amministrative

Per molte microimprese, questa cifra **equivale a diversi mesi (o anni) di margine operativo**. Non è raro che un attacco di questo tipo porti a:

* Licenziamenti
* Chiusura temporanea dell’attività
* Mancata consegna di commesse strategiche
* In casi estremi: fallimento

📊 **Immagine utile da includere**:
**Fig. 12 – Distribuzione della severity degli incidenti nel 2024**
(Evidenzia che oltre il 60% degli attacchi globali è classificato come “di impatto critico o elevato”)

{{< blogfigure src="severity-attacchi-cybersecurity-2024.png" alt="Distribuzione della Severity nel 2024." caption="Distribuzione della Severity nel 2024." >}}


### Il costo della prevenzione è inferiore a quello della reazione

La buona notizia? Molti di questi costi possono essere **evitati** o **drasticamente ridotti** con:

* Sistemi di backup funzionanti
* Procedure di risposta agli incidenti
* Formazione di base al personale
* Soluzioni di sicurezza minime ma efficaci
* Assicurazione cyber (in casi specifici)

💡 Una buona strategia di difesa **può costare meno di un mese di fermo aziendale**, eppure molte aziende ancora non agiscono.


📣 *“Nel 2025, chi considera la cybersecurity un costo si accorgerà troppo tardi che è il prezzo da pagare per la propria sopravvivenza.”*
— Rapporto Clusit 2025

## La minaccia alla supply chain

### Se colpiscono te, colpiscono tutti

Nel contesto attuale della cybersicurezza, **la vulnerabilità non è più solo individuale, ma collettiva**. Un attacco che colpisce una **singola azienda**, anche piccola, può avere **effetti a cascata sull’intera filiera produttiva e commerciale**. Questo vale soprattutto nel sistema italiano, dove **le PMI rappresentano spesso nodi chiave nella supply chain di grandi imprese o enti pubblici**.

Il **Rapporto Clusit 2025**, nel capitolo dedicato alla protezione della supply chain (pag. 305), è molto chiaro:

> *“Un’impresa non può più considerarsi protetta se non lo sono anche i suoi fornitori.”*


### Perché la tua azienda è un bersaglio… anche se sei piccolo

I cybercriminali hanno capito che **le grandi aziende hanno difese solide**, spesso presidiate da team di cybersecurity interni. Per questo, puntano a **penetrare da un ingresso secondario**: un fornitore più piccolo, meno protetto, magari con accesso remoto ai sistemi centrali (via VPN, ERP condivisi, e-mail).

Ecco alcuni scenari tipici:

* Un piccolo studio tecnico subisce un attacco e, senza saperlo, diventa veicolo di malware verso il cliente industriale principale.
* Un fornitore di servizi cloud locale viene violato, esponendo i dati di decine di clienti più grandi.
* Un consulente con accessi amministrativi ai server di una PA viene compromesso, permettendo un attacco mirato ai sistemi centrali.

💥 In questi casi, **la PMI diventa inconsapevolmente “l’anello debole” che apre la porta agli aggressori**.


### La normativa ti chiede di vigilare (anche sui fornitori)

Con l’entrata in vigore della **direttiva NIS2**, molte organizzazioni saranno obbligate a **verificare il livello di sicurezza dei propri fornitori e partner**. Questo significa che:

* Le PMI fornitrici potrebbero dover **sottoporsi ad audit di sicurezza**
* Saranno sempre più frequenti le **clausole contrattuali sulla protezione dei dati e la gestione degli incidenti**
* Chi non si adegua, **rischia di essere escluso da appalti e commesse**

In altre parole: **la sicurezza digitale diventa anche un fattore competitivo.**


### Come proteggere la tua supply chain (anche da PMI)?

Ecco alcune azioni concrete che ogni impresa può avviare oggi stesso:

1. 🤝 **Mappa i fornitori critici**: chi ha accesso ai tuoi sistemi? Chi gestisce dati sensibili?
2. 🧾 **Stabilisci requisiti minimi di sicurezza** nei contratti
3. 🔐 **Chiedi ai tuoi fornitori un’autovalutazione (es. PID Cyber Check)**
4. 🧪 **Verifica regolarmente gli accessi esterni e i permessi IT**
5. 📢 **Condividi con i tuoi partner aggiornamenti su minacce e buone pratiche**

💡 **Bonus**: se sei tu fornitore, dimostrare di avere una buona postura di sicurezza **può diventare un vantaggio commerciale**, in grado di differenziarti dalla concorrenza.


📚 **Sezione utile del Rapporto Clusit**:
*“Proteggere la Supply Chain – pag. 305”*
Un’analisi approfondita dei rischi di interconnessione tra imprese e delle contromisure più efficaci, anche per realtà con risorse limitate.


📣 *“Oggi non basta proteggere il proprio perimetro. Bisogna blindare l’intera catena.”*
— Rapporto Clusit 2025

## Il futuro della cybersecurity: cosa ci attende nel 2035?

Come sarà il nostro lavoro, e soprattutto la nostra **vita digitale**, nel 2035?
A questa domanda cerca di rispondere una delle sezioni più visionarie e stimolanti del **Rapporto Clusit 2025**: **“CyberFutures – Come sarà il nostro lavoro nel 2035?”** (pag. 213), una riflessione corale a più voci – esperti, accademici, responsabili aziendali – su come l’evoluzione tecnologica e la cybersicurezza plasmeranno il nostro futuro.


### Un mondo (ancora più) connesso. E vulnerabile.

Nel 2035 vivremo in un ecosistema **iperconnesso** e **completamente digitale**, dove:

* Dispositivi IoT saranno integrati in ogni contesto, dal lavoro alla sanità
* L’**Intelligenza Artificiale** sarà incorporata in ogni processo decisionale
* La **realtà aumentata e virtuale** sarà parte della routine lavorativa e relazionale
* Le **aziende saranno sempre più distribuite e cloud-native**

Ma a questo scenario entusiasmante si accompagna un livello di **rischio senza precedenti**: più connettività significa **più superfici di attacco**, più dati sensibili da proteggere, **più dipendenza dalle tecnologie critiche**.


### Nascono nuove professioni. E nuove responsabilità.

Il lavoro nel 2035 sarà dominato da **competenze ibride**. Le figure professionali più richieste non saranno né solo tecniche né solo manageriali, ma capaci di:

* Comprendere gli aspetti tecnologici **e** le implicazioni etiche, normative, strategiche
* Parlare con l’AI, usarla, verificarla e difenderla
* Gestire scenari complessi, in cui **cybersecurity, sostenibilità e resilienza** sono inscindibili

📌 *Esempi di profili emergenti:*

* **Cyber Risk Strategist**
* **AI Governance Analyst**
* **Digital Ethics Officer**
* **Resilience Architect**
* **Zero Trust Consultant**

In questo scenario, anche il concetto stesso di “cybersecurity” evolverà in qualcosa di più ampio: **cyberresilienza integrata**, ovvero la capacità di prevedere, adattarsi, rispondere e migliorare costantemente sotto attacco.


### Competenze trasversali: la vera chiave

Gli esperti evidenziano che non basterà **sapere usare gli strumenti**, ma sarà fondamentale:

* Allenare il **pensiero critico**
* Comprendere le **interconnessioni tra settori, dati e persone**
* Saper collaborare in team multidisciplinari e globali
* **Adattarsi rapidamente** al cambiamento continuo

In breve: la **cybersecurity sarà sempre più un tema culturale**, oltre che tecnologico.


### Una sfida per l’Italia: investire oggi per non restare indietro

Se l’Italia vuole restare competitiva, deve **iniziare oggi a formare le competenze del 2035**. Questo significa:

* Investire su **education digitale nelle scuole e nelle università**
* Sostenere **la riqualificazione continua** dei lavoratori (reskilling e upskilling)
* Valorizzare **l’integrazione tra discipline STEM e umanistiche**
* Creare ecosistemi regionali capaci di innovare e proteggersi insieme

📚 **Sezione utile del Rapporto Clusit**:
*“CyberFutures. Come sarà il nostro lavoro nel 2035?” – pag. 213*
Un affresco visionario e concreto sulle professioni, le sfide e le responsabilità che ci attendono tra dieci anni.

🎯 *“Il futuro della cybersecurity non è solo questione di firewall. È questione di cultura, collaborazione e coraggio.”*
— Rapporto Clusit 2025

Certo! Ecco l’espansione completa e motivazionale della sezione **“Conclusione: cosa puoi fare oggi per proteggere la tua azienda”**, con tono concreto e orientato all’azione:

## Conclusione: cosa puoi fare oggi per proteggere la tua azienda

### Non aspettare l’attacco. Inizia a difenderti ora.

Dopo aver letto dati, scenari e rischi reali riportati dal **Rapporto Clusit 2025**, dovrebbe essere chiaro che la **cybersecurity non è più un tema tecnico da delegare all’IT**. È un **fattore di sopravvivenza per ogni azienda**, grande o piccola che sia.

La buona notizia è che **molto si può fare**, anche con risorse limitate, per iniziare **subito a ridurre il rischio**.


### ✅ Ecco 5 azioni concrete da avviare subito:

1. 🩺 **Fai un check-up della tua sicurezza digitale**
   Parti da un'autovalutazione come il **PID Cyber Check** (gratuito, fornito dalle Camere di Commercio). Ti aiuterà a capire dove sei esposto e quali aree migliorare, anche se non sei un esperto.

2. 👩‍🏫 **Forma il tuo personale**
   La maggior parte degli attacchi parte da un clic sbagliato. Bastano brevi sessioni di formazione sul phishing, la gestione delle password e il comportamento digitale sicuro per ridurre enormemente i rischi.

3. 📄 **Predisponi un piano di incident response**
   Cosa succede se vieni attaccato domani? Chi fa cosa? Dove sono i backup? Quali sistemi vanno spenti o isolati? Un piano scritto, anche semplice, fa la differenza quando conta davvero.

4. 🛡️ **Proteggi i tuoi endpoint e monitora i sistemi**
   Installa soluzioni di sicurezza affidabili su tutti i dispositivi (computer, server, smartphone), attiva l’autenticazione a due fattori (MFA), tieni aggiornato tutto il software e, se possibile, monitora i log di accesso.

5. 📋 **Valuta se rientri tra i soggetti NIS2**
   Se operi in settori strategici, sei fornitore di enti pubblici o di aziende medio-grandi, **potresti avere obblighi di legge** (anche se sei una PMI). Informati ora e preparati in anticipo.


### 🔁 In sintesi: agire in modo semplice, ma sistemico

Non serve trasformarsi in un esperto di sicurezza informatica. Serve **consapevolezza**, **metodo**, e la volontà di **mettere in sicurezza ciò che oggi è il cuore di ogni impresa: i dati, i processi e le persone.**

💬 *“La cybersecurity non è più solo un tema IT. È un tema di sopravvivenza aziendale.”*
— Rapporto Clusit 2025


### 👇 Bonus: vuoi un punto di partenza pratico?

Scarica o richiedi il **PID Cyber Check** dal sito della tua Camera di Commercio. È gratuito, veloce, e può fare da bussola per tutte le altre azioni. E se hai dubbi, rivolgiti a un professionista di fiducia: **la sicurezza non è un costo, è un investimento.**
