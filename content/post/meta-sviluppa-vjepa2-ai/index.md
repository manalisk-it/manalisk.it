---
title: "V-JEPA 2: L'AI di Meta che capisce il nostro mondo"
description: "Meta ha rilasciato V-JEPA 2, un intelligenza artificiale in grado di capire il mondo circostante e che impara da sola ad adattarsi a nuove situazioni. Analizziamo insieme questo nuovo modello!"
date: 2025-07-02
draft: true
images: []
featured_image: "flowchart.png"
featured_image_visible: False
categories: ["The Bootstrap Blog"]
tags: ["Bootstrap"]
keywords: ["bootstrap 5 3","bootstrap 5","bootstrap"]
authors: ["Pier Paolo Tricomi"]
readtime: 5

---

Uno dei problemi principali dell'intelligenza artificiale è quello di doverla "allenare" su ogni singolo task, con dati "etichettati" dagli essere umani, che spesso sono difficili o costosi da reperire. Quello che presentiamo oggi è un modello che cerca di risolvere questi problemi, imparando non da quello che gli viene detto, ma **osservando** autonomamente. 
[**V-JEPA 2**](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/), il nuovo modello di AI presentato da Meta, impara le regole del mondo fisico, come si muovono gli oggetti e cosa succede quando interagiamo con essi. Come? Semplicemente guardando video su internet.

Vediamo un attimo meglio come funziona.

## "Self-Supervised Learning": l'AI impara da sola

Prima di capire il funzionamento di V-JEPA 2, dobbiamo soffermarci sul paradigma alla base: il **self-supervised learning** (in italiano auto-apprendimento supervisionato).

Pensa a come impara un bambino. Nessuno gli spiega esplicitamente ogni singola regola della fisica. Il bambino osserva, tocca, lancia oggetti e, un po' alla volta, si crea un modello mentale di come funziona il mondo. Se spinge un bicchiere giù da un tavolo, si aspetta che cada.

Il self-supervised learning funziona in modo simile. Invece di dare all'AI milioni di esempi etichettati da un umano (ad esempio, una foto di un gatto accompagnata dall'etichetta "gatto"), l'AI impara da sola dai dati, trovando schemi e connessioni. Ma come funziona di preciso?

Per allenare il modello, si danno in pasto dati grezzi, ad esempio testi, immagini o video. Dopodiché, gli si da un compito artificiale, che non avrebbe molto senso da solo, ma che gli permette di capire le "regole di quel domninio". Ad esempio, per il testo, gli si può chiedere di prevedere la parola mancante di una frase. Si parte dalla frase "il bambino gioca per terra", si rimuove la parola "gioca" e gli si chiede: quale parola completa correttamente la frase "il bambino ___ per terra"? Il modello, imparando dai dati, dirà con più probabilità "gioca" rispetto a "mangia", ad esempio. In base alla parola restituita dal modello, la si confronta con la parola originaria, dando un feedback diretto sugli errori commessi, così che il modello possa aggiornare i suoi parametri interni e diventare più preciso. 

Questo task specifico sul testo, con cui sono solitamente allenati gli LLM (Large Language Models, come ChatGPT), si chiama *masked language modeling*. Per le immagini si può ad esempio tagliarla e chiedergli di ricostruirla. Per un video, si può prevedere cosa succederà nel prossimo frame. Con questi task, l'obiettivo è quello di far trovare al modello relazioni e pattern tra i dati a disposizione per imparare il dominio di applicazione (ad esempio, come si scrive).

## V-JEPA 2: Come impara dal mondo per poi agire

V-JEPA 2 usa proprio questo approccio. Il suo nome completo è **Video Joint-Embedding Predictive Architecture 2**, cioè il modello analizza video imparando a prevedere parti nascoste usando rappresentazioni astratte (embedding) condivise. Il termine joint embedding indica che le diverse parti del video vengono trasformate in vettori nello stesso spazio, così il sistema può confrontare e apprendere relazioni visive nel tempo. Vediamo meglio come funziona.

### Step 1: L'allenamento sul mondo generico

Il cuore del sistema viene "pre-addestrato" (*pre-trained*) facendogli guardare una quantità spropositata di dati: **1 milione di ore di video** e 1 milione di immagini. Se ti stai chiedendo quante siano effettivamente 1 milione di ore di video, conta che con una media di 16 ore di attività e 8 di sonno al giorno, ci vorrebbero circa 171 anni per vederli a velocità normale (ben di più di recuperare tutto One Piece 😄). 

Cosa fa il modello mentre guarda? Apprende tramite self-learning, nascondendo alcune parti (sia nello spazio che nel tempo) e cercando di **indovinare cosa c'è nelle parti mancanti**. In questo caso è importante notare che non cerca di ricreare l'immagine pixel per pixel (come facevano alcuni modelli precedenti). Sarebbe effettivamente uno spreco di risorse incredibile e gli errori sarebbero tantissimi considerando i dettagli imprevedibili del nostro mondo (pensa a ogni singola foglia su un albero). In questo senso, V-JEPA 2 è molto efficiente rispetto alle soluzioni precedenti.

Piuttosto, V-JEPA 2 lavora a un livello più astratto, quello degli "**embedding**". Un embedding è come un riassunto super compatto e ricco di significato. Invece di memorizzare ogni pixel di un cane, l'AI crea una rappresentazione numerica (un vettore, tipo [0.234, 0.196, 0.583]) che cattura l'essenza di "cos'è un cane". Prevedendo questi "riassunti" delle parti mancanti del video, il modello è costretto a imparare i concetti e le dinamiche fondamentali del mondo. Ti ricordo che i computer e gli algoritmi lavorano solo coi numeri. I testi, i video, le immagini, gli audio, alla fine sono tutti numeri. La bellezza degli embedding è che si può calcolare la distanza tra loro. Due cani di razze diverse avranno due embedding più simili rispetto a un cane e un gatto. Così, quando il modello "indovina", è facile dire quanto sta sbagliando: più è lontano, più sta sbagliando.

### Step 2: Azione specifica nel mondo generico

Una volta che V-JEPA 2 ha sviluppato questa comprensione generale del mondo, può essere specializzato per compiti più specifici. È qui che entrano in gioco le applicazioni mostrate in Figura 1.

{{< blogfigure src="flowchart.png" alt="Panoramica di V-JEPA2" caption="Figura 1. Panoramica di V-JEPA 2. Il modello viene prima pre-addestrato su una vasta gamma di video e immagini da internet per ottenere una comprensione generale del mondo (a sinistra). Successivamente, questa conoscenza viene adattata per compiti specifici come rispondere a domande sui video, prevedere azioni o persino pianificare le mosse di un robot (a destra)" >}}

Come mostra lo schema, il modello pre-addestrato può essere indirizzato verso tre principali aree di applicazione:

1.  **Comprensione (Understanding)**

      * **Video Q\&A:** Collegando V-JEPA 2 a un LLM (come quelli dietro ChatGPT, Gemini, etc.), l'AI può rispondere a domande complesse sul contenuto di un video (es. "Cosa ha fatto la persona dopo aver preso la farina?").

2.  **Comprensione e Predizione (Understanding & Prediction)**
     * **Classificazione delle azioni** Il modello capisce quale azione sta venendo svolta. Ad esempio, riesce a capire che una persona in cucina sta mescolando o tagliando.
     * **Riconoscimento degli oggetti** Il modello riconosce gli oggetti, ad esempio un coltello o del guanciale.
     * **Anticipazione delle azioni:** Il modello è in grado di prevedere le azioni umane. Ad esempio, guardando l'inizio di un video di cucina, può anticipare con grande precisione che ingrediente prenderà la persona dopo il guanciale.


3.  **Pianificazione (Planning, per la Robotica)**

    Questa è la parte più innovativa e impressionante. I ricercatori, partendo dalla conoscenza di base imparata durante il pre-training, hanno mostrato al modello solo **62 ore di video** di un braccio robotico che eseguiva delle azioni, senza etichette o spiegazioni su cosa stesse facendo.

    Questo è bastato per creare un "modello del mondo" per il robot, chiamato **V-JEPA 2-AC** (Action-Conditioned). Dando al robot solo un'immagine dell'obiettivo finale (es. "il cubetto rosso sopra il cubetto blu"), il sistema è in grado di **pianificare da solo** la sequenza di movimenti necessari per completare il compito.

    La cosa ancora più incredibile è che il sistema funziona in ***zero-shot***: significa che il robot è stato testato in ambienti nuovi, con oggetti mai visti prima, e ha funzionato senza bisogno di alcun addestramento specifico per quel nuovo contesto.

    Anche se 62 ore di video possono sembrare tante, i PC non devono effettivamente "guardare i video", e con la potenza di calcolo dei computer di Meta, questo si riduce solitamente a qualche ora al massimo di elaborazione.

    Questo mostra quindi una forte capacità di **Generalizzazione:**, fondamentale nei sistemi di AI. Ciò che stupisce veramente è la capacità di trasferire la conoscenza generale (appresa dai video di internet) a compiti molto specifici (come controllare un robot), con una quantità minima di dati specializzati. Questo apre la porta a robot e AI molto più adattabili e meno costosi da addestrare.


## V-JEPA 2 è pericoloso? I limiti attuali

Ogni volta che si parla di un'AI così avanzata la domanda è: "Ok, è impressionante, ma dobbiamo preoccuparci?". La risposta breve è: **no**. V-JEPA 2 è uno strumento di ricerca potentissimo, ma ha dei limiti molto chiari che lo rendono ben lontano dagli scenari fantascientifici di robot che si ribellano agli umani. Vedere questi limiti ci aiuta a capire a che punto siamo realmente.

1.  **Ha bisogno di "suggerimenti" per compiti lunghi**: Il modello è bravo a pianificare azioni a breve termine. Tuttavia, per compiti più complessi che richiedono molti passaggi, come un "prendi e sposta" completo, ha ancora bisogno di "sottobiettivi" visivi lungo il percorso. In pratica, non è in grado di elaborare da solo un piano complesso dall'inizio alla fine; ha bisogno che il compito venga suddiviso in tappe più semplici.

2.  **Parla per immagini, non a parole**: Attualmente, il robot ha bisogno di un'immagine dell'obiettivo per poter agire. Non puoi semplicemente dirgli "metti la tazza sul tavolo". Devi mostrargli una foto della tazza già posizionata sul tavolo. Questo lo rende un esecutore molto specifico, non un assistente autonomo in grado di interpretare comandi astratti.

3.  **Soffre il "cambio di prospettiva"**: I ricercatori hanno notato che le prestazioni del robot sono sensibili a dove è posizionata la telecamera. Se la telecamera viene spostata, il modello può confondersi su come le sue azioni si traducono in movimenti nello spazio. Questo ci ricorda che, per quanto intelligente, è un sistema che dipende ancora da una configurazione fisica precisa e non ha una vera e propria percezione 3D dello spazio come la nostra.

4. **È un esperto di "cucine", non del mondo intero**: Sebbene il modello sia stato addestrato su una vasta gamma di video, le sue capacità di predizione più avanzate sono state testate in contesti specifici, come le cucine del dataset Epic-Kitchens. Questo significa che la sua abilità di generalizzare ad ambienti e azioni totalmente diversi è ancora un'area di ricerca attiva.

In sostanza, V-JEPA 2 è un passo da gigante verso la creazione di AI che "capiscono" il mondo visivo, ma è ancora uno strumento nelle mani dei ricercatori. Le sue attuali limitazioni sono proprio ciò che guida il lavoro futuro per creare sistemi sempre più capaci, sicuri e, soprattutto, utili per l'umanità.


## In Conclusione

V-JEPA 2 non è solo un altro modello di intelligenza artificiale. È una dimostrazione potente di come l'apprendimento auto-supervisionato su larga scala possa creare sistemi che non si limitano a riconoscere pattern, ma che iniziano a *capire* e *prevedere* il mondo in un modo che permette loro di agire intelligentemente al suo interno.

Sebbene dovremo aspettare ancora un bel po' prima di arrivare ad un'AI con il buon senso di un essere umano, V-JEPA 2 ci mostra un percorso affascinante e promettente per arrivarci.

Qui il link al github se vuoi vedere il codice, leggere il paper, o saperne di più:
[V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://github.com/facebookresearch/vjepa2?tab=readme-ov-file)

Grazie per la lettura!

