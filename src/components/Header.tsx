
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="max-md:mb-8 flex items-center max-md:place-content-center justify-between w-full pt-8 px-10">
      <div className="w-[114px] md:w-40">
        <img src="/autobahn-logo.svg" alt="Autobahn" className="  md:w-full md:h-full" />
      </div>
      <div className="text-xs text-gray-500 text-right hidden md:block">
        <p className='text-[11px] font-normal text-[#18181B]'>© 2025 Autobahn Performance Films</p>
        <p className='text-[11px] font-normal text-[#18181B]'>Powered by 69toolz.com</p>
      </div>
    </header>
  );
};

export default Header;
