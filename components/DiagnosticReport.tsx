
import React, { useMemo } from 'react';
import { SOLUTIONS, PAIN_POINTS } from '../constants';
import { CheckCircleIcon, DocumentTextIcon, MiniCheckIcon } from './icons';

interface DiagnosticReportProps {
  selectedPainPointIds: string[];
  selectedDetails: Record<string, string[]>;
  customPainText: string;
  userName: string;
  schoolName: string;
  whatsAppNumber: string;
}

const DiagnosticReport: React.FC<DiagnosticReportProps> = ({ selectedPainPointIds, selectedDetails, customPainText, userName, schoolName, whatsAppNumber }) => {
  
  const selectedPainPoints = useMemo(() => {
    return PAIN_POINTS.filter(pp => selectedPainPointIds.includes(pp.id));
  }, [selectedPainPointIds]);
  
  const recommendedSolutions = useMemo(() => {
    if (selectedPainPointIds.length === 0) {
      return customPainText.trim() !== '' ? SOLUTIONS.filter(s => s.id === 'sol_all_in_one') : [];
    }
    const uniqueSolutions = new Set<string>();
    selectedPainPointIds.forEach(painId => {
        SOLUTIONS.forEach(sol => {
            if(sol.relatedPainPointIds.includes(painId)){
                uniqueSolutions.add(sol.id);
            }
        })
    });
    return Array.from(uniqueSolutions).map(id => SOLUTIONS.find(s => s.id === id)!);
  }, [selectedPainPointIds, customPainText]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
                <DocumentTextIcon className="w-16 h-16 text-brand-primary"/>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seu Relatório de Diagnóstico</h2>
            <p className="text-lg text-brand-text-light max-w-3xl mx-auto">
                Este é um resumo dos desafios identificados para <span className="font-semibold text-brand-text">{userName}</span> da escola <span className="font-semibold text-brand-text">{schoolName}</span>.
            </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-brand-bg-light p-8 rounded-2xl shadow-lg border border-gray-200">
            {selectedPainPoints.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-brand-text mb-4 border-b-2 border-lab-peach pb-2">Desafios Mapeados</h3>
                    <div className="space-y-4">
                        {selectedPainPoints.map(pp => (
                            <div key={pp.id} className="p-3 bg-white rounded-md shadow-sm">
                                <div className="flex items-start">
                                    <pp.icon className="w-8 h-8 mr-4 text-brand-secondary flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-brand-text">{pp.title}</p>
                                        <p className="text-sm text-brand-text-light">{pp.shortDescription}</p>
                                    </div>
                                </div>
                                {selectedDetails[pp.id] && selectedDetails[pp.id].length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h4 className="font-semibold text-sm text-brand-text mb-2">Pontos específicos selecionados:</h4>
                                        <ul className="space-y-1 pl-1">
                                            {selectedDetails[pp.id].map((detail, index) => (
                                                <li key={index} className="flex items-start text-sm text-brand-text-light">
                                                    <MiniCheckIcon className="w-4 h-4 mr-2 mt-0.5 text-brand-primary flex-shrink-0"/>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {customPainText.trim() && (
                 <div className="mb-8">
                    <h3 className="text-2xl font-bold text-brand-text mb-4 border-b-2 border-lab-peach pb-2">Perspectivas Adicionais da Escola</h3>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <p className="text-brand-text-light whitespace-pre-wrap">{customPainText}</p>
                    </div>
                </div>
            )}
            
            {recommendedSolutions.length > 0 && (
                <div>
                    <h3 className="text-2xl font-bold text-brand-text mb-2 border-b-2 border-lab-peach pb-2">Linhas de Solução Construídas com o Ecossistema</h3>
                     <p className="text-brand-text-light text-sm mb-6">Nossas linhas de solução foram desenhadas a partir da escuta ativa e da colaboração com gestores, educadores e especialistas, refletindo os aprendizados de nossa pesquisa viva no ecossistema escolar.</p>
                    <div className="space-y-4">
                         {recommendedSolutions.map((solution) => (
                            <div key={solution.id} className="bg-lab-peach/30 p-4 rounded-lg border border-lab-orange/50">
                                <div className="flex items-start">
                                    <CheckCircleIcon className="w-10 h-10 text-brand-primary mr-4 flex-shrink-0"/>
                                    <div>
                                    <h4 className="text-lg font-bold text-brand-primary">{solution.title}</h4>
                                    <p className="text-brand-text-light">{solution.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticReport;