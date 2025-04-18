// >>> INIZIO CODICE game.js (Sostituisci tutto il file) <<<

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Costanti ---
const SCREEN_WIDTH = 1000;
const SCREEN_HEIGHT = 600;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

// Dimensioni FISSE per le entità
const PLAYER_WIDTH = 80; // Larghezza Manalisk
const PLAYER_HEIGHT = 50; // Altezza Manalisk
const ENEMY_WIDTH = 45;   // Larghezza fissa nemici
const ENEMY_HEIGHT = 45;  // Altezza fissa nemici
const OBSTACLE_MIN_SIZE = 25; // Dimensione minima ostacolo
const OBSTACLE_MAX_SIZE = 65; // Dimensione massima ostacolo (verrà usata per creare un valore random)
const PICKUP_WIDTH = 25;   // Larghezza fissa pickup
const PICKUP_HEIGHT = 25;  // Altezza fissa pickup
const PROJECTILE_WIDTH = 10;
const PROJECTILE_HEIGHT = 5;
const ENEMY_PROJECTILE_WIDTH = 8;
const ENEMY_PROJECTILE_HEIGHT = 8;

const PLAYER_SPEED = 4;
const PROJECTILE_SPEED = 6;
const ENEMY_PROJECTILE_SPEED = 3.5;
const MANA_REGEN_RATE = 10;
const MAX_MANA = 100;
const MAX_HEALTH = 100;
const SHOOT_COST = 10;
const FREEZE_COST = MAX_MANA;
const FREEZE_DURATION = 5000;
const DIFFICULTY_INCREASE_INTERVAL = 15000;
const DIFFICULTY_MULTIPLIER_STEP = 0.10;
const BACKGROUND_SCROLL_SPEED = 1;

// Colori per testo fluttuante
const SCORE_TEXT_COLOR = 'gold';
const MANA_TEXT_COLOR = '#87CEFA';
const HEALTH_TEXT_COLOR = '#FF7F7F';

// --- Percorsi Immagini (invariati) ---
const IMAGE_PATHS = {
    background: 'background.png',
    player: 'manalisk.png',
    enemy1: 'enemy1.jpeg',
    enemy2: 'enemy1.jpeg',
    enemy3: 'enemy1.jpeg',
    manaCrystal: 'mana.jpeg',
    healthCrystal: 'hp.jpeg',
    obstacles: ['obstacle1.jpg'] //, 'obstacle2.png']
};

const gameAssets = {};
let imagesLoaded = 0;
let totalImages = 0;
const keysPressed = {};

// --- Variabili di Gioco (invariate) ---
let player;
let projectiles = [];
let enemies = [];
let enemyProjectiles = [];
let obstacles = [];
let pickups = [];
let floatingTexts = [];

let score = 0;
let gameStartTime;
let lastManaRegenTime;
let lastEnemySpawnTime = 0;
let enemySpawnDelay = 2000;
let lastObstacleSpawnTime = 0;
let obstacleSpawnDelay = 3500;
let lastPickupSpawnTime = 0;
let pickupSpawnDelay = 7000;

let freezeActive = false;
let freezeEndTime = 0;

let gameSpeedMultiplier = 1.0;
let lastDifficultyIncreaseTime;

let gameOver = false;
let animationFrameId;
let bgX = 0;

let showFreezeText = true;
let lastFreezeTextToggle = 0;
const freezeTextBlinkInterval = 300;

// --- Funzione Caricamento Immagini (invariata) ---
function loadImage(path) { /*...*/ return new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = path; }); }
async function loadGameAssets() { /*...*/ console.log("Loading assets..."); let loadPromises = []; totalImages = 0; for (const key in IMAGE_PATHS) { if (key !== 'obstacles') { totalImages++; loadPromises.push(loadImage(IMAGE_PATHS[key]).then(img => { gameAssets[key] = img; imagesLoaded++; console.log(`Loaded: ${key}`); }).catch(err => console.error(`Failed to load ${key}: ${IMAGE_PATHS[key]}`, err))); } } gameAssets.obstacles = []; IMAGE_PATHS.obstacles.forEach((path, index) => { totalImages++; loadPromises.push(loadImage(path).then(img => { gameAssets.obstacles[index] = img; imagesLoaded++; console.log(`Loaded obstacle: ${path}`); }).catch(err => console.error(`Failed to load obstacle: ${path}`, err))); }); await Promise.all(loadPromises); console.log("All assets loaded!"); startGame(); }


// --- Classe FloatingText (invariata) ---
class FloatingText { constructor(x, y, text, color, duration = 1000, floatSpeed = 0.7) { this.x = x; this.y = y; this.text = text; this.color = color; this.startTime = Date.now(); this.duration = duration; this.floatSpeed = floatSpeed; this.opacity = 1; } update(scrollSpeed) { const now = Date.now(); const elapsed = now - this.startTime; this.y -= this.floatSpeed; const fadeStartTime = this.duration * 0.5; if (elapsed > fadeStartTime) { this.opacity = 1 - (elapsed - fadeStartTime) / (this.duration - fadeStartTime); this.opacity = Math.max(0, this.opacity); } else { this.opacity = 1; } this.x -= scrollSpeed; return elapsed < this.duration; } draw() { ctx.save(); ctx.globalAlpha = this.opacity; drawText(this.text, this.x, this.y, this.color, 16, 'center', 'bottom'); ctx.restore(); } }


// --- Classi Entità ---

class Player {
    constructor() {
        this.image = gameAssets.player;
        // Usa dimensioni FISSE
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = 100 - this.width / 2;
        this.y = SCREEN_HEIGHT / 2 - this.height / 2;
        this.speed = PLAYER_SPEED;
        // ... resto del costruttore invariato
        this.dx = 0; this.dy = 0; this.health = MAX_HEALTH; this.mana = MAX_MANA / 2; this.lastShotTime = 0; this.shootDelay = 250;
    }
    // Metodi update, draw, shoot, freeze, addMana, addHealth, takeDamage invariati
    update(deltaTime) { this.dx = 0; this.dy = 0; const currentSpeed = this.speed * gameSpeedMultiplier; if (keysPressed['w'] || keysPressed['ArrowUp']) this.dy = -currentSpeed; if (keysPressed['s'] || keysPressed['ArrowDown']) this.dy = currentSpeed; if (keysPressed['a'] || keysPressed['ArrowLeft']) this.dx = -currentSpeed; if (keysPressed['d'] || keysPressed['ArrowRight']) this.dx = currentSpeed; this.x += this.dx; this.y += this.dy; if (this.x < 0) this.x = 0; if (this.x + this.width > SCREEN_WIDTH) this.x = SCREEN_WIDTH - this.width; if (this.y < 0) this.y = 0; if (this.y + this.height > SCREEN_HEIGHT) this.y = SCREEN_HEIGHT - this.height; const now = Date.now(); const timeSinceLastRegen = now - lastManaRegenTime; if (timeSinceLastRegen > 100) { const regenAmount = MANA_REGEN_RATE * (timeSinceLastRegen / 1000); this.mana = Math.min(MAX_MANA, this.mana + regenAmount); lastManaRegenTime = now; } }
    draw() { if (this.image) ctx.drawImage(this.image, this.x, this.y, this.width, this.height); else { ctx.fillStyle = 'lime'; ctx.fillRect(this.x, this.y, this.width, this.height); } }
    shoot() { const now = Date.now(); if (this.mana >= SHOOT_COST && now - this.lastShotTime > this.shootDelay) { this.mana -= SHOOT_COST; this.lastShotTime = now; projectiles.push(new Projectile(this.x + this.width, this.y + this.height / 2)); } }
    freeze() { const now = Date.now(); if (this.mana >= FREEZE_COST) { console.log("Attempting Freeze!"); this.mana = 0; freezeActive = true; freezeEndTime = now + FREEZE_DURATION; console.log("Freeze Activated! Ends at:", freezeEndTime); return true; } console.log("Freeze failed - not enough mana:", this.mana); return false; }
    addMana(amount) { this.mana = Math.min(MAX_MANA, this.mana + amount); }
    addHealth(amount) { this.health = Math.min(MAX_HEALTH, this.health + amount); }
    takeDamage(amount) { this.health = Math.max(0, this.health - amount); if (this.health === 0) gameOver = true; }
}

class Projectile {
    constructor(x, y) {
        // Usa dimensioni fisse
        this.width = PROJECTILE_WIDTH;
        this.height = PROJECTILE_HEIGHT;
        this.x = x; this.y = y - this.height / 2; this.speed = PROJECTILE_SPEED; this.color = 'yellow';
    }
    // Metodi update, draw invariati
    update() { this.x += this.speed * gameSpeedMultiplier; }
    draw() { ctx.fillStyle = this.color; ctx.fillRect(this.x, this.y, this.width, this.height); }
}

class EnemyProjectile {
    constructor(x, y, angleMultiplier) {
        // Usa dimensioni fisse
        this.width = ENEMY_PROJECTILE_WIDTH;
        this.height = ENEMY_PROJECTILE_HEIGHT;
        this.x = x - this.width; this.y = y - this.height / 2; this.baseSpeed = ENEMY_PROJECTILE_SPEED;
        this.speedX = this.baseSpeed; this.speedY = this.baseSpeed * angleMultiplier; this.color = '#ff6666';
    }

    updateActive() { // Metodo chiamato quando NON freezato
        // Muove sia X che Y
        this.x -= this.speedX * gameSpeedMultiplier;
        this.y += this.speedY * gameSpeedMultiplier;
    }

    updateFrozen(scrollSpeed) { // Metodo chiamato QUANDO freezato
        // Applica solo lo scroll orizzontale del mondo
        this.x -= scrollSpeed;
        // La Y non cambia
    }

    draw() { // Invariato
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor(type) {
        this.type = type; this.health = Math.floor(Math.random() * 5) + 1; this.maxHealth = this.health;
        this.speedX = (Math.random() * 2 + 1); this.speedY = 0; this.lastShotTime = Date.now() + Math.random() * 1000;
        this.burstCount = 0; this.burstDelay = 150; this.lastBurstShotTime = 0; this.shootInterval = 1500;
        switch (type) {
            case 1: this.image = gameAssets.enemy1; this.shootInterval = Math.random() * 800 + 1200; break;
            case 2: this.image = gameAssets.enemy2; this.shootInterval = Math.random() * 1000 + 1500; break;
            case 3: this.image = gameAssets.enemy3; this.shootInterval = Math.random() * 1500 + 2000; break;
            default: this.image = gameAssets.enemy1;
        }
        // Usa dimensioni FISSE
        this.width = ENEMY_WIDTH;
        this.height = ENEMY_HEIGHT;
        this.x = SCREEN_WIDTH + Math.random() * 100 + 50; this.y = Math.random() * (SCREEN_HEIGHT - this.height - 80) + 40;
    }
    // Metodi updateActive, updateFrozen, shoot, draw, takeDamage invariati rispetto alla versione precedente
    updateActive() { this.x -= this.speedX * gameSpeedMultiplier; this.y += this.speedY * gameSpeedMultiplier; const now = Date.now(); const currentShootInterval = this.shootInterval / gameSpeedMultiplier; if (now > this.lastShotTime + currentShootInterval) { if (this.type === 1) { this.shoot(0); this.lastShotTime = now; } else if (this.type === 2) { this.shoot(-0.3); this.shoot(0.3); this.lastShotTime = now; } else if (this.type === 3 && this.burstCount === 0) { this.burstCount = 3; this.lastBurstShotTime = now - this.burstDelay; this.lastShotTime = now; } } if (this.type === 3 && this.burstCount > 0 && now > this.lastBurstShotTime + this.burstDelay) { this.shoot(0); this.burstCount--; this.lastBurstShotTime = now; } }
    updateFrozen(scrollSpeed) { this.x -= scrollSpeed; }
    shoot(angleMultiplier) { enemyProjectiles.push(new EnemyProjectile(this.x, this.y + this.height / 2, angleMultiplier)); }
    draw() { if (this.image) ctx.drawImage(this.image, this.x, this.y, this.width, this.height); else { /* Fallback colore */ let color = 'gray'; if(this.type===1) color='red'; else if(this.type===2) color='purple'; else if(this.type===3) color='cyan'; ctx.fillStyle=color; ctx.fillRect(this.x,this.y,this.width,this.height);} if (this.health > 0 && this.health < this.maxHealth) { const barWidth = this.width * 0.8; const barHeight = 5; const barX = this.x + (this.width - barWidth) / 2; const barY = this.y - barHeight - 3; const healthPct = this.health / this.maxHealth; drawBar(barX, barY, barWidth, barHeight, this.health, this.maxHealth, healthPct > 0.6 ? 'green' : healthPct > 0.3 ? 'yellow' : 'red', '#555'); } }
    takeDamage(amount) { this.health -= amount; }
}

class Obstacle {
    constructor(moves) {
        const randomIndex = Math.floor(Math.random() * gameAssets.obstacles.length); this.image = gameAssets.obstacles[randomIndex];
        // Usa dimensioni FISSE (calcolate random tra min e max)
        const size = Math.random() * (OBSTACLE_MAX_SIZE - OBSTACLE_MIN_SIZE) + OBSTACLE_MIN_SIZE;
        this.width = size;
        this.height = size; // Ostacoli quadrati
        this.x = SCREEN_WIDTH + Math.random() * 200 + 100; this.y = Math.random() * (SCREEN_HEIGHT - this.height); this.moves = moves;
        if (this.moves) { this.speedX = (Math.random() * 3 + 1); this.speedY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1 + 0.5); }
        else { this.speedX = (Math.random() * 3 + 2); this.speedY = 0; }
    }
    // Metodi updateActive, updateFrozen, draw invariati rispetto alla versione precedente
    updateActive() { this.x -= this.speedX * gameSpeedMultiplier; if (this.moves) { this.y += this.speedY * gameSpeedMultiplier; if (this.y <= 0 || this.y + this.height >= SCREEN_HEIGHT) { this.speedY *= -1; } } }
    updateFrozen(scrollSpeed) { this.x -= scrollSpeed; }
    draw() { if (this.image) ctx.drawImage(this.image, this.x, this.y, this.width, this.height); else { ctx.fillStyle = '#ccc'; ctx.fillRect(this.x, this.y, this.width, this.height); } }
}

class Pickup {
    constructor(type) {
        this.type = type; this.value = (type === 'mana') ? 25 : 20; this.image = (type === 'mana') ? gameAssets.manaCrystal : gameAssets.healthCrystal;
        // Usa dimensioni FISSE
        this.width = PICKUP_WIDTH;
        this.height = PICKUP_HEIGHT;
        this.x = SCREEN_WIDTH + Math.random() * 300 + 200; this.y = Math.random() * (SCREEN_HEIGHT - this.height - 100) + 50; this.speedX = 2;
    }
     // Metodi updateActive, updateFrozen, draw invariati rispetto alla versione precedente
    updateActive() { this.x -= this.speedX * gameSpeedMultiplier; }
    updateFrozen(scrollSpeed) { this.x -= scrollSpeed; }
    draw() { if (this.image) ctx.drawImage(this.image, this.x, this.y, this.width, this.height); else { /* Fallback */ ctx.fillStyle=(this.type==='mana'?'blue':'green'); ctx.fillRect(this.x,this.y,this.width,this.height);} }
}


// --- Funzioni Utilità (drawText, drawBar, checkCollision invariate) ---
function drawText(text, x, y, color = 'white', size = 20, align = 'center', baseline = 'top') { ctx.fillStyle = color; ctx.font = `${size}px Arial`; ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(text, x, y); }
function drawBar(x, y, width, height, value, maxValue, barColor, outlineColor = 'white', bgColor = null) { value = Math.max(0, value); const fillPct = value / maxValue; const fillWidth = Math.max(0, width * fillPct); if(bgColor) { ctx.fillStyle = bgColor; ctx.fillRect(x, y, width, height); } ctx.fillStyle = barColor; ctx.fillRect(x, y, fillWidth, height); if (outlineColor) { ctx.strokeStyle = outlineColor; ctx.lineWidth = 1; ctx.strokeRect(x, y, width, height); } }
function checkCollision(rect1, rect2) { return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y; }

// --- Logica di Aggiornamento Principale ---

function updateGame() {
    if (gameOver) return;
    const now = Date.now();

    // --- Logica Freeze ---
    const isFrozen = freezeActive && now < freezeEndTime;
    if (freezeActive && now >= freezeEndTime) freezeActive = false;

    // Calcola la velocità di scroll del mondo attuale
    const currentScrollSpeed = BACKGROUND_SCROLL_SPEED * gameSpeedMultiplier;

    // --- Aggiorna Oggetti ---
    player.update();
    projectiles.forEach(p => p.update()); // Proiettili player sempre attivi

    // Aggiorna testi fluttuanti
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
         if (!floatingTexts[i].update(currentScrollSpeed)) floatingTexts.splice(i, 1);
    }


    if (!isFrozen) {
        // CHIAMIAMO I METODI .updateActive() PER GLI OGGETTI NON FREEZATI
        enemies.forEach(e => e.updateActive());
        enemyProjectiles.forEach(ep => ep.updateActive()); // <--- MODIFICATO QUI
        obstacles.forEach(o => o.updateActive());
        pickups.forEach(pu => pu.updateActive());

        // Spawn e Difficoltà (invariati)
        if (now > lastEnemySpawnTime + enemySpawnDelay / gameSpeedMultiplier) { enemies.push(new Enemy(Math.floor(Math.random() * 3) + 1)); lastEnemySpawnTime = now; }
        if (now > lastObstacleSpawnTime + obstacleSpawnDelay / gameSpeedMultiplier) { if (gameAssets.obstacles && gameAssets.obstacles.length > 0) obstacles.push(new Obstacle(Math.random() > 0.4)); lastObstacleSpawnTime = now; }
        if (now > lastPickupSpawnTime + pickupSpawnDelay) { if (gameAssets.manaCrystal && gameAssets.healthCrystal) pickups.push(new Pickup(Math.random() > 0.5 ? 'mana' : 'health')); lastPickupSpawnTime = now; }
        if (now > lastDifficultyIncreaseTime + DIFFICULTY_INCREASE_INTERVAL) { gameSpeedMultiplier += DIFFICULTY_MULTIPLIER_STEP; lastDifficultyIncreaseTime = now; console.log(`Game Speed Increased: ${gameSpeedMultiplier.toFixed(2)}`); }

    } else {
        // SE FREEZATO, CHIAMIAMO I METODI .updateFrozen() PER APPLICARE SOLO LO SCROLL
        enemies.forEach(e => e.updateFrozen(currentScrollSpeed));
        enemyProjectiles.forEach(ep => ep.updateFrozen(currentScrollSpeed)); // <--- MODIFICATO QUI
        obstacles.forEach(o => o.updateFrozen(currentScrollSpeed));
        pickups.forEach(pu => pu.updateFrozen(currentScrollSpeed));
    }


    // --- Collisioni (logica interna invariata, usa le dimensioni fisse degli oggetti) ---
    // Proiettili Player vs Nemici
    for (let i = projectiles.length - 1; i >= 0; i--) { const proj = projectiles[i]; if (!proj) continue; for (let j = enemies.length - 1; j >= 0; j--) { const enemy = enemies[j]; if (checkCollision(proj, enemy)) { enemy.takeDamage(1); projectiles.splice(i, 1); if (enemy.health <= 0) { const points = 1000 * enemy.maxHealth; score += points; floatingTexts.push(new FloatingText(enemy.x + enemy.width / 2, enemy.y, `+${points}`, SCORE_TEXT_COLOR)); } break; } } }
    // Player vs Nemici
    for (let i = enemies.length - 1; i >= 0; i--) { if (enemies[i].health > 0 && checkCollision(player, enemies[i])) { player.takeDamage(15); enemies[i].health = 0; if (gameOver) break; } }
    // Player vs Ostacoli
    for (let i = obstacles.length - 1; i >= 0; i--) { if (checkCollision(player, obstacles[i])) { player.takeDamage(25); obstacles.splice(i, 1); if (gameOver) break; } }
    // Player vs Proiettili Nemici (SOLO SE NON FREEZATO il mondo, la collisione avviene comunque)
    // NOTA: Anche se il proiettile nemico scorre durante il freeze, non fa danno al player
    if (!isFrozen) { for (let i = enemyProjectiles.length - 1; i >= 0; i--) { if (checkCollision(player, enemyProjectiles[i])) { player.takeDamage(10); enemyProjectiles.splice(i, 1); if (gameOver) break; } } }
    // Player vs Pickup
    for (let i = pickups.length - 1; i >= 0; i--) { const pickup = pickups[i]; if (checkCollision(player, pickup)) { let text = ""; let color = "white"; if (pickup.type === 'mana') { player.addMana(pickup.value); text = `+${pickup.value} Mana`; color = MANA_TEXT_COLOR; } else { player.addHealth(pickup.value); text = `+${pickup.value} HP`; color = HEALTH_TEXT_COLOR; } floatingTexts.push(new FloatingText(pickup.x + pickup.width / 2, pickup.y, text, color)); pickups.splice(i, 1); } }


    // --- Pulizia Oggetti Fuori Schermo / Morti (invariata) ---
    projectiles = projectiles.filter(p => p.x < SCREEN_WIDTH);
    enemies = enemies.filter(e => e.x + e.width > 0 && e.health > 0);
    enemyProjectiles = enemyProjectiles.filter(ep => ep.x + ep.width > 0 && ep.x < SCREEN_WIDTH + 50); // Dagli un po' di margine a dx
    obstacles = obstacles.filter(o => o.x + o.width > 0);
    pickups = pickups.filter(pu => pu.x + pu.width > 0);

     // Aggiorna posizione sfondo per scroll (invariato)
    if (gameAssets.background) { bgX -= currentScrollSpeed; const scaleY = SCREEN_HEIGHT / gameAssets.background.height; const scaledWidth = gameAssets.background.width * scaleY; if (bgX <= -scaledWidth) { bgX += scaledWidth; } }
}

// --- Logica di Disegno Principale (invariata) ---
function drawGame() {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    // Disegna Background
    if (gameAssets.background) { const bgWidth = gameAssets.background.width; const bgHeight = gameAssets.background.height; const scaleY = SCREEN_HEIGHT / bgHeight; const scaledWidth = bgWidth * scaleY; let currentX = bgX; while (currentX < SCREEN_WIDTH) { ctx.drawImage(gameAssets.background, currentX, 0, scaledWidth, SCREEN_HEIGHT); currentX += scaledWidth; } } else { ctx.fillStyle = 'black'; ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); }
    // Disegna Oggetti
    pickups.forEach(pu => pu.draw()); obstacles.forEach(o => o.draw()); enemyProjectiles.forEach(ep => ep.draw()); projectiles.forEach(p => p.draw()); enemies.forEach(e => e.draw()); player.draw();
    // Disegna Testi Fluttuanti
    floatingTexts.forEach(ft => ft.draw());
    // Disegna UI Fissa
    drawBar(10, 10, 150, 15, player.health, MAX_HEALTH, 'lime', 'white', '#555'); drawText(`${Math.floor(player.health)}/${MAX_HEALTH}`, 10 + 150 + 5, 18, 'white', 14, 'left', 'middle'); drawBar(10, 30, 150, 15, player.mana, MAX_MANA, 'blue', 'white', '#555'); drawText(`${Math.floor(player.mana)}/${MAX_MANA}`, 10 + 150 + 5, 38, 'white', 14, 'left', 'middle'); drawText(`Score: ${score}`, SCREEN_WIDTH - 10, 10, 'white', 20, 'right', 'top'); const elapsedSecondsTotal = Math.floor((Date.now() - gameStartTime) / 1000); const minutes = Math.floor(elapsedSecondsTotal / 60); const seconds = elapsedSecondsTotal % 60; const formattedTime = `Tempo: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; drawText(formattedTime, SCREEN_WIDTH / 2, 10, 'white', 20, 'center', 'top'); if (player.mana >= MAX_MANA && !freezeActive) { const now = Date.now(); if (now - lastFreezeTextToggle > freezeTextBlinkInterval) { showFreezeText = !showFreezeText; lastFreezeTextToggle = now; } if (showFreezeText) drawText("FREEZE!", SCREEN_WIDTH / 2, SCREEN_HEIGHT - 15, 'yellow', 28, 'center', 'bottom'); } if (freezeActive) { const remainingFreeze = Math.max(0, freezeEndTime - Date.now()); drawText(`FROZEN: ${(remainingFreeze / 1000).toFixed(1)}s`, SCREEN_WIDTH / 2, 40, 'cyan', 20, 'center', 'top'); }
    // Disegna Schermata Game Over
    if (gameOver) { ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); drawText("GAME OVER!", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 3, 'red', 60, 'center', 'middle'); drawText(`Final Score: ${score}`, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'white', 32, 'center', 'middle'); drawText("Press 'R' to Restart", SCREEN_WIDTH / 2, SCREEN_HEIGHT * 2 / 3, 'lightgray', 22, 'center', 'middle'); }
}

// --- Game Loop, Inizializzazione, StartGame, Input (invariati) ---
function gameLoop() { updateGame(); drawGame(); if (!gameOver) animationFrameId = requestAnimationFrame(gameLoop); }
function initGame() { player = new Player(); projectiles = []; enemies = []; enemyProjectiles = []; obstacles = []; pickups = []; floatingTexts = []; score = 0; gameStartTime = Date.now(); lastManaRegenTime = gameStartTime; lastEnemySpawnTime = gameStartTime; lastObstacleSpawnTime = gameStartTime; lastPickupSpawnTime = gameStartTime; freezeActive = false; freezeEndTime = 0; gameSpeedMultiplier = 1.0; lastDifficultyIncreaseTime = gameStartTime; bgX = 0; gameOver = false; if (animationFrameId) cancelAnimationFrame(animationFrameId); gameLoop(); }
function startGame() { if (!gameAssets.player || !gameAssets.background) { console.error("Essential assets failed to load."); ctx.fillStyle = 'red'; ctx.font = '20px Arial'; ctx.textAlign = 'center'; ctx.fillText("Errore caricamento assets. Controlla console (F12).", SCREEN_WIDTH/2, SCREEN_HEIGHT/2); return; } console.log("Starting game..."); initGame(); }
window.addEventListener('keydown', (e) => { keysPressed[e.key.toLowerCase()] = true; const keyLower = e.key.toLowerCase(); if (!gameOver) { if (keyLower === 'j') player.shoot(); if (keyLower === ' ') { e.preventDefault(); if (!freezeActive) player.freeze(); } } if (gameOver && keyLower === 'r') initGame(); });
window.addEventListener('keyup', (e) => { keysPressed[e.key.toLowerCase()] = false; });

// --- Avvio Caricamento Assets ---
loadGameAssets();

// >>> FINE CODICE game.js <<<