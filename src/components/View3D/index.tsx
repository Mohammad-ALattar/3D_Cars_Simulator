import { useIsMobile } from '@/hooks/use-mobile';
import { Suspense, useState } from 'react'

import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import Header from '../Header';
import VehicleTypeSelector from '../VehicleTypeSelector';
import PPFSelector from '../PPFSelector';
import ColorPickerSidebar from '../ColorPicker';
import WindowTintSidebar from '../WindowTint';
import Car3DViewer from '../Car3DViewer';
import WindowTintSelector from '../WindowTintSelector';
import { CarCustomizationLoader } from '../ui/withLoading';


const View3D = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <CarCustomizationLoader message="🎨 Loading Customization Studio..." />
      </div>
    }>
      <View3DComp />
    </Suspense>
  )
}

export default View3D;
const View3DComp = () => {
  const [vehicleType, setVehicleType] = useState<"SEDAN" | "SUV" | "PICKUP">('SEDAN');
  const [ppfOption, setPpfOption] = useState('none');
  const [ppfOtherColor, setPpfOtherColor] = useState('none');
  const [tintType, setTintType] = useState({ id: 'black-vlt', label: 'STANDARD', subLabel: 'Black' });
  const [frontTintPercent, setFrontTintPercent] = useState(100);
  const [backTintPercent, setBackTintPercent] = useState(100);
  const [frontSideTintPercent, setFrontSideTintPercent] = useState(100);
  const [rearSideTintPercent, setRearSideTintPercent] = useState(100);
  const [carColor, setCarColor] = useState('red');
  const isMobile = useIsMobile();
  const [autoRotate, setAutoRotate] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
              selectedOtherPPFColor={ppfOtherColor}
              onSelectOtherPPFColor={setPpfOtherColor}
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
            ppfOtherColor={ppfOtherColor}
          />
        </div>
        <div className="absolute bottom-4  lg:hidden right-0 z-30 px-4 ">
          <ColorPickerSidebar
            selectedColor={carColor}
            onSelectColor={setCarColor}
          />
        </div>
        <div className="fixed flex gap-4 bottom-6  items-center left-1/2 transform -translate-x-1/2  z-10">
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
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
            className="rounded-full max-md:hidden  w-12 lg:w-16 h-12 p-0 shadow-lg bg-white/90 backdrop-blur-[2px] border border-gray-200"
            title={autoRotate ? "Pause rotation" : "Start rotation"}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>
        <div className="relative">
          <div className="absolute top-4  left-4 z-20">
            <div className='flex flex-col gap-8 '>
              <div className='hidden lg:block'>
                <ColorPickerSidebar
                  selectedColor={carColor}
                  onSelectColor={setCarColor}
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
          </div>
        </div>
      </div>
    </div>
  );
}
