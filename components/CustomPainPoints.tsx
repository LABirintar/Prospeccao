
import React from 'react';
import { PlusCircleIcon } from './icons';

interface CustomPainPointsProps {
  customPainText: string;
  onCustomPainChange: (value: string) => void;
  userName: string;
  onUserNameChange: (value: string) => void;
  schoolName: string;
  onSchoolNameChange: (value: string) => void;
  whatsAppNumber: string;
  onWhatsAppChange: (value: string) => void;
  onGenerateReport: () => void;
  isSubmitting: boolean;
}

const CustomPainPoints: React.FC<CustomPainPointsProps> = ({ 
  customPainText, 
  onCustomPainChange, 
  userName,
  onUserNameChange,
  schoolName,
  onSchoolNameChange,
  whatsAppNumber,
  onWhatsAppChange,
  onGenerateReport, 
  isSubmitting 
}) => {
  return (
    <section id="custom-pains" className="pb-20 pt-10 bg-brand-bg-light">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="text-center mb-6">
             <div className="flex justify-center items-center mb-4">
                <PlusCircleIcon className="w-12 h-12 text-brand-secondary" />
             </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Contribua com sua Perspectiva</h2>
            <p className="text-brand-text-light">
              A construção deste ecossistema é colaborativa. Se há desafios em sua escola que não foram contemplados, descreva-os. Sua visão é fundamental para criarmos soluções relevantes.
            </p>
          </div>
          <textarea
            className="w-full h-32 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
            placeholder="Ex: Dificuldade em engajar a comunidade de pais, falta de projetos interdisciplinares, etc."
            value={customPainText}
            onChange={(e) => onCustomPainChange(e.target.value)}
          ></textarea>
          
          <div className="mt-8 space-y-4">
            <div className="text-center">
                <label htmlFor="name" className="block font-semibold text-brand-text mb-2">Seu Nome</label>
                <input
                  type="text"
                  id="name"
                  className="w-full max-w-sm mx-auto block p-3 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
                  placeholder="Nome e Sobrenome"
                  value={userName}
                  onChange={(e) => onUserNameChange(e.target.value)}
                  required
                />
            </div>
             <div className="text-center">
                <label htmlFor="school" className="block font-semibold text-brand-text mb-2">Nome da Escola</label>
                <input
                  type="text"
                  id="school"
                  className="w-full max-w-sm mx-auto block p-3 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
                  placeholder="Colégio Exemplo"
                  value={schoolName}
                  onChange={(e) => onSchoolNameChange(e.target.value)}
                  required
                />
            </div>
            <div className="text-center">
                <label htmlFor="whatsapp" className="block font-semibold text-brand-text mb-2">Seu WhatsApp para receber o relatório em PDF</label>
                <input
                  type="tel"
                  id="whatsapp"
                  className="w-full max-w-sm mx-auto block p-3 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
                  placeholder="(XX) XXXXX-XXXX"
                  value={whatsAppNumber}
                  onChange={(e) => onWhatsAppChange(e.target.value)}
                  required
                />
            </div>
          </div>

           <div className="text-center mt-8">
            <button
                onClick={onGenerateReport}
                disabled={isSubmitting}
                className="bg-brand-primary text-white font-bold py-3 px-12 rounded-full hover:bg-red-500 transition-all duration-300 text-lg transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isSubmitting ? 'Enviando Dados...' : 'Gerar Relatório e Enviar'}
            </button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPainPoints;