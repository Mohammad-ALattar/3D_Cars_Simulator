
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createSideWindowShaderMaterial } from '@/utils/tint';

interface WindowElements {
  windshield?: THREE.Mesh;
  rear?: THREE.Mesh;
  sideWindows?: THREE.Mesh[];
}

interface FoundWindows {
  frontWindshield: string[];
  rearWindow: string[];
  sideWindows: string[];
}

interface UseWindowElementsProps {
  scene: THREE.Group;
  frontTintPercent: number;
  frontSideTintPercent: number;
  rearSideTintPercent: number;
  backTintPercent: number;
  carColor: THREE.Color;
  windshieldTint?: boolean;
  vehicleType: "SEDAN" | "SUV" | "PICKUP";
}

export const useWindowElements = ({
  scene,
  frontTintPercent,
  frontSideTintPercent,
  rearSideTintPercent,
  backTintPercent,
  carColor,
  windshieldTint = true,
  vehicleType
}: UseWindowElementsProps) => {
  const windowElements = useRef<WindowElements>({
    sideWindows: []
  });
  const originalMaterials = useRef<Map<THREE.Mesh, THREE.Material | THREE.Material[]>>(new Map());

  const foundWindows = useRef<FoundWindows>({
    frontWindshield: [],
    rearWindow: [],
    sideWindows: []
  });

  useEffect(() => {
    windowElements.current = {
      sideWindows: []
    };
    originalMaterials.current.clear();
    foundWindows.current = {
      frontWindshield: [],
      rearWindow: [],
      sideWindows: []
    };

    if (vehicleType == "SEDAN") {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshName = child.name;

          // Cache original material
          if (!originalMaterials.current.has(child)) {
            originalMaterials.current.set(child, child.material.clone());
          }

          if (meshName === "Body-GlassWindsTexture001" || meshName === "Body-GlassWindsTexture002") {
            // Front side windows
            windowElements.current.sideWindows?.push(child);
            foundWindows.current.sideWindows.push(meshName);
            child.material = createSideWindowShaderMaterial(frontSideTintPercent, frontSideTintPercent);
            return;
          }

          if (meshName === "Body-GlassWindsTexture005_2" || meshName === "Body-GlassWindsTexture006" ||
            meshName === "Body-GlassWindsTexture007" || meshName === "Body-GlassWindsTexture004" || meshName === "Body-GlassWindsTexture") {
            // Rear side windows
            windowElements.current.sideWindows?.push(child);
            foundWindows.current.sideWindows.push(meshName);
            child.material = createSideWindowShaderMaterial(rearSideTintPercent, rearSideTintPercent);
            return;
          }

          if (meshName === "Body-GlassWindsTexture003") {
            windowElements.current.sideWindows?.push(child);
            foundWindows.current.sideWindows.push(meshName);
            child.material = createSideWindowShaderMaterial(frontTintPercent, frontTintPercent);
            return;
          }
        }
      });
    }
    if (vehicleType == "PICKUP") {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshName = child.name;

          // Cache original material
          if (!originalMaterials.current.has(child)) {
            originalMaterials.current.set(child, child.material.clone());
          }

          if (meshName === "window_side_front" || meshName === "window_top") {
            // Front side windows
            windowElements.current.sideWindows?.push(child);
            foundWindows.current.sideWindows.push(meshName);
            child.material = createSideWindowShaderMaterial(frontSideTintPercent, frontSideTintPercent);
            return;
          }

          if (meshName === "window_side_rear" || meshName === "window_rear") {
            // Rear side windows
            windowElements.current.sideWindows?.push(child);
            foundWindows.current.sideWindows.push(meshName);
            child.material = createSideWindowShaderMaterial(rearSideTintPercent, rearSideTintPercent);
            return;
          }

          if (meshName === "window_front") {
            windowElements.current.sideWindows?.push(child);
            foundWindows.current.sideWindows.push(meshName);
            child.material = createSideWindowShaderMaterial(frontTintPercent, frontTintPercent);
            return;
          }
        }
      });
    }
    if (vehicleType == "SUV") {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshName = child.name;

          // Cache original material
          if (!originalMaterials.current.has(child)) {
            originalMaterials.current.set(child, child.material.clone());
          }

          if (meshName === "window_side") {
            // Front side windows
            windowElements.current.sideWindows?.push(child);
            foundWindows.current.sideWindows.push(meshName);
            child.material = createSideWindowShaderMaterial(frontSideTintPercent, frontSideTintPercent);
            return;
          }

          if (meshName === "windowglass_black-1" || meshName === "windowglass_black-2" || meshName === "windowglass_black-3" || meshName === "windowglass_black-4" || meshName === "window_rear") {
            // Rear side windows
            windowElements.current.sideWindows?.push(child);
            foundWindows.current.sideWindows.push(meshName);
            child.material = createSideWindowShaderMaterial(rearSideTintPercent, rearSideTintPercent);
            return;
          }

          if (meshName === "window_front") {
            windowElements.current.sideWindows?.push(child);
            foundWindows.current.sideWindows.push(meshName);
            child.material = createSideWindowShaderMaterial(frontTintPercent, frontTintPercent);
            return;
          }
        }
      });

    }

    scene.position.set(0, -0.5, 0);
    scene.rotation.set(0, Math.PI, 0);
    scene.scale.set(1, 1, 1);
  }, [scene, carColor, frontTintPercent, frontSideTintPercent, rearSideTintPercent, windshieldTint, backTintPercent]);

  return {
    windowElements,
    originalMaterials,
    foundWindows
  };
};
