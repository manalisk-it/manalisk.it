---
title: "La situazione della Cybersecurity in Italia - Analisi del Report Clusit 2025"
description: "In questo articolo analizziamo i principali dati del Rapporto Clusit 2025 sulla sicurezza informatica, con un focus sull'Italia e sulle PMI. Parleremo dei settori più colpiti dai cyber attacchi, del ruolo dell'Intelligenza Artificiale, degli obblighi introdotti dalla direttiva europea NIS2, e dei costi (spesso sottovalutati) di un incidente informatico. Approfondiamo la situazione della cybersecurity in Italia, capendo cosa si rischia e come proteggersi."
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

**Nota**: Le immagini riportate in questo articolo provengono dal report Clusit 2025 consultabile al seguente link: [Report Clusit 2025](https://clusit.it/rapporto-clusit/)



## Chi è Clusit e da dove provengono i dati?

Il **Clusit - Associazione Italiana per la Sicurezza Informatica** è l'organizzazione di riferimento in Italia per la promozione della cultura della cybersecurity. È composto da esperti, accademici, aziende, istituzioni e professionisti del settore, ed è noto per il suo impegno nella divulgazione, nella formazione e nel supporto a imprese e pubbliche amministrazioni nella comprensione dei rischi cyber e delle strategie di protezione.

Da ormai 13 edizioni, Clusit pubblica annualmente il **Rapporto Clusit sulla Sicurezza ICT in Italia e nel Mondo**, considerato una **fonte autorevole e indipendente** a livello nazionale, punto di riferimento per giornalisti, decisori pubblici, dirigenti aziendali, consulenti e accademici.

Il report fornisce un'analisi quantitativa e qualitativa dei principali incidenti di cybersecurity noti a livello nazionale e globale, interpretando i dati alla luce dei trend tecnologici, geopolitici e normativi. Nel report sono spesso incluse riflessioni di esperti, case study e raccomandazioni pratiche.

### Quali sono le fonti di dati?

Il Clusit utilizza solo fonti verificate che rendano il report **affidabile e trasparente**. In particolare in questa edizione sono riportati i dati provenienti da:

* **Fonti pubbliche certificate**, come comunicati stampa, rapporti ufficiali e database di incidenti confermati.
* **Security Operation Center (SOC) di Fastweb**, che fornisce dati tecnici e trend specifici in Italia, basati su monitoraggi attivi e incidenti realmente accaduti.
* **Polizia Postale e per la Sicurezza Cibernetica**, che contribuisce con segnalazioni, report di attività investigative e osservazioni operative sul territorio nazionale.
* **Sondaggio e analisi sulle micro, piccole e medie imprese (mPMI)**, realizzate in collaborazione con DINTEC, Unioncamere, IIT-CNR e Camere di Commercio.
* **Collaborazioni con aziende e centri di competenza** come Cisco, Palo Alto Networks, CrowdStrike, Netwrix, e Fortinet.

## Panoramica globale sulla Cybersecurity

Gli attacchi di cybersecuirty sono sempre più frequenti a livello globale. La Figura 1 mostra l'andamento degli attacchi **noti** (molto spesso le aziende non sono a conoscenza degli attacchi subiti!) e di particolare gravità tra il 2020 e il 2024. Si vede chiaramente come gli incidenti globali siano quasi raddoppiati, passati da 1.874 nel 2020 a 3.541 nel 2024, ossia un **+89%**. Di questi attacchi, circa **9 su 10 sono condotti da cybercriminali**, dimostrando come la criminalità organizzata stia puntando sempre di più allo spazio informatico. L'8% degli attacchi è condotto invece da Hacktivisti (Attivisti che operano tramite hacking, ad esempio *Anonymous*) contro organizzazioni politiche e governative. 

{{< blogfigure src="incidenti-cybersecurity-2020-2024.png" alt="Andamento degli incidenti cyber nel periodo 2020-2024." caption="Figura 1. Andamento degli incidenti cyber nel periodo 2020-2024." >}}

Tra i continenti più colpiti troviamo l'America al 35%, l'Europa al 30%, e l'Asia al 12%. Molti attacchi comprendono diverse regioni (17% dei casi), mentre la regione meno colpita e l'Africa. Tra le **modalità di attacco più comuni**, mostrate in Figura 2, troviamo **Malware** (Software malevolo, 32%), sfruttamento di **vulnerabilità** (15%) e attacchi **DDoS** (impedire il corretto funzionamento del sistema informatico, 8%). Anche il **Phishing** ha un ruolo sempre crescente nella panoramica degli attacchi, dove viene sfruttato l'errore umano,  che sappiamo essere l'anello più debole della catena. 

{{< blogfigure src="tecniche-attacchi-cybersecurity-globali-2024.png" alt="Distribuzione delle tecniche di attacco." caption="Figura 2. Distribuzione delle tecniche di attacco." >}}


## La situazione italiana: attacchi in costante aumento

Nel **2024**, il Clusit ha registrato **357 attacchi gravi** contro organizzazioni italiane, con un incremento del **15,2% rispetto al 2023**. Una crescita continua che si inserisce in un trend allarmante: solo nel quinquennio 2020-2024, il numero complessivo di incidenti rilevati in Italia è **quasi decuplicato**, passando da 48 casi nel 2020 ai 357 attuali, come mostrtato in Figura 3.


{{< blogfigure src="incidenti-cyber-italia-2024.png" alt="Distribuzione degli incidenti cyber in Italia nel periodo 2020-2024" caption="Figura 3. Distribuzione degli incidenti cyber in Italia nel periodo 2020-2024.">}}

Ma ciò che più preoccupa è la **sproporzione tra l'impatto e la "dimensione" del nostro Paese**. Pur rappresentando solo lo **0,7% della popolazione mondiale** e circa l'**1,8% del PIL globale**, l'Italia ha subito il **10,1% di tutti gli attacchi informatici gravi noti nel mondo** nel 2024, come mostrato in Figura 4. Un dato allarmante, che ci posiziona tra i Paesi più colpiti in assoluto. Infatti, altri paesi Europei sono ben al di sotto di questa percentuale: La Francia registra il 4% degli attacchi totali, mentre Germania e Regno Unito solo il 3%.

Questa sproporzione non può essere spiegata solo da un maggiore livello di disclosure (cioè, il fatto che da noi si segnalano più incidenti rispetto ad altri Paesi). Si tratta piuttosto di un **indicatore di debolezza sistemica**: l'Italia è vista come un Paese in cui è facile ottenere risultati, per via della **scarsa preparazione a difendersi** e della **mancanza di cultura diffusa della sicurezza**.

{{< blogfigure src="incidenti-cyber-italia-vs-global.png" alt="Incidenza degli incidenti in Italia rispetto al campione globale - 2020-2024." caption="Figura 4. Incidenza degli incidenti in Italia rispetto al campione globale - 2020-2024." >}}

### Perché l'Italia è così esposta?

Per spiegare come mai l'Italia risulti tra uno dei bersagli principale dei cyberattacchi, possiamo considerare tre possibili cause.

#### 1. Digitalizzazione veloce senza fondamenta solide

Negli ultimi anni, anche a causa della pandemia, molte aziende e pubbliche amministrazioni italiane hanno accelerato la digitalizzazione, introducendo smart working, utilizzo del cloud, o digitalizzazione dei processi.

Purtroppo, come spesso accade nell'adozione veloce o sviluppo di nuove tecnologie, ci si **dimentica di progettare la sicurezza** fin dall'inizio. In termini pratici, questo si è tradotto ad esempio in:

* server esposti su internet con configurazioni di default;
* VPN improvvisate e senza Multi-Factor Authentication (Autenticazione a più fattori);
* interi database accessibili con credenziali deboli;
* backup non protetti (e spesso nemmeno testati).

In altre parole, si è creata una superficie d'attacco molto ampia e poco protetta. E purtroppo, quando l'attacco arriva, il danno è reale ed è difficile rimediare. Tra i danni più comuni troviamo il blocco dei servizi, perdite economiche, danni reputazionali e nei casi peggiori anche responsabilità penale.

#### 2. Cybercriminali sempre più "industrializzati"

Un tempo, per essere "hacker" e condurre attacchi informatici servivano competenze tecniche avanzate, di certo non alla portata di tutti. Oggi, al contrario, basta un po' di denaro e un accesso al dark web. Infatti, i Cybercriminali hanno sviluppato strumenti e servizi "pronti all'uso" che basta acquistare per condurre attacchi complessi senza il know-how tecnico necessario. In questo modello, definito **Cybercrime-as-a-Service (CaaS)**, chiunque può acquistare:

* malware preconfezionato;
* credenziali rubate per l'accesso iniziale;
* kit di phishing personalizzati;
* servizi DDoS "a noleggio";
* accesso a intere botnet.

Sebbene chi sviluppa questi strumenti sia altamente specializzato, non è necessario che lo sia anche chi li usa. Questo significa che anche gruppi o compagnie con poche capacità possono lanciare attacchi efficaci, a basso costo, e su larga scala. E paesi come l'Italia, con molte realtà digitali ma scarsamente protette, diventano obiettivi ideali.

#### 3. Cultura della sicurezza debole o inesistente

Qui forse troviamo il punto più critico, ossia che **la sicurezza informatica non è ancora percepita come un bisogno o tema strategico**, ma più come una questione di bassissima priorità (se non inesistente). Troppe volte abbiamo sentito dirigenti d'azienda dire "perché dovrebbero attaccare proprio me? Non ha senso buttare soldi per qualcosa di inutile". 

Infatti, in molte PMI o enti pubblici, la sicurezza è vista come:

* una spesa da minimizzare,
* un "tema tecnico" che riguarda solo l'IT,
* qualcosa che si risolve con l'antivirus.

Il più grande problema della cybersecurity è proprio questo. Se non porta un beneficio visibile e immediato, allora viene vista solo come un peso per l'azienda. Purtroppo però, come mostrano i dati, sempre più aziende ricevono attacchi informatici. Il 37,8% delle PMI hanno dichiarato di aver subito un attacco informatico, con il Phishing come minaccia principale. 

Purtroppo manca una visione di insieme. Manca la comprensione del rischio. Spesso non ci sono nemmeno politiche di base come il cambio periodico delle password, la formazione dei dipendenti, dei backup, o un piano di risposta agli incidenti.

Il risultato è che **l'Italia non è solo attaccabile: è vulnerabile!**. E i cybercriminali hanno già iniziato e continueranno a sfruttare questo dato di fatto.


### Che tipo di attacchi subiamo?

Come mostrato in Figura 5, in Italia il **78% degli incidenti è attribuito al Cybercrime**, con tecniche come ransomware, phishing, malware e furto di credenziali. Il restante 22% è classificato come **Hacktivism**, spesso legato a conflitti internazionali e tensioni geopolitiche. A differenza di altri Paesi, in Italia non sono particolarmente rilevanti gli attacchi di spionaggio o guerra informatica di matrice statale (almeno tra quelli noti). Perciò è importante capire che la sicurezza informatica non è un'opzione, ma una priorità per la sopravvivenza delle organizzazione. E' importante non solo saper reagine, ma **prevenire** prima che sia troppo tardi.

{{< blogfigure src="attaccanti-italia-2024.png" alt="Attaccanti in Italia nel 2024." caption="Figura 5. Attaccanti in Italia nel 2024." >}}


### Quali sono i settori italiani più colpiti? 

La Figura 6 mostra da distribuzione delle vittime in Italia nel 2024. Una delle novità più sorprendenti del 2024 è il **sorpasso del settore News/Multimedia**, che balza in cima alla classifica delle vittime italiane con il **18% degli attacchi**. Il motivo? Un'impennata di attacchi "dimostrativi" legati a fenomeni di hacktivismo geopolitico, disinformazione e tentativi di manipolare l'opinione pubblica. Seguono poi:

* **Manifatturiero (16%)**: un settore vitale per l'economia italiana, ma ancora troppo spesso sprovvisto di sistemi di difesa adeguati. Le aziende manifatturiere sono un bersaglio redditizio per i ransomware e il phishing.
* **Governativo/Militare (10%)**: enti pubblici, comuni, ministeri, autorità sanitarie e forze dell'ordine restano obiettivi frequenti, spesso colpiti da attacchi DDoS o intrusioni con scopo dimostrativo o spionistico.
* **Trasporti/Magazziniero (7%)** e **Professional/Scientific/Technical Services (6%)** completano i settori più bersagliati.


{{< blogfigure src="vittime-cybersecurity-italia-2024.png" alt="Distribuzione delle vittime in Italia nel 2024." caption="Figura 6. Distribuzione delle vittime in Italia nel 2024." >}}

Questi dati evidenziano come **nessun settore possa più considerarsi "non interessante" per i criminali informatici**. Qualsiasi azienda che preveda un minimo di automazione o un collegamento a Internet deve avere come priorità la sicurezza informatica. Continuare a pensare che il bersaglio sarà sempre qualcun altro è estremamente pericoloso al giorno d'oggi.

Sempre più settori hanno fatto grandi passi avanti nella digitalizzazione di servizi e processi aziendali. Ma **digitalizzare senza proteggere significa amplificare il rischio**. Il Rapporto Clusit conferma che **il gap tra digitalizzazione e cybersecurity è ancora troppo ampio**.

Per invertire la tendenza servono:

* Investimenti in formazione e cultura cyber (non solo innovazione tecnologica)
* Collaborazioni pubblico-privato per alzare il livello di difesa collettiva
* Un cambio di mentalità soprattutto nelle PMI, spesso viste come "anelli deboli" della supply chain


## Intelligenza Artificiale e Cybersecurity: alleata o nemica?

Nel panorama della cybersicurezza del 2025, l'**Intelligenza Artificiale (AI)** gioca un ruolo sempre più centrale. È uno **strumento potentissimo**, ma anche **ambivalente**: può essere un'alleata formidabile nella difesa digitale, ma nelle mani sbagliate diventa un'arma devastante.

Il **Rapporto Clusit 2025** lo sottolinea chiaramente: l'**AI è un moltiplicatore di potenza**, sia per chi attacca che per chi difende.


### Come viene usata l'AI dai cybercriminali?

I criminali informatici stanno integrando l'AI nei loro arsenali in modo sempre più raffinato. Alcuni degli usi principali includono:

* **Phishing automatizzato e personalizzato**: grazie al Natural Language Processing (NLP) e a modelli generativi come ChatGPT, Gemini, o Claude, l'AI può generare email di phishing più credibili, simulate sulla base del linguaggio tipico di un'azienda o del profilo di una vittima.
* **Rilevamento e sfruttamento di vulnerabilità**: i modelli AI possono analizzare codice e reti per individuare falle in tempo reale e suggerire exploit.
* **Deepfake e voice cloning**: l'AI mette a disposizione strumenti in grado di creare video o audio realistici che vengono utilizzati per truffe, frodi o campagne di disinformazione.
* **Malware polimorfico**: software malevoli che cambiano automaticamente aspetto o comportamento per eludere le difese tradizionali. Tramite l'AI, il malware può analizzare la situazione e l'ambiente in cui si trova per modificarsi di conseguenza.

L'uso dell'AI ha quindi come risultato attacchi più mirati, frequenti, e difficili da intercettare anche per chi ha già soluzioni di sicurezza in atto.


### Come può l'AI diventare un alleato nella difesa?

Fortunatamente, le stesse tecnologie possono (e devono) essere usate anche **per proteggersi**. L'AI infatti viene usata in diversi contesti, ad esempio:

* **Rilevamento delle minacce in tempo reale**: l'AI analizza milioni di log e dati in pochi secondi, rilevando pattern anomali o segnali di compromissione invisibili all'occhio umano.
* **Prevenzione e risposta automatizzata**: strumenti basati su AI possono isolare una macchina (o endpoint) compromessa, bloccare una connessione sospetta o eseguire azioni correttive immediatamente, senza aspettare l'intervento umano (spesso lento, che può avvenire in un secondo momento).
* **Protezione degli ambienti cloud e ibridi**: con l'aumento della complessità dei sistemi IT, l'AI è in grado di analizzare e offrire una "mappa dinamica" del rischio in ambienti distribuiti e multi-cloud, fornendo un monitoraggio più efficace di quello manuale.
* **Riduzione dei falsi positivi**: uno dei problemi principali della sicurezza tradizionale è la quantità di allarmi inutili, spesso basati su regole statiche. L'AI migliora la qualità delle segnalazioni basandosi su modelli più accurati, aiutando gli analisti a concentrarsi solo sulle segnalazioni critiche.


### Quindi l'AI è un rischio o opportunità? Dipende da chi agisce prima

Il vero punto non è se l'AI sia buona o cattiva. È **chi la adotta per primo**, e con quali risorse. Se le imprese italiane, in particolare le PMI, rimangono indietro, i criminali avranno sempre il vantaggio.

**Il Clusit suggerisce una chiave fondamentale**: non è più sufficiente dotarsi di strumenti "tradizionali" di sicurezza (che spesso non sono nemmeno presenti). Serve **una postura proattiva, intelligente, e adattiva**. E l'AI, se ben addestrata e governata, può fare la differenza.

## Arriva la NIS2: per le aziende è obbligatorio proteggersi

Nel 2025 entrerà pienamente in vigore la **Direttiva NIS2**, la nuova normativa europea che rivoluziona il concetto di responsabilità digitale per aziende ed enti pubblici. A differenza della precedente direttiva NIS (Network and Information Security), che interessava solo un numero limitato di infrastrutture critiche, la NIS2 **estende il perimetro in modo molto ampio**, coinvolgendo anche **molte PMI** e realtà del settore privato.

Vediamo insieme cosa riguarda! Puoi anche fare il nostro test gratuito per capire se devi rispettare la NIS2, lo trovi qui: TODO.


### Cos'è esattamente la NIS2?

La NIS2 (Direttiva UE 2022/2555) è la risposta dell'Unione Europea alla crescita esponenziale delle minacce informatiche, e ha un obiettivo preciso: **innalzare in modo uniforme la resilienza cibernetica** di tutti gli Stati membri, Italia compresa.

Questa direttiva:

* Amplia il numero di **settori obbligati ad adottare misure minime di sicurezza** (tra cui sanità, energia, trasporti, telecomunicazioni, produzione critica, servizi digitali, pubblica amministrazione, etc.)
* Estende gli obblighi a **aziende medio-piccole** che, pur non essendo "grandi imprese", svolgono attività essenziali o importanti per l'economia e la società.
* Rafforza il potere di **vigilanza e sanzione delle autorità competenti** (in Italia, l'ACN - Agenzia per la Cybersicurezza Nazionale)

### A chi si applica la NIS2?

La direttiva **NIS2** si applica a due categorie di organizzazioni, che sono obbligate a rispettarla:

* **Entità essenziali**: grandi imprese (oltre 250 dipendenti o fatturato annuo superiore a 50 milioni di euro) che operano in settori ad alta criticità, come:
  * energia (elettricità, gas, idrogeno),
  * trasporti (strada, ferrovia, aria, mare),
  * banche e finanza,
  * sanità (ospedali, laboratori, farmacie),
  * acqua (potabile e reflue),
  * infrastrutture digitali (data center, cloud, DNS),
  * servizi ICT gestiti,
  * pubblica amministrazione centrale e regionale,
  * spazio (infrastrutture terrestri).



* **Entità importanti**: imprese medie (oltre 50 dipendenti o fatturato annuo sopra i 10 milioni di euro) attive:
  * negli stessi settori ad alta criticità sopra elencati,
  * oppure in altri settori rilevanti come: logistica, gestione rifiuti, prodotti chimici, alimentare, manifatturiero, motori di ricerca, social network e centri di ricerca.

**Anche le aziende più piccole** possono rientrare nella NIS2 se:
* sono l’unico fornitore di un servizio essenziale,
* o se un’interruzione del loro servizio può avere impatti seri su salute, sicurezza pubblica o ordine nazionale.

Infine, **alcuni enti pubblici e fornitori di servizi digitali** sono soggetti alla direttiva indipendentemente dalla dimensione, con l’eccezione di chi opera in ambiti di difesa, sicurezza nazionale o forze dell’ordine.

Scopri se sei obbligato a rispettare la NIS2 facendo il nostro TEST GRATUITO (TODO).

### Cosa prevede la NIS2?

Le organizzazioni che rientrano tra i soggetti obbligati dovranno:

* **Adottare misure tecniche e organizzative** per la gestione del rischio (es. firewall, backup, crittografia, gestione accessi, formazione interna)
* **Notificare obbligatoriamente ogni incidente di sicurezza grave** entro **24 ore** dalla scoperta, pena sanzioni
* **Condurre valutazioni regolari dei rischi** e avere un piano documentato di gestione e risposta agli incidenti
* **Designare un responsabile interno per la sicurezza delle informazioni**
* **Affrontare sanzioni fino al 2% del fatturato annuo**, in caso di violazioni gravi o ripetute


### E se sei una PMI?

La NIS2 non è una normativa solo per le "grandi aziende". Le **PMI che operano in settori considerati "essenziali" o "importanti"**, o che fanno parte di filiere strategiche (es. fornitori di servizi sanitari, digitali, produttori industriali), **possono rientrare tra gli obbligati** anche se non superano i 250 dipendenti.

**Attenzione**: se fornisci servizi a un'azienda soggetta a NIS2, **potresti comunque essere coinvolto** attraverso obblighi contrattuali, audit o controlli di conformità.


### Perché agire subito?

Con la NIS2, la cybersecurity non è più una buona pratica. È un obbligo legale.
Molte organizzazioni si stanno ancora chiedendo se saranno toccate dalla direttiva. Il problema è che **aspettare può costare caro**, sia in termini di sanzioni che di reputazione.

Il nostro consiglio è quello di iniziare con un **assessment dei rischi digitali**. Mappare gli asset critici, verificare le vulnerabilità, e definire un piano d'azione per rafforzare la sicurezza è un passo fondamentale nella gestione sicura della tua azienda, con o senza obbligo formale.
Scopri di più sui nostri [Servizi di Cybersecurity](/services/servizi-cybersecurity/) per capire come possiamo aiutarti.


## Le PMI italiane sono sicure?

Spoiler: purtroppo, no. Il report mostra i risultati di un'indagine condotta su 2.847 PMI Italiane. L'indagine si basa su audit effettuati dai **PID (Punti Impresa Digitale)** delle Camere di Commercio, utilizzando lo strumento di autovalutazione **PID Cyber Check** - sviluppato in collaborazione con DINTEC, IIT-CNR, ENEA e Unioncamere. I risultati evidenziano una **maturità cyber ancora troppo bassa**.

In un Paese dove il **95% del tessuto economico è costituito da micro e piccole imprese**, la **cybersecurity non può più essere un lusso da grandi aziende**. Tuttavia, secondo quanto riportato nel report, la **stragrande maggioranza delle PMI italiane è impreparata a fronteggiare anche le minacce digitali più basilari**.

Come mostrato in Figura 7, la maggior parte delle aziende si colloca in una fascia di rischio medio (72,4%). Questa è indubitamente una situazione preoccupante, visto che la maggiorparte delle PMI del nostro paese non ha un livello di sicurezza adeguato, esponendosi a potenziali minacce e vulnerabilità. 

{{< blogfigure src="fasce-rischio-pmi-italia-cybersecurity.png" alt="Fasce di rischio delle Imprese." caption="Figura 7. Fasce di rischio delle Imprese." >}}


La gravità della situazione è mostrata dal fatto che il 37,8% delle PMI ha dichiarato di aver subito attacchi informatici. **Più di un terzo delle imprese è stato vittima di cybercriminali!**. La Figura 8 evidenzia le tipologie di attacco più frequenti: 
* **Phishing**: la minaccia principale, mostra che i dipendenti e gli utenti finali sono l'anello debole della catena di sicurezza. L'unico modo efficace per prevenire e contrastare il phishing è la formazione.
* **Malware**: anche i software malevoli sono un problema rilevante. Insegnare ai dipendenti i punti di accesso dei Malware e avere strumenti di difesa adeguati può aiutare a ridurre i pericoli.
* **Web App Attack**: Le interfacce Web sono un grosso punto d'accesso per i Cybercriminali. Svolgere Vulnerability Assessment e Penetration Test aiuta le aziende a proteggersi preventivamente.
* **Ransomware**: Una minaccia sempre più frequente, dove i dati aziendali vengono cryptati e restituiti solo tramite riscatto. I danni economici sono spesso elevati, ed è facile incorrere in conseguenze legali al momento del pagamento, o non ricevere indietro i dati una volta pagato! Backup regolari in ambienti isolati possono rimuovere completamente la minaccia.
* **Comportamenti Scorretti**:  la mancanza di formazione interna e consapevolezza sono anch'esse cause frequenti di attacchi informatici.

Se sei curioso sugli attacchi ransomware che avvengono regolarmente sul nostro paese, dai un'occhiata a questa [dashboard interattiva](https://ransomfeed.it/).

{{< blogfigure src="distribuzione-attacchi-cybersecurity-PMI-Italia.png" alt="Figura 8. Distribuzione attacchi Cybersecurity alle PMI." caption="Figura 8. Distribuzione attacchi Cybersecurity alle PMI." >}}

### Quali sono le PMI più colpite?

#### Distribuzione per settore 

I settori più colpiti sono il **Manifatturiero** (25,7%), **Alimentazione, Alloggio, Viaggi** (17,8%), **Servizi professionali, scientifici e tecnici** (17%) e **Rivendita al dettaglio** (9,1%). Tra le vulnerabilità in comune tra questi settori troviamo infrastrutture e macchinari obsoleti, l'utilizzo di dispositivi IoT senza sicurezza, o configurazioni (password) di default, che i cybercriminali possono sfruttare facilmente. Anche le informazioni sensibili dei clienti (come quelle di pagamento) risultano molto appetibili per gli attaccanti,, e spesso si trovano in settori come quello dei viaggi, o della rivendita al dettaglio.
La distribuzione completa è mostrata in Figura 9.

{{< blogfigure src="distribuzione-attacchi- Cybersecurity-PMI-Italia-settore.png" alt="Figura 9. Distribuzione degli attacchi Cybersecurity alle PMI per settore." caption="Figura 9. Distribuzione degli attacchi Cybersecurity alle PMI per settore." >}}

#### Distribuzione per dimensione aziendale e fatturato

La Figura 10 mostra la distribuzione degli attacchi per numero di dipendenti.
Le microimprese sono le più vulnerabili, infatti il 63% degli attacchi si registrano in aziende con meno di 10 dipendenti. Questo è spiegato dal fatto che spesso le microimprese hanno risorse limitate da investire in cybersecurity, così come mancano di persone interne competenti o formate in tema di cybersecurity.

{{< blogfigure src="distribuzione-attacchi- Cybersecurity-PMI-Italia-dipendenti.png" alt="Figura 10. Distribuzione degli attacchi Cybersecurity alle PMI per numero di dipendenti." caption="Figura 10. Distribuzione degli attacchi Cybersecurity alle PMI per numero di dipendenti." >}}

Mancano inoltre in tutte le imprese le più comuni best practices di cybersecurity, come il controllo sulle password (nel 42% dei casi), una connessione sicura dei dispotivi personali alla rete aziendale (42%), e mancanza di certificazioni (91%).

A livello di fatturato, il 50% delle aziende con meno di un milione di fatturato sono state attaccate, insieme al 19% con fatturato tra 2 e 10 milioni di euro. Sebbene le realtà più piccole siano le più colpite, questo non protegge le realtà più grandi, come mostrato in figura 11.

{{< blogfigure src="distribuzione-attacchi- Cybersecurity-PMI-Italia-fatturato.png" alt="Figura 11. Distribuzione degli attacchi Cybersecurity alle PMI per fatturato." caption="Figura 11. Distribuzione degli attacchi Cybersecurity alle PMI per fatturato." >}}

#### Distribuzione per posizione geografica

Le risposte sono pervenute in modo bilanciato dal territorio italiano: 37,6% Dal Nord Italia, 36,4% dal Centro Italia, e 26% dal Sud e Isole. Questo dimostra come i problemi non siano limitati solo a regioni specifiche. E' emerso anche che molte aziende hanno effettivamente implementato misure di sicurezza come aggiornamenti automatici, firewall o antivirus, ma il 49% ha dichiarato di non analizzare le informazioni registrate. 

**Avere misure di sicurezza è necessario ma non sufficiente. Bisogna che siano supportate da competenze e processi interni!**


### Cosa manca alle PMI italiane?

L'indagine mostra alcuni punti principali sulle vulnerabilità delle PMI:

* **Mancanza di policy formalizzate**
  Oltre il **50% delle PMI non ha una politica di sicurezza informatica**, nemmeno minimo. Nessuna regola scritta su password, backup, aggiornamenti o gestione degli accessi.
* **Assenza di formazione per il personale**
  Circa **il 70% delle imprese non ha mai formato i propri dipendenti** sui rischi informatici, lasciando le persone (ossia il primo vettore d'attacco) completamente esposte a truffe, phishing e uso improprio degli strumenti aziendali.
* **Zero analisi del rischio o vulnerability assessment**
  Il **60% delle aziende non ha mai fatto una valutazione tecnica delle proprie vulnerabilità**. Ciò significa che non sanno "dove sono fragili" o "cosa proteggere".

I cybercriminali hanno capito che le PMI:

* Hanno **dati preziosi**, ma spesso **non li proteggono**
* Non investono in difese strutturate
* Non hanno personale IT interno
* **Pagano i riscatti**, perché fermare l'operatività anche solo per 48 ore può significare perdita di clienti, ordini, reputazione

Attaccare una PMI **è spesso più semplice** che attaccare una grande azienda. E a volte, **serve proprio per entrare nella supply chain** di un fornitore più grande.


### Cosa fare per proteggersi? Iniziare è molto semplice

Fortunatamente, non servono milioni di euro per migliorare le proprie difese. Ad esempio, **una piccola azienda può attivare da subito**:

1. **L'utilizzo di password forti e l'autenticazione a due fattori**
2. **Backup regolari e relativo test**
3. **Aggiornamenti software e sistemi operativi**
4. **Una [formazione base sulla cybersecurity e phishing](/formazione-intelligenza-artificiale-e-cybersecurity/)**
5. **Compilare gratuitamente il [PID Cyber Check](https://www.puntoimpresadigitale.camcom.it/paginainterna/assessment-checkup-sicurezza-it-imprese)**, per scoprire in 30 minuti il proprio  livello di rischio

Se non ti senti pronto ad affrontare questo percorso da solo, ti aiutiamo noi. La [prima consulenza è gratuita](/prenota-una-chiamata-consulenza-gratuita/)!

## Quanto può costare un attacco?

Molte imprese, soprattutto tra le PMI, sottovalutano l'impatto economico di un attacco informatico. Ma la realtà è che **un singolo incidente può mettere in ginocchio un'intera azienda**, anche se non si tratta di un attacco "sofisticato".

Il **Rapporto Clusit 2025** evidenzia che i danni non si limitano al solo aspetto tecnico. Un cyber attacco può innescare **un effetto domino** devastante su tutta la struttura aziendale, con costi spesso insostenibili per le imprese meno preparate.

### Quali sono i costi reali?

Ecco le principali **voci di danno** che un'impresa può subire a seguito di un attacco:

* **Fermi operativi prolungati:** Quando un ransomware o un attacco DDoS colpisce, l'azienda può restare bloccata **per giorni o settimane**, senza accesso ai sistemi gestionali, ai database clienti, alla contabilità o ai magazzini. Ogni giorno perso equivale a **mancati guadagni e ritardi a catena**.

* **Riscatti da pagare:**
Nel caso di ransomware, gli attaccanti spesso chiedono **decine o centinaia di migliaia di euro** per decriptare i file. Pagare non garantisce la restituzione dei dati, ma **non pagare può significare perderli per sempre**.

* **Danni reputazionali:**
Clienti, fornitori e stakeholder perdono fiducia in un'azienda colpita da un attacco, soprattutto se i dati sono stati trafugati o pubblicati. Questo può tradursi in **perdita di contratti, clienti storici e nuovi opportunità di business**.

* **Sanzioni legali e multe (es. GDPR):**
Se i dati personali dei clienti vengono violati e l'azienda non dimostra di aver adottato misure adeguate, può essere soggetta a **multe fino al 4% del fatturato annuo**, come previsto dal GDPR.

* **Costi di ripristino tecnico e legale:**
Dopo un attacco, servono esperti per recuperare i sistemi, analizzare l'incidente, proteggere l'infrastruttura e gestire la comunicazione di crisi. Anche solo questo può costare **decine di migliaia di euro**.

### E per una PMI, quanto può costare tutto questo?

Il **Rapporto Clusit** stima che per una PMI italiana il costo medio di un attacco informatico grave può raggiungere **fino a 100.000 euro**, considerando solo:

* Interruzione delle attività
* Danni ai sistemi e dati persi
* Costi di consulenza e recupero
* Potenziali sanzioni amministrative

Per molte microimprese, questa cifra **equivale a diversi mesi (o anni) di margine operativo**. Non è raro che un attacco di questo tipo porti a:

* Licenziamenti
* Chiusura temporanea dell'attività
* Mancata consegna di commesse strategiche
* In casi estremi: fallimento

Come si evince dalla Figura 12, quasi il 70% degli attacchi presentano un impatto critico o elevato. Pertanto, anche sperare che l'attacco ricevuto sia di bassa entità non è una strategia affidabile. 

{{< blogfigure src="severity-attacchi-cybersecurity-2024.png" alt="Figura 12. Distribuzione della Severity nel 2024." caption="Figura 12. Distribuzione della Severity nel 2024." >}}


### Il costo della prevenzione è inferiore a quello della reazione

Il famoso detto "prevenire è meglio che curare" si applica anche in questo caso. Molti di questi costi possono essere **evitati** o **drasticamente ridotti** con:

* Sistemi di backup funzionanti
* Procedure di risposta agli incidenti
* Formazione di base al personale
* Soluzioni di sicurezza minime ma efficaci
* Assicurazione cyber (in casi specifici)

Una buona strategia di difesa **costa decisamente meno di un mese di fermo aziendale**, eppure molte aziende ancora non agiscono. Un corso di [formazione cybersecurity base](/formazione-intelligenza-artificiale-e-cybersecurity/) è un investimento che ripagherà con grossi risparmi in futuro!

## La minaccia alla supply chain

Nel contesto attuale della cybersicurezza, **la vulnerabilità non è più solo individuale, ma collettiva**. Un attacco che colpisce una **singola azienda**, anche piccola, può avere **effetti a cascata sull'intera filiera produttiva e commerciale**. Questo vale soprattutto nel sistema italiano, dove **le PMI rappresentano spesso nodi chiave nella supply chain di grandi imprese o enti pubblici**.

Il **Rapporto Clusit 2025** chiarisce che un'impresa non può più considerarsi protetta se non lo sono anche i suoi fornitori.


### Perché le aziende piccole sono un bersaglio?

I cybercriminali hanno capito che **le grandi aziende hanno difese solide**, spesso presidiate da team di cybersecurity interni. Per questo, puntano a **penetrare da un ingresso secondario**: un fornitore più piccolo, meno protetto, magari con accesso remoto ai sistemi centrali (via VPN, ERP condivisi, e-mail).

Ecco alcuni scenari tipici:

* Un piccolo studio tecnico subisce un attacco e, senza saperlo, diventa veicolo di malware verso il cliente industriale principale.
* Un fornitore di servizi cloud locale viene violato, esponendo i dati di decine di clienti più grandi.
* Un consulente con accessi amministrativi ai server di una PA viene compromesso, permettendo un attacco mirato ai sistemi centrali.

In questi casi, **la PMI diventa inconsapevolmente "l'anello debole" che apre la porta agli aggressori**.


### La NIS2 richiede di vigilare sui fornitori

Con l'entrata in vigore della **direttiva NIS2**, molte organizzazioni saranno obbligate a **verificare il livello di sicurezza dei propri fornitori e partner**. Questo significa che:

* Le PMI fornitrici potrebbero dover **sottoporsi ad audit di sicurezza**
* Saranno sempre più frequenti le **clausole contrattuali sulla protezione dei dati e la gestione degli incidenti**
* Chi non si adegua, **rischia di essere escluso da appalti e commesse**

In altre parole: **la sicurezza digitale diventa anche un fattore competitivo.**. Investire sulla cybersecurity significa rimanere un partner valido nel mercato coi relativi guadagni!


### Come proteggere la tua supply chain?

Ecco alcune azioni concrete che ogni impresa può avviare oggi stesso:

1. **Mappare i fornitori critici**: chi ha accesso ai sistemi aziendali? Chi gestisce dati sensibili?
2. **Stabilire requisiti minimi di sicurezza** nei contratti
3. **Chiedere ai fornitori un'autovalutazione (es. PID Cyber Check)**
4. **Verificare regolarmente gli accessi esterni e i permessi IT**
5. **Condividere con i partner aggiornamenti su minacce e buone pratiche**

Se invece sei tu il fornitore, dimostrare di avere una buona postura di sicurezza **può diventare un vantaggio commerciale**, in grado di differenziarti dalla concorrenza.

## Il futuro della cybersecurity: cosa ci attende nel 2035?

Come sarà il nostro lavoro, e soprattutto la nostra **vita digitale**, nel 2035?
Il report Clusit cerca di rispondere in una sezione visionaria e stimolantie interrogando esperti, accademici, e responsabili aziendali su come l'evoluzione tecnologica e la cybersicurezza plasmeranno il nostro futuro.

### Il contesto: digitalizzazione e complessità

Nel 2035, il lavoro sarà immerso in un ecosistema digitale dominato da:

* **Automazione avanzata** e diffusione dell’intelligenza artificiale nei processi decisionali.
* **Lavoro ibrido** e distribuito, grazie a infrastrutture cloud e connessioni sempre attive.
* **Aumento della superficie d’attacco**: più dispositivi connessi significa più vulnerabilità.

Questa trasformazione sarà tanto tecnologica quanto culturale: il lavoro umano dovrà riorientarsi per interagire efficacemente con sistemi intelligenti e gestire nuove complessità.

### La centralità della cybersecurity

Nel mondo del 2035, la cybersecurity non sarà più un’attività a margine, ma una competenza trasversale e strategica. Il Rapporto Clusit evidenzia che:

* Tutti i lavoratori (non solo gli specialisti) dovranno avere competenze di base in sicurezza digitale.
* Le minacce cyber cresceranno in volume, sofisticatezza e impatto.
* Le aziende dovranno investire in:
  * **Security by design**
  * **Formazione continua**
  * **Collaborazione pubblico-privato**

Questo si traduce anche nella nascita ed evoluzioni di professioni come:

* *Cyber Resilience Manager*
* *Esperti di threat intelligence basata su AI*
* *Analisti di sicurezza per ambienti virtuali e immersivi*

### Il ruolo dell’Intelligenza Artificiale

L’AI nel 2035 sarà pervasiva. Secondo il rapporto:

* Automatizzerà attività ripetitive, ma anche analisi complesse.
* Sarà impiegata in ambiti critici come sanità, finanza, giustizia e pubblica amministrazione.
* Supporterà le decisioni umane, ma solleverà interrogativi etici e legali.

**Implicazioni per il lavoro:**

* Nasceranno nuove figure professionali come:
  * *AI Ethics Officer*
  * *Trainer di algoritmi*
  * *Analista comportamentale per sistemi AI*
* Le competenze "human-centric" (empatia, giudizio critico, creatività) diventeranno ancora più preziose.
* La coesistenza uomo-macchina sarà centrale: l’AI non sostituirà, ma completerà le capacità umane.

### Sfide etiche e di governance

L’intersezione tra AI, lavoro e sicurezza pone nuove sfide:

* **Responsabilità degli algoritmi**: chi risponde degli errori o dei bias?
* **Trasparenza delle decisioni automatizzate**
* **Protezione dei dati personali in ambienti lavorativi iper-digitalizzati**
* **Inclusività**: il rischio di un "digital divide" tra chi ha accesso alle competenze e chi no.

Il rapporto invita a sviluppare una governance condivisa e anticipatoria, che accompagni l’innovazione con regole chiare e un approccio etico.

### Prepararsi al 2035: cosa fare oggi?

Il capitolo si conclude con un appello all’azione. Per affrontare le sfide del lavoro futuro, individui e organizzazioni devono:

* **Investire nella formazione** continua, soprattutto nelle competenze digitali e trasversali.
* **Promuovere la cultura della sicurezza** e della responsabilità digitale.
* **Favorire l’integrazione uomo-macchina** in modo sostenibile ed equo.
* **Adottare un approccio proattivo** al cambiamento tecnologico.

Secondo il report, il lavoro nel 2035 sarà radicalmente diverso, ma non disumanizzato. Sarà un lavoro potenziato dalla tecnologia, dove l’intelligenza artificiale e la cybersecurity giocheranno ruoli chiave. Prepararsi oggi a questo scenario significa costruire competenze, consapevolezza e resilienza, per non subire il futuro, ma guidarlo.


## Conclusione: cosa puoi fare oggi per proteggere la tua azienda

### Non aspettare l'attacco. Inizia a difenderti ora.

Dopo aver letto dati, scenari e rischi reali riportati dal **Rapporto Clusit 2025**, dovrebbe essere chiaro che la **cybersecurity non è più un tema tecnico da delegare all'IT**. È un **fattore di sopravvivenza per ogni azienda**, grande o piccola che sia.

La buona notizia è che **si può fare molto**, anche con risorse limitate, per iniziare **subito a ridurre il rischio**.


### Cinque azioni concrete da avviare subito:

1. **Fai un check-up della tua sicurezza digitale:**
   Parti da un'autovalutazione come il **PID Cyber Check** (gratuito, fornito dalle Camere di Commercio). Ti aiuterà a capire dove sei esposto e quali aree migliorare, anche se non sei un esperto.

2. **Forma il tuo personale:**
   La maggior parte degli attacchi parte da un clic sbagliato. Bastano brevi sessioni di formazione sul phishing, la gestione delle password e il comportamento digitale sicuro per ridurre enormemente i rischi.

3. **Predisponi un piano di incident response:**
   Cosa succede se vieni attaccato domani? Chi fa cosa? Dove sono i backup? Quali sistemi vanno spenti o isolati? Un piano scritto, anche semplice, fa la differenza in caso di attacco.

4. **Proteggi i tuoi endpoint e monitora i sistemi:**
   Installa soluzioni di sicurezza affidabili su tutti i dispositivi (computer, server, smartphone), attiva l'autenticazione a due fattori (MFA), tieni aggiornato tutto il software e, se possibile, monitora i log di accesso.

5. **Valuta se rientri tra i soggetti NIS2:**
   Se operi in settori strategici, sei fornitore di enti pubblici o di aziende medio-grandi, **potresti avere obblighi di legge** (anche se sei una PMI). Informati ora e preparati in anticipo.

### Ti serve aiuto?

Se non sei pronto ad affrontare questo percorso da solo, noi di Manalisk possiamo aiutarti. Con la nostra esperienza ti accompagneremo nel rendere la tua azienda sicura, defininendo insieme le priorità adeguate al tuo budget. La cybersecurity è un processo incrementale, non serve investire da subito decine di migliaia di euro. Una [formazione di cybersecurity base per i dipendenti](/formazione-intelligenza-artificiale-e-cybersecurity/) e un vulnerability assessment sono spesso un ottimo punto di partenza per ridurre il rischio e i possibili danni. 

Contattaci per una [prima consulenza è gratuita](/prenota-una-chiamata-consulenza-gratuita/)!, capiremo insieme il piano d'azione migliore per mettere la tua azienda al sicuro!