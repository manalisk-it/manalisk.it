---
title: "Cuda and Pytorch!"
description: "Impariamo a installare cuda e pytorch!"
date: 2025-03-18
draft: false
images: ["hugo-logo.png"]
featured_image: "bootstrap-5-3.png"
categories: ["The Bootstrap Blog"]
tags: ["Bootstrap"]
keywords: ["bootstrap 5 3","bootstrap 5","bootstrap"]
authors: ["Mark Otto"]
---

# Installare Python


# Usare Pip 

> sudo apt install python3-pip


# Installare Anaconda/Miniconda

andare al link https://www.anaconda.com/download/
vi farà inserire la vostra email o potete clickare su "skip registration"


selezionate anaconda o miniconda, e poi scaricate per linux 

sarà un file del tipo Miniconda3-latest-Linux-x86_64.sh

andate nella cartella dov'è stato scaricate, aprite un terminale e digitate 

> sh Miniconda3-latest-Linux-x86_64.sh

seguite il processo di installazione sul terminale

alla domanda Do you wish to update your shell profile to automatically initialize conda? dite yes cosi si partirà conda ogni volta che aprirete il terminale

adesso riaprite il terminale e vedrete (base) scritto 

creiamo un nuovo environment!

# Nuovo environment

Le ultime versioni di pytorch richiedono con python >= 3.9

Creiamo un environment con python 3.9 o superiore. io userò python 12


> conda create -n [nome_environment] python=3.12

> conda create -n pytorch python=3.12

date invio e aspettate che installi il tutto

> conda activate pytorch 

e vedrete la scritta vicino l'environment

# Installazione pytorch

conda non è più supportato quindi useremo pip

per capire la versione di cuda da installare, è importante sapere i driver installati della nostra gpu.

con nvidia-smi possiamo vedere "CUDA Version", che ci dice la versione massima di CUDA supportata dai nostri driver. 

in questo link potete vedere una tabella con le versione di cuda e i driver minimi. io installerò 12.4 perchè ho il driver 550.120
https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html 

se nvidia-smi non funziona, significa che i driver nvidia non sono installati. 

proviamo ad isntallaarli/aggiornarli

https://www.nvidia.com/en-us/drivers/ qui troviamo i driver metetndo la nostra scheda madre e il sistema operativo 

scarichiamo e sarà un NVIDIA-Linux-x86_64-570.124.04.run
rendiamolo eseguibile ed eseguiamo

una volta installati dovremmo riavviare il pc e nvidia-smi dovrebbe essere disponibile.

Una volta disponibile, selezioniamo da pytorch i nostri requisiti

``pip3 install torch torchvision torchaudio``

eseguendolo dentro l'ambiente conda creato in precedenza

ci vorrà un po' per l'installazione

testiamo se funziona con 

```python {linenos=inline style=emacs}
import torch 
torch.cuda.is_available()
```

dovrebbe darvi True. A volte potrebbe essere necessario riavviare il pc prima di vedere la GPU funzionante (errore: )
UserWarning: CUDA initialization: CUDA unknown error - this may be due to an incorrectly set up environment, e.g. changing env variable CUDA_VISIBLE_DEVICES after program start. Setting the available devices to be zero. (Triggered internally at /pytorch/c10/cuda/CUDAFunctions.cpp:109.) return torch._C._cuda_getDeviceCount() > 0

```go {linenos=inline hl_lines=[3,"6-8"] style=nord}
package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        fmt.Println("Value of i:", i)
    }
}
```


more styles: https://gohugo.io/quick-reference/syntax-highlighting-styles/#nord