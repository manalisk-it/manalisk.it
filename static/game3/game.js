// --- Setup Iniziale ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Dimensioni del canvas (possono essere cambiate)
canvas.width = 800;
canvas.height = 400;

// Riferimenti agli elementi UI
const healthDisplay = document.getElementById('healthDisplay');
const manaDisplay = document.getElementById('manaDisplay');
const dashCooldownDisplay = document.getElementById('dashCooldownDisplay');
const shieldCooldownDisplay = document.getElementById('shieldCooldownDisplay');
const ultimateManaCostDisplay = document.getElementById('ultimateManaCostDisplay');

// --- Stato del Gioco ---
let gameRunning = true; // Potrebbe servire per mettere in pausa o game over
let lastTime = 0;
let keys = {}; // Oggetto per tenere traccia dei tasti premuti

// Array per contenere le entità di gioco
let projectiles = [];
let enemies = []; // Array per i nemici (verrà usato in futuro)
let particles = []; // Per effetti visivi (es. flash ultimate)

// --- Configurazione Globale ---
const PLAYER_COLOR = 'aqua';
const PROJECTILE_COLOR = 'lime';
const DASH_DURATION_MS = 150; // Durata del boost di velocità del dash
const DASH_SPEED_MULTIPLIER = 3;
const SHIELD_DURATION_MS = 2000; // 2 secondi di scudo
const ULTIMATE_MANA_COST = 50;
const ULTIMATE_DAMAGE_MULTIPLIER = 1.5; // 150%
const PARTICLE_LIFESPAN = 300; // Durata particelle flash

// --- Classe Base per Entità ---
// (Utile per avere proprietà comuni come posizione, draw, update in futuro)
class Entity {
    constructor(x, y, width, height, color, imageSrc = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.image = null;
        if (imageSrc) {
            this.image = new Image();
            this.image.src = imageSrc;
            // Gestiremo il caricamento asincrono più avanti se necessario
        }
    }

    // Metodo base per disegnare (quadrato colorato se non c'è immagine)
    draw(context) {
        if (this.image && this.image.complete) { // Controlla se l'immagine è caricata
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // Metodo update (da implementare nelle classi figlie)
    update(deltaTime) {
        // Logica specifica dell'entità
    }
}


// --- Classe Manalisk (Giocatore) ---
class Player extends Entity {
    constructor(x, y) {
        const size = 30;
        super(x, y, size, size, PLAYER_COLOR /*, "path/to/manalisk.png" */); // Aggiungere path immagine qui

        // Statistiche Base
        this.baseSpeed = 200; // Pixel al secondo
        this.speed = this.baseSpeed;
        this.health = 100;
        this.maxHealth = 100;
        this.mana = 100;
        this.maxMana = 100;

        // Sparo
        this.baseFireRateDelay = 200; // Millisecondi tra un colpo e l'altro (5 al secondo)
        this.fireRateDelay = this.baseFireRateDelay;
        this.lastShotTime = 0;
        this.projectileSpeed = 400; // Pixel al secondo
        this.projectileDamage = 10; // Danno base proiettile

        // Dash
        this.dashCooldown = 10000; // 10 secondi in ms
        this.lastDashTime = -this.dashCooldown; // Pronto all'inizio
        this.isDashing = false;
        this.dashEndTime = 0;

        // Scudo
        this.shieldCooldown = 10000; // 10 secondi in ms
        this.lastShieldTime = -this.shieldCooldown; // Pronto all'inizio
        this.isShieldActive = false;
        this.shieldEndTime = 0;

        // Ultimate
        // Nessun cooldown specifico, solo costo in mana per ora
    }

    update(deltaTime, keys, canvasWidth, canvasHeight) {
        const now = Date.now();
        const speedThisFrame = this.speed * deltaTime;

        // --- Gestione Dash ---
        if (this.isDashing) {
            if (now >= this.dashEndTime) {
                this.isDashing = false;
                this.speed = this.baseSpeed; // Ripristina velocità normale
            } else {
                 // Durante il dash, ci si muove solo in avanti (destra)
                this.x += speedThisFrame;
            }
        } else {
             // --- Movimento Normale ---
            if (keys['w'] || keys['ArrowUp']) this.y -= speedThisFrame;
            if (keys['s'] || keys['ArrowDown']) this.y += speedThisFrame;
            if (keys['a'] || keys['ArrowLeft']) this.x -= speedThisFrame;
            if (keys['d'] || keys['ArrowRight']) this.x += speedThisFrame;
        }


        // --- Controllo Limiti Canvas ---
        this.x = Math.max(0, Math.min(canvasWidth - this.width, this.x));
        this.y = Math.max(0, Math.min(canvasHeight - this.height, this.y));

        // --- Gestione Scudo ---
        if (this.isShieldActive && now >= this.shieldEndTime) {
            this.isShieldActive = false;
        }

        // --- Gestione Input Abilità ---
        // Sparo (J)
        if (keys['j'] || keys['J']) {
            if (now - this.lastShotTime >= this.fireRateDelay) {
                this.shoot();
                this.lastShotTime = now;
            }
        }

        // Dash (K)
        if ((keys['k'] || keys['K']) && !this.isDashing && now - this.lastDashTime >= this.dashCooldown) {
            this.activateDash(now);
        }

        // Scudo (L)
        if ((keys['l'] || keys['L']) && !this.isShieldActive && now - this.lastShieldTime >= this.shieldCooldown) {
            this.activateShield(now);
        }

        // Ultimate (Spazio)
        if (keys[' ']) { // Spazio
           this.activateUltimate();
        }

        // --- Aggiornamento UI Cooldown ---
        this.updateCooldownUI(now);
    }

    shoot() {
        // Crea un proiettile davanti al giocatore
        const projectileX = this.x + this.width; // Parte dalla destra del giocatore
        const projectileY = this.y + this.height / 2 - 2; // Centrato verticalmente (-2 per aggiustare la dimensione)
        projectiles.push(new Projectile(projectileX, projectileY, this.projectileSpeed, this.projectileDamage));
        // console.log("Pew! Projectiles:", projectiles.length); // Debug
    }

    activateDash(currentTime) {
        if (this.isDashing) return; // Evita doppi dash
        this.isDashing = true;
        this.speed = this.baseSpeed * DASH_SPEED_MULTIPLIER;
        this.dashEndTime = currentTime + DASH_DURATION_MS;
        this.lastDashTime = currentTime;
        console.log("Dash Activated!");
    }

    activateShield(currentTime) {
         if (this.isShieldActive) return;
        this.isShieldActive = true;
        this.shieldEndTime = currentTime + SHIELD_DURATION_MS;
        this.lastShieldTime = currentTime;
        console.log("Shield Activated!");
    }

    activateUltimate() {
        if(this.mana >= ULTIMATE_MANA_COST) {
            this.mana -= ULTIMATE_MANA_COST;
            console.log("ULTIMATE! Mana left:", this.mana);
            // Danneggia tutti i nemici (logica da implementare quando ci saranno nemici)
            enemies.forEach(enemy => {
                // Calcola danno (150% del danno base proiettile? O un valore fisso?)
                // Per ora usiamo il danno proiettile come riferimento
                const ultimateDamage = this.projectileDamage * ULTIMATE_DAMAGE_MULTIPLIER;
                enemy.takeDamage(ultimateDamage); // Assumendo che l'enemy abbia un metodo takeDamage
            });

            // Effetto visivo flash (particelle semplici)
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    Math.random() * 3 + 1, // Dimensione casuale
                    'white'
                ));
            }

        } else {
            console.log("Not enough mana for Ultimate!");
        }
    }

    takeDamage(amount) {
        if (this.isShieldActive) {
            console.log("Damage blocked by shield!");
            return;
        }
        this.health -= amount;
        console.log(`Ouch! Took ${amount} damage. Health: ${this.health}`);
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    }

    die() {
        console.log("Manalisk Defeated! Game Over.");
        gameRunning = false; // Ferma il gioco (semplice per ora)
        // Qui potresti mostrare una schermata di Game Over, ecc.
         alert("Game Over!"); // Semplice alert per ora
    }

    // Metodo per disegnare Manalisk (e lo scudo se attivo)
    draw(context) {
        super.draw(context); // Chiama il draw della classe Entity (quadrato o immagine)

        // Disegna effetto scudo se attivo
        if (this.isShieldActive) {
            context.strokeStyle = 'cyan';
            context.lineWidth = 2;
            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width * 0.7, 0, Math.PI * 2);
            context.stroke();
            context.lineWidth = 1; // Reset
        }
    }

    updateCooldownUI(currentTime) {
        // Dash
        const dashCDRemaining = Math.max(0, this.dashCooldown - (currentTime - this.lastDashTime));
        dashCooldownDisplay.textContent = dashCDRemaining > 0 ? `${(dashCDRemaining / 1000).toFixed(1)}s` : 'Pronto';

        // Shield
        const shieldCDRemaining = Math.max(0, this.shieldCooldown - (currentTime - this.lastShieldTime));
        shieldCooldownDisplay.textContent = shieldCDRemaining > 0 ? `${(shieldCDRemaining / 1000).toFixed(1)}s` : 'Pronto';
    }
}

// --- Classe Proiettile ---
class Projectile extends Entity {
    constructor(x, y, speed, damage) {
        super(x, y, 8, 4, PROJECTILE_COLOR /*, "path/to/projectile.png" */); // Immagine proiettile
        this.speed = speed;
        this.damage = damage;
    }

    update(deltaTime) {
        this.x += this.speed * deltaTime;
    }

    // Metodo per controllare se il proiettile è fuori dallo schermo
    isOffScreen(canvasWidth) {
        return this.x > canvasWidth;
    }
}

// --- Classe Particella (per effetti visivi) ---
class Particle extends Entity {
     constructor(x, y, size, color) {
        super(x, y, size, size, color);
        this.creationTime = Date.now();
        this.lifespan = PARTICLE_LIFESPAN; // Millisecondi
    }

    update(deltaTime) {
       // Le particelle semplici potrebbero non muoversi, solo svanire
    }

    isExpired() {
        return Date.now() - this.creationTime > this.lifespan;
    }
}


// --- Funzioni di Gioco Principali ---

// Funzione per inizializzare il gioco (se necessario riavviare)
function initGame() {
    lastTime = 0;
    keys = {};
    projectiles = [];
    enemies = []; // Resetta nemici
    particles = []; // Resetta particelle
    player = new Player(50, canvas.height / 2 - 15); // Crea istanza giocatore
    gameRunning = true;

    // Aggiorna UI iniziale
    healthDisplay.textContent = player.health;
    manaDisplay.textContent = player.mana;
    ultimateManaCostDisplay.textContent = ULTIMATE_MANA_COST;
    player.updateCooldownUI(Date.now());

    // Riavvia il game loop se non è già in esecuzione
    // (requestAnimationFrame si ferma da solo se gameRunning è false nel loop)
    if (!gameRunning) { // Questo check è un po' ridondante qui ma concettuale
         requestAnimationFrame(gameLoop);
    }
}


// Il Game Loop principale
function gameLoop(timestamp) {
    if (!gameRunning) return; // Esce se il gioco è fermo

    const deltaTime = (timestamp - lastTime) / 1000; // Delta time in secondi
    lastTime = timestamp;

    // 1. Pulisci il Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- SEZIONE AGGIORNAMENTO ---
    // Aggiorna il giocatore
    player.update(deltaTime, keys, canvas.width, canvas.height);

    // Aggiorna i proiettili e rimuovi quelli fuori schermo
    projectiles = projectiles.filter(p => {
        p.update(deltaTime);
        // Aggiungere qui il controllo collisioni con nemici in futuro
        return !p.isOffScreen(canvas.width);
    });

    // Aggiorna i nemici (logica futura)
    enemies.forEach(enemy => {
        enemy.update(deltaTime);
        // Aggiungere controllo collisioni con giocatore e proiettili
    });

     // Aggiorna le particelle e rimuovi quelle scadute
    particles = particles.filter(p => {
        p.update(deltaTime);
        return !p.isExpired();
    });


    // --- SEZIONE DISEGNO ---
    // Disegna lo sfondo (in futuro sarà a scorrimento)
    // Per ora è solo lo sfondo nero del CSS

    // Disegna i proiettili
    projectiles.forEach(p => p.draw(ctx));

    // Disegna i nemici (logica futura)
    enemies.forEach(e => e.draw(ctx));

    // Disegna il giocatore
    player.draw(ctx);

     // Disegna le particelle
    particles.forEach(p => p.draw(ctx));


    // --- Aggiorna UI ---
    healthDisplay.textContent = player.health;
    manaDisplay.textContent = player.mana;
    // Cooldown aggiornati nel player.update

    // Richiedi il prossimo frame
    requestAnimationFrame(gameLoop);
}

// --- Gestione Input ---
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true; // Usa toLowerCase per consistenza (es. 'W' e 'w')

    // Prevenire il comportamento di default per tasti usati nel gioco (es. spazio per scrollare)
     if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// --- Avvio del Gioco ---
let player; // Definisci player globalmente nello scope dello script
initGame(); // Chiama la funzione per inizializzare tutto
requestAnimationFrame(gameLoop); // Avvia il loop

console.log("Game script loaded and initialized.");