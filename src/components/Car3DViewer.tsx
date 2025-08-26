import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Loader } from '@react-three/drei';
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
  ppfOtherColor: string;
}

const preloadModel = (vehicleType: string) => {
  switch (vehicleType) {
    case "SEDAN":
      useGLTF.preload("/Car.glb");
      break;
    case "SUV":
      useGLTF.preload("/Ford_Bronco_(Mk6)_(U725)_4door_Raptor_2022-LP2.glb");
      break;
    case "PICKUP":
      useGLTF.preload("/GMC_Sierra_(Mk5f)_1500_CrewCab_ShortBox_2022-LP2.glb");
      break;
    default:
      useGLTF.preload("/Car.glb");
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
  autoRotate,
  ppfOtherColor
}) => {
  const [showPPF, setShowPPF] = useState(true);
  useEffect(() => {
    preloadModel(vehicleType);

    if (ppfOption !== 'none' || ppfOtherColor !== 'none') {
      setShowPPF(true);
    }
  }, [vehicleType, ppfOption, ppfOtherColor]);

  const cameraSettings = {
    position: isMobile ? [12, 2, 12] : [9, 0, 10],
    fov: isMobile ? 50 : 40
  };

  const controlSettings = {
    enablePan: false,
    enableZoom: isMobile ? false : true, // Disable zoom on mobile
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
    zoomSpeed: isMobile ? 0 : 1.0, // Set zoom speed to 0 on mobile
    // Additional mobile touch controls
    touches: isMobile ? {
      ONE: 2, // ROTATE - only allow rotation with one finger
      TWO: null // Disable two-finger gestures (zoom/pan)
    } : undefined
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
        style={{ touchAction: isMobile ? 'pan-y' : 'none' }} // Allow vertical scrolling on mobile
      >
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
            ppfOtherColor={ppfOtherColor}
            showPPF={showPPF && (ppfOption !== 'none' || ppfOtherColor !== 'none')}
            backTintPercent={backTintPercent}
            frontTintPercent={frontTintPercent}
            frontSideTintPercent={frontSideTintPercent}
            rearSideTintPercent={rearSideTintPercent}
          />
        </Stage>

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

        <OrbitControls {...controlSettings} />
      </Canvas>
    </>
  );
};

export default Car3DViewer;