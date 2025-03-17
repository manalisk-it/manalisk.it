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
