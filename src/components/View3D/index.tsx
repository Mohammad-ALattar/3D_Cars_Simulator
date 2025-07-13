import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react'

import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import Header from '../Header';
import VehicleTypeSelector from '../VehicleTypeSelector';
import PPFSelector from '../PPFSelector';
import ColorPickerSidebar from '../ColorPicker';
import WindowTintSidebar from '../WindowTint';
import Car3DViewer from '../Car3DViewer';
import WindowTintSelector from '../WindowTintSelector';

const View3D = () => {
  const [vehicleType, setVehicleType] = useState<"SEDAN" | "SUV" | "PICKUP">('SEDAN');
  const [ppfOption, setPpfOption] = useState('none');
  const [tintType, setTintType] = useState('black-vlt');
  const [frontTintPercent, setFrontTintPercent] = useState(0);
  const [backTintPercent, setBackTintPercent] = useState(0);
  const [frontSideTintPercent, setFrontSideTintPercent] = useState(0);
  const [rearSideTintPercent, setRearSideTintPercent] = useState(0);
  const [carColor, setCarColor] = useState('red');
  const isMobile = useIsMobile();
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Vehicle Selection - Sticky Header */}
      <div className="sticky z-20">
        <div className="px-4 py-0">
          <VehicleTypeSelector
            selectedType={vehicleType}
            onSelectType={setVehicleType}
          />
          <div>
            <PPFSelector
              selectedOption={ppfOption}
              onSelectOption={setPpfOption}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        <div className='absolute inset-0 justify-center'>
          <Car3DViewer
            vehicleType={vehicleType}
            color={carColor}
            ppfOption={ppfOption}
            backTintPercent={backTintPercent}
            frontTintPercent={frontTintPercent}
            frontSideTintPercent={frontSideTintPercent}
            rearSideTintPercent={rearSideTintPercent}
            isMobile={!!isMobile}
            autoRotate={autoRotate}
          />
        </div>
        <div className="absolute bottom-6 right-6 z-10">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
            className="rounded-full w-12 h-12 p-0 shadow-lg bg-white/90 backdrop-blur-sm border border-gray-200"
            title={autoRotate ? "Pause rotation" : "Start rotation"}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>
        <div className="relative">
          <div className="absolute top-4 right-4 z-50">
            <div className='flex flex-col gap-8'>
              <ColorPickerSidebar
                selectedColor={carColor}
                onSelectColor={setCarColor}
              />
              <WindowTintSelector
                frontTintPercent={frontTintPercent}
                backTintPercent={backTintPercent}
                frontSideTintPercent={frontSideTintPercent}
                rearSideTintPercent={rearSideTintPercent}
                tintType={tintType}
                ppfOption={ppfOption}
                carColor={carColor}
                vehicleType={vehicleType}
              />
            </div>
            
            <WindowTintSidebar
              frontTintPercent={frontTintPercent}
              backTintPercent={backTintPercent}
              frontSideTintPercent={frontSideTintPercent}
              rearSideTintPercent={rearSideTintPercent}
              tintType={tintType}
              onFrontTintChange={setFrontTintPercent}
              onBackTintChange={setBackTintPercent}
              onFrontSideTintChange={setFrontSideTintPercent}
              onRearSideTintChange={setRearSideTintPercent}
              onTintTypeChange={setTintType}
            />
          </div>

          <div className="lg:hidden">
            <div className="fixed bottom-4 left-0 right-0 z-30 px-4">
              <div className="flex justify-between items-end gap-4">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                  <div className="text-xs font-medium mb-1">Window Tint</div>
                  <div className="text-xs text-gray-500">
                    F:{frontTintPercent}% B:{backTintPercent}%
                  </div>
                </div>

                <ColorPickerSidebar
                  selectedColor={carColor}
                  onSelectColor={setCarColor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View3D