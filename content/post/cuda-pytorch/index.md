---
title: "Come installare Pytorch col supporto GPU su Ubuntu (Linux)"
description: "Impariamo a installare cuda e pytorch!"
date: 2025-03-18
draft: true
images: ["hugo-logo.png"]
featured_image: "PyTorchGPU.png"
categories: ["The Bootstrap Blog"]
tags: ["Bootstrap"]
keywords: ["bootstrap 5 3","bootstrap 5","bootstrap"]
authors: ["Pier Paolo Tricomi"]

---


Questa guida dettagliata ti aiuterà passo passo a installare CUDA e PyTorch su Ubuntu (o più in generale su un sistema Linux).

---

<!-- ![Hugo](hugo-logo.svg)
{ .img-fluid .mb-5 } -->

## 1. Installare Python

Se stai cercando di installare PyTorch, immagino tu abbia già installato Python sul tuo sistema. Puoi verificarlo con il comando 
```sh
python3 --version
```

Se visualizzi la versione di Python, significa che è installato correttamente, altrimenti è necessario installarlo prima di procedere.

In questo caso puoi installarlo direttamente sul sistema o utilizzare un ambiente virtuale gestito da software come Anaconda. In questo secondo caso, abbiamo la possibilità di avere diversi ambienti dove ognuno ha solo i software necessari. Se qualcosa va storto, potete semplicemente eliminare l'ambiente e crearne un altro, senza compromettere la stabilità del sistema. Potreste avere ad esempio un ambiente per PyTorch e uno per Tensorflow. Vi mostro come procedere in entrambi i casi, anche se consiglio vivamente di creare un nuovo ambiente con Anaconda.

### Installare (o aggiornare) Python sul sistema 
Se volete installare (o aggiornare) Python sul sistema, potete usare i seguenti comandi:

1. Aggiornare i pacchetti del repository 
```sh
sudo apt update && sudo apt upgrade -y
```

2. Installare Python

```sh
sudo apt install python3 -y
```

3. Installate Pip (il gestore di pacchetti di Python, ci servirà più avanti)

```sh
sudo apt install python3-pip -y
```
4. Verificate le versioni di Python e Pip con

```sh
python3 --version
pip3 --version
```

Le ultime versioni di PyTorch supportano solo Python >= 3.9, quindi assicuratevi di avere una versione compatibile.


### Installare Python con Anaconda/Miniconda

Come accennato, Anaconda (o Miniconda, la versione più leggera e che consiglio), permette di creare diversi ambienti virtuali, in modo tale da avere in ognuno di essi diversi software con diverse versioni. Essendo ogni ambiente separato dagli altri, non correte il rischio di avere problemi di dipendenze quando installate nuovi software. Ad esempio, alcuni software potrebbero essere basati su Python 2.7, e avere un ambiente con solo questa versione di Python potrebbe ridurre di molto gli errori di installazione. 

Per installare Anaconda (o Miniconda), puoi seguire i seguenti passaggi:

1. Vai al link: [Download Anaconda](https://www.anaconda.com/download/)
2. Puoi registrarti o cliccare su "Skip Registration".
3. Scarica Anaconda o Miniconda per la tua architettura Linux (solitamente x86).
4. Il file sarà simile a `Miniconda3-latest-Linux-x86_64.sh`.
5. Apri un terminale nella cartella di download e installalo con:

```sh
sh Miniconda3-latest-Linux-x86_64.sh
```

6. Segui le istruzioni fino alla domanda:
   > Do you wish to update your shell profile to automatically initialize conda?

Rispondendo sì, farete in modo che Anaconda venga eseguito automaticamente all'apertura di un nuovo terminale. Consiglio spesso questa opzione così che tu non debba ogni volta far partire Anaconda.

7. Riavvia il terminale. Dovresti vedere `(base)` scritto all'inizio del nome del tuo pc. Questo significa che Anaconda è stato installato correttamente e ti trovi nell'ambiente virtuale "base". Da qui procederemo a creare un nuovo ambiente per PyTorch.

---

## 2. Installare i driver NVIDIA

Per usare PyTorch con il supporto alla GPU, è necessario installare i driver Nvidia. Puoi controllare se i driver sono installati usando il comando comando:

```sh
nvidia-smi
```

Il comando dovrebbe restituire informazioni sulla tua GPU, come puoi vedere in questa immagine. 

Se dovessi incontrare un errore, dovrai installarli manualmente.

### Installare i Driver NVIDIA

Il primo step da fare è scaricare i driver NVIDIA per la tua scheda video dal sito ufficiale:

[NVIDIA Drivers](https://www.nvidia.com/en-us/drivers/)

Ti basterà inserire il tuo modello di GPU e cercare i driver associati.

Dopo aver scaricato il file (con nome simile a `NVIDIA-Linux-x86_64-XXX.XXX.run`), esegui i seguenti comandi:

```sh
chmod +x NVIDIA-Linux-x86_64-XXX.XXX.run
sudo ./NVIDIA-Linux-x86_64-XXX.XXX.run
```

Riavvia il sistema e riprova `nvidia-smi`. Dovresti ora vedere un output simile a quello mostrato in precedenza.

## 3. Creare un Nuovo Environment con Conda (Opzionale)

Se come me avete deciso di utilizzare Anaconda per gestire diversi ambienti per diversi progetti, è il momento di creare un nuovo ambiente per PyTorch.
Le versioni recenti di PyTorch richiedono Python >= 3.9. In questa guida userò Python 3.12.

Inizia creando un nuovo ambiente inserendo il nome dell'ambiente e la versione di python con il comando seguente:

```sh
conda create -n [nome_ambiente] python=[versione] -y
```

Ad esempio, per creare l'ambiente "pytorch" con python 3.12 ti basterà eseguire il comando:

```sh
conda create -n pytorch python=3.12 -y
```

Attendi l'installazione e poi attiva l'environment:

```sh
conda activate pytorch
```

Dovresti vedere il nome dell'environment nel prompt. Ricordati di attivarlo ogni volta che apri un nuovo terminale.

---

## 4. Installare PyTorch

Poiché `conda` non è più supportato per PyTorch, useremo `pip`. Assicuratevi che sia installato con il comando 


```sh
pip3 --version
```

o installatelo coi comandi

```sh
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip -y
```

### Controllare la Versione di CUDA

Per usare la GPU in PyTorch è necessario usare CUDA, un insieme di librerie scritte apposta per eseguire calcoli in GPU.
Prima di installare PyTorch, dobbiamo conoscere la versione massima di CUDA supportata dai nostri driver. Per verificarlo, usa il comando:

```sh
nvidia-smi
```
Se `nvidia-smi` non funziona, probabilmente i driver NVIDIA non sono installati. Assicurati di aver seguito la sezione precedente sull'installazione dei driver. 

Se il comando ritorna le informazioni sulla tua GPU, cerca la scritta `CUDA Version`. Il numero che troverai a fianco (ad esempio 12.0) indica che puoi installare PyTorch con al massimo la versione 12.0 di CUDA. E' importante notare che quando si installa PyTorch tramite Pip, PyTorch avrà al suo interno il Runtime CUDA con la versione selezionata in fase di installazione, quindi non è necessario installare CUDA a priori perchè funzioni. Avere differenti versioni di CUDA potrebbe causare qualche problema di compatibilità. 

Puoi controllare di che driver avrai bisogno per una specifica versione di CUDA in questa tabella ufficiale di Nvidia:
[Release Notes CUDA](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#id6)


### Installare PyTorch usando Pip

Dopo aver verificato la versione di CUDA compatibile coi nostri driver, siamo pronti a installare PyTorch. Per farlo, andate al [sito ufficiale di PyTorch](https://pytorch.org/), e selezionate le vostre preferenze, indicando la versione di CUDA identificata in precedenza. Anche se siamo in un ambiente Conda, dovremo usare Pip in quanto le repository Conda non sono più mantenute. Alla fine, nella sezione "Run this Command:", troverete il comando da dare nel terminale. Controllate di essere nell'environment di Conda giusto, se l'avete creato. Il comando sarà ad esempio:

```sh
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
```

Dopo qualche minuto, l'installazione sarà completata e potrete usare PyTorch con il supporto GPU!

---

## 5. Verificare l'Installazione

Per verificare che l'installazione sia andata a buon fine, apri un terminale e avvia Python con:

```sh
python
```

Ora esegui:

```python{linenos=inline, style=nord}
import torch
torch.cuda.is_available()
```

Se tutto è andato a buon fine, dovrebbe restituire `True`.

Se ricevi un errore del tipo:

`UserWarning: CUDA initialization: CUDA unknown error - this may be due to an incorrectly set up environment...
`

Prova a riavviare il computer e ripetere il test, sperando di non incontrare altri errori.

Ora che abbiamo installato PyTorch con il supporto GPU siamo pronti per ottenere il meglio dal nostro PC! Buon AI a tutti :D 🎉 