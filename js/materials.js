import * as THREE from 'three';

// Shared materials object
export const mats = {
    // Floor material: light gray glossy
    floor: new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.1,
        roughness: 0.3,
    }),

    // Wall material: dark wall
    wall: new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0,
        roughness: 0.8,
    }),

    // Ceiling material: dark ceiling
    ceiling: new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0,
        roughness: 0.9,
    }),
};

// Utility function to create a box geometry
export function createBox(width, height, depth) {
    return new THREE.BoxGeometry(width, height, depth);
}

// Utility function to create a plane geometry
export function createPlane(width, height) {
    return new THREE.PlaneGeometry(width, height);
}

// Utility function to create a cylinder geometry
export function createCylinder(radiusTop, radiusBottom, height, segments = 32) {
    return new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments);
}

// Utility function to create a sphere geometry
export function createSphere(radius, widthSegments = 32, heightSegments = 32) {
    return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
}