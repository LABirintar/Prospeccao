import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-text leading-tight mb-4">
          Construindo o Ecossistema Nacional da Educação Integral
        </h1>
        <p className="text-lg md:text-xl text-brand-text-light max-w-3xl mx-auto">
          Somos construtores do ecossistema para a Educação Integral no Brasil. Utilize nossa ferramenta de diagnóstico para mapear seus desafios e descobrir como podemos construir, juntos, uma solução de educação integral de excelência e financeiramente sustentável.
        </p>
      </div>
    </section>
  );
};

export default Hero;