import * as THREE from "three";

export const createWindshieldMaterial = (tintPercent: number) => {
  let opacity;

  if (tintPercent === 0) {
    opacity = 1.0;
  } else if (tintPercent === 100) {
    opacity = 0.7;
  } else {
    opacity = Math.max(0.7, 1.0 - tintPercent * 0.009);
  }

  console.log(
    "WINDSHIELD MATERIAL - Tint:",
    tintPercent,
    "% -> Opacity:",
    opacity
  );

  return new THREE.MeshPhysicalMaterial({
    color: 0x444444,
    metalness: 0.0,
    roughness: 0.1,
    transmission: 0.9,
    transparent: true,
    opacity: opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
};

export const createRearWindowMaterial = (tintPercent: number) => {
  let opacity;
  if (tintPercent === 0) {
    opacity = 1.0;
  } else if (tintPercent === 100) {
    opacity = 0.1;
  } else {
    opacity = 1.0 - tintPercent * 0.009;
  }

  console.log(
    "REAR WINDOW MATERIAL - Tint:",
    tintPercent,
    "% -> Opacity:",
    opacity
  );

  return new THREE.MeshPhysicalMaterial({
    color: 0x444444,
    metalness: 0.2,
    roughness: 0.2,
    transmission: 0.9,
    transparent: true,
    opacity: opacity,
    side: THREE.DoubleSide,
  });
};
