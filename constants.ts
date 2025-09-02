import { PainPoint, Solution, Testimonial } from './types';
import { FinancialIcon, OperationalIcon, PedagogicalIcon, EngagementIcon, MarketIcon } from './components/icons';

export const PAIN_POINTS: PainPoint[] = [
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
        'Diminuir a alta rotatividade da equipe, especialmente na ed. infantil.',
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
        'Lidar com infraestrutura inadequada, especialmente na ed. infantil.',
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
        'Lidar com a obsessão por resultados estatísticos e imagem da escola.',
        'Superar a barreira de admitir falhas para adotar soluções externas.',
        'Navegar no complexo e demorado processo de venda para escolas.',
    ]
  }
];

export const SOLUTIONS: Solution[] = [
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

export const TESTIMONIALS: Testimonial[] = [
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
