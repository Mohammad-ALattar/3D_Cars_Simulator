import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Loader } from '@react-three/drei';
import { Move3D, Eye } from 'lucide-react';
import GLBModel from './GLBModel';

interface Car3DViewerProps {
  vehicleType: "COUPE" | "SUV" | "PICKUP";
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
    case "COUPE":
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
  const [is3DInteractionEnabled, setIs3DInteractionEnabled] = useState(!isMobile);

  useEffect(() => {
    preloadModel(vehicleType);

    if (ppfOption !== 'none' || ppfOtherColor !== 'none') {
      setShowPPF(true);
    }
  }, [vehicleType, ppfOption, ppfOtherColor]);

  // Reset interaction state when switching between mobile/desktop
  useEffect(() => {
    setIs3DInteractionEnabled(!isMobile);
  }, [isMobile]);

  const handleEnable3DInteraction = () => {
    setIs3DInteractionEnabled(true);
  };

  const cameraSettings = {
    position: isMobile ? [12, 2, 12] : [9, 0, 10],
    fov: isMobile ? 50 : 40
  };

  const controlSettings = {
    enabled: is3DInteractionEnabled, // Key change: disable controls when interaction is disabled
    enablePan: false,
    enableZoom: true,
    minDistance: isMobile ? 8 : 5,
    maxDistance: isMobile ? 20 : 15,
    autoRotate: autoRotate && is3DInteractionEnabled, // Only auto-rotate when enabled
    autoRotateSpeed: isMobile ? 0.3 : 0.5,
    minPolarAngle: Math.PI / 2,
    maxPolarAngle: Math.PI / 2,
    enableDamping: true,
    dampingFactor: isMobile ? 0.1 : 0.05,
    rotateSpeed: isMobile ? 0.8 : 1.0,
    zoomSpeed: 1.0,
  };

  return (
    <div className="relative w-full h-full">
      {/* Mobile 3D Interaction Overlay */}
      {isMobile && !is3DInteractionEnabled && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          {/* Backdrop blur effect */}
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />

          {/* Central interaction button */}
          <div className="relative pointer-events-auto">
            <button
              onClick={handleEnable3DInteraction}
              className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/95 active:scale-95 transition-all duration-200 hover:shadow-3xl"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon container */}
              <div className="relative z-10 flex items-center justify-center">
                <Move3D className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />
              </div>

              {/* Ripple effect on click */}
              <div className="absolute inset-0 rounded-full bg-blue-400/30 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-75" />
            </button>

            {/* Floating label */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg shadow-lg">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Tap to interact with 3D</span>
                </div>
                {/* Arrow pointer */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exit 3D interaction button - positioned near car center */}
      {isMobile && is3DInteractionEnabled && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={() => setIs3DInteractionEnabled(false)}
            className="group relative flex flex-col items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 shadow-2xl hover:bg-black/85 active:scale-95 transition-all duration-200"
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-400/20 via-orange-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Eye icon with text inside */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="relative">
                {/* Eye outline - larger for better text visibility */}
                <svg width="40" height="24" viewBox="0 0 40 24" className="text-white group-hover:text-orange-300 transition-colors duration-200">
                  <path
                    fill="currentColor"
                    d="M20 2C11.716 2 4.648 7.162 0 14c4.648 6.838 11.716 12 20 12s15.352-5.162 20-12C35.352 7.162 28.284 2 20 2zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
                  />
                  {/* Inner circle for better text contrast */}
                  <circle cx="20" cy="14" r="8" fill="rgba(255,255,255,0.9)" className="group-hover:fill-orange-100 transition-all duration-200" />
                </svg>

                {/* Text inside the eye */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-800 text-[9px] font-bold leading-none tracking-tight group-hover:text-orange-800 transition-colors duration-200">
                    EXIT
                  </span>
                </div>
              </div>
            </div>

            {/* Button label text */}
            <div className="relative z-10">
              <span className="text-white text-xs font-medium group-hover:text-orange-300 transition-colors duration-200">
                Exit 3D Mode
              </span>
            </div>

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-2xl bg-orange-400/30 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-75" />
          </button>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        className="w-full h-full"
        shadows
        camera={{
          position: cameraSettings.position as [number, number, number],
          fov: cameraSettings.fov
        }}
        style={{
          touchAction: (!is3DInteractionEnabled) ? 'pan-y' : 'none',
          pointerEvents: (!is3DInteractionEnabled) ? 'none' : 'auto'
        }}
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
    </div>
  );
};

export default Car3DViewer;