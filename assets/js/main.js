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

    if (heroText) {
      // Delay a cascata
      setTimeout(() => {
        heroText.classList.add('hero-visible');
        heroText.classList.remove('hero-hidden');
      }, 10);
    }

    if (heroImage){
      setTimeout(() => {
        heroImage.classList.add('hero-visible2');
        heroImage.classList.remove('hero-hidden2');
      }, 200);
    }

    // setTimeout(() => {
    //     heroButton.classList.add('hero-visible3');
    //     heroButton.classList.remove('hero-hidden3');
    //   }, 700);
  });
  

// assets/js/gallery-animation.js
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery-container-advanced');
    if (!gallery) return;

    const items = Array.from(gallery.querySelectorAll('.gallery-item-advanced'));
    if (items.length === 0) return;

    const DELAY_FIRST_IMAGE = 500;
    const DELAY_START_SUCCESSIVE = 1500;
    const INTERVAL_BETWEEN_SUCCESSIVE = 1000;

    function resetElementsState() {
        items.forEach(item => {
            item.classList.remove('is-visible', 'with-transition');
            const line = item.querySelector('.line-connector');
            if (line) {
                line.classList.remove('is-visible', 'with-transition');
            }
        });
    }

    function applyAnimation() {
        const is4ColLayout = window.matchMedia("(min-width: 992px)").matches; // Breakpoint per 4 colonne
        const is2ColLayout = window.matchMedia("(max-width: 991px) and (min-width: 600px)").matches; // Breakpoint per 2 colonne

        resetElementsState(); // Resetta classi prima di applicare la logica

        if (is4ColLayout && items.length > 0) {
            // CASO 4 COLONNE: Animazione completa con linee
            items.forEach(item => { // Abilita transizione per tutti gli item e le linee visibili
                item.classList.add('with-transition');
                const line = item.querySelector('.line-connector');
                if (line && window.getComputedStyle(line).display === 'block') {
                    line.classList.add('with-transition');
                }
            });

            // Timeout 1: Prima immagine
            setTimeout(() => {
                if (items[0]) items[0].classList.add('is-visible');
            }, DELAY_FIRST_IMAGE);

            // Timeout 2: Linea del primo item + Seconda immagine
            if (items.length >= 2) {
                setTimeout(() => {
                    const line1 = items[0]?.querySelector('.line-connector');
                    if (line1 && window.getComputedStyle(line1).display === 'block') {
                        line1.classList.add('is-visible');
                    }
                    if (items[1]) items[1].classList.add('is-visible');
                }, DELAY_START_SUCCESSIVE);
            }

            // Timeout 3: Linea del secondo item + Terza immagine
            if (items.length >= 3) {
                setTimeout(() => {
                    const line2 = items[1]?.querySelector('.line-connector');
                    if (line2 && window.getComputedStyle(line2).display === 'block') {
                        line2.classList.add('is-visible');
                    }
                    if (items[2]) items[2].classList.add('is-visible');
                }, DELAY_START_SUCCESSIVE + INTERVAL_BETWEEN_SUCCESSIVE * 1);
            }

            // Timeout 4: Linea del terzo item + Quarta immagine
            if (items.length >= 4) {
                setTimeout(() => {
                    const line3 = items[2]?.querySelector('.line-connector');
                    if (line3 && window.getComputedStyle(line3).display === 'block') {
                        line3.classList.add('is-visible');
                    }
                    if (items[3]) items[3].classList.add('is-visible');
                }, DELAY_START_SUCCESSIVE + INTERVAL_BETWEEN_SUCCESSIVE * 2);
            }

        } else if (is2ColLayout && items.length > 0) {
            // CASO 2x2 COLONNE: Immagini una dopo l'altra, stessi delay, senza linee animate esplicitamente qui
            items.forEach(item => { // Abilita transizione per le immagini
                item.classList.add('with-transition');
            });

            // Timeout Immagine 1
            setTimeout(() => {
                if (items[0]) items[0].classList.add('is-visible');
            }, DELAY_FIRST_IMAGE);

            // Timeout Immagine 2
            if (items.length >= 2) {
                setTimeout(() => {
                    if (items[1]) items[1].classList.add('is-visible');
                }, DELAY_START_SUCCESSIVE);
            }

            // Timeout Immagine 3
            if (items.length >= 3) {
                setTimeout(() => {
                    if (items[2]) items[2].classList.add('is-visible');
                }, DELAY_START_SUCCESSIVE + INTERVAL_BETWEEN_SUCCESSIVE * 1);
            }

            // Timeout Immagine 4
            if (items.length >= 4) {
                setTimeout(() => {
                    if (items[3]) items[3].classList.add('is-visible');
                }, DELAY_START_SUCCESSIVE + INTERVAL_BETWEEN_SUCCESSIVE * 2);
            }
            // Le linee non vengono gestite attivamente qui, la loro visibilità dipende dal CSS base

        } else {
            // CASO 1 COLONNA (o fallback): Tutte visibili subito, nessuna animazione di transizione
            items.forEach(item => {
                // NON aggiungiamo .with-transition
                item.classList.add('is-visible'); // Passa direttamente a opacity 1, transform X 0
                // Le linee qui non dovrebbero essere visibili (display:none dal CSS per layout non a 4 colonne)
                // quindi non c'è bisogno di gestirle.
            });
        }
    }

    applyAnimation(); // Esegui al caricamento

    // Considera di aggiungere un listener per 'resize' se vuoi che l'animazione si adatti
    // dinamicamente al cambio di layout senza ricaricare la pagina (può essere complesso).
    // Per ora, questo si attiva solo al caricamento.
    // let resizeTimer;
    // window.addEventListener('resize', () => {
    // clearTimeout(resizeTimer);
    // resizeTimer = setTimeout(applyAnimation, 250); // Ricarica l'animazione con debounce
    // });
});