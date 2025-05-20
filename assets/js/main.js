const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


const copiaBtn = document.getElementById("copiaBtn");
if (copiaBtn) {
    copiaBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Testo copiato negli appunti!"))
            .catch(err => console.error("Errore nella copia:", err));
    });
}



window.addEventListener('load', () => {
    const heroText = document.getElementById('hero-text');
    const heroImage = document.getElementById('hero-image');
    const heroButton = document.getElementById('hero-button');

    // Delay a cascata
    setTimeout(() => {
      heroText.classList.add('hero-visible');
      heroText.classList.remove('hero-hidden');
    }, 10);

    setTimeout(() => {
      heroImage.classList.add('hero-visible2');
      heroImage.classList.remove('hero-hidden2');
    }, 200);

    // setTimeout(() => {
    //     heroButton.classList.add('hero-visible3');
    //     heroButton.classList.remove('hero-hidden3');
    //   }, 700);
  });


  document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.querySelector('.animated-gradient-text');
    const textsToCycle = [
      "Soluzioni AI Custom",
      "Formazione",
      "Gestione Documentale",
      "Data Analysis",
      "Sistemi RAG",
      "AI Security Assessment",
      "Soluzioni Cybersecurity",
      // Aggiungi tutte le scritte che desideri
    ];
    let currentIndex = 0;
    let isAnimatingOut = false;
  
    function changeText() {
      isAnimatingOut = true;
      // Aggiungi una classe per l'animazione di uscita (es. fade-out, slide-up-out)
      textElement.classList.add('text-fade-out'); // Dovrai definire questa classe in CSS
  
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % textsToCycle.length;
        textElement.textContent = textsToCycle[currentIndex];
  
        // Rimuovi la classe di uscita e aggiungi quella di entrata
        textElement.classList.remove('text-fade-out');
        textElement.classList.add('text-fade-in'); // Dovrai definire questa classe in CSS
  
        // Rimuovi la classe di entrata dopo che l'animazione è completata
        // per permettere di rieseguirla correttamente
        setTimeout(() => {
          textElement.classList.remove('text-fade-in');
          isAnimatingOut = false;
        }, 400); // Durata dell'animazione di entrata
  
      }, 400); // Durata dell'animazione di uscita (deve corrispondere a quella definita in CSS)
    }
  
    // Imposta il testo iniziale e l'animazione di entrata iniziale
    if (textsToCycle.length > 0) {
      textElement.textContent = textsToCycle[currentIndex];
      // Simula un'animazione di entrata iniziale
      setTimeout(() => {
          textElement.style.opacity = '1';
          textElement.style.transform = 'translateY(0)';
          textElement.classList.add('text-fade-in'); // Applica l'animazione di entrata iniziale
           setTimeout(() => {
              textElement.classList.remove('text-fade-in');
          }, 100); // Durata dell'animazione
      }, 100); // Piccolo ritardo per assicurarsi che il DOM sia pronto
    }
  
  
    // Cambia il testo ogni X secondi
    setInterval(() => {
      if (!isAnimatingOut) { // Controlla per evitare sovrapposizioni di animazioni
          changeText();
      }
    }, 4500); // Intervallo di cambio testo (es. 4 secondi)
  });