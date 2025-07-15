import { Car } from "lucide-react";

export const CarCustomizationLoader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#9B000E] via-black to-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full  bg-gradient-to-br from-gray-400 to-gray-600 opacity-30"></div>
            <div className="absolute inset-0 rounded-full  bg-gradient-to-br from-[#9B000E] via-black to-black opacity-40 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-white opacity-20 animate-ping"></div>

            <div className="relative z-10 w-full p-3 h-full rounded-full flex items-center justify-center">
              <Car className="w-full h-full text-white" />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-6">
          {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'].map((color, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${color} opacity-70`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animation: 'colorPulse 2s ease-in-out infinite'
              }}
            />
          ))}
        </div>

        <div className="text-xl font-medium tracking-wide mb-4 bg-gradient-to-l to-[#9B000E] from-black via-white text-transparent bg-clip-text">
          {message}
        </div>

        <div className="flex justify-center items-center space-x-6 mb-6">
          <div className="text-center">
            <div className="w-8 h-6 bg-gradient-to-b from-transparent to-gray-800 rounded-sm mb-1 animate-pulse"></div>
            <div className="text-white text-xs font-mono">TINT</div>
          </div>

          <div className="text-center">
            <div className="w-8 h-6 bg-gradient-to-br to-[#9B000E] via-black to-from rounded-sm mb-1 animate-pulse"></div>
            <div className="text-white text-xs font-mono">PAINT</div>
          </div>

          <div className="text-center">
            <div className="w-8 h-6 bg-gradient-to-br from-transparent via-white to-transparent opacity-30 rounded-sm mb-1 animate-pulse"></div>
            <div className="text-white text-xs font-mono">PPF</div>
          </div>
        </div>
      </div>
    </div>
  );
};