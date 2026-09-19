import * as THREE from 'three';
import { Room } from './room.js';

// Initialize scene, camera, and renderer
const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05060a);

// Camera setup: PerspectiveCamera at (0, 1.75, 4.6) looking at (0, 1, -1.4)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.75, 4.6);
camera.lookAt(0, 1, -1.4);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowShadowMap;

// Create room
const room = new Room(scene);

// Simple input handling
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    requestAnimationFrame(render);
});

// Render loop
let lastRenderTime = 0;
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

// Hide loading screen and start rendering
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
    render();
});

// Handle initial render in case load event doesn't fire
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
        render();
    }
}, 100);