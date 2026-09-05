# Contesto del progetto Manalisk

## Repository

- Repository: `manalisk-it/manalisk.it`
- Branch di lavoro al momento dell'esportazione: `manalisk-personality`
- Tecnologia: Hugo Extended, Bootstrap e Sass
- I contenuti modificabili devono rimanere sotto `content/`; layout e presentazione sotto `layouts/` e `assets/sass/`.

## Stato del redesign

Il sito sta adottando un sistema grafico da catalogo servizi:

- font principale Inter;
- palette neutra e superfici fredde leggere;
- CTA principali tramite `cta-button`;
- link secondari tramite `modern-text-link`;
- contenuti commerciali strutturati nel front matter;
- pagine sperimentali con URL terminante in `2` e `noindex: true`.

## Pagine sperimentali principali

- `/home2/`: nuova home con tre accessi immediati ad AI e automazione, cybersecurity e formazione;
- `/about2/`: pagina Chi siamo;
- `/services/servizi-intelligenza-artificiale2/`: catalogo servizi AI;
- `/services/servizi-cybersecurity2/`: catalogo servizi cybersecurity;
- `/formazione-intelligenza-artificiale-e-cybersecurity2/`: catalogo formazione.

La home di produzione e la navigazione non devono essere sostituite senza approvazione esplicita.

## Decisioni sulla home2

- Le tre aree devono essere comprensibili nel primo blocco.
- Il drago deve restare riconoscibile ma non dominare la pagina.
- Scritta Manalisk, drago e titolo usano un ingresso da sinistra con dissolvenza.
- La CTA primaria comunica esplicitamente una prima consulenza gratuita.
- Sono presenti i dati: 20+ aziende e professionisti, 10+ settori, 1.000+ ore di formazione.
- Servono esempi concreti, FAQ visibili e dati strutturati FAQ.
- Il tono deve essere pratico e credibile, più enfatico di una pagina interna ma non da landing aggressiva.

## Regole operative importanti

- Conservare le pagine di produzione durante la valutazione.
- Non modificare navbar, sostituire pagine o pubblicare redesign senza approvazione.
- Non inventare statistiche, clienti, prezzi, qualifiche o garanzie.
- Verificare Hugo dopo modifiche strutturali o Sass.
- Controllare desktop, mobile e assenza di overflow orizzontale.
- Preservare le modifiche utente non correlate.
- Consultare `AGENTS.md` come fonte completa delle convenzioni del repository.

## Archivio conversazioni

Vedere [README.md](README.md) per l'indice delle chat e i limiti dell'esportazione.
