
import { useEffect } from 'react';
import * as THREE from 'three';
import { createWindshieldMaterial, createRearWindowMaterial } from '@/utils/tint';

interface TintUpdaterProps {
  windowElements: {
    windshield?: THREE.Mesh;
    rear?: THREE.Mesh;
    sideWindows?: THREE.Mesh[];
  };
  frontTintPercent: number;
  rearTintPercent: number;
  frontSideTintPercent: number;
  rearSideTintPercent: number;
}

const TintUpdater: React.FC<TintUpdaterProps> = ({
  windowElements,
  frontTintPercent,
  rearTintPercent,
  frontSideTintPercent,
  rearSideTintPercent
}) => {

  useEffect(() => {

    if (windowElements.sideWindows && windowElements.sideWindows.length > 0) {
      windowElements.sideWindows.forEach(window => {
        if (window.material instanceof THREE.ShaderMaterial) {
          let opacity;

          if (frontSideTintPercent === 0) {
            opacity = 1.0;
          } else if (frontSideTintPercent === 100) {
            opacity = 0.1;
          } else {
            opacity = 1.0 - (frontSideTintPercent * 0.009);
          }

          window.material.uniforms.frontSideTint.value = opacity;
          window.material.needsUpdate = true;
        }
      });
    }
  }, [frontSideTintPercent, windowElements]);

  useEffect(() => {

    if (windowElements.sideWindows && windowElements.sideWindows.length > 0) {
      windowElements.sideWindows.forEach(window => {
        if (window.material instanceof THREE.ShaderMaterial) {
          let opacity;

          if (rearSideTintPercent === 0) {
            opacity = 1.0;
          } else if (rearSideTintPercent === 100) {
            opacity = 0.1;
          } else {
            opacity = 1.0 - (rearSideTintPercent * 0.009);
          }

          window.material.uniforms.rearSideTint.value = opacity;
          window.material.needsUpdate = true;
        }
      });
    }
  }, [rearSideTintPercent, windowElements]);

  return null;
};

export default TintUpdater;
