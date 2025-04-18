const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Opzionale: utile per pixel art

// --- Impostazioni Base ---
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// NUOVO: Impostazioni Sfondo
const backgroundImage = new Image();
backgroundImage.src = '/game/bg2.png'; // <--- METTI QUI IL PERCORSO ALLA TUA IMMAGINE!
let backgroundX1 = 0;
let backgroundX2 = CANVAS_WIDTH; // Posiziona la seconda immagine subito dopo la prima
const backgroundSpeed = 1.5; // Velocità di scorrimento
let isBackgroundLoaded = false;

backgroundImage.onload = () => {
    isBackgroundLoaded = true;
    // NUOVO: Log delle dimensioni per verifica
    console.log('Immagine Caricata:', backgroundImage.src);
    console.log('Larghezza Immagine:', backgroundImage.width, 'px');
    console.log('Larghezza Canvas:', CANVAS_WIDTH, 'px');

    // Assicurati che la seconda immagine sia posizionata correttamente
    backgroundX2 = backgroundX1 + backgroundImage.width;
    console.log("Posizione iniziale: X1 =", backgroundX1, ", X2 =", backgroundX2);
};
backgroundImage.onerror = () => {
    console.error("Errore nel caricamento dell'immagine di sfondo. Assicurati che il percorso sia corretto.");
}


// --- Stato Giocatore ---
const player = {
    x: 100,
    y: CANVAS_HEIGHT / 2 - 25, // Centrato verticalmente
    width: 50,
    height: 50,
    speed: 5,
    color: 'lime',
    hp: 100,
    maxHp: 100,
    mana: 50,
    maxMana: 100,
    shootCooldown: 0,
    shootCooldownTime: 15,
    manaCostPerShot: 5,
    // NUOVO: Rigenerazione Mana
    manaRegenRate: 0.01 // Mana rigenerato per frame (es. 0.1 * 60fps = 6 mana/sec)
};

// --- Stato Proiettili ---
let projectiles = [];
const projectileSpeed = 8;
const projectileWidth = 10;
const projectileHeight = 5;
const projectileColor = 'yellow';

// --- Stato Pietrificazione (Super Mossa) ---
let isPetrifying = false;
let petrifyTimer = 0;
const petrifyDuration = 120;
const petrifyManaCost = player.maxMana;

// --- Input Handling ---
const keysPressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    j: false,
    space: false
};

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w') keysPressed.w = true;
    if (key === 'a') keysPressed.a = true;
    if (key === 's') keysPressed.s = true;
    if (key === 'd') keysPressed.d = true;
    if (key === 'j') keysPressed.j = true;
    if (key === ' ') {
        keysPressed.space = true;
        e.preventDefault();
    }
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w') keysPressed.w = false;
    if (key === 'a') keysPressed.a = false;
    if (key === 's') keysPressed.s = false;
    if (key === 'd') keysPressed.d = false;
    if (key === 'j') keysPressed.j = false;
    if (key === ' ') keysPressed.space = false;
});

// --- Funzioni di Gioco ---

function update() {
     // NUOVO: Aggiorna Posizione Sfondo (con logica di reset corretta)
     if (isBackgroundLoaded) {
        backgroundX1 -= backgroundSpeed;
        backgroundX2 -= backgroundSpeed;

        // Se la prima immagine è completamente fuori schermo a sinistra,
        // riposizionala ESATTAMENTE a destra della seconda immagine
        if (backgroundX1 <= -backgroundImage.width) {
            backgroundX1 = backgroundX2 + backgroundImage.width; // <-- MODIFICATA
        }
        // Se la seconda immagine è completamente fuori schermo a sinistra,
        // riposizionala ESATTAMENTE a destra della prima immagine
        if (backgroundX2 <= -backgroundImage.width) {
            backgroundX2 = backgroundX1 + backgroundImage.width; // <-- MODIFICATA
        }
    }

    // MODIFICATO: Rigenerazione Mana
    if (player.mana < player.maxMana) {
        player.mana += player.manaRegenRate;
        // Assicura che il mana non superi il massimo
        if (player.mana > player.maxMana) {
            player.mana = player.maxMana;
        }
        // Alternativa più concisa: player.mana = Math.min(player.maxMana, player.mana + player.manaRegenRate);
    }

    // 1. Aggiorna Cooldown Sparo
    if (player.shootCooldown > 0) {
        player.shootCooldown--;
    }

    // 2. Gestisci Input e Movimento Giocatore
    if (keysPressed.w && player.y > 0) {
        player.y -= player.speed;
    }
    if (keysPressed.s && player.y < CANVAS_HEIGHT - player.height) {
        player.y += player.speed;
    }
    if (keysPressed.a && player.x > 0) {
        player.x -= player.speed;
    }
    if (keysPressed.d && player.x < CANVAS_WIDTH - player.width) {
        player.x += player.speed;
    }

    // 3. Gestisci Sparo ('J')
    if (keysPressed.j && player.shootCooldown <= 0 && player.mana >= player.manaCostPerShot) {
        player.mana -= player.manaCostPerShot;
        player.shootCooldown = player.shootCooldownTime;
        projectiles.push({
            x: player.x + player.width,
            y: player.y + player.height / 2 - projectileHeight / 2,
            width: projectileWidth,
            height: projectileHeight,
            color: projectileColor,
            speed: projectileSpeed
        });
        // Rimosso il console.log per pulizia
    }

    // 4. Gestisci Super Mossa (Spazio)
    if (keysPressed.space && player.mana >= petrifyManaCost && !isPetrifying) {
        player.mana = 0;
        isPetrifying = true;
        petrifyTimer = petrifyDuration;
        console.log("PIETRIFICAZIONE ATTIVATA!");
    }

    // 5. Aggiorna Stato Pietrificazione
    if (isPetrifying) {
        petrifyTimer--;
        if (petrifyTimer <= 0) {
            isPetrifying = false;
            console.log("Pietrificazione terminata.");
        }
    }

    // 6. Aggiorna Posizione Proiettili
    projectiles.forEach((p, index) => {
        p.x += p.speed;
        if (p.x > CANVAS_WIDTH) {
            projectiles.splice(index, 1);
        }
    });

    // --- Placeholder per altre logiche ---
    // TODO: Aggiornare nemici, ostacoli, pickups...
    // TODO: Gestire collisioni...
    // TODO: Gestire spawning...
    // TODO: Gestire perdita HP e Game Over...
    // TODO: Gestire punteggio...
}

function draw() {
    // 1. Pulisci Canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // NUOVO: Disegna Sfondo (se caricato)
    if (isBackgroundLoaded) {
        // Disegna l'immagine due volte per creare l'effetto di scorrimento infinito
        // Nota: Arrotonda le coordinate x per prevenire possibili artefatti subpixel
        ctx.drawImage(backgroundImage, Math.round(backgroundX1), 0, backgroundImage.width, CANVAS_HEIGHT);
        ctx.drawImage(backgroundImage, Math.round(backgroundX2), 0, backgroundImage.width, CANVAS_HEIGHT);
    } else {
        // Fallback se l'immagine non è caricata (o non esiste)
        ctx.fillStyle = '#000'; // Sfondo nero semplice
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.fillText("Caricamento sfondo...", 20, 100);
    }


    // 2. Disegna Giocatore
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 3. Disegna Proiettili
    projectiles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });

    // --- Placeholder per altri disegni ---
    // TODO: Disegnare nemici, ostacoli, pickups...

    // 4. Disegna Effetto Pietrificazione
    if (isPetrifying) {
        ctx.fillStyle = 'rgba(150, 150, 150, 0.5)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PETRIFICATO!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }

    // 5. Disegna Interfaccia Utente (UI) - MODIFICATO per arrotondare mana
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    // HP
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, (player.hp / player.maxHp) * 150, 20);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(10, 10, 150, 20);
    ctx.fillStyle = 'white';
    ctx.fillText(`HP: ${player.hp}/${player.maxHp}`, 170, 27);
    // Mana
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 40, (player.mana / player.maxMana) * 150, 20);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(10, 40, 150, 20);
    ctx.fillStyle = 'white';
    // Arrotonda il mana visualizzato per non mostrare troppi decimali
    ctx.fillText(`Mana: ${Math.floor(player.mana)}/${player.maxMana}`, 170, 57);
    // TODO: Disegnare Punteggio
}

// --- Game Loop ---
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// --- Avvio Gioco ---
// Non è più necessario il console.log qui
// L'immagine inizierà a caricarsi subito, il loop partirà
gameLoop();