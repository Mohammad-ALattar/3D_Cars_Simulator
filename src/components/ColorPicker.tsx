import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { Button } from './ui/button';

interface ColorPickerSidebarProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPickerSidebar: React.FC<ColorPickerSidebarProps> = ({ selectedColor, onSelectColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    {
      id: 'white',
      name: 'White',
      hex: '#F8F8F8',
      svg: '/vehicle-colors/white.svg',
    },
    {
      id: 'black',
      name: 'Black',
      hex: '#0A0A0A',
      svg: '/vehicle-colors/black.svg',
    },
    {
      id: 'gray',
      name: 'Gray',
      hex: '#3E3A39',
      svg: '/vehicle-colors/grey.svg',
    },
    {
      id: 'purple',
      name: 'Purple',
      hex: '#D5D1CC',
      svg: '/vehicle-colors/move.svg',
    },
    {
      id: 'red',
      name: 'Red',
      hex: '#9E1B32',
      svg: '/vehicle-colors/red.svg',
    },
    {
      id: 'orange',
      name: 'Orange',
      hex: '#E96B3F',
      svg: '/vehicle-colors/orange.svg',
    },
    {
      id: 'green',
      name: 'Green',
      hex: '#7EB26D',
      svg: '/vehicle-colors/green.svg',
    },
    {
      id: 'blue',
      name: 'Blue',
      hex: '#0D1A4A',
      svg: '/vehicle-colors/blue.svg',
    },
  ];

  const handleColorSelect = (colorId: string) => {
    onSelectColor(colorId);
    setIsOpen(false);
  };

  const selectedColorData = colors.find(color => color.id === selectedColor);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0  bg-black/30 backdrop-blur-[2px] z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="group  relative border-2 border-white  rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Open color picker"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Palette className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {selectedColorData && (
              <div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background"
                style={{ backgroundColor: selectedColorData.hex }}
              />
            )}
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Vehicle Color
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedColorData?.name || 'Select Color'}
            </p>
          </div>
        </div>
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-color-picker border-l border-color-picker-border shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-color-picker-border">
          <div>
            <h2 className="text-lg font-bold text-foreground">Vehicle Color</h2>
            <p className="text-sm text-black">Choose your vehicle's color</p>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            className="rounded-full !bg-white w-8 h-8 p-0"
            aria-label="Close color picker"
          >
            <X className="w-5 h-5 text-black" />
          </Button>
        </div>

        {/* Color Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorSelect(color.id)}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none ${selectedColor === color.id
                    ? 'border-primary bg-color-picker-accent'
                    : ` bg-background hover:border-primary/30 hover:bg-color-picker-hover`
                  }`}
                style={selectedColor === color.id ? { borderColor: color.hex } : {}}
                aria-label={`Select ${color.name} color`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <img
                      src={color.svg}
                      alt={color.name}
                      className="w-9 h-9 transition-transform group-hover:scale-110"
                    />
                    {selectedColor === color.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-full h-full rounded-full border-2"
                          style={{ borderColor: color.hex }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{color.name}</p>
                    <div
                      className="w-6 h-2 rounded-full mx-auto mt-1 border border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Current Selection */}
          {selectedColorData && (
            <div className="mt-6 p-4 bg-color-picker-accent rounded-xl border border-color-picker-border">
              <div className="flex items-center gap-3">
                <img
                  src={selectedColorData.svg}
                  alt={selectedColorData.name}
                  className="w-8 h-8"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Selected: {selectedColorData.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedColorData.hex}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ColorPickerSidebar;