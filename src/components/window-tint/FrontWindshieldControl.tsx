
import React from 'react';
import WindowSlider from './WindowSlider';
import { Button } from '../ui/button';

interface FrontWindshieldControlProps {
  frontTintPercent: number;
  onFrontTintChange: (value: number) => void;
  onToggleView: () => void;

}

const FrontWindshieldControl: React.FC<FrontWindshieldControlProps> = ({
  frontTintPercent,
  onFrontTintChange,
  onToggleView,
}) => {
  return (
    <div className="mb-2 space-y-5">
      <div className="flex gap-10 items-center">
        <p className="uppercase font-bold text-[#18181B] text-[11px] md:text-[13px]">FRONT WINDSHIELD</p>
        <p className='font-bold text-sm text-[#9B000E]'>{frontTintPercent}%</p>

        <button
          className="text-[#9B000E] text-[10px] md:text-[11px] uppercase font-bold xl:absolute xl:top-2 xl:right-2"
          onClick={onToggleView}
        >
          Show All Options
        </button>
      </div>

      <WindowSlider
        value={frontTintPercent}
        onChange={onFrontTintChange}
        displayValue={frontTintPercent}
      />

    </div>
  );
};

export default FrontWindshieldControl;
