import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PPFSelectorProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const PPFSelector: React.FC<PPFSelectorProps> = ({
  selectedOption,
  onSelectOption
}) => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

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
    <div className="w-full mb-6">
      <Button
        className="text-center !bg-transparent w-full text-sm uppercase tracking-wider text-[11px] md:text-[13px] text-[#000] font-bold mb-2 flex items-center justify-center gap-1"
        onClick={() => isMobile && setExpanded(!expanded)}
      >
        Paint Protection Film (PPF) Kits
        {isMobile && (expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </Button>

      {(expanded || !isMobile) && (
        <div className={`flex flex-wrap ${isMobile ? 'gap-1' : 'gap-2'} justify-center`}>
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
      )}
    </div>
  );
};

export default PPFSelector;
