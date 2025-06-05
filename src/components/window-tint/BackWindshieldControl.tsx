
import React from 'react';
import WindowSlider from './WindowSlider';

interface FrontWindshieldControlProps {
  backTintPercent: number;
  onBackTintChange: (value: number) => void;
  onToggleView: () => void;

}

const BackWindshieldControl: React.FC<FrontWindshieldControlProps> = ({
  backTintPercent,
  onBackTintChange,
  onToggleView,
}) => {
  return (
    <div className="mb-2 space-y-5">
      <div className="flex justify-between items-center ">
        <h3 className="uppercase font-bold text-[#18181B] text-[11px] md:text-[13px]">Back WINDSHIELD</h3>
      </div>
      <WindowSlider
        value={backTintPercent}
        onChange={onBackTintChange}
        displayValue={backTintPercent}
      />
    </div>
  );
};

export default BackWindshieldControl;
