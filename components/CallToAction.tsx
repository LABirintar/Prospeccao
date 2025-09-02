import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section id="cocriar" className="py-24 bg-lab-blue/20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-text leading-tight mb-4">
          Podemos cocriar as soluções para a sua escola?
        </h2>
        <p className="text-lg md:text-xl text-brand-text-light max-w-3xl mx-auto mb-8">
          Você gostaria que nossos especialistas entrassem em contato pelo WhatsApp que você forneceu para entender melhor sua realidade e, a partir daí, agendar uma conversa estratégica sobre como podemos cocriar as soluções para as dores da sua escola?
        </p>
        <button
            className="bg-brand-primary text-white font-bold py-4 px-12 rounded-full hover:bg-red-500 transition-all duration-300 text-xl transform hover:scale-105 shadow-lg"
        >
            Sim, quero agendar uma conversa
        </button>
      </div>
    </section>
  );
};

export default CallToAction;