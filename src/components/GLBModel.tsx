
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { getCarColor } from '@/utils/tint';
import { useWindowElements } from '@/hooks/useWindowElements';
import { useBodyKit } from '@/hooks/useBodyKit';
import TintUpdater from '@/components/model/TintUpdater';

interface GLBModelProps {
  color: string;
  ppfOption: string;
  showPPF: boolean;
  frontTintPercent: number;
  frontSideTintPercent: number;
  rearSideTintPercent: number;
  backTintPercent: number;
  vehicleType: "SEDAN" | "SUV" | "PICKUP";
}

const GLBModel: React.FC<GLBModelProps> = ({
  color,
  ppfOption,
  showPPF,
  frontTintPercent,
  frontSideTintPercent,
  rearSideTintPercent,
  vehicleType,
  backTintPercent
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const modelPath = vehicleType === 'SEDAN'
    ? "/2020_Porsche_Taycan.glb" : vehicleType === 'PICKUP' ?
      "/GMC_Sierra_(Mk5f)_1500_CrewCab_ShortBox_2022.glb" : "/Ford_Bronco_(Mk6)_(U725)_4door_Raptor_2022.glb";
  const { scene } = useGLTF(modelPath);

  const carColor = new THREE.Color(getCarColor(color));

  useBodyKit({
    scene,
    ppfOption,
    showPPF,
    carColor,
    vehicleType
  });

  useWindowElements({
    scene,
    frontTintPercent,
    backTintPercent,
    frontSideTintPercent,
    rearSideTintPercent,
    carColor,
    vehicleType
  });
  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

export default GLBModel;
