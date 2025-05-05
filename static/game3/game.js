// --- Setup Iniziale ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Riferimenti UI Aggiuntivi
const levelDisplay = document.getElementById('levelDisplay');
const powerupDisplay = document.getElementById('powerupDisplay');
const playerLevelDisplay = document.getElementById('playerLevelDisplay');
const playerXPDisplay = document.getElementById('playerXPDisplay');
const playerXPToNextDisplay = document.getElementById('playerXPToNextDisplay');
const tempPowerupDisplay = document.getElementById('tempPowerupDisplay');
const ultimateManaCostDisplay = document.getElementById('ultimateManaCostDisplay');

// --- NUOVO: Caricamento Immagini UI ---
let dashIconImage = new Image();
let shieldIconImage = new Image();
let imagesToLoadCount = 2; // Numero totale di immagini da caricare per l'UI
let imagesLoadedCount = 0;

function checkAllImagesLoaded() {
    imagesLoadedCount++;
    if (imagesLoadedCount === imagesToLoadCount) {
        console.log("Tutte le immagini UI caricate.");
        // Se necessario, potresti far partire il game loop solo dopo il caricamento
        // initGame(); // Sposta initGame qui se aspetti il caricamento
        // requestAnimationFrame(gameLoop); // Sposta l'avvio del loop qui
    }
}

dashIconImage.onload = checkAllImagesLoaded;
shieldIconImage.onload = checkAllImagesLoaded;

// --- IMPOSTA I PERCORSI CORRETTI PER LE TUE IMMAGINI ---
dashIconImage.src = '../images/logo_bok.png';   // Cambia 'images/dash_icon.png' con il percorso reale
shieldIconImage.src = '../images/logonobg.png'; // Cambia 'images/shield_icon.png' con il percorso reale
// --- FINE CARICAMENTO IMMAGINI ---

// --- Configurazione Globale ---
const PLAYER_COLOR = 'aqua';
const PROJECTILE_COLOR = 'lime';
const ENEMY_PROJECTILE_COLOR = 'red'; // Colore per proiettili nemici
const GAS_CLOUD_COLOR = 'rgba(102, 0, 153, 0.5)'; // Viola trasparante per nuvola
const COCOON_COLOR = 'white';
// ... (altre costanti esistenti: DASH_DURATION_MS, SHIELD_DURATION_MS, etc.)
const DASH_DURATION_MS = 150;
const DASH_SPEED_MULTIPLIER = 3;
const SHIELD_DURATION_MS = 2000;
const ULTIMATE_MANA_COST = 50;
const ULTIMATE_DAMAGE_MULTIPLIER = 1.5;
const PARTICLE_LIFESPAN = 300;
const GAS_CLOUD_DURATION = 5000; // 5 secondi
const GAS_CLOUD_RADIUS = 40;
const GAS_CLOUD_DPS = 5; // Danno al secondo nella nuvola
const GAS_CLOUD_SLOW_FACTOR = 0.5; // Rallenta al 50%
const COCOON_HEALTH = 2; // Hit per rompere bozzolo
const BLINK_DASH_COOLDOWN_INCREASE = 2000; // Aumento cooldown per blink
const EXPLOSIVE_SHOT_NUM_PROJECTILES = 8;
const EXPLOSIVE_SHOT_DAMAGE_MULTIPLIER = 0.4; // Danno dei proiettili secondari
const PETRIFY_DURATION = 1000; // 1 secondo
const MANA_REGEN_PERCENT_ON_KILL = 0.05; // 5%
const FLOATING_TEXT_DURATION = 1200; // Durata in ms (1.2 secondi)
const FLOATING_TEXT_SPEED = 30;   // Velocità di salita in pixel/sec
// --- CONFIGURAZIONE DROP ---
const HEALTH_DROP_CHANCE = 0.15; // 15% chance di droppare vita
const TEMP_POWERUP_DROP_CHANCE = 0.15; // 15% chance di droppare powerup temp
const HEALTH_RESTORE_AMOUNT = 25; // Quanta vita cura un cristallo
// --- Aggiungi questa costante vicino all'inizio del file ---
const GLOBAL_SCROLL_SPEED = 80; // Velocità (pixel/sec) con cui i drop scorrono a sinistra. Regola questo valore!

const BOSS_SPECIFIC_POWERUP_CHANCE = 0.05; // 5% chance

let notificationMessage = '';
let notificationEndTime = 0;
const NOTIFICATION_DURATION = 3000; // 3 secondi

// --- Stato del Gioco ---
let gameManager; // Oggetto principale per gestire lo stato del gioco
let player;
let projectiles = [];
let enemyProjectiles = []; // Array separato per proiettili nemici
let enemies = [];
// --- Aggiungi vicino agli altri array globali (enemies, projectiles, etc.) ---
let floatingTexts = [];
let particles = [];
let effects = []; // Array per effetti come nuvole di gas, bozzoli visivi
let keys = {};
let lastTime = 0;
let gameRunning = true;
let currentBoss = null; // Tiene traccia del boss attivo
let drops = []; // Array per gli oggetti droppati
let activeTempPowerUp = null; // Traccia powerup temporaneo da nemici
let tempPowerUpEndTime = 0;

// Funzione helper globale
function displayNotification(message, duration = NOTIFICATION_DURATION) {
    notificationMessage = message;
    notificationEndTime = Date.now() + duration;
    console.log(`NOTIFICATION: ${message}`); // Log anche in console
}


// --- Struttura Dati Livelli ---
const levelConfigs = [
    // --- LIVELLO 1 ---
    {
        level: 1,
        background: "black", // Placeholder, può essere path immagine
        enemies: [
            { type: 'Kamikaze', spawnChance: 0.8, maxOnScreen: 4 },
            { type: 'RandomShooter', spawnChance: 0.6, maxOnScreen: 3 },
            { type: 'TargetingShooter', spawnChance: 0.6, maxOnScreen: 2 }
        ],
        bosses: ['FleshMass', 'Spider'], // Tipi di boss possibili
        enemiesUntilBoss: 1, // Numero nemici da sconfiggere prima del boss
        spawnInterval: 1500, // Intervallo base spawn nemici (ms)
    },
    // --- LIVELLO 2 (Placeholder) ---
    {
        level: 2,
        background: "darkblue",
        enemies: [
            { type: 'Kamikaze', spawnChance: 0.4, maxOnScreen: 4 },
            { type: 'RandomShooter', spawnChance: 0.3, maxOnScreen: 3 },
            { type: 'TargetingShooter', spawnChance: 0.3, maxOnScreen: 2 }
        ],
        bosses: [ /* ... boss livello 2 ... */ ],
        enemiesUntilBoss: 25,
        spawnInterval: 1200,
    },
    // --- LIVELLO 3 (Placeholder) ---
    {
        level: 3,
        background: "darkred",
        enemies: [ /* ... definizioni nemici livello 3 ... */ ],
        bosses: [ /* ... boss livello 3 ... */ ],
        enemiesUntilBoss: 35,
        spawnInterval: 1000,
    }
];

// --- Classe GameManager ---
class GameManager {
    constructor(levels) {
        this.levels = levels;
        this.currentLevelIndex = 0;
        this.currentLevelConfig = this.levels[this.currentLevelIndex];
        this.score = 0; // Non usato attivamente ora, ma utile per futuro
        this.enemiesDefeatedInLevel = 0;
        this.bossSpawned = false;
        this.lastSpawnTime = 0;
        this.activePowerUp = null;
        this.powerUpEndTime = 0;
        this.isBossActive = false;
    }

    startLevel(levelIndex) {
        this.currentLevelIndex = levelIndex;
        if (this.currentLevelIndex >= this.levels.length) {
            this.winGame();
            return;
        }
        this.currentLevelConfig = this.levels[this.currentLevelIndex];
        this.enemiesDefeatedInLevel = 0;
        this.bossSpawned = false;
        this.lastSpawnTime = 0;
        this.isBossActive = false;
        currentBoss = null;
        enemies = []; // Pulisci nemici esistenti
        projectiles = []; // Pulisci proiettili giocatore
        enemyProjectiles = []; // Pulisci proiettili nemici
        effects = []; // Pulisci effetti
        console.log(`Starting Level ${this.currentLevelConfig.level}`);
        levelDisplay.textContent = this.currentLevelConfig.level;
        // Qui si potrebbe cambiare lo sfondo: canvas.style.backgroundColor = this.currentLevelConfig.background;
    }

    update(deltaTime, now) {
        if (this.isBossActive || this.bossSpawned) return; // Non spawnare nemici se boss è attivo o già spawnato

        // Logica Spawn Nemici
        if (this.enemiesDefeatedInLevel < this.currentLevelConfig.enemiesUntilBoss) {
             if (now - this.lastSpawnTime > this.currentLevelConfig.spawnInterval) {
                 this.spawnEnemy();
                 this.lastSpawnTime = now;
             }
        } else if (!this.bossSpawned) {
            this.spawnBoss();
        }

        // Controlla scadenza PowerUp Temporaneo
        if (this.activePowerUp && now >= this.powerUpEndTime) {
             this.clearPowerUp();
        }
    }

    spawnEnemy() {
        const availableEnemies = this.currentLevelConfig.enemies;
        const totalChance = availableEnemies.reduce((sum, e) => sum + e.spawnChance, 0);
        let random = Math.random() * totalChance;
        let chosenType = null;

        for (const enemyConfig of availableEnemies) {
            const currentCount = enemies.filter(e => e.constructor.name === `${enemyConfig.type}Enemy`).length;
            if (currentCount >= enemyConfig.maxOnScreen) continue; // Limite per tipo

            if (random < enemyConfig.spawnChance) {
                chosenType = enemyConfig.type;
                break;
            }
            random -= enemyConfig.spawnChance;
        }

        if (chosenType) {
            const spawnY = Math.random() * (canvas.height - 50) + 20; // Y casuale, evita bordi
            const spawnX = canvas.width + 30; // Spawn fuori schermo a destra
            let newEnemy;
            switch(chosenType) {
                case 'Kamikaze': newEnemy = new KamikazeEnemy(spawnX, spawnY); break;
                case 'RandomShooter': newEnemy = new RandomShooterEnemy(spawnX, spawnY); break;
                case 'TargetingShooter': newEnemy = new TargetingShooterEnemy(spawnX, spawnY); break;
                // Aggiungere casi per altri tipi di nemici in futuro
                default: console.error("Tipo nemico sconosciuto:", chosenType); return;
            }
             enemies.push(newEnemy);
             // console.log(`Spawned ${chosenType} at (${spawnX}, ${spawnY.toFixed(0)})`);
        }
    }

    spawnBoss() {
        if (this.bossSpawned) return;
        console.log("Spawning Boss!");
        this.bossSpawned = true; // Segnala che il boss è stato generato (ma non ancora attivo/visibile)

        // Scegli casualmente uno dei boss definiti per il livello
        const possibleBosses = this.currentLevelConfig.bosses;
        const bossType = possibleBosses[Math.floor(Math.random() * possibleBosses.length)];

        // Posizione iniziale del boss (es. al centro a destra fuori schermo)
        const spawnX = canvas.width + 100;
        const spawnY = canvas.height / 2;

        switch(bossType) {
            case 'FleshMass': currentBoss = new FleshMassBoss(spawnX, spawnY); break;
            case 'Spider': currentBoss = new SpiderBoss(spawnX, spawnY); break;
            // Casi per altri boss
            default: console.error("Tipo boss sconosciuto:", bossType); return;
        }

        // Potremmo aggiungere un delay o animazione d'ingresso prima di isBossActive = true
        // Per ora, lo rendiamo attivo dopo un piccolo ritardo
        setTimeout(() => {
            this.isBossActive = true;
             console.log(`${bossType} is now active!`);
        }, 1000); // Boss appare dopo 1 secondo
    }


    enemyDefeated(enemy) {
         this.score += enemy.pointsValue || 10; // Aggiungi punti (se definiti)
         if (!this.isBossActive && !this.bossSpawned) {
             this.enemiesDefeatedInLevel++;
             console.log(`Enemies defeated: ${this.enemiesDefeatedInLevel}/${this.currentLevelConfig.enemiesUntilBoss}`);
         }
    }

    bossDefeated(boss) {
        console.log(`${boss.constructor.name} Defeated! Level Complete!`);
        this.isBossActive = false;
        currentBoss = null;
    
        // --- NUOVA LOGICA: Seleziona e Aggiungi PowerUp Permanente al Player ---
        const chosenPowerUp = selectPowerUp(boss); // Usa la nuova selectPowerUp
        if (chosenPowerUp && player) {
            player.addPermanentPowerUp(chosenPowerUp);
        }
        // --------------------------------------------------------------------
    
        // Ritarda il passaggio al livello successivo
        setTimeout(() => {
            this.startLevel(this.currentLevelIndex + 1);
        }, 3000);
    }

     winGame() {
        console.log("Congratulazioni! Hai completato tutti i livelli!");
        gameRunning = false;
        alert("Hai Vinto!"); // Semplice alert per ora
    }

    
}


// --- Funzioni Helper ---
function checkCollision(rect1, rect2) {
    if (!rect1 || !rect2) return false;
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// --- Classe Base per Entità ---
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
            // TODO: Gestire il caricamento asincrono e il flag 'complete'
            this.image.src = imageSrc;
        }
        this.markedForDeletion = false; // Flag per rimozione
    }

    draw(context) {
        if (this.image && this.image.complete && this.image.naturalHeight !== 0) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update(deltaTime) { /* Implementato dalle sottoclassi */ }
}


// --- Classe Manalisk (Giocatore) ---
class Player extends Entity {
    constructor(x, y) {
        const size = 30;
        super(x, y, size, size, PLAYER_COLOR);

        // Queste non cambiano mai, sono il punto di partenza prima di livelli/powerup
        this.initialBaseHealth = 100;
        this.initialBaseMana = 100;
        this.initialBaseSpeed = 200;
        this.initialBaseFireRateDelay = 200;
        this.initialBaseProjectileDamage = 10;
        this.initialBaseProjectileSpeed = 400;
        this.initialBaseDashCooldown = 10000;
        this.initialBaseShieldCooldown = 10000;
        this.initialShieldDuration = SHIELD_DURATION_MS; // Durata base scudo

        // --- STATISTICHE BASE ATTUALI (influenzate dai livelli abilità) ---
        // Queste vengono ricalcolate da applyAbilityLevelEffects
        this.baseHealth = this.initialBaseHealth;
        this.baseMana = this.initialBaseMana;
        this.baseSpeed = this.initialBaseSpeed;
        this.baseFireRateDelay = this.initialBaseFireRateDelay;
        this.baseProjectileDamage = this.initialBaseProjectileDamage;
        this.baseProjectileSpeed = this.initialBaseProjectileSpeed;
        this.baseDashCooldown = this.initialBaseDashCooldown;
        this.baseShieldCooldown = this.initialBaseShieldCooldown;
        this.baseShieldDuration = this.initialShieldDuration;


        // --- STATISTICHE EFFETTIVE (calcolate da powerup permanenti/temporanei) ---
        // Queste vengono ricalcolate da recalculateStats
        this.maxHealth = this.baseHealth;
        this.health = this.baseHealth; // Imposta la vita iniziale!
        this.mana = this.baseMana; // Max mana non modificato per ora
        this.maxMana = this.baseMana;
        this.speed = this.baseSpeed;
        this.fireRateDelay = this.baseFireRateDelay;
        this.projectileDamage = this.baseProjectileDamage;
        this.projectileSpeed = this.baseProjectileSpeed; // Velocità proiettile non modificata per ora
        this.dashCooldown = this.baseDashCooldown;
        this.shieldCooldown = this.baseShieldCooldown;
        this.currentShieldDuration = this.baseShieldDuration; // Durata scudo attuale

        // Flag e Altri Effetti
        this.evasionChance = 0;
        this.hpRegenRate = 0; // Regen totale (base da powerup permanenti + temp)
        this.shootDouble = false;
        this.shootPierce = false;
        this.isBlinkDash = false; // Questo flag potrebbe diventare permanente
        this.shootExplosive = false;
        this.projectileEffects = []; // Effetti proiettile {type: 'gas', chance: 0.2}


        // Stato XP/Livello
        this.level = 1;
        this.xp = 0;
        this.xpToNextLevel = this.calculateXPForLevel(this.level);
        this.maxLevel = 25;

        // Stato PowerUp
        this.permanentPowerUps = []; // NUOVO: Array per powerup permanenti
        // Manteniamo questi per i drop temporanei dei nemici
        this.tempDamageMultiplier = 1.0;
        this.tempFireRateMultiplier = 1.0;
        this.tempHpRegenRate = 0;

        // Stato Abilità (per cooldown/durata)
        this.lastShotTime = 0;
        this.lastDashTime = -this.initialBaseDashCooldown; // Usa base iniziale
        this.isDashing = false;
        this.dashEndTime = 0;
        this.dashDirectionX = 0;
        this.dashDirectionY = 0;
        this.lastShieldTime = -this.initialBaseShieldCooldown; // Usa base iniziale
        this.isShieldActive = false;
        this.shieldEndTime = 0;

        this.canActivateUltimate = true; // Aggiungi questa riga

        // Calcola statistiche iniziali basate su Livello 1 e nessun powerup
        this.recalculateStats(); // Include applyAbilityLevelEffects ora
    }

    // Aggiunge un powerup permanente e ricalcola le statistiche
    addPermanentPowerUp(powerUp) {
        if (!powerUp) return;
        // Evita duplicati basati su ID? (Opzionale, per ora permettiamo stack dello stesso ID)
        this.permanentPowerUps.push(powerUp);
        // --- MOSTRA NOTIFICA ---
        displayNotification(`Potenziamento Ottenuto: ${powerUp.name}!`);
        this.updatePermanentPowerUpUI();
        console.log(`Added permanent power-up: ${powerUp.name}. Total: ${this.permanentPowerUps.length}`);
        this.recalculateStats(); // Ricalcola tutto dopo l'aggiunta
    }

    // --- NUOVO METODO HELPER PER AGGIORNARE L'UI DELLA LISTA ---
    updatePermanentPowerUpUI() {
        console.log("===", powerupDisplay)
        // Controlla se l'elemento UI esiste (buona pratica)
        if (!powerupDisplay) return;

        if (this.permanentPowerUps.length === 0) {
            console.log("===1")
            powerupDisplay.textContent = "Nessuno";
        } else {
            console.log("===2")
            
            // Crea una stringa con i nomi dei power-up separati da virgola
            const powerUpNames = this.permanentPowerUps.map(p => p.name).join(', ');
            console.log("powerupNames:", powerUpNames)

            powerupDisplay.textContent = powerUpNames;
        }
    }

    // Metodo per calcolare XP necessario per il prossimo livello
    calculateXPForLevel(level) {
        if (level >= this.maxLevel) return Infinity; // Non serve più XP al max livello
        // Formula: base * livello^esponente (arrotondato)
        const baseXP = 100;
        const exponent = 1.5;
        return Math.floor(baseXP * Math.pow(level, exponent));
    }

    gainXP(amount) {
        if (this.level >= this.maxLevel) return; // Non guadagna XP al max livello

        this.xp += amount;
        console.log(`Gained ${amount} XP. Total XP: ${this.xp}/${this.xpToNextLevel}`);

        // Gestione Aumento Livello (può avvenire più volte con molto XP)
        while (this.xp >= this.xpToNextLevel && this.level < this.maxLevel) {
            const xpOver = this.xp - this.xpToNextLevel; // XP in eccesso
            this.level++;
            this.xp = xpOver; // Mantiene l'eccesso
            this.xpToNextLevel = this.calculateXPForLevel(this.level);
            this.levelUp(); // Chiama la funzione di level up
        }
        this.updateXPUI(); // Aggiorna UI
    }

    levelUp() {
        console.log(`LEVEL UP! Reached Level ${this.level}`);
        // Effetto visivo level up? Suono?
        // TODO: In futuro, qui si potrebbe mettere in pausa e offrire scelte di upgrade.

        // Per ora, applichiamo miglioramenti automatici alle abilità
        this.applyAbilityLevelEffects();

        // Ripristina vita e mana al level up? (Opzionale)
        this.health = this.maxHealth;
        this.mana = this.maxMana;

        // Aggiorna UI principale
        playerLevelDisplay.textContent = this.level;
    }

    // Applica gli effetti basati sui livelli delle abilità
    applyAbilityLevelEffects() {
        console.log(`Applying level ${this.level} effects to base stats...`);
        // Ricalcola stats BASE basate sul livello (partendo dalle iniziali)
        const dashCooldownReductionFactor = Math.pow(0.96, this.level - 1);
        this.baseDashCooldown = Math.round(this.initialBaseDashCooldown * dashCooldownReductionFactor);

        const shieldDurationMultiplier = 1 + (0.05 * (this.level - 1));
        this.baseShieldDuration = Math.round(this.initialShieldDuration * shieldDurationMultiplier);

        // Aggiungere altri effetti di livello qui (es. aumento HP base, danno base, ecc.)
        // Esempio: aumenta HP base del 2% per livello
        // this.baseHealth = Math.round(this.initialBaseHealth * (1 + 0.02 * (this.level - 1)));

        // Nota: non chiamiamo più recalculateStats() da qui, viene chiamato dopo o da addPermanentPowerUp
    }

    // Metodo per curare il giocatore (usato da HealthDrop)
    heal(amount) {
        const healthBefore = this.health; // Salva la vita prima della cura
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth; // Limita alla vita massima
        }
        // Calcola quanto è stato effettivamente curato (potrebbe essere meno di 'amount' se si raggiunge maxHealth)
        const actualHealAmount = Math.round(this.health - healthBefore);
    
        console.log(`Healed ${amount} HP. Current health: ${this.health}`);
    
        // --- Attiva Testo Fluttuante ---
        if (actualHealAmount > 0) { // Mostra solo se la cura è stata effettiva
            createFloatingText(`+${actualHealAmount} HP`, this.x + this.width / 2, this.y, 'pink'); // Rosa/Rosso per vita
        }
        // --------------------------
    }

    gainMana(amount) {
        if (amount <= 0) return; // Ignora guadagno 0 o negativo
        const manaBefore = this.mana;
        this.mana += amount;
        if (this.mana > this.maxMana) {
            this.mana = this.maxMana; // Limita al massimo mana
        }
        const actualManaGain = Math.round(this.mana - manaBefore); // Quanto mana è stato effettivamente guadagnato
        console.log(`Gained ${amount} Mana. Current mana: ${this.mana}`);
    
        // --- Attiva Testo Fluttuante (lo implementiamo dopo) ---
        if (actualManaGain > 0) {
            createFloatingText(`+${actualManaGain} Mana`, this.x + this.width / 2, this.y, 'cyan'); // Blu/ciano per mana
        }
         // -----------------------------------------------------
    }

    // Aggiorna UI XP
    updateXPUI() {
        playerXPDisplay.textContent = this.xp;
        playerXPToNextDisplay.textContent = this.level >= this.maxLevel ? 'MAX' : this.xpToNextLevel;
    }

     // --- Gestione PowerUp Temporanei da Nemici ---
     applyTemporaryPowerUp(powerUp) {
        // Applica l'effetto usando la funzione definita nell'oggetto powerUp
        if (powerUp && powerUp.apply) {
            powerUp.apply(this); // 'this' si riferisce al player
            console.log(`Applied temporary power-up: ${powerUp.name}`);
            this.recalculateStats(); // Ricalcola statistiche che dipendono dai moltiplicatori temp
        }
    }

    removeTemporaryPowerUp(powerUp) {
        // Rimuovi l'effetto usando la funzione definita nell'oggetto powerUp
         if (powerUp && powerUp.remove) {
            powerUp.remove(this);
            console.log(`Removed temporary power-up: ${powerUp.name}`);
            this.recalculateStats(); // Ricalcola statistiche
        }
    }

    // Ricalcola le statistiche influenzate dai moltiplicatori temporanei
    recalculateStats() {
        console.log("--- Recalculating Player Stats ---");

        // 1. Applica effetti del livello corrente alle STATS BASE
        this.applyAbilityLevelEffects(); // Modifica this.baseHealth, this.baseDashCooldown, etc.

        // 2. Inizializza statistiche effettive dai valori base (modificati dal livello)
        let currentMaxHealth = this.baseHealth;
        let currentSpeed = this.baseSpeed;
        let currentFireRateDelay = this.baseFireRateDelay;
        let currentProjectileDamage = this.baseProjectileDamage;
        let currentDashCooldown = this.baseDashCooldown;
        let currentShieldCooldown = this.baseShieldCooldown;
        let currentShieldDuration = this.baseShieldDuration;
        // Effetti accumulati
        let currentEvasionChance = 0;
        let currentHpRegenRate = 0; // Regen solo da powerup (permanenti + temp)
        let currentShootDouble = false;
        let currentShootPierce = false;
        let currentIsBlinkDash = false; // Sovrascritto se powerup lo imposta
        let currentShootExplosive = false;
        let currentProjectileEffects = []; // Lista di {type, chance}

        // 3. Itera sui PowerUp Permanenti e applica i loro effetti
        console.log("Applying permanent powerups:", this.permanentPowerUps.map(p => p.name).join(', '));
        this.permanentPowerUps.forEach(powerUp => {
            if (!powerUp.effects) return;
            powerUp.effects.forEach(effect => {
                switch (effect.type) {
                    case 'stat_add':
                        if (effect.stat === 'maxHealth') currentMaxHealth += effect.value;
                        if (effect.stat === 'hpRegenRate') currentHpRegenRate += effect.value;
                        if (effect.stat === 'evasionChance') currentEvasionChance += effect.value;
                        // Aggiungere altri stat_add se necessario
                        break;
                    case 'stat_multiplier':
                        if (effect.stat === 'maxHealth') currentMaxHealth *= effect.value;
                        if (effect.stat === 'speed') currentSpeed *= effect.value;
                        // Nota: I moltiplicatori per delay/cooldown dovrebbero essere < 1 per migliorare
                        if (effect.stat === 'baseFireRateDelay') currentFireRateDelay *= effect.value;
                        if (effect.stat === 'baseDashCooldown') currentDashCooldown *= effect.value;
                        if (effect.stat === 'baseShieldCooldown') currentShieldCooldown *= effect.value;
                        if (effect.stat === 'baseShieldDuration') currentShieldDuration *= effect.value;
                        // Aggiungere altri stat_multiplier se necessario
                        break;
                    case 'flag_set':
                        if (effect.flag === 'shootDouble') currentShootDouble = effect.value;
                        if (effect.flag === 'shootPierce') currentShootPierce = effect.value;
                        if (effect.flag === 'isBlinkDash') currentIsBlinkDash = effect.value;
                        if (effect.flag === 'shootExplosive') currentShootExplosive = effect.value;
                        break;
                    case 'projectile_effect_add':
                        // Aggiungi o somma la chance se l'effetto esiste già? Per ora aggiungiamo e basta.
                        // Bisognerebbe gestire duplicati sommando le 'chance'
                        const existingEffectIndex = currentProjectileEffects.findIndex(e => e.type === effect.effectType);
                        if (existingEffectIndex > -1) {
                            currentProjectileEffects[existingEffectIndex].chance += effect.chance;
                            // Limita chance massima a 1.0 (100%)?
                             currentProjectileEffects[existingEffectIndex].chance = Math.min(1.0, currentProjectileEffects[existingEffectIndex].chance);
                        } else {
                            currentProjectileEffects.push({ type: effect.effectType, chance: effect.chance });
                        }
                        break;
                    // Aggiungere altri tipi di effetto se necessario
                }
            });
        });

        if (isNaN(currentHpRegenRate)) {
            console.error("ERRORE: currentHpRegenRate (da powerup permanenti) è NaN!");
            currentHpRegenRate = 0; // Fallback
        }
        // 4. Applica i moltiplicatori/additivi TEMPORANEI (da nemici) sopra i permanenti
        console.log(`Applying temporary effects: DmgMult=${this.tempDamageMultiplier.toFixed(2)}, FireRateMult=${this.tempFireRateMultiplier.toFixed(2)}, RegenAdd=${this.tempHpRegenRate}`);
        currentProjectileDamage *= this.tempDamageMultiplier;
        currentFireRateDelay *= this.tempFireRateMultiplier; // Moltiplica anche qui
        currentHpRegenRate += this.tempHpRegenRate;

        // --- DEBUG: Controlla se tempHpRegenRate è NaN ---
        if (isNaN(this.tempHpRegenRate)) {
            console.error("ERRORE: tempHpRegenRate è NaN!");
            this.tempHpRegenRate = 0; // Fallback
        }
        // --- FINE DEBUG ---

        // --- DEBUG: Controlla hpRegenRate finale prima dell'assegnazione ---
        if (isNaN(currentHpRegenRate)) {
            console.error("ERRORE: currentHpRegenRate (finale) è NaN prima dell'assegnazione a this.hpRegenRate!");
            currentHpRegenRate = 0; // Fallback
        }
        // --- FINE DEBUG ---


        // --- DEBUG: Controlla maxHealth prima dell'assegnazione ---
        if (isNaN(currentMaxHealth)) {
            console.error("ERRORE: currentMaxHealth calcolato è NaN in recalculateStats!");
            currentMaxHealth = this.baseHealth; // Usa un fallback sicuro
        }
        // --- FINE DEBUG ---

        // 5. Assegna i valori finali calcolati alle proprietà del Player
        this.maxHealth = Math.round(currentMaxHealth);
        this.speed = Math.round(currentSpeed);
        this.fireRateDelay = Math.max(50, Math.round(currentFireRateDelay)); // Minimo delay 50ms
        this.projectileDamage = Math.round(currentProjectileDamage);
        this.dashCooldown = Math.max(1000, Math.round(currentDashCooldown)); // Minimo cooldown 1s
        this.shieldCooldown = Math.max(1000, Math.round(currentShieldCooldown)); // Minimo cooldown 1s
        this.currentShieldDuration = Math.max(500, Math.round(currentShieldDuration)); // Minimo durata 0.5s

        this.evasionChance = Math.min(0.75, currentEvasionChance); // Limita evasione max a 75%?
        this.hpRegenRate = currentHpRegenRate;
        this.shootDouble = currentShootDouble;
        this.shootPierce = currentShootPierce;
        this.isBlinkDash = currentIsBlinkDash; // Questo ora è influenzato dai permanenti
        this.shootExplosive = currentShootExplosive;
        this.projectileEffects = currentProjectileEffects;




        // Assicura che la vita attuale non superi la nuova maxHealth
        this.health = Math.min(this.health, this.maxHealth);


         // --- DEBUG: Controlla health dopo il Math.min ---
        if (isNaN(this.health)) {
            console.error(`ERRORE: Player health è diventato NaN dopo Math.min! MaxHealth: ${this.maxHealth}`);
            // Potresti resettare: this.health = this.maxHealth;
        }
        // --- FINE DEBUG ---

        console.log(`--- Stats Recalculation Complete ---`);
        console.log(`   MaxHP: ${this.maxHealth}, Speed: ${this.speed}, FireDelay: ${this.fireRateDelay}ms`);
        console.log(`   Dmg: ${this.projectileDamage}, DashCD: ${this.dashCooldown}ms, ShieldCD: ${this.shieldCooldown}ms, ShieldDur: ${this.currentShieldDuration}ms`);
        console.log(`   Evasion: ${(this.evasionChance * 100).toFixed(1)}%, Regen: ${this.hpRegenRate}/s`);
        console.log(`   Flags: Double=${this.shootDouble}, Pierce=${this.shootPierce}, Blink=${this.isBlinkDash}, Explosive=${this.shootExplosive}`);
        console.log(`   ProjFX:`, this.projectileEffects);

        // Aggiorna UI rilevanti
        // --- AGGIORNAMENTO UI DOPO RICALCOLO ---
        // Potremmo aggiornare anche altri UI qui se necessario

    }

    

    update(deltaTime, keys, canvasWidth, canvasHeight, now) {
        // --- Rigenerazione HP ---
        if (this.hpRegenRate > 0 && this.health < this.maxHealth) {
             if (now - this.lastRegenTime >= 1000) { // Ogni secondo
                this.health += this.hpRegenRate;
                if (this.health > this.maxHealth) this.health = this.maxHealth;
                this.lastRegenTime = now;
            }
        } else {
             this.lastRegenTime = now; // Resetta timer se non c'è regen o vita piena
        }

       


        const speedThisFrame = this.speed * deltaTime;

        // --- Gestione Dash/Blink ---
        if (this.isDashing) { // Gestisce sia dash che blink
            if (now >= this.dashEndTime) {
                this.isDashing = false;
                if (!this.isBlinkDash) { // Solo il dash normale ripristina la velocità base
                     this.speed = this.baseSpeed;
                }
            } else if (!this.isBlinkDash) { // Muovi solo se è un dash normale
                this.x += this.dashDirectionX * speedThisFrame;
                this.y += this.dashDirectionY * speedThisFrame;
            }
        } else { // --- Movimento Normale ---
            let moveX = 0;
            let moveY = 0;
            if (keys['w'] || keys['ArrowUp']) moveY -= 1;
            if (keys['s'] || keys['ArrowDown']) moveY += 1;
            if (keys['a'] || keys['ArrowLeft']) moveX -= 1;
            if (keys['d'] || keys['ArrowRight']) moveX += 1;

             // Normalizza se necessario (per movimento diagonale)
             const length = Math.sqrt(moveX * moveX + moveY * moveY);
             if (length > 0) {
                 moveX = (moveX / length) * speedThisFrame;
                 moveY = (moveY / length) * speedThisFrame;
             }

             this.x += moveX;
             this.y += moveY;
        }

        // --- Controllo Limiti Canvas ---
        this.x = Math.max(0, Math.min(canvasWidth - this.width, this.x));
        this.y = Math.max(0, Math.min(canvasHeight - this.height, this.y));

        // --- Gestione Scudo ---
        if (this.isShieldActive && now >= this.shieldEndTime) {
            this.isShieldActive = false;
        }

        // --- Gestione Input Abilità ---
        if (keys['j'] || keys['J']) {
            if (now - this.lastShotTime >= this.fireRateDelay) {
                this.shoot();
                this.lastShotTime = now;
            }
        }
        if (keys['k'] || keys['K']) {
            this.activateDash(now, keys); // Gestisce sia dash che blink internamente
        }
        if ((keys['l'] || keys['L']) && !this.isShieldActive && now - this.lastShieldTime >= this.shieldCooldown) {
            this.activateShield(now);
        }
        if (keys[' ']  && this.canActivateUltimate) {
           this.activateUltimate();
           this.canActivateUltimate = false;
        }

    }

    shoot() {
        const projX = this.x + this.width;
        const projYBase = this.y + this.height / 2 - 2;

        const createProj = (offsetY = 0, damageMult = 1, isPiercing = this.shootPierce, isExplosive = this.shootExplosive) => {
             const p = new Projectile(
                 projX, projYBase + offsetY,
                 this.projectileSpeed, // Velocità base proiettile
                 this.projectileDamage * damageMult, // Danno modificato
                 isPiercing, // Passa flag piercing
                 isExplosive // Passa flag esplosivo
             );
             // Aggiungi effetti speciali al proiettile
             this.projectileEffects.forEach(effect => {
                 if (Math.random() < effect.chance) {
                     p.addEffect(effect.type);
                 }
             });
             projectiles.push(p);
        };

        createProj(); // Crea il proiettile principale

        if (this.shootDouble) {
             createProj(5); // Crea un secondo proiettile leggermente spostato
        }
    }

    activateDash(currentTime, keys) {
        const currentCooldown = this.isBlinkDash ? this.dashCooldown + BLINK_DASH_COOLDOWN_INCREASE : this.dashCooldown;
        if (this.isDashing || (currentTime - this.lastDashTime < currentCooldown)) return;

        // Calcola Direzione (serve anche per il blink)
        let dx = 0;
        let dy = 0;
        if (keys['w'] || keys['ArrowUp']) dy -= 1;
        if (keys['s'] || keys['ArrowDown']) dy += 1;
        if (keys['a'] || keys['ArrowLeft']) dx -= 1;
        if (keys['d'] || keys['ArrowRight']) dx += 1;
        if (dx === 0 && dy === 0) dx = 1; // Default a destra
        const length = Math.sqrt(dx * dx + dy * dy);
        const normDx = dx / length;
        const normDy = dy / length;

        if (this.isBlinkDash) {
            // --- BLINK ---
            const blinkDistance = this.baseSpeed * 0.8; // Distanza del blink
            this.x += normDx * blinkDistance;
            this.y += normDy * blinkDistance;
            // Controllo Limiti dopo il blink istantaneo
            this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
            console.log("Blink Activated!");
            // Il blink è istantaneo, non impostiamo isDashing o endTime
            this.lastDashTime = currentTime; // Applica cooldown aumentato

        } else {
             // --- DASH Normale ---
             this.dashDirectionX = normDx;
             this.dashDirectionY = normDy;
             this.isDashing = true;
             this.speed = this.baseSpeed * DASH_SPEED_MULTIPLIER;
             this.dashEndTime = currentTime + DASH_DURATION_MS;
             this.lastDashTime = currentTime;
             console.log(`Dash Activated! Direction: (${this.dashDirectionX.toFixed(2)}, ${this.dashDirectionY.toFixed(2)})`);
        }

    }


    // Modifica activateShield per usare la durata corrente
    activateShield(currentTime) {
        if (this.isShieldActive) return;
       this.isShieldActive = true;
       // Usa la durata modificata dal livello abilità
       this.shieldEndTime = currentTime + this.currentShieldDuration; // <-- USA DURATA CORRENTE
       this.lastShieldTime = currentTime;
       console.log(`Shield Activated! Duration: ${this.currentShieldDuration/1000}s`);
   }

    activateUltimate() { /* ... (invariato, ma l'effetto su enemies è ora rilevante) ... */
         if(this.mana >= ULTIMATE_MANA_COST) {
            this.mana -= ULTIMATE_MANA_COST;
            console.log("ULTIMATE! Mana left:", this.mana);

            const ultimateDamage = this.projectileDamage * ULTIMATE_DAMAGE_MULTIPLIER;
            // Danneggia nemici comuni E il boss se attivo
            enemies.forEach(enemy => enemy.takeDamage(ultimateDamage));
            if (currentBoss && gameManager.isBossActive) {
                currentBoss.takeDamage(ultimateDamage);
            }

            for (let i = 0; i < 50; i++) { /* ... (creazione particelle invariata) ... */
                 particles.push(new Particle( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3 + 1, 'white' ));
            }

        } else {
            console.log("Not enough mana for Ultimate!");
        }
    }

    takeDamage(amount, source = null) { // Aggiunto 'source' per sapere chi ha colpito

        // --- DEBUG: Controlla se amount è NaN ---
        if (isNaN(amount)) {
            console.error(`ERRORE: Player.takeDamage ha ricevuto un amount NaN! Valore: ${amount}, Source:`, source);
            amount = 0; // Previene che health diventi NaN, ma segnala l'errore
        }
        // --- FINE DEBUG ---

        // --- Evasione ---
        if (Math.random() < this.evasionChance) {
            console.log("Evaded!");
            // Mostra effetto visivo evasione? (Es. testo "Miss!" sopra il player)
            return;
        }

        if (this.isShieldActive) {
            console.log("Damage blocked by shield!");
            return;
        }
        this.health -= amount;

         // --- DEBUG: Controlla se health è diventato NaN ---
            if (isNaN(this.health)) {
                console.error(`ERRORE: Player health è diventato NaN dopo danno! Danno: ${amount}, Vita precedente: ${this.health + amount}`);
                // Potresti voler resettare la vita a un valore sicuro qui, es: this.health = 1;
            }
        // --- FINE DEBUG ---


        console.log(`Ouch! Took ${amount} damage. Health: ${this.health}`);
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    }

    die() { /* ... (invariato) ... */
        console.log("Manalisk Defeated! Game Over.");
        gameRunning = false;
        alert("Game Over!");
    }
    draw(context) { /* ... (invariato, disegno scudo già presente) ... */
        super.draw(context);
        if (this.isShieldActive) {
            context.strokeStyle = 'cyan';
            context.lineWidth = 2;
            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width * 0.7, 0, Math.PI * 2);
            context.stroke();
            context.lineWidth = 1;
        }
         // Disegna barra vita sopra il giocatore? (Opzionale)
    }



     

     // Inizializza UI XP all'avvio
     initUI() {
        playerLevelDisplay.textContent = this.level;
        this.updateXPUI();
        this.updatePermanentPowerUpUI();
        tempPowerupDisplay.textContent = 'Nessuno'; // Resetta UI powerup temp
    }

}

// --- Classe Proiettile (Giocatore) ---
class Projectile extends Entity {
    constructor(x, y, speed, damage, isPiercing = false, isExplosive = false) {
        super(x, y, 8, 4, PROJECTILE_COLOR);
        this.speed = speed;
        this.damage = damage;
        this.piercing = isPiercing;
        this.explosive = isExplosive;
        this.enemiesHit = []; // Per tracciare nemici colpiti da proiettile piercing
        this.effects = []; // Effetti da applicare (es. 'gas', 'cocoon', 'petrify')
    }

    update(deltaTime) {
        this.x += this.speed * deltaTime;
        if (this.x > canvas.width) {
            this.markedForDeletion = true;
        }
    }

    addEffect(type) {
        this.effects.push(type);
        // Cambia colore se ha effetti? Es: giallo per gas, bianco per cocoon, grigio per petrify
        if (type === 'gas') this.color = 'yellow';
        else if (type === 'cocoon') this.color = 'white';
        else if (type === 'petrify') this.color = 'grey';
    }

    onHit(enemy) {
        // Applica effetti all'enemy PRIMA di marcarlo per delezione o altro
         this.effects.forEach(effectType => {
            applyProjectileEffect(effectType, enemy, this); // Funzione helper
        });

         if (this.explosive) {
            this.explode();
            this.markedForDeletion = true; // L'originale scompare
        } else if (!this.piercing) {
            this.markedForDeletion = true;
        }
        // Se è piercing, non viene marcato per delezione qui
    }

    explode() {
        console.log("Projectile Exploded!");
        const numSplinters = EXPLOSIVE_SHOT_NUM_PROJECTILES;
        const angleIncrement = (Math.PI * 2) / numSplinters;
        const splinterSpeed = this.speed * 0.7;
        const splinterDamage = this.damage * EXPLOSIVE_SHOT_DAMAGE_MULTIPLIER;

        for (let i = 0; i < numSplinters; i++) {
            const angle = i * angleIncrement;
            // Crea un proiettile "nemico" per semplicità, o adatta Projectile
             enemyProjectiles.push(new EnemyProjectile(
                 this.x, this.y, // Origine esplosione
                 Math.cos(angle) * splinterSpeed, // vx
                 Math.sin(angle) * splinterSpeed, // vy
                 splinterDamage,
                 2, // Dimensione piccola
                 'orange' // Colore scheggia
             ));
        }
    }
}

// --- Classe Proiettile Nemico ---
class EnemyProjectile extends Entity {
    constructor(x, y, vx, vy, damage, size = 5, color = ENEMY_PROJECTILE_COLOR) {
        super(x, y, size, size, color);
        this.vx = vx; // Velocità X
        this.vy = vy; // Velocità Y
        this.damage = damage;
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        // Marcatura per delezione se esce dai bordi
        if (this.x + this.width < 0 || this.x > canvas.width || this.y + this.height < 0 || this.y > canvas.height) {
            this.markedForDeletion = true;
        }
    }
}


// --- Classe Base Nemico ---
class Enemy extends Entity {
    constructor(x, y, width, height, health, speed, color, points = 10) {
        super(x, y, width, height, color);
        this.maxHealth = health;
        this.health = health;
        this.speed = speed;
        this.pointsValue = points;
        this.isPetrified = false;
        this.petrifyEndTime = 0;
        this.isInGasCloud = false; // Flag per sapere se è affetto da gas
        this.slowFactor = 1.0; // Moltiplicatore velocità (1.0 = normale)
        this.isCocooned = false;
        this.cocoonHealth = 0;
        this.xpValue = Math.max(1, Math.floor(health / 4)); // XP proporzionale alla vita (minimo 1)

    }

    takeDamage(amount) {
         if (this.isCocooned) {
             this.cocoonHealth--;
             console.log(`Cocoon hit! Health left: ${this.cocoonHealth}`);
             if (this.cocoonHealth <= 0) {
                 this.removeCocoon();
                 // Non prende danno al colpo che rompe il bozzolo
             }
             return; // Non prende danno normale finché in bozzolo
         }

         this.health -= amount;
         if (this.health <= 0) {
             this.health = 0;
             this.die(); // Chiama il nuovo metodo die()
         }
    }

    // NUOVO Metodo per gestire la morte
    die() {
        if (this.markedForDeletion) return; // Evita azioni multiple se già morto

        this.markedForDeletion = true;
        gameManager.enemyDefeated(this); // Notifica il game manager (per conteggio boss)

        // --- NUOVA LOGICA: Guadagno Mana ---
        if (player && !(this instanceof Boss)) { // Solo se il player esiste e il nemico non è un boss
            // Calcola mana: 5% della vita massima del nemico, arrotondato per eccesso
            const manaToGain = Math.ceil(this.maxHealth * MANA_REGEN_PERCENT_ON_KILL);
            if (manaToGain > 0) {
                player.gainMana(manaToGain); // Chiama il nuovo metodo del player
            }
        }
        // --- FINE LOGICA MANA ---

        // Notifica il player per XP
        if (player) {
            player.gainXP(this.xpValue);
        }

        // Logica Drop
        this.tryDropItem();

        // Aggiungere effetto morte? (Esplosione, particelle?)
    }

     // NUOVO Metodo per tentare il drop
     tryDropItem() {
        const rand = Math.random();
        if (rand < TEMP_POWERUP_DROP_CHANCE) {
            // Droppa PowerUp Temporaneo
            const powerUpKeys = Object.keys(ENEMY_POWERUP_TYPES);
            const randomKey = powerUpKeys[Math.floor(Math.random() * powerUpKeys.length)];
            const powerUpEffect = ENEMY_POWERUP_TYPES[randomKey];
            drops.push(new TempPowerUpDrop(this.x + this.width / 2, this.y + this.height / 2, powerUpEffect));
            console.log(`Enemy dropped Temp PowerUp: ${powerUpEffect.name}`);
        } else if (rand < TEMP_POWERUP_DROP_CHANCE + HEALTH_DROP_CHANCE) {
            // Droppa Vita (solo se non ha droppato powerup)
            drops.push(new HealthDrop(this.x + this.width / 2, this.y + this.height / 2));
            console.log("Enemy dropped Health Crystal");
        }
    }

    update(deltaTime, now) {
         // Rimuovi effetti scaduti
         if (this.isPetrified && now >= this.petrifyEndTime) {
             this.removePetrify();
         }
         // Reset slow factor se non più in gas (verrà riapplicato da GasCloud se ancora dentro)
         if (!this.isInGasCloud && this.slowFactor < 1.0) {
              this.slowFactor = 1.0;
         }
         this.isInGasCloud = false; // Resetta per il prossimo check nella classe GasCloud

         if (this.isPetrified || this.isCocooned) {
             // Se pietrificato o in bozzolo, non fa nulla (non si muove, non attacca)
             return;
         }
         // Movimento base (verso sinistra) - Le sottoclassi possono sovrascrivere
         const currentSpeed = this.speed * this.slowFactor;
         this.x -= currentSpeed * deltaTime;

         // Marcatura per delezione se esce a sinistra
         if (this.x + this.width < 0) {
             this.markedForDeletion = true;
         }
    }

     draw(context) {
         super.draw(context); // Disegna il nemico base
         // Effetti Visivi
         if (this.isPetrified) {
             context.fillStyle = 'rgba(100, 100, 100, 0.5)'; // Overlay grigio
             context.fillRect(this.x, this.y, this.width, this.height);
         } else if (this.isCocooned) {
              context.strokeStyle = COCOON_COLOR;
              context.lineWidth = 2;
              context.strokeRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2); // Rettangolo bianco attorno
              context.lineWidth = 1;
         }

         // Barra vita (opzionale)
         // context.fillStyle = 'red';
         // context.fillRect(this.x, this.y - 10, this.width, 5);
         // context.fillStyle = 'green';
         // context.fillRect(this.x, this.y - 10, this.width * (this.health / this.maxHealth), 5);

         // --- NUOVO: Disegna Barra Vita Nemico ---
            // Mostra solo se il nemico è vivo, ha maxHealth > 0 e non è un boss (i boss hanno la loro barra)
            if (this.health > 0 && this.maxHealth > 0 && !(this instanceof Boss)) {
                const barWidth = this.width * 0.8; // Larghezza barra proporzionale al nemico
                const barHeight = 4; // Altezza fissa della barra
                const barX = this.x + (this.width - barWidth) / 2; // Centra la barra orizzontalmente
                const barY = this.y - barHeight - 3; // Posiziona la barra sopra il nemico con un piccolo margine

                // Barra Sfondo (rossa scura o grigia)
                context.fillStyle = '#555'; // Grigio scuro per lo sfondo
                context.fillRect(barX, barY, barWidth, barHeight);

                // Barra Vita Attuale (verde brillante)
                const healthPercentage = this.health / this.maxHealth;
                context.fillStyle = 'lime';
                context.fillRect(barX, barY, barWidth * healthPercentage, barHeight);

                // Optional: Bordo sottile attorno alla barra per miglior visibilità
                context.strokeStyle = 'black';
                context.lineWidth = 1;
                context.strokeRect(barX, barY, barWidth, barHeight);
            }
            // --- Fine Barra Vita Nemico ---
     }

    petrify(duration) {
        if (this.isCocooned) return; // Non pietrifica se già in bozzolo
        console.log("Enemy Petrified!");
        this.isPetrified = true;
        this.petrifyEndTime = Date.now() + duration;
    }
    removePetrify() {
         console.log("Petrify ended.");
         this.isPetrified = false;
    }

    cocoon() {
         if (this.isPetrified) return; // Non bozzola se già pietrificato
         console.log("Enemy Cocooned!");
         this.isCocooned = true;
         this.cocoonHealth = COCOON_HEALTH;
    }
    removeCocoon() {
        console.log("Cocoon broken!");
        this.isCocooned = false;
    }

     applySlow(factor) {
         this.isInGasCloud = true; // Segnala che è stato toccato da un gas questo frame
         this.slowFactor = Math.min(this.slowFactor, factor); // Applica il rallentamento più forte se in più nuvole
     }
}

// --- Nemici Livello 1 ---
class KamikazeEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 25, 25, 30, 150, 'orange', 15); // Meno vita, veloce
        this.state = 'flying'; // 'flying', 'targeting', 'dashing'
        this.targetY = 0;
        this.dashSpeed = 600;
    }

    update(deltaTime, now) {
         if (this.isPetrified || this.isCocooned) return; // Stato bloccato

         const currentSpeed = (this.state === 'dashing' ? this.dashSpeed : this.speed) * this.slowFactor;

        switch(this.state) {
            case 'flying':
                this.x -= currentSpeed * deltaTime;
                 // Logica per decidere quando mirare (es. metà schermo)
                 if (this.x < canvas.width * 0.7 && player) {
                    this.state = 'targeting';
                    this.targetY = player.y + player.height / 2; // Mira al centro del giocatore
                    console.log("Kamikaze targeting!");
                 }
                break;
            case 'targeting':
                // Si muove lentamente verso la Y target mentre continua ad avanzare
                 this.x -= (currentSpeed * 0.5) * deltaTime; // Più lento mentre mira
                const dy = this.targetY - (this.y + this.height / 2);
                 if (Math.abs(dy) > 2) {
                     this.y += Math.sign(dy) * (this.speed * 0.8) * deltaTime; // Si aggiusta verticalmente
                 } else {
                     // Raggiunta Y, inizia il dash
                     this.state = 'dashing';
                     console.log("Kamikaze Dashing!");
                 }
                break;
            case 'dashing':
                this.x -= currentSpeed * deltaTime; // Dash orizzontale veloce
                break;
        }

         // Marcatura per delezione se esce a sinistra
         if (this.x + this.width < 0) {
             this.markedForDeletion = true;
         }
         // Reset slow factor
         if (!this.isInGasCloud && this.slowFactor < 1.0) this.slowFactor = 1.0;
         this.isInGasCloud = false;
    }
}

class RandomShooterEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 30, 30, 50, 80, 'purple', 20); // Più robusto, lento
        this.shootInterval = 2000; // Spara ogni 2 secondi
        this.lastShotTime = Date.now() - Math.random() * this.shootInterval;
        this.projectileSpeed = 150;
        this.projectileDamage = 8;
    }

    update(deltaTime, now) {
        super.update(deltaTime, now); // Chiama movimento base genitore
        if (this.isPetrified || this.isCocooned) return;

        // Logica di sparo
        if (now - this.lastShotTime >= this.shootInterval) {
            this.shoot();
            this.lastShotTime = now;
        }
    }

    shoot() {
        console.log("Random Shooter Firing!");
        const angle = (Math.random() * Math.PI) + Math.PI / 2; // Angolo casuale verso sinistra/basso/alto
        const vx = Math.cos(angle) * this.projectileSpeed;
        const vy = Math.sin(angle) * this.projectileSpeed;
        enemyProjectiles.push(new EnemyProjectile(
            this.x, this.y + this.height / 2, // Origine sparo
            vx, vy, this.projectileDamage
        ));
    }
}

class TargetingShooterEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 35, 35, 60, 60, 'red', 25); // Il più robusto, lento
        this.shootInterval = 2500; // Spara ogni 2.5 secondi
        this.lastShotTime = Date.now() - Math.random() * this.shootInterval;

        console.log(`>>> TargetingShooter CREATED at ${Date.now()}. Initial lastShotTime set to: ${this.lastShotTime}. (Offset from now: ${Date.now() - this.lastShotTime} ms)`);


        this.projectileSpeed = 200;
        this.projectileDamage = 10;
    }

     update(deltaTime, now) {
        super.update(deltaTime, now); // Chiama movimento base e controlli
        if (this.isPetrified || this.isCocooned) return; // Esce se bloccato
        const timeSinceLastShot = now - this.lastShotTime;
        const readyToShoot = timeSinceLastShot >= this.shootInterval;

        if (readyToShoot) {
            if (player) { // Spara solo se il giocatore esiste
                this.shoot();
                this.lastShotTime = now; // Aggiorna il tempo dell'ultimo sparo
            } else {
                // LOG 4: Non può sparare perché 'player' non è valido
                console.warn("TargetingShooter cannot shoot, player object is missing!");
            }
        }
    }

    shoot() {

        // Calcoli direzione (assicurati che player esista qui, anche se già controllato prima)
        if (!player) {
            console.error("   TargetingShooter shoot() called but player is missing inside!");
            return;
        }
        const dx = player.x + player.width / 2 - (this.x);
        const dy = player.y + player.height / 2 - (this.y + this.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);


        if (dist === 0) {
            console.warn("   TargetingShooter division by zero avoided (dist is 0). Skipping shot.");
            return; // Evita NaN
        }

        const vx = (dx / dist) * this.projectileSpeed;
        const vy = (dy / dist) * this.projectileSpeed;

        enemyProjectiles.push(new EnemyProjectile(
            this.x, this.y + this.height / 2,
            vx, vy, this.projectileDamage
        ));
    }
}

// --- Classe Base Boss ---
class Boss extends Enemy {
     constructor(x, y, width, height, health, speed, color, points, bossName) {
        super(x, y, width, height, health, speed, color, points);
        this.bossName = bossName;
         this.entryPhase = true; // Fase di ingresso
         this.targetX = canvas.width - this.width - 50; // Posizione X target per l'ingresso
         this.attackPatterns = []; // Array di funzioni o oggetti che descrivono gli attacchi
         this.currentAttack = null;
         this.lastAttackTime = 0;
         this.attackCooldown = 3000; // Tempo tra un attacco e l'altro
     }

    update(deltaTime, now) {
        // Non chiamare super.update() perché il movimento del boss è diverso
        if (this.isPetrified || this.isCocooned) return; // Bloccato

         // --- Fase di Ingresso ---
         if (this.entryPhase) {
             if (this.x > this.targetX) {
                 this.x -= (this.speed * 0.5) * deltaTime; // Entra lentamente
             } else {
                 this.x = this.targetX;
                 this.entryPhase = false;
                 this.lastAttackTime = now; // Inizia cooldown primo attacco
                 console.log(`${this.bossName} entry complete.`);
             }
             return; // Non fa altro durante l'ingresso
         }

         // --- Logica Attacchi ---
         if (!this.currentAttack && now - this.lastAttackTime >= this.attackCooldown) {
             this.selectAttack();
         }

        if (this.currentAttack && typeof this.currentAttack.execute === 'function') { // Controlla che l'attacco e la sua funzione 'execute' esistano
            // console.log(`Boss Executing Attack: ${this.currentAttack.name}`); // DEBUG

            // --- CORREZIONE: Chiama la funzione salvata nell'oggetto currentAttack ---
            const attackFinished = this.currentAttack.execute(deltaTime, now);
            // -----------------------------------------------------------------------

            if (attackFinished) {
                // console.log(`Boss Finished Attack: ${this.currentAttack.name}`); // DEBUG
                this.currentAttack = null;
                this.lastAttackTime = now;
            }
        } else if (this.currentAttack) {
            // Se l'attacco selezionato non ha una funzione 'execute' valida (errore di configurazione)
            console.error(`Errore: L'attacco selezionato '${this.currentAttack.name}' non ha una funzione 'execute' valida!`);
            this.currentAttack = null; // Resetta l'attacco per evitare loop di errori
            this.lastAttackTime = now; // Vai al prossimo cooldown
        }

          // Reset slow factor
         if (!this.isInGasCloud && this.slowFactor < 1.0) this.slowFactor = 1.0;
         this.isInGasCloud = false;
    }

    selectAttack() {
         // Scegli un attacco casuale tra quelli disponibili
         if (this.attackPatterns.length > 0) {
             const randomIndex = Math.floor(Math.random() * this.attackPatterns.length);
             this.currentAttack = this.attackPatterns[randomIndex];
             this.currentAttack.init(); // Inizializza lo stato dell'attacco
             console.log(`${this.bossName} starts attack: ${this.currentAttack.name}`);
         }
    }

    executeAttack(deltaTime, now) {
         // Questo metodo sarà implementato dalla specifica classe del boss
         // Deve ritornare 'true' quando l'attacco è completato
         return true; // Placeholder
    }

    takeDamage(amount) {
        if (this.entryPhase) return;
        // NON chiamare super.takeDamage() perché vogliamo la logica 'die' qui
        this.health -= amount;
        if (this.health <= 0) {
           this.health = 0;
           // Non chiamare this.die() direttamente, la sconfitta è gestita da gameManager
           if (!this.markedForDeletion) { // Evita chiamate multiple
                this.markedForDeletion = true;
                gameManager.bossDefeated(this); // Notifica sconfitta boss (che poi dà powerup boss)
           }
        }
    }

     draw(context) {
         // Disegna Barra Vita Boss (più grande)
         if (gameManager.isBossActive && this.health > 0) {
             const barWidth = canvas.width * 0.6;
             const barHeight = 15;
             const barX = (canvas.width - barWidth) / 2;
             const barY = canvas.height - barHeight - 20; // Spostata in basso (15px dal fondo)
            
             context.fillStyle = 'grey';
             context.fillRect(barX, barY, barWidth, barHeight);
             context.fillStyle = 'darkred';
             context.fillRect(barX, barY, barWidth * (this.health / this.maxHealth), barHeight);
             context.strokeStyle = 'white';
             context.strokeRect(barX, barY, barWidth, barHeight);
             // Nome Boss
             context.fillStyle = 'white';
             context.font = '12px sans-serif';
             context.textAlign = 'center';
             context.fillText(this.bossName, canvas.width / 2, barY + barHeight + 12);
             context.textAlign = 'left'; // Reset alignment
         }
         
         super.draw(context); // Disegna il boss
     }
}

// --- Boss Livello 1: Ammasso di Carne (FleshMass) ---
class FleshMassBoss extends Boss {
    constructor(x, y) {
        super(x, y, 80, 80, 1000, 50, 'pink', 500, 'Ammasso di Carne');
        this.attackCooldown = 50; // Più lento tra attacchi era 3500

        // Definizione Pattern Attacco
        this.attackPatterns = [
            { name: 'Spit Burst', init: () => { this.attackState = { count: 0, maxCount: 10, timer: 0, interval: 100 }; }, execute: this.spitBurst.bind(this) },
            // { name: 'Charge', init: () => { this.attackState = { targetY: player ? player.y : canvas.height/2, charging: false, chargeSpeed: 300, returnSpeed: 100, originalX: this.x }; }, execute: this.chargeAttack.bind(this) },
            {
                name: 'Spawn Minion',
                init: () => {
                    this.attackState = {
                        count: 0,
                        maxCount: 4, // Quanti minion spawnare per attacco
                        timer: 0,
                        interval: 500 // Intervallo tra spawn (ms)
                    };
                },
                execute: this.spawnMinion.bind(this) // Chiama il nuovo metodo
            }
            //{ name: 'Spawn Minion', init: () => {}, execute: this.spawnMinion.bind(this) } // Esempio futuro
        ];
    }

    spitBurst(deltaTime, now) {
        let state = this.attackState;
        state.timer += deltaTime * 1000; // Aggiorna timer
    
        // LOG INTERNO 1: Stato attuale dell'attacco
        console.log(`   [SpitBurst] Executing. Timer: ${state.timer.toFixed(0)}/${state.interval}, Count: ${state.count}/${state.maxCount}`);
    
        const conditionMet = state.timer >= state.interval && state.count < state.maxCount;
    
        if (conditionMet) {
            // LOG INTERNO 2: La condizione per sparare è soddisfatta
            console.log(`      [SpitBurst] Condition Met! Attempting fire #${state.count + 1}`);
    
            // LOG INTERNO 3: Verifica riferimento player PRIMA di usarlo
            if (!player) {
                 console.error("      [SpitBurst] ERROR: Player reference is missing!");
                 return true; // Termina l'attacco se non c'è il player
            }
            // console.log("      [SpitBurst] Player Ref OK:", player.x, player.y); // Log opzionale coordinate player
    
            const spreadAngle = Math.PI / 8;
            const baseAngle = Math.atan2(player.y + player.height / 2 - (this.y + this.height / 2), player.x + player.width / 2 - this.x);
            const angle = baseAngle + (Math.random() - 0.5) * spreadAngle;
            const speed = 250;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const damage = 15;
            const projX = this.x + this.width / 2;
            const projY = this.y + this.height / 2;
    
            // LOG INTERNO 4: Parametri del proiettile calcolati
            console.log(`      [SpitBurst] Calculated projectile: Pos=(${projX.toFixed(0)}, ${projY.toFixed(0)}), Vel=(${vx.toFixed(1)}, ${vy.toFixed(1)}), Dmg=${damage}`);
    
            // LOG INTERNO 5: Prima di pushare
            console.log(`      [SpitBurst] Pushing projectile. Current enemyProjectiles length: ${enemyProjectiles.length}`);
            enemyProjectiles.push(new EnemyProjectile(projX, projY, vx, vy, damage, 8, 'red'));
            // LOG INTERNO 6: Dopo aver pushato
            console.log(`      [SpitBurst] Projectile pushed. New enemyProjectiles length: ${enemyProjectiles.length}`);
    
            state.count++;
            state.timer = 0; // Resetta timer per il prossimo colpo della raffica
        }
    
        const isFinished = state.count >= state.maxCount;
        // LOG INTERNO 7: Valore di ritorno
        // console.log(`   [SpitBurst] Returning finished = ${isFinished}`);
        return isFinished; // Finito dopo N colpi
    }

    
    chargeAttack(deltaTime, now) {
    let state = this.attackState;

    // LOG INTERNO 1: Stato attuale
    console.log(`   [ChargeAttack] Executing. Charging: ${state.charging}, X: ${this.x.toFixed(0)}, TargetY: ${state.targetY.toFixed(0)}, CurrentY: ${this.y.toFixed(0)}`);

     if (!state.charging) {
         // Fase di allineamento
         const dy = state.targetY - this.y;
         const moveY = Math.sign(dy) * this.speed * deltaTime; // Usa this.speed per allinearsi

         // LOG INTERNO 2: Fase allineamento
         // console.log(`      [ChargeAttack] Aligning. dy: ${dy.toFixed(1)}, moveY: ${moveY.toFixed(1)}`);

         if (Math.abs(dy) > 5) {
             this.y += moveY;
         } else {
              // Raggiunta Y, pronto a caricare
              state.charging = true;
              // LOG INTERNO 3: Inizio carica
              console.log(`      [ChargeAttack] Target Y reached. Setting charging = true.`);
         }
         return false; // Non finito finché non carica
     } else {
         // Fase di carica
         const moveX = state.chargeSpeed * this.slowFactor * deltaTime;

         // LOG INTERNO 4: Fase carica
         console.log(`      [ChargeAttack] Charging left. moveX: ${moveX.toFixed(1)}, slowFactor: ${this.slowFactor}`);
         this.x -= moveX;

         if (this.x + this.width < 0) {
             // LOG INTERNO 5: Carica completata
             console.log(`      [ChargeAttack] Off screen. Resetting position and finishing attack.`);
             this.x = state.originalX; // Riposiziona
             this.y = Math.random() * (canvas.height - this.height);
             return true; // Attacco completato
         }
         return false; // Non finito finché non esce
     }
    }

    spawnMinion(deltaTime, now) {
        let state = this.attackState;
        state.timer += deltaTime * 1000; // Aggiorna timer
    
        const conditionMet = state.timer >= state.interval && state.count < state.maxCount;
    
        if (conditionMet) {
            console.log(`   [SpawnMinion] Spawning minion #${state.count + 1}`);
    
            // Punto di spawn vicino al boss (es. leggermente sopra o sotto)
            const spawnX = this.x + this.width / 2 - 7; // Centro X del minion
            const spawnY = this.y + (Math.random() < 0.5 ? -20 : this.height + 5); // Sopra o sotto il boss
    
            // Direzione iniziale casuale
            const initialAngle = Math.random() * Math.PI * 2;
            const initialVx = Math.cos(initialAngle);
            const initialVy = Math.sin(initialAngle);
    
            // Aggiungi il minion all'array globale dei nemici
            enemies.push(new MinionEnemy(spawnX, spawnY, initialVx, initialVy));
            console.log(`   [SpawnMinion] Minion pushed. Total enemies: ${enemies.length}`);
    
            state.count++;
            state.timer = 0; // Resetta timer per il prossimo spawn
        }
    
        const isFinished = state.count >= state.maxCount;
        // console.log(`   [SpawnMinion] Returning finished = ${isFinished}`);
        return isFinished; // Finito dopo N spawn
    }


}

class MinionEnemy extends Enemy {
    constructor(x, y, initialVx, initialVy) {
        const size = 15; // Piccoli
        const health = 15; // Poca vita
        const speedMagnitude = 100; // Velocità base del vagare
        const color = 'lightcoral';
        const points = 5;
        super(x, y, size, size, health, 0, color, points); // Speed base 0, movimento gestito da vx/vy

        // Imposta velocità iniziale con una magnitudo costante
        const initialSpeedFactor = speedMagnitude / Math.sqrt(initialVx * initialVx + initialVy * initialVy);
        this.vx = initialVx * initialSpeedFactor;
        this.vy = initialVy * initialSpeedFactor;
    }

    update(deltaTime, now) {
        // Non chiamare super.update() che muove solo a sinistra
        if (this.isPetrified || this.isCocooned) return; // Stati bloccanti

        // Applica rallentamento se necessario
        const currentVx = this.vx * this.slowFactor;
        const currentVy = this.vy * this.slowFactor;

        // Movimento
        this.x += currentVx * deltaTime;
        this.y += currentVy * deltaTime;

        // Logica di Rimbalzo sui bordi del canvas
        let bounced = false;
        if (this.x <= 0) {
            this.x = 0; // Clamp
            this.vx = Math.abs(this.vx); // Inverti X verso destra
            bounced = true;
        } else if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width; // Clamp
            this.vx = -Math.abs(this.vx); // Inverti X verso sinistra
            bounced = true;
        }

        if (this.y <= 0) {
            this.y = 0; // Clamp
            this.vy = Math.abs(this.vy); // Inverti Y verso basso
            bounced = true;
        } else if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height; // Clamp
            this.vy = -Math.abs(this.vy); // Inverti Y verso alto
            bounced = true;
        }

        // Se rimbalza, aggiungi un piccolo elemento casuale per evitare loop infiniti lungo i bordi
        if (bounced) {
             this.vx += (Math.random() - 0.5) * 10; // Piccola variazione X
             this.vy += (Math.random() - 0.5) * 10; // Piccola variazione Y
             // Normalizza di nuovo la velocità alla magnitudo desiderata
             const currentMagnitude = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
             if (currentMagnitude > 0) {
                const factor = (100 * this.slowFactor) / currentMagnitude; // Usa 100 come speedMagnitude base
                this.vx *= factor;
                this.vy *= factor;
             }
        }


        // Reset slow factor (come negli altri nemici)
        if (!this.isInGasCloud && this.slowFactor < 1.0) this.slowFactor = 1.0;
        this.isInGasCloud = false;
    }

    // takeDamage è ereditato da Enemy e dovrebbe funzionare
    // draw è ereditato da Enemy/Entity
}

// --- Boss Livello 1: Ragno (Spider) ---
// (Implementazione scheletro, da definire meglio attacchi)
class SpiderBoss extends Boss {
     constructor(x, y) {
        super(x, y, 60, 60, 800, 70, 'darkgrey', 500, 'Ragno Gigante');
        this.attackCooldown = 3000;

        this.attackPatterns = [
             { name: 'Web Shot', init: () => { this.attackState = { fired: false }; }, execute: this.webShot.bind(this) },
             { name: 'Jump Attack', init: () => { this.attackState = { jumping: false, jumpHeight: -300, gravity: 800, vx: 0, vy: 0 }; }, execute: this.jumpAttack.bind(this) }
        ];
     }

    webShot(deltaTime, now) {
        // Spara un proiettile "ragnatela" che rallenta al contatto?
         if (!this.attackState.fired && player) {
            console.log("Spider shoots web!");
             const dx = player.x - this.x;
             const dy = player.y - this.y;
             const dist = Math.sqrt(dx*dx + dy*dy);
             const speed = 220;
             const vx = (dx/dist) * speed;
             const vy = (dy/dist) * speed;
             // Crea un proiettile speciale che applica slow?
             enemyProjectiles.push(new EnemyProjectile(this.x + this.width/2, this.y + this.height/2, vx, vy, 5, 10, 'white'));
             this.attackState.fired = true;
         }
        return this.attackState.fired; // Attacco istantaneo (il proiettile fa il resto)
    }

     jumpAttack(deltaTime, now) {
         let state = this.attackState;
          if (!state.jumping) {
             // Inizio salto: imposta velocità iniziale X verso il giocatore e Y verso l'alto
             state.vx = player ? Math.sign(player.x - this.x) * this.speed * 1.5 : 0;
             state.vy = state.jumpHeight; // Velocità verticale iniziale (negativa = su)
             state.jumping = true;
             console.log("Spider jumps!");
         }

         // Applica movimento e gravità
         this.x += state.vx * deltaTime;
         this.y += state.vy * deltaTime;
         state.vy += state.gravity * deltaTime; // Accelera verso il basso

         // Condizione di fine salto (es. tocca il "pavimento" virtuale o torna a Y iniziale?)
         // Per semplicità, termina dopo un certo tempo o quando Y > canvas.height
         if (this.y > canvas.height - this.height) {
             this.y = canvas.height - this.height; // Atterra sul fondo
              console.log("Spider landed.");
             return true; // Attacco finito
         }
          return false; // Non finito finché in aria
     }
}


// --- Classi Effetti Visivi/Ambientali ---
class Particle extends Entity { /* ... (invariato) ... */
    constructor(x, y, size, color) {
        super(x, y, size, size, color);
        this.creationTime = Date.now();
        this.lifespan = PARTICLE_LIFESPAN; // Millisecondi
    }
    update(deltaTime) {}
    isExpired() {
        return Date.now() - this.creationTime > this.lifespan;
    }
}

class GasCloud extends Entity {
    constructor(x, y) {
        super(x, y, GAS_CLOUD_RADIUS * 2, GAS_CLOUD_RADIUS * 2, GAS_CLOUD_COLOR);
        this.creationTime = Date.now();
        this.lifespan = GAS_CLOUD_DURATION;
        this.radius = GAS_CLOUD_RADIUS;
        this.centerX = x + this.radius; // Centro del cerchio
        this.centerY = y + this.radius;
        this.dps = GAS_CLOUD_DPS;
        this.slowFactor = GAS_CLOUD_SLOW_FACTOR;
        this.lastDamageTime = 0;
    }

    update(deltaTime, now) {
        if (now - this.creationTime > this.lifespan) {
            this.markedForDeletion = true;
            return;
        }

        // Controlla collisione e applica effetti ai nemici (e boss)
        const targets = [...enemies, currentBoss].filter(e => e && !e.markedForDeletion); // Combina nemici e boss attivo
        targets.forEach(enemy => {
             const dx = (enemy.x + enemy.width / 2) - this.centerX;
             const dy = (enemy.y + enemy.height / 2) - this.centerY;
             const distanceSq = dx * dx + dy * dy;
             if (distanceSq < this.radius * this.radius) {
                 // Dentro la nuvola
                 enemy.applySlow(this.slowFactor);
                 // Applica danno nel tempo (DPS)
                 if (now - this.lastDamageTime >= 1000) { // Ogni secondo
                     enemy.takeDamage(this.dps * (deltaTime * (now - this.lastDamageTime)/1000) ); // Danno proporzionale al tempo passato
                      // console.log(`Gas cloud damaging ${enemy.constructor.name}`);
                 }
             }
        });
         if (now - this.lastDamageTime >= 1000) this.lastDamageTime = now; // Aggiorna timer DPS
    }

    draw(context) {
        // Disegna un cerchio invece di un rettangolo
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}

// --- Funzione Helper per Applicare Effetti Proiettile ---
function applyProjectileEffect(type, enemy, projectile) {
    if (!enemy || enemy.markedForDeletion) return;

    switch (type) {
        case 'gas':
            console.log("Gas cloud created!");
            // Crea al centro dell'impatto (posizione del proiettile al momento hit)
            effects.push(new GasCloud(projectile.x - GAS_CLOUD_RADIUS, projectile.y - GAS_CLOUD_RADIUS));
            break;
        case 'cocoon':
             enemy.cocoon();
             break;
        case 'petrify':
             enemy.petrify(PETRIFY_DURATION);
            break;
    }
}

// --- Definizione PowerUp ---
const POWERUP_TYPES = {
    // Specifici Carne
    FLESH_REGEN: {
        id: 'flesh_regen', name: "Rigenerazione Accresciuta", boss: 'FleshMass', // chance non più usata qui
        effects: [ // Può avere più effetti
            { type: 'stat_multiplier', stat: 'maxHealth', value: 1.50 }, // +50% Vita Max
            { type: 'stat_add', stat: 'hpRegenRate', value: 5 }        // +5 HP/sec (aggiunto a regen base/temp)
        ]
    },
    FLESH_GAS: {
        id: 'flesh_gas', name: "Proiettili Tossici", boss: 'FleshMass',
        effects: [
            { type: 'projectile_effect_add', effectType: 'gas', chance: 0.20 } // Aggiunge effetto gas ai proiettili
        ]
    },
    // Specifici Ragno
    SPIDER_EVASION: {
        id: 'spider_evasion', name: "Istinto Aracnide", boss: 'Spider',
        effects: [
            { type: 'stat_add', stat: 'evasionChance', value: 0.15 } // +15% Evasione
        ]
     },
    SPIDER_COCOON: {
        id: 'spider_cocoon', name: "Proiettili Immobilizzanti", boss: 'Spider',
        effects: [
             { type: 'projectile_effect_add', effectType: 'cocoon', chance: 0.10 } // Aggiunge effetto cocoon
        ]
    },
    // Generici (Boss-level)
    HP_BOOST_125: {
        id: 'hp_boost_125', name: "Vitalità Aumentata", // No boss key
        effects: [
            { type: 'stat_multiplier', stat: 'maxHealth', value: 1.25 } // +25% Vita Max
        ]
    },
    STAT_BOOST: {
        id: 'stat_boost', name: "Infusione di Mana",
        effects: [
            { type: 'stat_add', stat: 'maxHealth', value: 15 },            // +15 HP
            { type: 'stat_multiplier', stat: 'speed', value: 1.10 },       // +10% Velocità Movimento
            { type: 'stat_multiplier', stat: 'baseFireRateDelay', value: 0.90 } // -10% Delay Base (spara più veloce)
        ]
    },
    DOUBLE_SHOT: {
        id: 'double_shot', name: "Sparo Gemello",
        effects: [ { type: 'flag_set', flag: 'shootDouble', value: true } ]
    },
    PIERCING_SHOT: {
        id: 'piercing_shot', name: "Proiettili Perforanti",
         effects: [ { type: 'flag_set', flag: 'shootPierce', value: true } ]
     },
    COOLDOWN_REDUCTION: {
        id: 'cooldown_reduction', name: "Flusso Accelerato",
        effects: [
            { type: 'stat_multiplier', stat: 'baseDashCooldown', value: 0.90 }, // -10% Cooldown Base Dash
            { type: 'stat_multiplier', stat: 'baseShieldCooldown', value: 0.90 } // -10% Cooldown Base Scudo
        ]
    },
    BLINK_DASH: {
        id: 'blink_dash', name: "Traslazione Istantanea",
        effects: [
             { type: 'flag_set', flag: 'isBlinkDash', value: true }
             // Nota: L'aumento cooldown del blink è gestito a parte in Player.updateCooldownUI/activateDash
        ]
    },
    EXPLOSIVE_SHOT: {
        id: 'explosive_shot', name: "Proiettili Esplosivi",
        effects: [ { type: 'flag_set', flag: 'shootExplosive', value: true } ]
    },
    PETRIFY_SHOT: {
        id: 'petrify_shot', name: "Sguardo Pietrificante",
        effects: [
            { type: 'projectile_effect_add', effectType: 'petrify', chance: 0.05 }
        ]
    },
};

function selectPowerUp(defeatedBoss) {
    const bossType = defeatedBoss.constructor.name.replace('Boss','');
    const specificPool = [];
    const genericPool = [];

    // Popola le pool di powerup specifici e generici
    for (const key in POWERUP_TYPES) {
        const p = POWERUP_TYPES[key];
        if (p.boss === bossType) {
            specificPool.push(p);
        } else if (!p.boss) {
            genericPool.push(p);
        }
        // Ignora i powerup temporanei dei nemici (se fossero nello stesso oggetto)
    }

    console.log(`Selecting powerup for defeated ${bossType}. Specific Pool Size: ${specificPool.length}, Generic Pool Size: ${genericPool.length}`);

    // Tira il dado per il drop specifico
    if (specificPool.length > 0 && Math.random() < BOSS_SPECIFIC_POWERUP_CHANCE) {
        // SUCCESSO SPECIFICO: Scegli a caso tra gli specifici disponibili
        const chosenPowerUp = specificPool[Math.floor(Math.random() * specificPool.length)];
        console.log(`>>> SUCCESS (Specific Roll)! Dropping specific: ${chosenPowerUp.name}`);
        return chosenPowerUp;
    } else {
        // FALLIMENTO SPECIFICO (o no specifici): Scegli a caso tra i generici
        console.log(`Specific roll failed or no specifics available. Dropping a generic powerup.`);
        if (genericPool.length > 0) {
            const chosenPowerUp = genericPool[Math.floor(Math.random() * genericPool.length)];
            console.log(`>>> Dropping generic: ${chosenPowerUp.name}`);
            return chosenPowerUp;
        } else {
            // Caso fallback se non ci sono né specifici né generici (non dovrebbe succedere)
            console.error("Error: No specific or generic powerups available to drop!");
            return null;
        }
    }
}

// --- Classe Base Drop ---
class Drop extends Entity {
    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color);
        this.type = type; // 'health', 'temp_powerup'
        this.creationTime = Date.now();
        this.lifespan = 10000; // I drop scompaiono dopo 10 secondi
        this.vy = 50; // Cade leggermente verso il basso
    }

    update(deltaTime, now) {
        // Cade lentamente
        // this.y += this.vy * deltaTime;

        // --- NUOVO: Scorre a sinistra con la velocità globale ---
        this.x -= GLOBAL_SCROLL_SPEED * deltaTime;

        // Check despawn
        if (now - this.creationTime > this.lifespan) {
            this.markedForDeletion = true;
        }

        // --- NUOVO: Check despawn se esce dallo schermo a sinistra ---
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
            return; // Esce prima se è fuori schermo
        }

        // Impedisci che cada fuori schermo in basso
        if (this.y + this.height > canvas.height) {
             this.y = canvas.height - this.height;
             this.vy = 0; // Ferma la caduta
        }
    }

    // Metodo chiamato quando il giocatore raccoglie il drop
    onCollect(player) {
        console.log(`Collected drop: ${this.type}`);
        this.markedForDeletion = true;
        // La logica specifica è nelle sottoclassi
    }
}

// --- Classe HealthDrop ---
class HealthDrop extends Drop {
    constructor(x, y) {
        super(x, y, 15, 15, 'pink', 'health');
    }

    onCollect(player) {
        super.onCollect(player);
        player.heal(HEALTH_RESTORE_AMOUNT);
    }
}

// --- Classe TempPowerUpDrop ---
class TempPowerUpDrop extends Drop {
    constructor(x, y, powerUpEffect) {
        // Colore basato sull'effetto? Per ora, arancione generico
        super(x, y, 18, 18, 'orange', 'temp_powerup');
        this.powerUpEffect = powerUpEffect; // Oggetto che descrive l'effetto
    }

    onCollect(player) {
        super.onCollect(player);
        // Applica l'effetto temporaneo (gestito dal GameManager o Player?)
        // Usiamo una variabile globale per semplicità ora
        if (activeTempPowerUp) {
            // Se c'è già un powerup, rimuovi l'effetto vecchio prima di applicare il nuovo?
            // O sovrascrivi semplicemente? Sovrascriviamo per ora.
            player.removeTemporaryPowerUp(activeTempPowerUp);
        }
        activeTempPowerUp = this.powerUpEffect;
        tempPowerUpEndTime = Date.now() + this.powerUpEffect.duration;
        player.applyTemporaryPowerUp(this.powerUpEffect);
        tempPowerupDisplay.textContent = `${this.powerUpEffect.name} (${(this.powerUpEffect.duration / 1000).toFixed(0)}s)`;
    }
}

// --- Definizione PowerUp Temporanei da Nemici ---
const ENEMY_POWERUP_TYPES = {
    DOUBLE_DAMAGE: { id: 'temp_double_damage', name: "Danno Raddoppiato", duration: 30000, apply: (p) => { p.tempDamageMultiplier *= 2; }, remove: (p) => { p.tempDamageMultiplier /= 2; } },
    FAST_SHOT: { id: 'temp_fast_shot', name: "Cadenza Aumentata", duration: 20000, apply: (p) => { p.tempFireRateMultiplier *= 0.6; }, remove: (p) => { p.tempFireRateMultiplier /= 0.6; } }, // 40% più veloce
    HP_REGEN: { id: 'temp_hp_regen', name: "Rigenerazione Rapida", duration: 25000, apply: (p) => { p.tempHpRegenRate += 3; }, remove: (p) => { p.tempHpRegenRate -= 3; } }, // +3 HP/sec extra
};


function createFloatingText(text, x, y, color) {
    floatingTexts.push({
        text: text,
        x: x, // Posizione iniziale (es. centro x del player)
        y: y, // Posizione iniziale (es. bordo superiore del player)
        color: color,
        creationTime: Date.now(),
        duration: FLOATING_TEXT_DURATION,
        speed: FLOATING_TEXT_SPEED,
        opacity: 1, // Opacità iniziale (1 = visibile)
        markedForDeletion: false
    });
}

/**
 * Disegna le barre di Vita e Mana del giocatore sul canvas.
 * @param {CanvasRenderingContext2D} ctx Il contesto 2D del canvas.
 * @param {Player} player L'oggetto giocatore.
 */
function drawPlayerUI(ctx, player) {
    // Dimensioni e Posizionamento (Alto a Destra)
    const barWidth = 150;    // Larghezza delle barre
    const barHeight = 18;     // Altezza delle barre
    const padding = 10;       // Distanza dai bordi del canvas
    const spacing = 8;        // Spazio verticale tra le due barre
    const x = padding; // Posizione X (uguale per entrambe)
    const healthY = padding; // Posizione Y della barra vita
    const manaY = healthY + barHeight + spacing; // Posizione Y della barra mana

    // Stile Testo Comune
    ctx.fillStyle = 'white';            // Colore testo
    ctx.font = 'bold 12px sans-serif';  // Font (grassetto, dimensione, famiglia)
    ctx.textAlign = 'center';           // Allineamento orizzontale testo
    ctx.textBaseline = 'middle';        // Allineamento verticale testo (al centro della barra)

    // --- Barra Vita ---
    // Percentuale di vita (assicurati sia tra 0 e 1)
    const healthPercent = Math.max(0, player.health) / player.maxHealth;
    // Testo da visualizzare (vita arrotondata)
    const currentHealth = Math.round(Math.max(0, player.health)); // Mostra 0 se negativo
    const healthText = `${currentHealth} / ${player.maxHealth}`;
    // Disegna sfondo barra (rosso scuro)
    ctx.fillStyle = '#660000'; // Un rosso scuro per lo sfondo
    ctx.fillRect(x, healthY, barWidth, barHeight);
    // Disegna barra vita attuale (rosso brillante)
    ctx.fillStyle = '#FF1111'; // Un rosso acceso
    ctx.fillRect(x, healthY, barWidth * healthPercent, barHeight); // Larghezza proporzionale
    // Disegna testo sopra la barra
    ctx.fillStyle = 'white';
    ctx.fillText(healthText, x + barWidth / 2, healthY + barHeight / 2);


    // --- Barra Mana ---
    // Percentuale di mana
    const manaPercent = player.mana / player.maxMana;
    // Testo da visualizzare
    const manaText = `${player.mana} / ${player.maxMana}`;
    // Disegna sfondo barra (blu scuro)
    ctx.fillStyle = '#000066'; // Un blu scuro per lo sfondo
    ctx.fillRect(x, manaY, barWidth, barHeight);
    // Disegna barra mana attuale (blu brillante)
    ctx.fillStyle = '#3399FF'; // Un blu/azzurro acceso
    ctx.fillRect(x, manaY, barWidth * manaPercent, barHeight); // Larghezza proporzionale
    // Disegna testo sopra la barra
    ctx.fillStyle = 'white';
    ctx.fillText(manaText, x + barWidth / 2, manaY + barHeight / 2);

    // È buona norma resettare alcuni stati del contesto se potrebbero interferire altrove
    ctx.textAlign = 'left'; // Resetta allineamento testo orizzontale
    ctx.textBaseline = 'alphabetic'; // Resetta allineamento testo verticale
}

/**
 * Disegna le icone per Dash e Scudo sul canvas.
 * @param {CanvasRenderingContext2D} ctx Il contesto 2D del canvas.
 * @param {Player} player L'oggetto giocatore.
 * @param {number} now Il timestamp attuale (Date.now() o logicNow da gameLoop).
 */
function drawAbilityUI(ctx, player, now) {
    // --- Configurazione Icone ---
    const iconSize = 40;     // Dimensione di ogni icona quadrata
    const padding = 10;      // Distanza dal bordo inferiore
    const spacing = 15;      // Spazio orizzontale tra le icone
    const y = padding; // Posizione Y (uguale per entrambe)

    // Calcola posizione X per centrare le due icone in basso
    const totalWidth = (iconSize * 2) + spacing;
    const startX = 150 + padding*3 ;
    const dashX = startX;
    const shieldX = startX + iconSize + spacing;

    // --- Stili Cooldown Text ---
    const cooldownFont = 'bold 16px sans-serif';
    const cooldownTextColor = 'white';
    const activeColorShield = 'cyan'; // Colore bordo scudo attivo

    ctx.save(); // Salva stato contesto

    // --- Icona DASH ---
    const actualDashCooldown = player.isBlinkDash ? player.dashCooldown + BLINK_DASH_COOLDOWN_INCREASE : player.dashCooldown;
    const dashCDRemaining = Math.max(0, actualDashCooldown - (now - player.lastDashTime));
    const isDashOnCooldown = dashCDRemaining > 0;

    // Disegna Immagine Dash (se caricata)
    if (dashIconImage.complete && dashIconImage.naturalWidth > 0) {
        ctx.drawImage(dashIconImage, dashX, y, iconSize, iconSize);

        // Applica Effetto Grayscale se in Cooldown
        if (isDashOnCooldown) {
            ctx.globalCompositeOperation = 'saturation'; // Imposta la modalità di composizione
            ctx.fillStyle = 'hsl(0, 0%, 40%)';        // Imposta la saturazione a 0 (scala di grigi), 40% luminosità
            ctx.fillRect(dashX, y, iconSize, iconSize); // Applica l'effetto sull'area dell'immagine
            ctx.globalCompositeOperation = 'source-over'; // Reimposta la modalità di default
        }
    } else {
        // Fallback: Disegna un quadrato se l'immagine non è pronta
        ctx.fillStyle = '#888'; // Grigio fallback
        ctx.fillRect(dashX, y, iconSize, iconSize);
        ctx.strokeRect(dashX, y, iconSize, iconSize); // Bordo
    }

    // Disegna Testo Cooldown (SOPRA l'immagine/fallback)
    if (isDashOnCooldown) {
        ctx.fillStyle = cooldownTextColor;
        ctx.font = cooldownFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = (dashCDRemaining / 1000).toFixed(1);
        ctx.fillText(text, dashX + iconSize / 2, y + iconSize / 2);
    }

    // --- Icona SCUDO ---
    const shieldCDRemaining = Math.max(0, player.shieldCooldown - (now - player.lastShieldTime));
    const isShieldActive = player.isShieldActive;
    const isShieldOnCooldown = shieldCDRemaining > 0 && !isShieldActive; // In cooldown solo se CD > 0 E NON è attivo

    // Disegna Immagine Scudo (se caricata)
    if (shieldIconImage.complete && shieldIconImage.naturalWidth > 0) {
        ctx.drawImage(shieldIconImage, shieldX, y, iconSize, iconSize);

        // Applica Effetto Grayscale se in Cooldown
        if (isShieldOnCooldown) {
            ctx.globalCompositeOperation = 'saturation';
            ctx.fillStyle = 'hsl(0, 0%, 40%)';
            ctx.fillRect(shieldX, y, iconSize, iconSize);
            ctx.globalCompositeOperation = 'source-over'; // Reset
        }

        // Aggiungi un bordo colorato se lo scudo è ATTIVO
        if (isShieldActive) {
            ctx.strokeStyle = activeColorShield; // Ciano brillante
            ctx.lineWidth = 3; // Bordo più spesso
            // Disegna un rettangolo leggermente interno per non sovrapporsi troppo al bordo nero base
            ctx.strokeRect(shieldX + 1.5, y + 1.5, iconSize - 3, iconSize - 3);
            ctx.lineWidth = 1; // Resetta lo spessore della linea
        }

    } else {
        // Fallback: Disegna un quadrato se l'immagine non è pronta
        ctx.fillStyle = '#888'; // Grigio fallback
        ctx.fillRect(shieldX, y, iconSize, iconSize);
        ctx.strokeRect(shieldX, y, iconSize, iconSize); // Bordo
    }

    // Disegna Testo Cooldown (SOPRA l'immagine/fallback)
    if (isShieldOnCooldown) {
        ctx.fillStyle = cooldownTextColor;
        ctx.font = cooldownFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = (shieldCDRemaining / 1000).toFixed(1);
        ctx.fillText(text, shieldX + iconSize / 2, y + iconSize / 2);
    } else if (isShieldActive) {
        // Mostra DURATA ATTIVA rimanente solo se è attivo
        const shieldActiveRemaining = Math.max(0, player.shieldEndTime - now);
        ctx.fillStyle = 'cyan'; // Testo bianco su sfondo attivo (ciano/blu)
        ctx.font = cooldownFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = (shieldActiveRemaining / 1000).toFixed(1); // Calcola e formatta durata attiva
        ctx.fillText(text, shieldX + iconSize / 2, y + iconSize / 2);
    }

    ctx.restore(); // Ripristina stato contesto
}

// --- Funzioni di Gioco Principali ---
function initGame() {
    keys = {};
    projectiles = [];
    enemyProjectiles = [];
    enemies = [];
    particles = [];
    effects = [];
    currentBoss = null;
    floatingTexts = []; // Resetta i testi fluttuanti

    drops = []; // Resetta array drops
    activeTempPowerUp = null; // Resetta powerup temporaneo attivo
    tempPowerUpEndTime = 0;

    player = new Player(50, canvas.height / 2 - 15);

    player.initUI(); // Questo ora aggiorna anche la lista dei perm powerup
    
    gameManager = new GameManager(levelConfigs); // GameManager già gestisce livelli gioco

    gameManager.startLevel(0);

    lastTime = 0;
    gameRunning = true;

    // Aggiorna UI iniziale (ora include XP e Livello Player)
    player.initUI(); // Metodo helper per inizializzare UI del player
    ultimateManaCostDisplay.textContent = ULTIMATE_MANA_COST;
    powerupDisplay.textContent = "Nessuno";
    levelDisplay.textContent = gameManager.currentLevelConfig.level; // Livello del gioco

    console.log("Game Initialized.");
    // Riavvia il loop se non già attivo
    // requestAnimationFrame(gameLoop); // Commentato perchè viene chiamato sotto
}

// Il Game Loop principale
function gameLoop(timestamp) {
        if (!gameRunning) return;

    // USA SEMPRE Date.now() PER LA LOGICA DI GIOCO (COOLDOWN, TIMER)
    const logicNow = Date.now();

    // Calcola deltaTime usando i timestamp assoluti per coerenza
    // Gestisci il primo frame dove lastTime è 0
    if (lastTime === 0) {
        lastTime = logicNow - 16; // Stima frame precedente per evitare deltaTime enorme
    }
    const deltaTime = Math.min((logicNow - lastTime) / 1000, 0.1); // Usa logicNow per calcolare deltaTime
    lastTime = logicNow; // Aggiorna lastTime con il timestamp assoluto

    // 1. Pulisci Canvas e Disegna Sfondo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gameManager.currentLevelConfig.background || 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Controlla scadenza PowerUp Temporaneo da Nemici
    if (activeTempPowerUp && logicNow >= tempPowerUpEndTime) {
        console.log(`Temporary power-up expired: ${activeTempPowerUp.name}`);
        player.removeTemporaryPowerUp(activeTempPowerUp); // Rimuovi effetto
        activeTempPowerUp = null;
        tempPowerUpEndTime = 0;
        tempPowerupDisplay.textContent = 'Nessuno'; // Aggiorna UI
    }

    // Controlla scadenza PowerUp Boss (dal gameManager)
    if (gameManager.activePowerUp && logicNow >= gameManager.powerUpEndTime) {
        gameManager.clearPowerUp(); // Usa il metodo del manager per pulire
    }

    // 2. Aggiorna Entità e Stato passando logicNow (tempo assoluto)
    //    dove serve per i confronti temporali
    gameManager.update(deltaTime, logicNow); // Passa logicNow a gameManager
    player.update(deltaTime, keys, canvas.width, canvas.height, logicNow); // Passa logicNow a player
    enemies.forEach(e => e.update(deltaTime, logicNow)); // Passa logicNow ai nemici
    if (currentBoss && gameManager.isBossActive) {
        currentBoss.update(deltaTime, logicNow); // Passa logicNow al boss
    }
    effects.forEach(e => e.update(deltaTime, logicNow)); // Passa logicNow agli effetti (es. GasCloud)

    // Aggiornamenti che probabilmente usano solo deltaTime o il loro tempo interno
    projectiles.forEach(p => p.update(deltaTime));
    enemyProjectiles.forEach(p => p.update(deltaTime));
    particles.forEach(p => p.update(deltaTime)); // Particle usa il suo creationTime interno


    drops.forEach(d => d.update(deltaTime, logicNow));


     // --- AGGIORNA TESTI FLUTTUANTI ---
     floatingTexts.forEach(ft => {
        ft.y -= ft.speed * deltaTime; // Muovi verso l'alto
        const elapsedTime = logicNow - ft.creationTime;
        if (elapsedTime >= ft.duration) {
            ft.markedForDeletion = true; // Marca per rimozione se la durata è scaduta
        } else {
            // Calcola opacità per l'effetto fade-out (da 1 a 0)
            ft.opacity = 1 - (elapsedTime / ft.duration);
        }
    });

    // 3. Gestisci Collisioni
    handleCollisions();

    // 4. Rimuovi Entità Marcate
    // ... (codice rimozione invariato) ...
    enemies = enemies.filter(e => !e.markedForDeletion);
    projectiles = projectiles.filter(p => !p.markedForDeletion);
    enemyProjectiles = enemyProjectiles.filter(e => !e.markedForDeletion);
    particles = particles.filter(p => !p.isExpired());
    effects = effects.filter(e => !e.markedForDeletion);
    drops = drops.filter(d => !d.markedForDeletion); // Rimuovi drops raccolti/scaduti
    floatingTexts = floatingTexts.filter(ft => !ft.markedForDeletion);

    // 5. Disegna Tutto
    // ... (codice disegno invariato) ...
    
    if (player) { // Disegna solo se il giocatore esiste
        drawPlayerUI(ctx, player);
        drawAbilityUI(ctx, player, logicNow); // Passa il contesto, il player e il tempo attuale

     }
    
    effects.forEach(e => e.draw(ctx));
    enemies.forEach(e => e.draw(ctx));
    if (currentBoss) currentBoss.draw(ctx);
    player.draw(ctx);
    projectiles.forEach(p => p.draw(ctx));
    enemyProjectiles.forEach(p => p.draw(ctx));
    drops.forEach(d => d.draw(ctx));
    particles.forEach(p => p.draw(ctx));



     // --- DISEGNA TESTI FLUTTUANTI ---
     ctx.save(); // Salva lo stato corrente del contesto (importante per globalAlpha)
     ctx.textAlign = 'center'; // Allinea il testo al centro rispetto a ft.x
     ctx.font = 'bold 14px sans-serif'; // Imposta il font
     floatingTexts.forEach(ft => {
         ctx.globalAlpha = Math.max(0, ft.opacity); // Applica l'opacità calcolata (max(0,...) evita valori negativi)
         ctx.fillStyle = ft.color; // Imposta il colore del testo
         ctx.fillText(ft.text, ft.x, ft.y); // Disegna il testo
     });
     ctx.restore(); // Ripristina lo stato del contesto (incluso globalAlpha a 1)
     // --------------------------------

    // --- NUOVO: Disegna Notifica Temporanea ---
    if (notificationMessage && logicNow < notificationEndTime) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Sfondo scuro semi-trasparente
        ctx.fillRect(canvas.width / 2 - 200, canvas.height - 60, 400, 40); // Posizione in basso al centro
        ctx.fillStyle = 'gold';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(notificationMessage, canvas.width / 2, canvas.height - 35);
        ctx.textAlign = 'left'; // Reset alignment
    }

    // --- DEBUG: Controllo finale in gameLoop ---
    // if (isNaN(player.health)) {
    //     console.error("ERRORE: player.health è NaN nel gameLoop prima dell'aggiornamento UI!");
    //     // Potresti forzare un reset qui come misura estrema
    //     // player.health = player.maxHealth || 100;
    // }
    // --- FINE DEBUG ---

    // 6. Aggiorna UI Generale (invariato)

    // -- NUOVO: Aggiorna UI Timer Buff --
    // PowerUp Boss
    // if (gameManager.activePowerUp) {
    //     const remainingMs = gameManager.powerUpEndTime - logicNow;
    //     const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
    //     powerupDisplay.textContent = `${gameManager.activePowerUp.name} (${remainingSec}s)`;
    // } else {
    //     powerupDisplay.textContent = "Nessuno";
    // }
    // PowerUp Temporaneo da Nemici
    if (activeTempPowerUp) {
        const remainingMs = tempPowerUpEndTime - logicNow;
        const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
        tempPowerupDisplay.textContent = `${activeTempPowerUp.name} (${remainingSec}s)`;
    } else {
        tempPowerupDisplay.textContent = "Nessuno";
    }


    // 7. Richiedi Prossimo Frame
    requestAnimationFrame(gameLoop);
}


// --- Funzione Gestione Collisioni ---
function handleCollisions() {
    // a) Proiettili Giocatore vs Nemici/Boss
    projectiles.forEach(p => {
        if (p.markedForDeletion) return;
    
        // --- FILTRO CORRETTO ---
        // Combina tutti i possibili bersagli (nemici + boss attivo)
        const potentialTargets = [...enemies, currentBoss];
        // Filtra solo per esistenza e non marcato per delezione
        const targets = potentialTargets.filter(e => e && !e.markedForDeletion);
        // ------------------------
    
        for (const target of targets) {
            if (p.enemiesHit.includes(target)) continue; // Gestione piercing
    
            if (checkCollision(p, target)) {
                target.takeDamage(p.damage);
                p.onHit(target);
                p.enemiesHit.push(target);
    
                if (p.markedForDeletion && !p.piercing) break;
            }
        }
    });

    // b) Proiettili Nemici vs Giocatore
    enemyProjectiles.forEach(ep => {
        if (ep.markedForDeletion) return;
        if (checkCollision(ep, player)) {
            ep.markedForDeletion = true; // Proiettile nemico scompare all'hit
            player.takeDamage(ep.damage, ep); // Passa proiettile come source
        }
    });

    // c) Giocatore vs Nemici/Boss (Collisione fisica)
    const potentialCollisionTargets = [...enemies, currentBoss];
    const collisionTargets = potentialCollisionTargets.filter(e => e && !e.markedForDeletion);

    // --------------------------------

    collisionTargets.forEach(target => {
        // Controlla collisione generica (ma ignora se player sta dashando qui, gestito dopo)
        if (!player.isShieldActive && !player.isDashing && checkCollision(player, target)) {
    
            // --- CONTROLLA PRIMA I CASI SPECIFICI ---
    
            if (target instanceof KamikazeEnemy && target.state === 'dashing') {
                // --- COLLISIONE CON KAMIKAZE IN CARICA ---
                console.log(`Collision with Dashing Kamikaze!`);
                const kamikazeDamage = 30; // Danno elevato!
                player.takeDamage(kamikazeDamage, target);
                target.die(); // Kamikaze si distrugge e rilascia XP/drop
    
            } else if (target instanceof Boss) {
                // --- COLLISIONE CON BOSS (Rimbalzo) ---
                console.log(`Collision with Boss: ${target.bossName}! Bouncing player back.`);
                player.takeDamage(5, target.bossName)
                // Respingi il giocatore (logica di rimbalzo invariata)
                const dx = player.x + player.width / 2 - (target.x + target.width / 2);
                const dy = player.y + player.height / 2 - (target.y + target.height / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);
                const bounceDistance = 30;
                if (dist > 0) {
                    const moveX = (dx / dist) * bounceDistance;
                    const moveY = (dy / dist) * bounceDistance;
                    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x + moveX));
                    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y + moveY));
                } else {
                    player.x = Math.max(0, player.x - bounceDistance);
                }
    
            } else if (target instanceof Enemy) {
                // --- COLLISIONE CON NEMICO NORMALE (NON BOSS, NON KAMIKAZE IN CARICA) ---
                console.log(`Collision with Enemy: ${target.constructor.name}! Enemy destroyed.`);
                player.takeDamage(5, target); // Danno minimo
                target.die(); // Distruggi nemico, assegna XP/drop
            }
    
        } // <- Fine blocco if (!player.isShieldActive && !player.isDashing && checkCollision(player, target))
    
        // Gestione collisione specifica: Player che dashsa CONTRO un Kamikaze in carica
        // Questa può rimanere separata o essere integrata, ma lasciamola per ora
        // perché richiede che il *player* stia dashando.
        if (player.isDashing && target instanceof KamikazeEnemy && target.state === 'dashing' && checkCollision(player, target)) {
             console.log("Player dashed into Dashing Kamikaze!");
             target.takeDamage(50); // Danno al kamikaze
             player.takeDamage(25, target); // Danno anche al player
             target.markedForDeletion = true;
        }
    
    }); // <- Fine forEach(target => ...)

     // d) Giocatore vs Effetti (Nuvola Gas) - Gestito dentro GasCloud.update()

      // --- NUOVA Collisione d) Player vs Drops ---
    drops.forEach(drop => {
        if (drop.markedForDeletion) return;
        if (checkCollision(player, drop)) {
            drop.onCollect(player); // Chiama il metodo onCollect del drop specifico
        }
    });
}


// --- Gestione Input ---
window.addEventListener('keydown', (e) => { /* ... (invariato) ... */
    keys[e.key.toLowerCase()] = true;
    if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
});
window.addEventListener('keyup', (e) => { /* ... (invariato) ... */
    keys[e.key.toLowerCase()] = false;

    if (e.key.toLowerCase() === ' ' && player) { // Assicurati che 'player' esista
        player.canActivateUltimate = true;
        // console.log("Ultimate può essere riattivata (Spazio rilasciato)."); // Log di debug opzionale
    }
});

// --- Avvio del Gioco ---
initGame(); // Chiama la funzione per inizializzare tutto
requestAnimationFrame(gameLoop); // Avvia il loop

console.log("Game script loaded and initialized.");