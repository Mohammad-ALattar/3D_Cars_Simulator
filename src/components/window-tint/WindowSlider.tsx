import React, { useCallback } from 'react';
import { Button } from '../ui/button';

const markers = [
  { label: '5%', value: 5 },
  { label: '20%', value: 20 },
  { label: '35%', value: 35 },
  { label: '50%', value: 50 },
  { label: '70%', value: 70 },
  { label: '100%', value: 100 },
];

interface WindowSliderProps {
  value: number;
  onChange: (value: number) => void;
  displayValue: number;
}

const WindowSlider: React.FC<WindowSliderProps> = ({
  value,
  onChange,
  displayValue,
}) => {
  const minValue = 5;
  const maxValue = 100;

  const snapToClosestMarker = useCallback(
    (val: number) => {
      const closest = markers.reduce((prev, curr) => {
        return Math.abs(curr.value - val) < Math.abs(prev.value - val) ? curr : prev;
      });
      return closest.value;
    },
    []
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseInt(e.target.value);
    const snappedValue = snapToClosestMarker(rawValue);
    onChange(snappedValue);
  };

  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;

  return (
    <div className={`relative mb-4 flex gap-4 items-end`}>
      <div className='w-full px-2'>
        <div className="w-full h-1 bg-gradient-to-r from-[#595B64] to-[#B4B8CA] rounded-full relative">
          <div
            className="absolute h-1 rounded-full"
            style={{ width: `${percentage}%` }}
          />

          <div
            className="absolute w-8 h-5 ml-2  rounded-full flex items-center justify-center mt-[2px] cursor-pointer shadow-md"
            style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
          >
            <img src="/slider.svg" alt="Autobahn" className="!w-8 !h-5" />
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-4">
          {markers.map((marker) => (
            <button
              key={marker.value}
              onClick={() => onChange(marker.value)}
              className="cursor-pointer hover:text-gray-800 focus:outline-none"
              aria-label={`Set to ${marker.label}`}
            >
              {marker.label}
            </button>
          ))}
        </div>

        {/* Range input */}
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={1}
          value={value}
          onChange={handleSliderChange}
          className="absolute opacity-0 top-0 w-full h-8 cursor-pointer"
        />
      </div>

      {/* Button to set "without tint" (value 5) */}
      <Button
        className='hover:!bg-red-500 bg-[#9B000E]'
        onClick={() => onChange(5)}
      >
        <p className='text-xs'>
          Without
          <br />
          Tint
        </p>
      </Button>
    </div>
  );
};

export default WindowSlider;
