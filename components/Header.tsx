
import React from 'react';
import { Logo } from './Logo';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-center items-center">
        <Logo className="h-12" />
      </div>
    </header>
  );
};

export default Header;