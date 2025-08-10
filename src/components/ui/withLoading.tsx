
export const CarCustomizationLoader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0  via-black to-black flex items-center xl:mb-36 justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="mx-auto mb-4 text-center relative flex justify-center">
            <div className="absolute inset-0 rounded-full opacity-30"></div>
            <div className="absolute inset-0 rounded-full via-black to-black opacity-40 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-white opacity-20 animate-ping"></div>

            <img src="/autobahn-logo.svg" alt="Car Loader" className="w-[200px] h-[200px] rounded-full mx-auto" />
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

        <div className="text-xl font-medium tracking-wide mb-4 bg-gradient-to-l to-[#9B000E] from-black  text-transparent bg-clip-text">
          {message}
        </div>
      </div>
    </div>
  );
};