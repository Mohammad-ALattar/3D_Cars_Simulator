import * as THREE from "three";

export const applyOpacityToMaterial = (
  material: THREE.Material | THREE.Material[],
  opacity: number
) => {
  if (Array.isArray(material)) {
    material.forEach((mat) => {
      if ("opacity" in mat) {
        mat.opacity = opacity;
        mat.transparent = true;
        mat.needsUpdate = true;
      }
    });
  } else if ("opacity" in material) {
    material.opacity = opacity;
    material.transparent = true;
    material.needsUpdate = true;
  }
};

export const getCarColor = (colorId: string): string => {
  const colorMap: Record<string, string> = {
    red: "#ff2800",
    blue: "#003366",
    green: "#004225",
    black: "#000000",
    white: "#f8f8ff",
    silver: "#c0c0c0",
    gray: "#2C3539",
    yellow: "#ffff00",
    orange: "#f97316",
    purple: "#6e59a5",
  };

  console.log(
    `Getting color for ID: ${colorId}, mapped to: ${
      colorMap[colorId] || "#c10000"
    }`
  );
  return colorMap[colorId] || "#c10000";
};

/**
 * Calculate window opacity based on tint percentage
 * CORRECTED MAPPING:
 * 0% tint -> 1.0 opacity (completely transparent)
 * 100% tint -> 0.1 opacity (nearly opaque)
 *
 * @param tintPercent
 * @param isWindshield
 * @returns
 */
export const calculateWindowOpacity = (
  tintPercent: number,
  isWindshield: boolean = false
): number => {
  if (tintPercent === 0) {
    console.log("0% tint -> 1.0 opacity (completely transparent)");
    return 1.0;
  }

  if (tintPercent === 100) {
    const opacityValue = isWindshield ? 0.7 : 0.1;
    console.log(`100% tint -> ${opacityValue} opacity (nearly opaque)`);
    return opacityValue;
  }

  const baseOpacity = 1.0 - tintPercent * 0.009;
  if (isWindshield && tintPercent > 30) {
    const windshieldOpacity = Math.max(0.7, baseOpacity);
    console.log(
      `Windshield with ${tintPercent}% tint -> ${windshieldOpacity} opacity`
    );
    return windshieldOpacity;
  }

  console.log(
    `Regular window with ${tintPercent}% tint -> ${baseOpacity} opacity`
  );
  return baseOpacity;
};

// Environment map loader for reflections
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMap = cubeTextureLoader.load([
  "/px.jpg",
  "/nx.jpg",
  "/py.jpg",
  "/ny.jpg",
  "/pz.jpg",
  "/nz.jpg",
]);

export function createCarPaintMaterial(
  colorId: string
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(getCarColor(colorId)),
    metalness: 1.0,
    roughness: 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 1.0,
    envMap,
    envMapIntensity: 1.5,
  });
}
