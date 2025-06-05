
import React from 'react';
interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onSelectColor }) => {
  const topRowColors = [
    {
      id: 'white',
      hex: '#F8F8F8',
      svg: '/vehicle-colors/white.svg',
    },
    {
      id: 'black',
      hex: '#0A0A0A',
      svg: '/vehicle-colors/black.svg',
    },
    {
      id: 'gray',
      hex: '#3E3A39',
      svg: '/vehicle-colors/grey.svg',
    },
    {
      id: 'purple',
      hex: '#D5D1CC',
      svg: '/vehicle-colors/move.svg',
    },
  ];

  const bottomRowColors = [
    {
      id: 'red',
      hex: '#9E1B32',
      svg: '/vehicle-colors/red.svg',
    },
    {
      id: 'orange',
      hex: '#E96B3F',
      svg: '/vehicle-colors/orange.svg',
    },
    {
      id: 'green',
      hex: '#7EB26D',
      svg: '/vehicle-colors/green.svg',
    },
    {
      id: 'blue',
      hex: '#0D1A4A',
      svg: '/vehicle-colors/blue.svg',
    },
  ];

  return (
    <div className="bg-white rounded-[15px] md:rounded-md lg:rounded-[20px] shadow-sm p-4 w-full h-auto xl:w-[490px] xl:h-[238px]">
      <div className="flex justify-between items-center md:mb-4">
        <p className="text-[11px] md:text-[13px] uppercase font-bold text-[#18181B]">VEHICLE COLOR</p>
        <button className="text-[10px] md:text-[11px] text-[#9B000E] cursor-default uppercase font-bold">
          SELECT VEHICLE COLOR
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-6 3xl:mt-10 mb-4">
        {topRowColors.map(color => (
          <div
            key={color.id}
            className="flex flex-col items-center gap-1"
          >
            <button
              onClick={() => onSelectColor(color.id)}
              className="focus:outline-none relative"
              aria-label={`Select ${color.id} color`}
            >
              <img
                src={color.svg}
                alt={color.id}
                className={`w-[40px] h-[40px]  3xl:w-[50px] 3xl:h-[50px]`}
              />

              {selectedColor === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-full h-full rounded-full border-2 p-[22px]`}
                    style={{ borderColor: color.hex }}
                  />
                </div>
              )}
            </button>
          </div>
        ))}

        {bottomRowColors.map(color => (
          <div
            key={color.id}
            className="flex flex-col items-center gap-1"
          >
            <button
              onClick={() => onSelectColor(color.id)}
              className="focus:outline-none relative"
              aria-label={`Select ${color.id} color`}
            >
              <img
                src={color.svg}
                alt={color.id}
                className={`w-[40px] h-[40px]  3xl:w-[50px] 3xl:h-[50px]`}
              />

              {selectedColor === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-full h-full rounded-full border-2 p-[22px]`}
                    style={{ borderColor: color.hex }}
                  />
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
