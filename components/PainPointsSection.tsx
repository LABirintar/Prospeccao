
import React from 'react';
import { PAIN_POINTS } from '../constants';
import { PainPoint } from '../types';
import { CheckCircleIcon } from './icons';

interface PainPointsSectionProps {
  selectedPainPointIds: string[];
  onSelectPainPoint: (id: string) => void;
  selectedDetails: Record<string, string[]>;
  onSelectDetail: (painPointId: string, detail: string) => void;
}

const PainPointCard: React.FC<{
  painPoint: PainPoint;
  isSelected: boolean;
  onSelect: (id: string) => void;
  selectedDetails: string[];
  onSelectDetail: (painPointId: string, detail: string) => void;
}> = ({ painPoint, isSelected, onSelect, selectedDetails, onSelectDetail }) => {
  const { id, category, title, shortDescription, details, icon: Icon } = painPoint;
  
  const cardClasses = `
    p-6 rounded-xl border-2 transition-all duration-300 flex flex-col h-full
    ${isSelected 
      ? 'bg-lab-lavender/30 border-brand-primary shadow-xl scale-105' 
      : 'bg-white border-gray-200 hover:shadow-lg hover:border-lab-blue'
    }
  `;
  const iconColor = isSelected ? 'text-brand-primary' : 'text-brand-secondary';

  const handleDetailClick = (e: React.MouseEvent, detail: string) => {
    e.stopPropagation(); // Prevent card from being deselected when clicking a detail
    onSelectDetail(id, detail);
  };

  return (
    <div className={cardClasses} onClick={() => onSelect(id)}>
      <div className="flex items-center mb-4 cursor-pointer">
        <Icon className={`w-10 h-10 mr-4 ${iconColor}`} />
        <span className={`font-semibold text-sm uppercase tracking-wider ${isSelected ? 'text-brand-primary' : 'text-gray-500'}`}>{category}</span>
      </div>
      <h3 className="text-xl font-bold text-brand-text mb-2 cursor-pointer">{title}</h3>
      <p className="text-brand-text-light text-sm flex-grow cursor-pointer">{shortDescription}</p>
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-brand-primary/20">
            <p className="text-sm font-semibold text-brand-text mb-2">Marque os pontos específicos:</p>
            <ul className="space-y-1 text-left text-brand-text-light text-sm">
                {details.map((detail, index) => {
                    const isDetailSelected = selectedDetails?.includes(detail);
                    return (
                        <li 
                            key={index} 
                            className={`flex items-start p-2 rounded-md cursor-pointer transition-colors ${isDetailSelected ? 'bg-lab-blue/30' : 'hover:bg-lab-blue/20'}`}
                            onClick={(e) => handleDetailClick(e, detail)}
                        >
                            <CheckCircleIcon className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 transition-colors ${isDetailSelected ? 'text-brand-primary' : 'text-gray-300'}`} />
                            <span>{detail}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
      )}
    </div>
  );
};

const PainPointsSection: React.FC<PainPointsSectionProps> = ({ selectedPainPointIds, onSelectPainPoint, selectedDetails, onSelectDetail }) => {
  return (
    <section id="diagnostico" className="py-20 bg-brand-bg-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mapeamento dos Desafios</h2>
          <p className="text-lg text-brand-text-light max-w-3xl mx-auto">
            A seguir, apresentamos um inventário de dores documentado a partir de nossa pesquisa e atuação junto a diversas escolas. Selecione as categorias que ressoam com sua realidade e, dentro delas, marque os pontos específicos para um diagnóstico preciso.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {PAIN_POINTS.map(pp => (
             <PainPointCard 
                key={pp.id}
                painPoint={pp}
                isSelected={selectedPainPointIds.includes(pp.id)}
                onSelect={onSelectPainPoint}
                selectedDetails={selectedDetails[pp.id] || []}
                onSelectDetail={onSelectDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;