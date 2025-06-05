
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface TintTypeOption {
  id: string;
  label: string;
}

interface TintTypeSelectorProps {
  selectedType: string;
  onChange: (value: string) => void;
}

const TintTypeSelector: React.FC<TintTypeSelectorProps> = ({
  selectedType,
  onChange
}) => {
  const isMobile = useIsMobile();

  const tintTypes: TintTypeOption[] = [
    { id: 'black-vlt', label: 'BLACK VLT\'S' },
    { id: 'black-ceramic', label: isMobile ? "Black Ceramic" : 'BLACK CERAMIC VLT\'S' },
    { id: 'i3-ceramic', label: isMobile ? "i3 Ceramic" : 'I3 CERAMIC VLT\'S' },
    { id: 'air-ceramic', label: isMobile ? "AIR CERAMIC" : 'AIR CERAMIC VLT' }
  ];
  const isLastOption = selectedType === 'air-ceramic';

  if (isMobile) {
    return (
      <Tabs value={selectedType} onValueChange={onChange} className="w-full">
        <TabsList className={cn("w-full bg-white flex hide-scroll overflow-x-auto justify-start rounded-none p-0 h-auto", isLastOption && "justify-end")}>
          {tintTypes.map((type) => (
            <TabsTrigger
              key={type.id}
              value={type.id}
              className={cn(
                "flex-1 uppercase text-[#18181B] !p-3 md:py-2 whitespace-nowrap rounded-none font-bold border-x md:border-b-2",
                selectedType === type.id
                  ? "md:border-b-[#9B000E]"
                  : "border-b-transparent opacity-[50%] bg-[#f1f1f1]",
                isMobile ? "text-[11px]" : "text-[12px]"
              )}
            >
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  }

  return (
    <div className="overflow-hidden">
      <RadioGroup
        value={selectedType}
        onValueChange={onChange}
        className="space-y-[7.2px]"
      >
        {tintTypes.map((type) => (
          <Label
            key={type.id}
            className="uppercase cursor-pointer text-base font-bold tracking-wider"
            htmlFor={type.id}
          >
            <div
              className={`flex items-center !rounded-l-[20px] py-5 px-6 ${isMobile ? 'w-full' : 'w-[334px]'} h-[54px]`}
              style={{
                opacity: selectedType !== type.id ? 0.9 : 1,
                background: selectedType === type.id
                  ? 'linear-gradient(to right, #FFFFFF00 10%, #FFFFFF)'
                  : 'linear-gradient(to right, #FFFFFFB2 -100%, #FFFFFF00 100%)',
              }}
            >
              <RadioGroupItem
                value={type.id}
                id={type.id}
                className={cn(
                  "mr-3 !text-[12px] font-bold text-[#18181B]",
                  selectedType === type.id ? "bg-white" : "border border-[#18181BCC]",
                  selectedType === type.id && "data-[state=checked]:!text-transparent",
                )}
              />
              {type.label}
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TintTypeSelector;
