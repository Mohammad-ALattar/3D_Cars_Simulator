import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { X, Settings, Car, Shield, Sun, Zap, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WindowTintSidebarProps {
  frontTintPercent: number;
  frontSideTintPercent: number;
  rearSideTintPercent: number;
  backTintPercent: number;
  tintType: { id: string; label: string; subLabel: string };
  onFrontTintChange: (value: number) => void;
  onFrontSideTintChange: (value: number) => void;
  onRearSideTintChange: (value: number) => void;
  onBackTintChange: (value: number) => void;
  onTintTypeChange: ({ id, label, subLabel }: { id: string; label: string; subLabel: string }) => void;
}

const tintTypes = [
  { id: 'black-vlt', label: 'STANDARD', subLabel: 'Black' },
  { id: 'black-ceramic', label: 'PREMIUM', subLabel: 'Black Ceramic' },
  { id: 'i3-ceramic', label: 'PREMIUM PLUS', subLabel: 'Ceramic I3' },
  { id: 'air-ceramic', label: 'ADVANCED', subLabel: 'Ceramic I3 Plus' }
];

const tintSpecs = {
  'black-vlt': {
    title: 'STANDARD',
    subTitle: 'Black',
    specs: [
      { icon: <Shield className="w-4 h-4" />, label: 'UV Rejection', value: '> 99%' },
      { icon: <Sun className="w-4 h-4" />, label: 'Heat Rejection (TSER)', value: '30–43%' },
      { icon: <Car className="w-4 h-4" />, label: 'Technology', value: 'Deep-dyed true black' },
      { icon: <Zap className="w-4 h-4" />, label: 'Signal', value: 'No interference' },
      { icon: <Award className="w-4 h-4" />, label: 'Benefits', value: 'Budget-friendly style & privacy' }
    ],
    gradient: 'from-gray-600 to-gray-800'
  },
  'black-ceramic': {
    title: 'PREMIUM',
    subTitle: 'Black Ceramic',
    specs: [
      { icon: <Shield className="w-4 h-4" />, label: 'UV Rejection', value: '> 99%' },
      { icon: <Sun className="w-4 h-4" />, label: 'Heat Rejection (TSER)', value: '50–63%' },
      { icon: <Car className="w-4 h-4" />, label: 'Technology', value: 'Nano-ceramic technology' },
      { icon: <Award className="w-4 h-4" />, label: 'Clarity', value: 'Excellent clarity & glare reduction' },
      { icon: <Zap className="w-4 h-4" />, label: 'Signal', value: 'No interference' }
    ],
    gradient: 'from-blue-600 to-blue-800'
  },
  'i3-ceramic': {
    title: 'PREMIUM PLUS',
    subTitle: 'Ceramic I3',
    specs: [
      { icon: <Shield className="w-4 h-4" />, label: 'UV Rejection', value: '> 99%' },
      { icon: <Sun className="w-4 h-4" />, label: 'Heat Rejection (TSER)', value: '56–71%' },
      { icon: <Sun className="w-4 h-4" />, label: 'IR Rejection', value: '~93%' },
      { icon: <Car className="w-4 h-4" />, label: 'Technology', value: 'Premium multi-layer ceramic' },
      { icon: <Award className="w-4 h-4" />, label: 'Warranty', value: 'Fade-resistant, lifetime warranty' }
    ],
    gradient: 'from-purple-600 to-purple-800'
  },
  'air-ceramic': {
    title: 'ADVANCED',
    subTitle: 'Ceramic I3 Plus',
    specs: [
      { icon: <Shield className="w-4 h-4" />, label: 'UV Rejection', value: '> 99%' },
      { icon: <Sun className="w-4 h-4" />, label: 'IR Rejection', value: 'High 90%+' },
      { icon: <Car className="w-4 h-4" />, label: 'Technology', value: 'Advanced nano-ceramic tech' },
      { icon: <Award className="w-4 h-4" />, label: 'Performance', value: 'Maximum comfort & solar rejection' },
      { icon: <Award className="w-4 h-4" />, label: 'Warranty', value: 'Fade-resistant, lifetime warranty' }
    ],
    gradient: 'from-emerald-600 to-emerald-800'
  }
};

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
  const [showSpecCard, setShowSpecCard] = useState(false);

  const snapToClosestMarker = (val: number) => {
    return tintMarkers.reduce((prev, curr) => {
      return Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev;
    });
  };

  const handleTintTypeChange = (type: string, label: string, subLabel: string) => {
    console.log(type, label, subLabel);
    onTintTypeChange({ id: type, label, subLabel });
    setShowSpecCard(true);
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
              onClick={() => onChange(100)}
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

  const currentSpec = tintSpecs[tintType.id as keyof typeof tintSpecs];

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
        <span className="ml-2 lg:block hidden font-semibold ">Window Tint</span>
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0  z-50 "
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "fixed top-0 left-0 h-full bg-white/30 backdrop-blur-lg border-r border-border shadow-2xl z-50 transition-transform duration-300 ease-out overflow-y-auto",
        "w-96",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 space-y-6">
          <div className="flex items-center rounded-lg justify-between bg-white !text-[#9B000E]">
            <div className="flex items-center gap-3 p-2">
              <Car className="h-8 w-8 opacity-95" />
              <h2 className="text-xl font-bold">Window Tint</h2>
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
                  onClick={() => handleTintTypeChange(type.id, type.label, type.subLabel)}
                  className={cn(
                    "p-3 rounded-lg border text-center transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    tintType.id === type.id
                      ? 'bg-[#9B000E] text-white border-[#9B000E] shadow-lg transform scale-105'
                      : 'bg-[#f1f1f1] text-black !border-[#18181B] hover:bg-gray-200'
                  )}
                >
                  <div className='flex flex-col gap-2'>
                    <p className="text-[12px] font-bold mt-1">
                      {type.label}
                    </p>
                    <p className="text-[12px] font-bold mt-1">
                      {type.subLabel}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

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
                label="Front Two Windows"
                value={frontSideTintPercent}
                onChange={onFrontSideTintChange}
                icon={<div className="w-3 h-3 bg-[#9B000E] rounded-full" />}
              />

              <TintSlider
                label="Rear Three Windows"
                value={rearSideTintPercent}
                onChange={onRearSideTintChange}
                icon={<div className="w-3 h-3 bg-[#9B000E] rounded-full" />}
              />
            </TabsContent>

            <TabsContent value="windshield" className="space-y-6 mt-6 bg-white p-4 rounded-lg">
              <TintSlider
                label="Windshield"
                value={frontTintPercent}
                onChange={onFrontTintChange}
                icon={<div className="w-3 h-3 bg-[#9B000E] rounded-full" />}
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
                className="text-xs font-bold hover:scale-105 transition-transform"
              >
                Standard (35%)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onFrontSideTintChange(100);
                  onRearSideTintChange(100);
                  onFrontTintChange(100);
                  onBackTintChange(100);
                }}
                className="text-xs font-bold hover:scale-105 transition-transform"
              >
                Clear All
              </Button>
            </div>

            {/* Toggle spec card button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSpecCard(!showSpecCard)}
              className="w-full text-xs font-bold hover:scale-105 transition-transform !bg-[#9B000E] !text-white hover:bg-[#7a0009]"
            >
              {showSpecCard ? 'Hide' : 'Show'} Specifications
            </Button>
          </div>
        </div>
      </div>

      {/* Specification Card - Outside Sidebar */}
      {isOpen  && showSpecCard && (
        <div className="fixed inset-0  flex items-center justify-center lg:right-8 lg:top-14 lg:justify-end lg:z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <div className={cn(
              "relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br w-96 max-w-[90vw]",
              currentSpec?.gradient,
              "border border-white/20 animate-in fade-in slide-in-from-bottom-10 "
            )}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
              <button
                onClick={() => setShowSpecCard(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 flex items-center justify-center hover:scale-110"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="relative p-8 text-white">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                    <Car className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{currentSpec?.title}</h3>
                    <p className="text-2xl font-bold mb-1">{currentSpec?.subTitle}</p>
                    <p className="text-white/80 text-sm">Premium Protection Specifications</p>
                  </div>
                </div>

                <div className=" gap-2 grid grid-cols-2 justify-items-center">
                  {currentSpec?.specs.map((spec, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col justify-center items-center gap-2 p-2 h-full w-full  rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300",
                        "hover:bg-white/20 hover:scale-105 hover:shadow-lg"
                      )}
                      style={{
                        animationDelay: `${index * 150}ms`,
                        animation: showSpecCard ? 'slideInFromLeft 0.6s ease-out forwards' : 'none'
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ">
                        {spec.icon}
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-base mb-1">{spec.label}</p>
                        <p className="text-white/90 text-sm font-medium">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Premium badge */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default WindowTintSidebar;