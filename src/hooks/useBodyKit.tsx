
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { resetBodyKitParts, applyBodyKit, isBodyPart } from '@/utils/bodyKit';

interface UseBodyKitProps {
  scene: THREE.Group | null;
  ppfOption: string;
  showPPF: boolean;
  carColor: THREE.Color;
  vehicleType: "SEDAN" | "SUV" | "PICKUP";
}

export const useBodyKit = ({
  scene,
  ppfOption,
  showPPF,
  carColor,
  vehicleType
}: UseBodyKitProps) => {
  const bodyKitMeshes = useRef<THREE.Mesh[]>([]);
  const originalGeometries = useRef<Map<string, THREE.BufferGeometry>>(new Map());
  const lastAppliedOption = useRef<string>('none');

  useEffect(() => {
    if (!scene) return;

    originalGeometries.current.clear();

    scene.traverse(child => {
      if (child instanceof THREE.Mesh) {
        if (isBodyPart(child.name)) {
          originalGeometries.current.set(child.name, child.geometry.clone());
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!scene) return;

    resetBodyKitParts(scene, originalGeometries.current, carColor, vehicleType);

    bodyKitMeshes.current.forEach(mesh => {
      if (mesh.parent) {
        mesh.parent.remove(mesh);
      }
    });
    bodyKitMeshes.current = [];

    if (showPPF && ppfOption !== 'none') {
      lastAppliedOption.current = ppfOption;
      applyBodyKit(scene, ppfOption, originalGeometries.current, carColor, vehicleType);
    } else {
      lastAppliedOption.current = 'none';
    }
  }, [scene, ppfOption, showPPF, carColor]);

  return {
    bodyKitMeshes,
    originalGeometries,
    lastAppliedOption: lastAppliedOption.current,
    vehicleType
  };
};
