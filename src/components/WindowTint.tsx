import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { X, Settings, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface WindowTintSidebarProps {
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

const tintTypes = [
  { id: 'black-vlt', label: 'BLACK' },
  { id: 'black-ceramic', label: 'BLACK CERAMIC' },
  { id: 'i3-ceramic', label: 'I3' },
  { id: 'air-ceramic', label: 'AIR' }
];

const tintMarkers = [5, 20, 35, 50, 70, 100];

const WindowTintSidebar: React.FC<WindowTintSidebarProps> = ({
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('windows');
  const isMobile = useIsMobile();

  const snapToClosestMarker = (val: number) => {
    return tintMarkers.reduce((prev, curr) => {
      return Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev;
    });
  };

  const TintSlider = ({
    label,
    value,
    onChange,
    icon
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon?: React.ReactNode;
  }) => {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = parseInt(e.target.value);
      const snappedValue = snapToClosestMarker(rawValue);
      onChange(snappedValue);
    };

    const percentage = ((value - 5) / (100 - 5)) * 100;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-semibold text-foreground">{label}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{value}%</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onChange(5)}
              className="h-6 px-2 text-xs"
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="relative px-2">
          <div className="w-full h-1 bg-gradient-to-r from-[#595B64] to-[#B4B8CA] rounded-full relative">
            <div
              className="absolute h-1 rounded-full"
              style={{ width: `${percentage}%` }}
            />

            <div
              className="absolute w-8 h-5 ml-2 rounded-full flex items-center justify-center mt-[2px] cursor-pointer shadow-md"
              style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
            >
              <img src="/slider.svg" alt="Slider" className="!w-8 !h-5" />
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-4">
            {tintMarkers.map((marker) => (
              <button
                key={marker}
                onClick={() => onChange(marker)}
                className={cn(
                  "cursor-pointer focus:outline-none transition-colors px-1 py-0.5 rounded",
                  value === marker
                    ? "bg-primary text-primary-foreground font-bold"
                    : "hover:bg-muted"
                )}
              >
                {marker}%
              </button>
            ))}
          </div>

          <input
            type="range"
            min={5}
            max={100}
            step={1}
            value={value}
            onChange={handleSliderChange}
            className="absolute opacity-0 top-0 w-full h-8 cursor-pointer"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group max-lg:fixed z-50 border-border border-white hover:bg-transparent bg-color-picker rounded-xl  border-2  shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20",
          "max-lg:bottom-4 left-4 max-lg:w-14 max-lg:h-14",
          "lg:left-6 lg:p-6"
        )}

        variant="outline"
      >
        <Settings className="h-5 w-5" />
        {<span className="ml-2 lg:block hidden font-semibold">Window Tint</span>}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "fixed top-0 left-0 h-full bg-color-picker border-r border-border shadow-2xl z-50 transition-transform duration-300 ease-out overflow-y-auto",
        "w-96",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Window Tint</h2>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              size="sm"
              variant="ghost"
              className="rounded-full !bg-white w-8 h-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-black uppercase tracking-wide">
              Tint Type
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {tintTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => onTintTypeChange(type.id)}
                  className={cn(
                    "p-3 rounded-lg border text-center transition-all duration-200",
                    tintType === type.id
                      ? 'bg-[#9B000E] text-white border-[#9B000E]'
                      : 'bg-[#f1f1f1] text-black !border-[#18181B]  hover:bg-gray-200'
                  )}
                >
                  {/* <div className="text-xs font-bold">{type.short}</div> */}
                  <div className="text-[10px] font-bold text-xs opacity-80 mt-1">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Window Controls */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="windows"
                className={cn(activeTab === 'windows' ? '!bg-[#9B000E] !text-white' : 'text-black')}
              >
                Side Windows
              </TabsTrigger>
              <TabsTrigger
                value="windshield"
                className={cn(activeTab === 'windshield' ? '!bg-[#9B000E] !text-white' : 'text-black')}
              >
                Windshields
              </TabsTrigger>
            </TabsList>

            <TabsContent value="windows" className="space-y-6 bg-white p-4 rounded-lg mt-6">
              <TintSlider
                label="Front Windows"
                value={frontSideTintPercent}
                onChange={onFrontSideTintChange}
                icon={<div className="w-3 h-3 bg-primary rounded-full" />}
              />

              <TintSlider
                label="Rear Windows"
                value={rearSideTintPercent}
                onChange={onRearSideTintChange}
                icon={<div className="w-3 h-3 bg-primary rounded-full" />}
              />
            </TabsContent>

            <TabsContent value="windshield" className="space-y-6 mt-6 bg-white p-4 rounded-lg">
              <TintSlider
                label="Front Windshield"
                value={frontTintPercent}
                onChange={onFrontTintChange}
                icon={<div className="w-3 h-3 bg-primary rounded-full" />}
              />

              <TintSlider
                label="Rear Windshield"
                value={backTintPercent}
                onChange={onBackTintChange}
                icon={<div className="w-3 h-3 bg-primary rounded-full" />}
              />
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-black uppercase tracking-wide">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onFrontSideTintChange(35);
                  onRearSideTintChange(35);
                }}
                className="text-xs font-bold"
              >
                Standard (35%)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onFrontSideTintChange(5);
                  onRearSideTintChange(5);
                  onFrontTintChange(5);
                  onBackTintChange(5);
                }}
                className="text-xs font-bold"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WindowTintSidebar;