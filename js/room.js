import * as THREE from 'three';
import { mats, createBox, createPlane } from './materials.js';

export class Room {
    constructor(scene) {
        this.scene = scene;
        this.objects = [];
        this.init();
    }

    init() {
        // Room dimensions
        const width = 10;
        const depth = 8;
        const height = 3.2;

        // Create floor (10 × 8 at y=0)
        const floorGeom = createPlane(width, depth);
        const floor = new THREE.Mesh(floorGeom, mats.floor);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        floor.castShadow = true;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.objects.push(floor);

        // Create walls
        // Back wall
        const backWallGeom = createBox(width, height, 0.1);
        const backWall = new THREE.Mesh(backWallGeom, mats.wall);
        backWall.position.set(0, height / 2, -depth / 2);
        backWall.castShadow = true;
        backWall.receiveShadow = true;
        this.scene.add(backWall);
        this.objects.push(backWall);

        // Front wall
        const frontWallGeom = createBox(width, height, 0.1);
        const frontWall = new THREE.Mesh(frontWallGeom, mats.wall);
        frontWall.position.set(0, height / 2, depth / 2);
        frontWall.castShadow = true;
        frontWall.receiveShadow = true;
        this.scene.add(frontWall);
        this.objects.push(frontWall);

        // Left wall
        const leftWallGeom = createBox(0.1, height, depth);
        const leftWall = new THREE.Mesh(leftWallGeom, mats.wall);
        leftWall.position.set(-width / 2, height / 2, 0);
        leftWall.castShadow = true;
        leftWall.receiveShadow = true;
        this.scene.add(leftWall);
        this.objects.push(leftWall);

        // Right wall
        const rightWallGeom = createBox(0.1, height, depth);
        const rightWall = new THREE.Mesh(rightWallGeom, mats.wall);
        rightWall.position.set(width / 2, height / 2, 0);
        rightWall.castShadow = true;
        rightWall.receiveShadow = true;
        this.scene.add(rightWall);
        this.objects.push(rightWall);

        // Create ceiling
        const ceilingGeom = createPlane(width, depth);
        const ceiling = new THREE.Mesh(ceilingGeom, mats.ceiling);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = height;
        ceiling.castShadow = true;
        ceiling.receiveShadow = true;
        this.scene.add(ceiling);
        this.objects.push(ceiling);

        // Add lighting
        this.addLighting();
    }

    addLighting() {
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 20;
        this.scene.add(directionalLight);
    }

    getObjects() {
        return this.objects;
    }
}