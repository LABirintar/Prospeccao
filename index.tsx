
import React, { useState, useCallback, useRef, useMemo, ComponentType } from 'react';
import ReactDOM from 'react-dom/client';

// --- Types from types.ts ---
interface PainPoint {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  details: string[];
  icon: ComponentType<{ className?: string }>;
}

interface Solution {
  id:string;
  title: string;
  description: string;
  relatedPainPointIds: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  school: string;
}

// --- Icons from components/icons.tsx ---
const FinancialIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 12v-1h4v1m-4-6.99v.01" />
  </svg>
);

const OperationalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PedagogicalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.442V19.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-1.058a3.374 3.374 0 00-1.316-.945l-.547-.547z" />
  </svg>
);

const EngagementIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const MarketIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.89 9.307l1.246-2.493a.75.75 0 011.328 0l1.246 2.493A.75.75 0 0113.81 10.5H10.19a.75.75 0 01-.6-1.193z" />
    </svg>
);

const MiniCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const EmptyCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const DocumentTextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);


// --- Data from constants.ts ---
const PAIN_POINTS: PainPoint[] = [
  {
    id: 'finance_pressure',
    category: 'Financeiro',
    title: 'Sustentabilidade Financeira e Receita',
    shortDescription: 'Pressão para aumentar faturamento, otimizar custos e inovar sem grandes investimentos em espaços e equipamentos.',
    icon: FinancialIcon,
    details: [
        'Manter a escola financeiramente sustentável.',
        'Aumentar o faturamento e diminuir custos.',
        'Atrair e reter alunos com propostas de valor.',
        'Enfrentar concorrência acirrada e baixo ticket médio.',
        'Evitar altos custos com espaços inovadores (makerspaces).',
    ]
  },
  {
    id: 'op_complexity',
    category: 'Operacional',
    title: 'Gestão Operacional e Burocrática',
    shortDescription: 'Gerenciar múltiplos parceiros, processos manuais e a sobrecarga administrativa que afeta a equipe pedagógica.',
    icon: OperationalIcon,
    details: [
        'Gerir múltiplos parceiros com processos descentralizados.',
        'Integrar soluções de gestão fragmentadas (cantina, RH, etc.).',
        'Reduzir a sobrecarga de coordenadores com tarefas administrativas.',
        'Diminuir a alta rotatividade da equipe.',
        'Aliviar a carga administrativa geral de professores e gestores.',
    ]
  },
  {
    id: 'ped_challenge',
    category: 'Pedagógico',
    title: 'Qualidade Educacional e Inovação',
    shortDescription: 'Implementar uma educação integral de qualidade, reter profissionais qualificados e superar a cultura tradicional.',
    icon: PedagogicalIcon,
    details: [
        'Implementar um contraturno que vá além de "ocupar o tempo".',
        'Encontrar e reter profissionais qualificados para atividades específicas.',
        'Atender alunos com dificuldades de aprendizagem.',
        'Implementar metodologias pedagógicas inovadoras.',
        'Lidar com infraestrutura inadequada.',
        'Atender à busca das famílias por desenvolvimento de habilidades humanas.',
    ]
  },
  {
    id: 'eng_difficulty',
    category: 'Engajamento',
    title: 'Engajamento de Alunos e Famílias',
    shortDescription: 'Despertar o interesse dos alunos pelo contraturno e comunicar o valor das atividades extracurriculares às famílias.',
    icon: EngagementIcon,
    details: [
        'Superar a falta de vontade das crianças/adolescentes de permanecer na escola.',
        'Atrair alunos para o contraturno em unidades "defasadas".',
        'Garantir a qualidade e segurança em atividades para o mercado de trabalho.',
        'Documentar e reportar o desenvolvimento dos alunos às famílias.',
    ]
  },
  {
    id: 'market_pressure',
    category: 'Mercado',
    title: 'Pressão de Mercado e Imagem',
    shortDescription: 'Necessidade de se diferenciar da concorrência, gerenciar a imagem institucional e superar barreiras na adoção de novas soluções.',
    icon: MarketIcon,
    details: [
        'Enfrentar intensa concorrência e diferenciar-se sem onerar a operação.',
        'Lidar com a pressão por resultados estatísticos e a reputação da escola.',
        'Superar a barreira de admitir falhas para adotar soluções externas.',
        'Navegar no complexo e demorado processo de venda para escolas.',
    ]
  }
];

const SOLUTIONS: Solution[] = [
  {
    id: 'sol_revenue',
    title: 'Transforme Espaços Ociosos em Centros de Lucro',
    description: 'Nosso modelo de parceria gera receita adicional para sua escola desde o primeiro dia, sem investimento inicial, otimizando o uso de seus espaços.',
    relatedPainPointIds: ['finance_pressure'],
  },
  {
    id: 'sol_ecosystem',
    title: 'Plataforma Única para Gestão Simplificada',
    description: 'Automatizamos matrículas, pagamentos e comunicação. Centralizamos a gestão do contraturno, liberando sua equipe para focar no que realmente importa: a educação.',
    relatedPainPointIds: ['op_complexity'],
  },
  {
    id: 'sol_pedagogy',
    title: 'Curadoria Pedagógica e Educadores de Ponta',
    description: 'Oferecemos um portfólio de atividades inovadoras e uma rede de educadores qualificados, garantindo uma educação integral que desenvolve as habilidades do futuro.',
    relatedPainPointIds: ['ped_challenge'],
  },
  {
    id: 'sol_engagement',
    title: 'Experiências que Encantam Alunos e Famílias',
    description: 'Nossas atividades são desenhadas para serem cativantes e relevantes, aumentando o engajamento dos alunos e fortalecendo o vínculo da família com a escola.',
    relatedPainPointIds: ['eng_difficulty', 'market_pressure'],
  },
  {
    id: 'sol_all_in_one',
    title: 'A Solução Completa: De um "BO" a um Centro de Inovação',
    description: 'A LABirintar não é apenas um fornecedor, é um parceiro estratégico que resolve as dores financeiras, operacionais e pedagógicas em um ecossistema integrado.',
    relatedPainPointIds: ['finance_pressure', 'op_complexity', 'ped_challenge', 'eng_difficulty', 'market_pressure'],
  },
];

const TESTIMONIALS: Testimonial[] = [
    {
        quote: "A proposta da Labirintar é encantadora. É uma forma de 'sair da caixinha', algo que a diretoria da escola também enfatiza. Apesar da insegurança inicial com o novo, estamos maravilhados.",
        author: "Adrieli Ferreira",
        role: "Representante",
        school: "Escola Builders",
    },
    {
        quote: "O software da Labirintar desperta grande interesse. Escolas buscam soluções que facilitem a gestão e a captação de matrículas. O valor percebido no produto e software é imediato.",
        author: "Diretor",
        role: "Depoimento Anônimo",
        school: "Colégio Sagrado Coração",
    },
    {
        quote: "A tecnologia oferecida pela Labirintar atende às necessidades de grandes instituições, validando o sistema para operações complexas e de alto volume de alunos.",
        author: "Gestão",
        role: "Validação Operacional",
        school: "Escola Force",
    },
];


// --- CONFIGURATION ---
// Insira o caminho para o seu arquivo de logo aqui. Ex: 'images/meu-logo.svg'
const LOGO_IMAGE_PATH = 'components/IMG_4984.png'; 
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyHGM_KL29i_VBETUYstMrUF-fcye_KRoIaYpK6IlOq0aHheXda3M6x-b-1KQ0EH8bu/exec';


// --- Components ---

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return <img src={LOGO_IMAGE_PATH} alt="LABirintar Logo" className={className} />;
};

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-center items-center">
        <Logo className="h-12" />
      </div>
    </header>
  );
};

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
    p-6 rounded-xl border-2 transition-all duration-300 flex flex-col h-full cursor-pointer relative group
    ${isSelected 
      ? 'bg-lab-lavender/30 border-brand-primary shadow-xl scale-105' 
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
      <div className="absolute top-4 right-4 transition-opacity duration-300">
        {isSelected ? (
            <CheckCircleIcon className="w-8 h-8 text-brand-primary" />
        ) : (
            <EmptyCircleIcon className="w-8 h-8 text-gray-300 group-hover:text-lab-blue" />
        )}
      </div>

      <div className="flex items-center mb-4">
        <Icon className={`w-10 h-10 mr-4 ${iconColor}`} />
        <span className={`font-semibold text-sm uppercase tracking-wider ${isSelected ? 'text-brand-primary' : 'text-gray-500'}`}>{category}</span>
      </div>
      <h3 className="text-xl font-bold text-brand-text mb-2">{title}</h3>
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
                <label htmlFor="whatsapp" className="block font-semibold text-brand-text mb-2">Seu WhatsApp</label>
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

const SocialProof: React.FC = () => {
  return (
    <section className="py-20 bg-brand-bg-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolas como a sua já confiam na LABirintar</h2>
          <p className="text-lg text-brand-text-light max-w-2xl mx-auto">
            Veja o que nossos parceiros dizem sobre a jornada de transformação.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg flex flex-col">
              <div className="text-5xl text-lab-blue font-bold mb-4">“</div>
              <p className="text-brand-text-light mb-6 flex-grow italic">
                {testimonial.quote}
              </p>
              <div className="mt-auto">
                <p className="font-bold text-brand-text">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface CallToActionProps {
  onConfirm: () => void;
  isSubmitting: boolean;
}

const CallToAction: React.FC<CallToActionProps> = ({ onConfirm, isSubmitting }) => {
  return (
    <section id="cocriar" className="py-24 bg-lab-blue/20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-text leading-tight mb-4">
          Vamos cocriar as soluções para a sua escola!
        </h2>
        <p className="text-lg md:text-xl text-brand-text-light max-w-3xl mx-auto mb-8">
          Você gostaria que nossos especialistas entrassem em contato pelo WhatsApp que você forneceu para entender melhor sua realidade e, a partir daí, agendar uma conversa estratégica sobre como podemos cocriar as soluções para as dores da sua escola?
        </p>
        <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="bg-brand-primary text-white font-bold py-4 px-12 rounded-full hover:bg-red-500 transition-all duration-300 text-xl transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
        >
            {isSubmitting ? 'Enviando...' : 'Sim, quero agendar uma conversa'}
        </button>
      </div>
    </section>
  );
};

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

// --- Main App Component (from App.tsx) ---

const App: React.FC = () => {
  const [selectedPainPointIds, setSelectedPainPointIds] = useState<string[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<Record<string, string[]>>({});
  const [customPainText, setCustomPainText] = useState('');
  const [userName, setUserName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCtaSubmitting, setIsCtaSubmitting] = useState(false);
  
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePainPointSelect = useCallback((id: string) => {
    setSelectedPainPointIds(prev => 
      prev.includes(id)
        ? prev.filter(pid => pid !== id)
        : [...prev, id]
    );
    // Also clear details when deselecting a category
    if (selectedPainPointIds.includes(id)) {
      setSelectedDetails(prev => {
        const newDetails = { ...prev };
        delete newDetails[id];
        return newDetails;
      });
    }
  }, [selectedPainPointIds]);
  
  const handleDetailSelect = useCallback((painPointId: string, detail: string) => {
    setSelectedDetails(prev => {
      const currentDetails = prev[painPointId] || [];
      const newDetails = currentDetails.includes(detail)
        ? currentDetails.filter(d => d !== detail)
        : [...currentDetails, detail];
      return { ...prev, [painPointId]: newDetails };
    });
  }, []);

  const handleGenerateReport = useCallback(async () => {
    const hasSelectedPoints = selectedPainPointIds.length > 0 || Object.values(selectedDetails).some(d => d.length > 0);
    if (!hasSelectedPoints && customPainText.trim() === '') {
      alert('Por favor, selecione ao menos um desafio ou descreva sua dor para gerar o relatório.');
      return;
    }
    if (userName.trim() === '' || schoolName.trim() === '') {
        alert('Por favor, preencha seu nome e o nome da escola.');
        return;
    }
    if (whatsAppNumber.trim().length < 10) {
        alert('Por favor, insira um número de WhatsApp válido para receber o relatório.');
        return;
    }

    setIsSubmitting(true);

    const submissionData = {
      timestamp: new Date().toISOString(),
      userName: userName,
      schoolName: schoolName,
      whatsAppNumber: whatsAppNumber,
      selectedCategories: selectedPainPointIds.join(', '),
      selectedDetails: JSON.stringify(selectedDetails, null, 2),
      customPain: customPainText,
      contactConsent: 'Não',
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: JSON.stringify(submissionData),
      });
      console.log('Submission attempt finished.');
      
      setReportGenerated(true);
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (error) {
      console.error('Error submitting to Google Sheet:', error);
      alert('Houve um erro ao enviar seu diagnóstico. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedPainPointIds, selectedDetails, customPainText, userName, schoolName, whatsAppNumber]);

  const handleContactConsent = useCallback(async () => {
    setIsCtaSubmitting(true);
    const submissionData = {
        timestamp: new Date().toISOString(),
        userName: userName,
        schoolName: schoolName,
        whatsAppNumber: whatsAppNumber,
        selectedCategories: 'N/A',
        selectedDetails: '{}',
        customPain: 'O usuário solicitou contato através do botão CTA.',
        contactConsent: 'Sim',
      };
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', 
          body: JSON.stringify(submissionData),
        });
        console.log('Contact consent submission attempt finished.');
        alert('Obrigado! Sua solicitação foi enviada. Entraremos em contato em breve.');
      } catch (error) {
        console.error('Error submitting contact consent:', error);
        alert('Houve um erro ao enviar sua solicitação. Por favor, tente novamente.');
      } finally {
        setIsCtaSubmitting(false);
      }
  }, [userName, schoolName, whatsAppNumber]);

  return (
    <div className="bg-brand-bg-light min-h-screen text-brand-text">
      <Header />
      <main>
        <Hero />
        {!reportGenerated ? (
          <>
            <PainPointsSection 
              selectedPainPointIds={selectedPainPointIds} 
              onSelectPainPoint={handlePainPointSelect}
              selectedDetails={selectedDetails}
              onSelectDetail={handleDetailSelect}
            />
            <CustomPainPoints
              customPainText={customPainText}
              onCustomPainChange={setCustomPainText}
              userName={userName}
              onUserNameChange={setUserName}
              schoolName={schoolName}
              onSchoolNameChange={setSchoolName}
              whatsAppNumber={whatsAppNumber}
              onWhatsAppChange={setWhatsAppNumber}
              onGenerateReport={handleGenerateReport}
              isSubmitting={isSubmitting}
            />
          </>
        ) : (
          <div ref={reportRef}>
            <DiagnosticReport 
              selectedPainPointIds={selectedPainPointIds}
              selectedDetails={selectedDetails}
              customPainText={customPainText}
              userName={userName}
              schoolName={schoolName}
              whatsAppNumber={whatsAppNumber}
            />
            <SocialProof />
            <CallToAction onConfirm={handleContactConsent} isSubmitting={isCtaSubmitting} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

// --- React DOM Render (from original index.tsx) ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
