
import { useState } from 'react';
import { Button } from './ui/button';
import ModalSubmitSelection, { TintData } from './custom/ModalSubmitSelection';

interface TintOption {
  value: string;
  percentage: number;
  label: string;
}


export default function WindowTintSelector({
  frontTintPercent,
  backTintPercent,
  frontSideTintPercent,
  rearSideTintPercent,
  tintType,
  ppfOption,
  carColor,
  vehicleType
}: TintData) {
  console.log(frontTintPercent, "fronttt")
  console.log(frontTintPercent, "front windiws")
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);

  const tintOptions: TintOption[] = [
    { value: 'Front Windows Tint', percentage: frontSideTintPercent, label: 'Front Windows Tint' },
    { value: 'REAR Windows Tint', percentage: rearSideTintPercent, label: 'REAR Windows Tint' },
    { value: 'Front WindSheild Tint', percentage: frontTintPercent, label: 'Front WindSheild Tint' },
  ];

  const tintData = {
    frontTintPercent,
    rearSideTintPercent,
    backTintPercent,
    frontSideTintPercent,
    tintType,
    ppfOption,
    carColor,
    vehicleType
  };


  return (
    <>
      <div className="max-3xl:hidden  2xl:absolute 2xl:right-10 2xl:bottom-2">
        <div
          className={`rounded-[20px] overflow-hidden mb-4 2xl:w-[464px] 3xl:max-w-[464px] h-[384px] shadow-lg`}
          style={{ background: 'linear-gradient(to bottom, #FBFF881C, #F9FD81)' }}
        >
          <div className="p-6 space-y-2 ">
            {tintOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center  space-x-3 transition-all duration-200  p-1 rounded-lg"
                onClick={() => setSelectedOption(option.value)}
              >
                <div
                  className={`flex items-center justify-center w-[27px] h-[27px] rounded-full border border-[#18181B] transition-all duration-200 ${selectedOption === option.value ? 'bg-white bg-opacity-40 shadow-md' : 'bg-transparent'
                    }`}
                >
                  <span className="text-[10px] text-[#18181B] font-bold">{option.percentage}%</span>
                </div>
                <span className={`text-[12px] md:text-[13px] text-[#18181B] font-normal`}>
                  {option.label}
                </span>
              </div>
            ))}
            <div className="space-y-5 pl-2 text-sm mb-6">
              <div className="flex gap-6">
                <span className="font-normal">Type : </span>
                <span className="font-semibold">{tintData.vehicleType}</span>
              </div>
              <div className="flex gap-6">
                <span className="font-normal">Film Type : </span>
                <span className="font-semibold">{tintData.tintType.replace("-", " ").toUpperCase()}</span>
              </div>
              <div className="flex gap-6">
                <span className="font-normal">PPF : </span>
                <span className="font-semibold">{tintData.ppfOption === 'no' ? 'NO' : tintData.ppfOption.replace("-", " ").toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={() => setModalOpen(true)}
          style={{ background: '#F9FD81' }}
          className={`rounded-[20px] w-full overflow-hidden h-[68px] flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 transform  hover:scale-105`}

        >
          <p className='relative z-10 text-[#18181B] text-[14px] font-bold'>

            Submit Selection
          </p>
        </Button>
        <ModalSubmitSelection
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          tintData={tintData}
        />

        <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
      </div>
      <button
        onClick={() => setModalOpen(true)}
        className="fixed 3xl:hidden z-10 bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-yellow-300 shadow-md text-black"
        aria-label="Tint information"
      >
        <img src="/excemlation-mark.svg" alt="Autobahn" className="w-[10px] h-[20px]" />

      </button>
    </>
  );
}