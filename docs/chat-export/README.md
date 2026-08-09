# Esportazione chat del progetto Manalisk

Esportazione in Markdown delle attività Codex associate al progetto locale **Sito web / manalisk.it** e della relativa attività nel progetto **Miglioramento Sito**.

## Contenuto

| # | Conversazione | Turni esportati | Thread ID |
|---:|---|---:|---|
| 1 | [Analizza e riprogetta la home](01-homepage-redesign.md) | 6 | `019fa9a7-198c-7331-b549-3652c9a5da8c` |
| 2 | [Proponi redesign pagina Chi siamo](02-about-redesign.md) | 5 | `019fa973-9eeb-7123-9445-41f4a5bc58d1` |
| 3 | [Rivedi merge e personalità sito](03-site-merge-and-personality.md) | 12 | `019fa8d6-d857-7c72-a021-7f50ccf1ac16` |
| 4 | [Ristruttura pagina Formazione](04-training-page-redesign.md) | 5 | `019fa410-4d53-7392-8eb9-972f329f99b8` |
| 5 | [Crea landing page formazione AI](05-ai-training-landing-page.md) | 19 | `019fa2c6-6ad4-7bb1-a091-0a904487c2e1` |

## Cosa è incluso

- messaggi dell'utente;
- aggiornamenti visibili dell'assistente;
- risposte finali;
- ordine cronologico dei turni completati.

## Cosa è escluso

- ragionamento interno del modello;
- istruzioni di sistema e configurazioni interne;
- chiamate agli strumenti e output tecnici;
- allegati binari; quando utile rimane soltanto il nome dell'allegato;
- il turno ancora attivo durante l'esportazione;
- conversazioni personali o appartenenti ad altri progetti.

I percorsi assoluti del computer sono sostituiti con `<PROJECT_ROOT>`, `<PROJECT_WORKSPACE>` o `<LOCAL_PATH>`.

## Uso su un altro computer

Questi file sono un archivio consultabile e possono essere forniti come contesto a una nuova attività Codex. Non ricreano automaticamente le conversazioni native nella barra laterale dell'app.

Per continuare il lavoro:

1. clonare il repository;
2. aprire `PROJECT_CONTEXT.md`;
3. aprire, se necessario, il transcript relativo alla pagina interessata;
4. indicare a Codex quali file usare come contesto.

Esportazione eseguita il **10 agosto 2026**.
