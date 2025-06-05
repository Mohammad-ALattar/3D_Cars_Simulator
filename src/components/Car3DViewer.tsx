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
  autoRotate: boolean
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


  return (
    <>
      <Canvas className="w-full h-full" shadows camera={{
        position: [9, 0, 10], fov: 40
      }}>
        <Suspense fallback={null}
        >
          <Stage
            intensity={1.5}
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

          {/* Basic lighting */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} />
        </Suspense>

        <OrbitControls
      enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2} // Lock vertical angle to 90 degrees (horizontal)
          maxPolarAngle={Math.PI / 2} // Lock vertical angle to 90 degrees (horizontal)
        />
      </Canvas>
    </>
  );
};

export default Car3DViewer;