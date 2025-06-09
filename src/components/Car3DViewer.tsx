import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import GLBModel from './GLBModel';

interface Car3DViewerProps {
  vehicleType: "SEDAN" | "SUV" | "PICKUP";
  color: string;
  ppfOption: string;
  frontTintPercent: number;
  frontSideTintPercent: number;
  rearSideTintPercent: number;
  isMobile: boolean;
  backTintPercent: number;
  autoRotate: boolean;
}

const preloadModel = (vehicleType: string) => {
  switch (vehicleType) {
    case "SEDAN":
      useGLTF.preload("/2020_Porsche_Taycan.glb");
      break;
    case "SUV":
      useGLTF.preload("/Ford_Bronco_(Mk6)_(U725)_4door_Raptor_2022.glb");
      break;
    case "PICKUP":
      useGLTF.preload("/GMC_Sierra_(Mk5f)_1500_CrewCab_ShortBox_2022.glb");
      break;
    default:
      useGLTF.preload("/2020_Porsche_Taycan.glb");
  }
};

const Car3DViewer: React.FC<Car3DViewerProps> = ({
  vehicleType,
  color,
  ppfOption,
  frontTintPercent,
  frontSideTintPercent,
  rearSideTintPercent,
  isMobile,
  backTintPercent,
  autoRotate
}) => {
  const [showPPF, setShowPPF] = useState(true);

  useEffect(() => {
    preloadModel(vehicleType);

    if (ppfOption !== 'none') {
      setShowPPF(true);
    }
  }, [vehicleType, ppfOption]);

  // Responsive camera settings
  const cameraSettings = {
    position: isMobile ? [12, 2, 12] : [9, 0, 10],
    fov: isMobile ? 50 : 40
  };

  // Responsive control settings
  const controlSettings = {
    enablePan: false,
    enableZoom: true,
    minDistance: isMobile ? 8 : 5,
    maxDistance: isMobile ? 20 : 15,
    autoRotate: autoRotate,
    autoRotateSpeed: isMobile ? 0.3 : 0.5,
    minPolarAngle: Math.PI / 2,
    maxPolarAngle: Math.PI / 2,
    // Mobile-specific touch settings
    enableDamping: true,
    dampingFactor: isMobile ? 0.1 : 0.05,
    rotateSpeed: isMobile ? 0.8 : 1.0,
    zoomSpeed: isMobile ? 0.8 : 1.0
  };

  return (
    <>
      <Canvas
        className="w-full h-full"
        shadows
        camera={{
          position: cameraSettings.position as [number, number, number],
          fov: cameraSettings.fov
        }}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <Stage
            intensity={isMobile ? 1.2 : 1.5}
            environment="city"
            preset="rembrandt"
            shadows
          >
            <GLBModel
              vehicleType={vehicleType}
              color={color}
              ppfOption={ppfOption}
              showPPF={showPPF && ppfOption !== 'none'}
              backTintPercent={backTintPercent}
              frontTintPercent={frontTintPercent}
              frontSideTintPercent={frontSideTintPercent}
              rearSideTintPercent={rearSideTintPercent}
            />
          </Stage>

          {/* Responsive lighting */}
          <ambientLight intensity={isMobile ? 1.0 : 1.2} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={isMobile ? 0.6 : 0.8}
            castShadow
          />
          <directionalLight
            position={[-10, -10, -5]}
            intensity={isMobile ? 0.3 : 0.4}
          />
        </Suspense>

        <OrbitControls {...controlSettings} />
      </Canvas>
    </>
  );
};

export default Car3DViewer;