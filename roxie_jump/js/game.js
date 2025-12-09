// main.js - Point d'entrée Vite
import * as THREE from "three";

// ==========================================
// ROXIE JUMP - Jeu 3D en Three.js (Vite version)
// ==========================================

// ─── SETUP INITIAL ───
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Configuration du renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x050a15);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement); // Ajoute le canvas au DOM

// Position de la caméra
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// ─── LUMIÈRE ───
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// ─── CRÉER ROXIE (Le personnage) ───
const roxieGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const roxieMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    metalness: 0.5,
    roughness: 0.3,
});
const roxie = new THREE.Mesh(roxieGeometry, roxieMaterial);
roxie.castShadow = true;
roxie.position.y = 2;
scene.add(roxie);

// ─── CRÉER LES PLATEFORMES ───
const platforms = [];
let highestPlatformY = 0;

function createPlatform(x, y, z) {
    const platformGeometry = new THREE.BoxGeometry(1.5, 0.3, 1.5);
    const colors = [0x8338ec, 0x00d4ff, 0xff006e, 0x3a86ff];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const platformMaterial = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.4,
        roughness: 0.6,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(x, y, z);
    platform.castShadow = true;
    platform.receiveShadow = true;
    return platform;
}

function generateInitialPlatforms() {
    const startPlatform = createPlatform(0, -1, 0);
    scene.add(startPlatform);
    platforms.push(startPlatform);
    highestPlatformY = -1;

    for (let i = 1; i <= 10; i++) {
        const x = (Math.random() - 0.5) * 4;
        const y = -1 + i * 1.5;
        const z = (Math.random() - 0.5) * 0.5;
        const platform = createPlatform(x, y, z);
        scene.add(platform);
        platforms.push(platform);
        highestPlatformY = y;
    }
}

function generateMorePlatforms() {
    if (roxie.position.y > highestPlatformY - 5) {
        const x = (Math.random() - 0.5) * 4;
        const y = highestPlatformY + 1.5;
        const z = (Math.random() - 0.5) * 0.5;
        const platform = createPlatform(x, y, z);
        scene.add(platform);
        platforms.push(platform);
        highestPlatformY = y;
    }
}

function cleanOldPlatforms() {
    for (let i = platforms.length - 1; i >= 0; i--) {
        if (platforms[i].position.y < roxie.position.y - 10) {
            scene.remove(platforms[i]);
            platforms.splice(i, 1);
        }
    }
}

generateInitialPlatforms();

// ─── VARIABLES DE JEU ───
const roxieState = {
    velocity: 0,
    isJumping: false,
    score: 0,
    gameOver: false,
};

// ─── GESTION DES ENTRÉES ───
const keys = {
    left: false,
    right: false,
    space: false,
};

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
    if (e.key === " ") keys.space = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
    if (e.key === " ") keys.space = false;
});

// ─── PHYSIQUE ───
const gravity = -0.008;
const moveSpeed = 0.1;
const jumpForce = 0.15;

function updatePhysics() {
    roxieState.velocity += gravity;
    roxie.position.y += roxieState.velocity;

    if (keys.left) roxie.position.x -= moveSpeed;
    if (keys.right) roxie.position.x += moveSpeed;

    if (roxie.position.x < -3) roxie.position.x = -3;
    if (roxie.position.x > 3) roxie.position.x = 3;

    generateMorePlatforms();
    cleanOldPlatforms();

    // Collisions
    let isOnPlatform = false;
    platforms.forEach((platform) => {
        const platformTop = platform.position.y + 0.15;
        const isAbovePlatform =
            roxie.position.x > platform.position.x - 0.75 &&
            roxie.position.x < platform.position.x + 0.75 &&
            roxie.position.z > platform.position.z - 0.75 &&
            roxie.position.z < platform.position.z + 0.75;

        if (
            roxie.position.y >= platformTop - 0.3 &&
            roxie.position.y <= platformTop + 0.3 &&
            roxieState.velocity < 0 &&
            isAbovePlatform
        ) {
            roxieState.velocity = jumpForce;
            isOnPlatform = true;
            roxieState.score++;
            updateUI();
        }
    });

    if (roxie.position.y < -5) {
        roxieState.gameOver = true;
        showGameOver();
    }
}

// ─── ANIMATION ROXIE ───
let rotationSpeed = 0.02;
function animateRoxie() {
    roxie.rotation.x += rotationSpeed;
    roxie.rotation.z += rotationSpeed;
}

// ─── UI ───
function updateUI() {
    document.getElementById("score").textContent = `Score: ${roxieState.score}`;
}

function showGameOver() {
    document.getElementById("gameOverScreen").style.display = "block";
    document.getElementById(
        "finalScore"
    ).textContent = `Score: ${roxieState.score}`;
}

// ─── BOUCLE DE JEU ───
function animate() {
    requestAnimationFrame(animate);

    if (!roxieState.gameOver) {
        updatePhysics();
        animateRoxie();
    }

    // Suivre Roxie avec la caméra
    camera.position.y = roxie.position.y + 2;
    camera.lookAt(roxie.position.x, roxie.position.y, roxie.position.z);

    renderer.render(scene, camera);
}

animate();

// ─── GESTION REDIMENSIONNEMENT ───
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
