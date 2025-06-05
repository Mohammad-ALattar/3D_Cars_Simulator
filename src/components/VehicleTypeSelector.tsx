
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface VehicleTypeSelectorProps {
  selectedType: "SEDAN" | "PICKUP" | "SUV";
  onSelectType: (type: "SEDAN" | "PICKUP" | "SUV") => void;
}

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({
  selectedType,
  onSelectType
}) => {
  const types = ['SEDAN', 'PICKUP', 'SUV'];
  const isMobile = useIsMobile();

  return (
    <div className="w-full mb-6">
      <h3 className="text-center  text-[11px] md:text-sm uppercase tracking-wider text-[#000] font-bold mb-4">SELECT VEHICLE TYPE</h3>
      <div className={`flex flex-wrap ${isMobile ? 'gap-1' : 'gap-2'} justify-center`}>
        {types.map(type => (
          <Button
            key={type}
            onClick={() => onSelectType(type as "SEDAN" | "PICKUP" | "SUV")}
            className={cn(
              `py-2 px-2 ${isMobile ? 'text-[10px] w-[84px] h-[29px]' : 'text-xs w-[145px]'} border uppercase font-semibold rounded-[1px] tracking-wide transition-colors`,
              selectedType === type
                ? 'bg-[#9B000E] text-white border-[#9B000E]'
                : 'bg-[#f1f1f1] text-black  !border-[#18181B]   hover:bg-gray-200'
            )}
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VehicleTypeSelector;
