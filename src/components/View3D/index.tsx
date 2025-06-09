import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react'
import Header from '../Header';
import VehicleTypeSelector from '../VehicleTypeSelector';
import PPFSelector from '../PPFSelector';
import Car3DViewer from '../Car3DViewer';
import RotationToggle from '../RotationToggle';
import WindowTint from '../WindowTint';
import ColorPicker from '../ColorPicker';
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
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <header className="2xl:fixed 2xl:top-[10px] 2xl:left-0 2xl:right-0 z-10">
        <div className={`${isMobile ? 'px-4' : ''}`}>
          <VehicleTypeSelector
            selectedType={vehicleType}
            onSelectType={setVehicleType}
          />
        </div>
        <PPFSelector
          selectedOption={ppfOption}
          onSelectOption={setPpfOption}
        />
      </header>

      <main className="2xl:flex-grow 2xl:relative 2xl:mb-0">
        <div className="absolute max-2xl:bottom-32 inset-1 2xl:!mb-40">
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
        <div className="absolute bottom-[338px] md:bottom-[270px] xl:bottom-[250px] left-0 right-0">
          <RotationToggle
            onToggle={() => setAutoRotate(!autoRotate)}
          />
        </div>
        <div className="absolute px-3 w-full bottom-[50px] xl:w-auto xl:p-0 xl:z-10 xl:bottom-2 xl:left-14">
          <WindowTint
            frontTintPercent={frontTintPercent}
            backTintPercent={backTintPercent}
            onBackTintChange={setBackTintPercent}
            frontSideTintPercent={frontSideTintPercent}
            rearSideTintPercent={rearSideTintPercent}
            tintType={tintType}
            onFrontTintChange={setFrontTintPercent}
            onFrontSideTintChange={setFrontSideTintPercent}
            onRearSideTintChange={setRearSideTintPercent}
            onTintTypeChange={setTintType}
          />
        </div>
        <div className="absolute px-3 pb-5 w-full bottom-[-180px] 2xl:w-auto xl:p-0 xl:z-10 xl:bottom-2 xl:left-[800px] 2xl:left-[900px]">
          <ColorPicker
            selectedColor={carColor}
            onSelectColor={setCarColor}
          />
        </div>
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
      </main>
    </div>
  );
}

export default View3D