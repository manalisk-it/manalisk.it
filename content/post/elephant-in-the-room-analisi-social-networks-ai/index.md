---
title: "Analizziamo la ricerca scientifica sui Social Network: L'elefante nella Stanza"
description: "Dall'analisi di circa 14.000 articoli scientifici sui social network, abbiamo rivelato una forte disconnessione tra gli argomenti trattati dalla ricerca e l'effettivo utilizzo dei social. Gli studi si concentrano abbondantemente su Twitter (ora X), trascurando social network estremamente popolari come Instagram e TikTok, rendendo la ricerca inadatta a comprendere i problemi della società contemporanea."
date: 2025-07-02
draft: true
images: ["hugo-logo.png"]
featured_image: "Fig1.png"
featured_image_visible: False
categories: ["The Bootstrap Blog"]
tags: ["Bootstrap"]
keywords: ["bootstrap 5 3","bootstrap 5","bootstrap"]
authors: ["Pier Paolo Tricomi"]

---


In questo articolo vorrei presentare i risultati della mio ultimo articolo di ricerca, intitolato [*"Elephant in the Room: Dissecting and Reflecting on the Evolution of Online Social Network Research"*](https://ojs.aaai.org/index.php/ICWSM/article/view/35881). L'articolo è stato accettato alla prestigiosa **AAAI International Conference on Web and Social Media (ICWSM) 2025**, una conferenza accademica di riferimento a livello mondiale per gli studi sui social media. Ringrazio gli altri autori del paper Luca Pajola, Saskia Laura Schröer, Mauro Conti e Giovanni Apruzzese per l'ottimo lavoro che abbiamo fatto!

Dopo anni di studi sui social network, in questo paper abbiamo deciso di fare un passo indietro e guardare con occhio critico l'intero campo della ricerca sul settore. Continuando a vedere sempre più studi condotti su Twitter (X) e quasi zero su piattaforme sempre più popolari come TikTok, ci siamo chiesti: la ricerca e il mondo reale sono allineati? La comunità scientifica sta andando nella direzione giusta?

Per rispondere a queste domande, abbiamo analizzato (quasi) tutti gli articoli scientifici in ambito social network dal 2006 (quando nacquero i primi articoli su Facebook) fino ad oggi.

## **L'analisi di 1 milione di articoli e Minerva-OSN**

Il primo passo è stato raccogliere tutto ciò che è stato scritto sull'argomento. Per farlo, abbiamo selezionato 135 venues (conferenze, workshop, o riviste scientifiche) che potessero pubblicare lavori inerenti ai social network. Così facendo, abbiamo raccolto oltre **1 milione di pubblicazioni scientifiche** che trattavano più di 200 Online Social Network (OSN) e, con un'attenta opera di selezione e filtraggio, abbiamo identificato **13.842 articoli** che si occupavano specificamente di OSN. Come potrai immaginare, non abbiamo certo letto 1 milioni di articoli. Piuttosto, abbiamo creato una lista di OSN possibili (ben 296!), e verificato che nell'abstract o nel titolo di un articolo apparisse almeno una menzione a un social network. Per i social network con nomi ambigui o di nicchia, ad esempio ("Ning"), abbiamo svolto un ulteriore verifica manuale.  

Una volta filtrati, abbiamo organizzato i metadati di tutti questi lavori (titolo, autori, abstract, ecc.) in un unico dataset che abbiamo chiamato [**Minerva-OSN**](https://github.com/pajola/Minerva-OSN), in onore della dea della saggezza. È il primo dataset di questo tipo e lo abbiamo reso pubblico, a disposizione di tutta la comunità scientifica.

Una volta raccolti i dati, dovevamo analizzarli. Ovviamente leggere 14'000 articoli non è proprio un passatempo, ed è per questo che ci siamo fatti aiutare dall'AI.

## **Come abbiamo utilizzato l'AI per l'analisi**

Leggere e classificare quasi 14.000 abstract a mano sarebbe stato un lavoro impossibile. Qui è entrata in gioco l'Intelligenza Artificiale, ma non ci siamo limitati a "chiedere a ChatGPT". Abbiamo sviluppato una procedura rigorosa e innovativa, utilizzando diversi modelli di AI.

1.  **Individuare i temi principali**: Per identificare gli argomenti trattati dai paper abbiamo estratto da ogni abstract i loro topic (il task si chiama topic modeling), corrispondenti a un insieme di keywords. Per farlo, abbiamo usato un framework chiamato **BERTopic**. In pratica, abbiamo dato in input all'AI tutti gli abstract dei paper. Il suo compito era raggruppare quelli che parlavano di argomenti simili, creando dei "cluster" tematici. In questo step non sapevamo ancora di cosa parlassero i paper, ma solo che se essi appartenevano allo stesso cluster, allora trattavano un argomento simile.

2.  **Guidare l'AI per evitare pregiudizi**: Ci siamo accorti subito di un problema. Se un abstract menzionava "Twitter", l'AI tendeva a raggrupparlo con altri paper su Twitter, indipendentemente dal contenuto reale. Per evitare questo "bias" (o pregiudizio, molto comune nei modelli di intelligenza artificiale), abbiamo sostituito tutti i nomi specifici dei social network (come "Facebook", "Twitter", "Instagram") con un'etichetta generica ("OSN"). In questo modo, l'AI è stata "costretta" a concentrarsi solo sul vero tema della ricerca.

3.  **Dare un nome ai temi (con l'aiuto degli LLM)**: Una volta raggruppati gli abstract in base alla similarità, abbiamo estratto le keyword più comuni così da poter etichettarne il topic. Per questo scopo abbiamo usato dei Large Language Models (LLM), come Llama 2 e GPT-4, per generare un nome e una descrizione chiara per ciascuno dei **17 temi principali** emersi, come "Fake News Detection" o "Security and Privacy Risks". 

4.  **La validazione umana**: Sapendo che l'AI non è infallibile, abbiamo condotto un ultimo test umano per testare la validità del nostro approccio. Ricordati che l'AI non è infallibile, e l'affiancamento di un umano è spesso necessario. Per validare i risultati, abbiamo coinvolto tre revisori umani esperti del settore. Senza potersi consultare tra di loro, abbiamo chiesto di assegnare un tema a un campione di 170 abstract. L'accordo tra le decisioni degli esperti e del nostro modello di AI è stato alto (oltre il 70%!), confermando la bontà del nostro approccio.

La Figura 2 mostra i topic che abbiamo identificato con la relativa frequenza.

{{< blogfigure src="Fig2.png" alt="Analisi Topic Modeling" caption="Figura 2: Distribuzione dei temi principali (topic) negli artioli considerati." >}}

Sorprendentemente, topic che interessano di più le persone comuni, come ad esempio "Fake News Detection" o "Hate speech Detection", sono molto meno frequenti di topic come "Multimedia Retrieval and Tagging", un tema più caldo tra i ricercatori. Sorge quindi spontaneo riflettere sulle priorità e la direzione della ricerca in ambito social media. 

## **I risultati: un mondo di ricerca disconnesso dalla realtà**

Analizzando Minerva-OSN, sono emerse delle tendenze molto allarmanti, quello che noi abbiamo definito l'"elefante nella stanza".

* **Twitter è il re (incontrastato) della ricerca**: La stragrande maggioranza degli studi si concentra su Twitter. Sebbene sia una piattaforma importante, la sua popolarità è diminuita di molto negli anni, specialmente tra i più giovani. Eppure, nel mondo accademico, la sua presenza non accenna a diminuire.
* **Piattaforme come TikTok e Instagram sono quasi invisibili**: Social network estremamente popolari, soprattutto tra gli under 30 (come Instagram, TikTok, Snapchat e BeReal), sono praticamente dimenticati, creando un enorme "buco" di conoscenza. Da sempre i social sono utilizzati come mezzo per lo studio di comportamenti sociali, ma come possiamo studiare fenomeni come il cyberbullismo se non analizziamo le piattaforme dove questo avviene?
* **L'accesso ai dati è il vero collo di bottiglia**: Se ti stai chiedendo il perché di questa discrepanza, il motivo è in gran parte nelle **policy di accesso ai dati** degli OSN. Fino al 2023, Twitter offriva un accesso ai suoi dati (tramite API) relativamente semplice e gratuito per i ricercatori. Altre piattaforme (come Facebook e Instagram), invece, sono sempre state molto più restrittive. Questo ha spinto i ricercatori a concentrarsi sulla "via più facile", anche se non era la più rappresentativa del mondo reale, risultando in analisi spesso distorte e obsolete.
* **Un calo preoccupante dopo il 2018**: Abbiamo notato un calo significativo nel numero di pubblicazioni sui social network da parte di ricercatori europei e statunitensi a partire dal 2018. Una delle possibili cause è l'entrata in vigore del **GDPR**, che ha reso le policy di accesso ai dati ancora più stringenti.

Nella Figura 2 vediamo la discrepanza tra gli OSN più popolari (con Website Ranking basso, dove 1 è il più popolare) e il numero di paper. Si vede subito come Twitter si discosti enormemente dagli altri sebbene la sua popolarià non sia mai stata tra i primi posti.

{{< figure src="Fig1.png" alt="Analisi risultati" caption="Figura 2: Distribuzione dei temi principali" >}}

Per confermare questi sospetti, abbiamo anche condotto un user-study, proponendo un sondaggio anonimo i ricercatori più esperti del settore. Dalle risposte ricevute, i risultati sono molto chiari: nel "mondo ideale", i ricercatori vorrebbero usare le API per raccogliere dati freschi e rilevanti, soprattutto da OSN "moderni". Nel "mondo reale", sono costretti a ripiegare su vecchi dataset pubblici perché ottenere l'accesso è diventato troppo difficile e costoso. Il 98% di loro ha confermato che stabilire collaborazioni con le aziende dei social media è estremamente complicato.

## **Un appello per "salvare" la ricerca sui social media**

I nostri risultati non vogliono essere una critica a nessuno, ma un campanello d'allarme per tutti. Una ricerca disconnessa dalla realtà è dannosa per la società, perché non ci permette di comprendere e mitigare i rischi (come la disinformazione o i problemi di salute mentale) che emergono sulle piattaforme che le persone usano davvero, soprattutto i giovani.

Per questo, abbiamo voluto concludere il nostro lavoro con tre raccomandazioni:

1.  **Alle aziende dei social media**: vorremmo che aiutaste la ricerca. Creare canali chiari, accessibili e a costi ragionevoli per i ricercatori non è una perdita, ma un investimento che va a beneficio di tutti: migliora la sicurezza della piattaforma e il benessere degli utenti.
2.  **A noi ricercatori**: Dobbiamo sforzarci di guardare "oltre Twitter". Esplorare le piattaforme meno studiate è più difficile, ma è fondamentale per capire le diverse sfaccettature della nostra società sempre più connessa.
3.  **Ai legislatori e alle istituzioni**: La ricerca non è un'attività commerciale. È possibile creare dei "corridoi preferenziali" che, nel pieno rispetto della privacy, permettano agli accademici di accedere ai dati per scopi di ricerca di pubblico interesse.

Speriamo che il nostro lavoro possa avviare una riflessione seria e costruttiva per "salvare" la ricerca sui social network e riportarla al servizio della società.

Se vuoi leggere il paper e approfondire tutti i risultati trovati, lo trovi qui in open-access (gratuito):
[*"Elephant in the Room: Dissecting and Reflecting on the Evolution of Online Social Network Research"*](https://ojs.aaai.org/index.php/ICWSM/article/view/35881)

Grazie per la lettura e alla prossima!

