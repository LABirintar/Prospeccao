
import React from 'react';
import { PAIN_POINTS } from '../constants';
import { PainPoint } from '../types';
import { CheckCircleIcon, EmptyCircleIcon } from './icons';

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
    p-6 rounded-xl border-2 transition-all duration-300 flex flex-col h-full cursor-pointer group
    ${isSelected 
      ? 'bg-lab-lavender/30 border-brand-primary shadow-xl -translate-y-1' 
      : 'bg-white border-gray-200 hover:shadow-lg hover:border-lab-blue hover:-translate-y-1'
    }
  `;
  const iconColor = isSelected ? 'text-brand-primary' : 'text-brand-secondary';

  const handleDetailClick = (e: React.MouseEvent, detail: string) => {
    e.stopPropagation(); // Prevent card from being deselected when clicking a detail
    onSelectDetail(id, detail);
  };

  return (
    <div className={cardClasses} onClick={() => onSelect(id)}>
      <div className="flex items-center mb-4">
        <Icon className={`w-10 h-10 mr-4 ${iconColor}`} />
        <span className={`font-semibold text-sm uppercase tracking-wider ${isSelected ? 'text-brand-primary' : 'text-gray-500'}`}>{category}</span>
      </div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-brand-text mr-2">{title}</h3>
        <div className="flex-shrink-0 transition-opacity duration-300">
          {isSelected ? (
              <CheckCircleIcon className="w-8 h-8 text-brand-primary" />
          ) : (
              <EmptyCircleIcon className="w-8 h-8 text-gray-300 group-hover:text-lab-blue" />
          )}
        </div>
      </div>
      
      <p className="text-brand-text-light text-sm flex-grow">{shortDescription}</p>
      
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-brand-primary/20">
            <p className="text-sm font-semibold text-brand-text mb-2">Marque os pontos específicos:</p>
            <ul className="space-y-1 text-left text-brand-text-light text-sm">
                {details.map((detail, index) => {
                    const isDetailSelected = selectedDetails?.includes(detail);
                    return (
                        <li 
                            key={index} 
                            className={`group flex items-start p-2 rounded-md cursor-pointer transition-all duration-200 ${isDetailSelected ? 'bg-lab-blue/30' : 'hover:bg-lab-blue/30 hover:shadow-inner'}`}
                            onClick={(e) => handleDetailClick(e, detail)}
                        >
                             {isDetailSelected ? (
                                <CheckCircleIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 transition-colors text-brand-primary" />
                            ) : (
                                <EmptyCircleIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 transition-colors text-gray-400 group-hover:text-brand-primary/70" />
                            )}
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
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mapeamento dos Desafios</h2>
          <p className="text-xl font-semibold text-brand-text max-w-3xl mx-auto">
            Selecione os cards que ressoam com sua realidade e, dentro deles, marque os pontos específicos para um diagnóstico preciso.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto items-start">
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
