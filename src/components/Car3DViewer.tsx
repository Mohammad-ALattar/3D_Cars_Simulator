import React, { useState, Suspense, useEffect, useRef } from 'react';
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
  const [isInteracting, setIsInteracting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    preloadModel(vehicleType);

    if (ppfOption !== 'none' || ppfOtherColor !== 'none') {
      setShowPPF(true);
    }
  }, [vehicleType, ppfOption, ppfOtherColor]);

  // Handle touch events for mobile scrolling
  useEffect(() => {
    if (!isMobile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    let startY = 0;
    let startX = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        isDragging = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        
        // If vertical movement is greater than horizontal, allow scrolling
        if (deltaY > deltaX && deltaY > 10) {
          // This is a vertical scroll gesture - don't prevent it
          setIsInteracting(false);
          return;
        } else if (deltaX > 10 || deltaY > 10) {
          // This is likely a rotation gesture
          isDragging = true;
          setIsInteracting(true);
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = () => {
      setTimeout(() => setIsInteracting(false), 100);
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  const cameraSettings = {
    position: isMobile ? [12, 2, 12] : [9, 0, 10],
    fov: isMobile ? 50 : 40
  };

  const controlSettings = {
    enablePan: false,
    enableZoom: isMobile ? false : true,
    minDistance: isMobile ? 8 : 5,
    maxDistance: isMobile ? 20 : 15,
    autoRotate: autoRotate && !isInteracting, // Pause auto-rotate when interacting
    autoRotateSpeed: isMobile ? 0.3 : 0.5,
    minPolarAngle: Math.PI / 2,
    maxPolarAngle: Math.PI / 2,
    enableDamping: true,
    dampingFactor: isMobile ? 0.1 : 0.05,
    rotateSpeed: isMobile ? 0.8 : 1.0,
    zoomSpeed: isMobile ? 0 : 1.0,
    // Improved mobile touch settings
    touches: isMobile ? {
      ONE: 2, // ROTATE
      TWO: 0  // Disable two-finger gestures completely
    } : undefined,
    // Add event listeners for interaction state
    onStart: () => setIsInteracting(true),
    onEnd: () => setTimeout(() => setIsInteracting(false), 100)
  };

  return (
    <div 
      className="w-full h-full"
      style={{
        // Allow page scrolling when not interacting with the 3D model
        touchAction: isMobile ? (isInteracting ? 'none' : 'pan-y') : 'none',
        // Prevent text selection during interaction
        userSelect: isInteracting ? 'none' : 'auto',
        WebkitUserSelect: isInteracting ? 'none' : 'auto'
      }}
    >
      <Canvas
        ref={canvasRef}
        className="w-full h-full"
        shadows
        camera={{
          position: cameraSettings.position as [number, number, number],
          fov: cameraSettings.fov
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