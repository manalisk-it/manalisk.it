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

    setTimeout(() => {
        heroButton.classList.add('hero-visible3');
        heroButton.classList.remove('hero-hidden3');
      }, 700);
  });