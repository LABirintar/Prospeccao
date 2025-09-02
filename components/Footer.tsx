
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} LABirintar. Todos os direitos reservados.</p>
        <p className="text-sm">Construindo o ecossistema da Educação Integral.</p>
      </div>
    </footer>
  );
};

export default Footer;
