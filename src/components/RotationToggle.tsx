
import React from 'react';

interface RotationToggleProps {
  onToggle: () => void;

}

const RotationToggle: React.FC<RotationToggleProps> = ({
  onToggle,
}) => {
  return (
    <div className="absolute md:bottom-4 bottom-[-15px] left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
        onClick={onToggle}
        className={`bg-opacity-70 text-white rounded-full flex items-center px-4 py-2 `}
        aria-label="Toggle 360° rotation"
      >
        <img src='/d360.svg' className='!w-[31px] !h-[31px]' />
      </button>
    </div>
  );
};

export default RotationToggle;
