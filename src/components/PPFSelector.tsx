import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PPFSelectorProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const PPFSelector: React.FC<PPFSelectorProps> = ({
  selectedOption,
  onSelectOption
}) => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(true);

  const options = [
    {
      id: 'none',
      label: 'NO',
      width: isMobile ? '54.50px' : '80px',
    },
    {
      id: 'partial',
      label: isMobile ? 'PARTIAL FRONT' : 'PARTIAL FRONT KIT',
      width: isMobile ? '110px' : '186px',
    },
    {
      id: 'full-front',
      label: isMobile ? 'FULL FRONT' : 'FULL FRONT KIT',
      width: isMobile ? '92px' : '158px',
    },
    {
      id: 'full-car',
      label: isMobile ? 'FULL CAR' : 'FULL CAR KIT',
      width: isMobile ? '85px' : '146px',
    }
  ];

  return (
    <div className="w-full md:max-w-2xl md:mx-auto">
      <div
        className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 border border-gray-200 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:shadow-lg group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm md:text-base font-bold text-gray-800 uppercase tracking-wide">
            Paint Protection Film (PPF) Kits
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden md:inline">
              {expanded ? 'Click to collapse' : 'Click to expand'}
            </span>
            <div className={`p-1 rounded-full bg-[#9B000E] text-white transition-transform duration-300 ${expanded ? 'rotate-180' : 'rotate-0'} group-hover:scale-110`}>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out mt-3",
        expanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="flex gap-1 justify-center  pb-4">
          {options.map((option) => (
            <Button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={cn(
                `py-2 px-2 ${isMobile ? 'text-[10px]' : 'text-xs'} max-md:h-[29px] uppercase font-semibold rounded-none tracking-wide border-[1.27px] transition-colors flex items-center justify-center`,
                selectedOption === option.id
                  ? 'bg-[#9B000E] text-white border-[#9B000E]'
                  : 'bg-[#f1f1f1] text-black !border-[#18181B]  hover:bg-gray-200'
              )}
              style={{ width: option.width }}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PPFSelector;