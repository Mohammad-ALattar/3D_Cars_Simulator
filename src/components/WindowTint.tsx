
import React, { useState } from 'react';
import TintTypeSelector from './window-tint/TintTypeSelector';
import FrontWindshieldControl from './window-tint/FrontWindshieldControl';
import WindowSectionControl from './window-tint/WindowSectionControl';
import ComingSoonCard from './window-tint/ComingSoonCard';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface WindowTintProps {
  frontTintPercent: number;
  frontSideTintPercent: number;
  rearSideTintPercent: number;
  backTintPercent: number;
  tintType: string;
  onFrontTintChange: (value: number) => void;
  onFrontSideTintChange: (value: number) => void;
  onRearSideTintChange: (value: number) => void;
  onBackTintChange: (value: number) => void;
  onTintTypeChange: (type: string) => void;
}

const WindowTint: React.FC<WindowTintProps> = ({
  frontTintPercent,
  backTintPercent,
  frontSideTintPercent,
  rearSideTintPercent,
  tintType,
  onFrontTintChange,
  onFrontSideTintChange,
  onRearSideTintChange,
  onTintTypeChange,
  onBackTintChange
}) => {
  const [showingFrontWindshield, setShowingFrontWindshield] = useState(false);
  const [showingBackWindshield, setShowingBackWindshield] = useState(false);
  
  const isMobile = useIsMobile();

  const toggleView = () => {
    setShowingFrontWindshield(!showingFrontWindshield);
  };

  const toggleViewBack = () => {
    setShowingBackWindshield(!showingBackWindshield);
  };

  const isDefaultOption = tintType === 'black-vlt';
  const isLastOption = tintType === 'air-ceramic';

  return (

    <div className={`flex flex-col md:flex-row `}>
      <div className={`${isMobile ? 'w-full' : ''}`}>
        <TintTypeSelector
          selectedType={tintType}
          onChange={onTintTypeChange}
        />
      </div>

      <div className={cn(
        `bg-white p-6 3xl:w-[490px] w-full rounded-b-[20px] md:rounded-r-[20px] md:rounded-bl-[20px] h-auto 3xl:h-[238px]`,
        !isDefaultOption && "md:rounded-[20px]",
        isLastOption && !isMobile && "rounded-bl-none",
        isMobile && "mt-0"
      )}>
        {isDefaultOption ? (
          showingFrontWindshield ? (
            <div className='flex flex-col gap-4'>
              <FrontWindshieldControl
                frontTintPercent={frontTintPercent}
                onFrontTintChange={onFrontTintChange}
                onToggleView={toggleView}
              />
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              <WindowSectionControl
                title="FRONT WINDOWS"
                tintPercent={frontSideTintPercent}
                onTintChange={onFrontSideTintChange}
                rightButton={{
                  label: "TOGGLE FRONT WINDSHIELD",
                  onClick: toggleView
                }}
              />

              <WindowSectionControl
                title="REAR WINDOWS"
                tintPercent={rearSideTintPercent}
                onTintChange={onRearSideTintChange}
              />
            </div>
          )
        ) : (
          <ComingSoonCard tintType={tintType} />
        )}
      </div>
    </div>

  );
};

export default WindowTint;
