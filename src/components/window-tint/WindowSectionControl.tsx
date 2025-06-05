
import React from 'react';
import WindowSlider from './WindowSlider';

interface WindowSectionControlProps {
  title: string;
  tintPercent: number;
  onTintChange: (value: number) => void;
  rightButton?: {
    label: string;
    onClick: () => void;
  };
}

const WindowSectionControl: React.FC<WindowSectionControlProps> = ({
  title,
  tintPercent,
  onTintChange,
  rightButton
}) => {
  return (
    <div className="mb-2 space-y-5">
      <div className="flex gap-10 items-center">
        <p className="uppercase font-bold text-[11px] md:text-[13px]">{title}</p>
        <p className='font-bold text-sm text-[#9B000E]'>{tintPercent}%</p>
        {rightButton && (
          <button
            className=" text-[#9B000E] text-[10px] xl:absolute xl:top-2 xl:right-2 md:text-[11px] uppercase font-bold"
            onClick={rightButton.onClick}
          >
            {rightButton.label}
          </button>
        )}

      </div>

      <WindowSlider
        value={tintPercent}
        onChange={onTintChange}
        displayValue={tintPercent}
      />
    </div>
  );
};

export default WindowSectionControl;
