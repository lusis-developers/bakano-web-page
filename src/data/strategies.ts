// Los 3 pasos de la metodología (sección Strategies)
export interface StrategyStep {
  number: string
  titleLines: [string, string]
  desc: string
  features: string[]
}

export const strategySteps: StrategyStep[] = [
  {
    number: '01',
    titleLines: ['Diagnóstico', 'Data-Driven'],
    desc: 'Eliminamos las suposiciones y el "yo creo que funcionaría". Auditamos tus finanzas, histórico de ventas y fuga de capital para encontrar dónde estás perdiendo dinero ahora mismo.',
    features: [
      'Auditoría de Facturación',
      'Mapeo de Fugas de Capital',
      'Proyección Real de Rentabilidad',
    ],
  },
  {
    number: '02',
    titleLines: ['Lean Startup', 'Framework'],
    desc: 'Construir, Medir, Aprender. Lanzamos experimentos ágiles en Meta Ads (MVP) para validar ofertas con tus clientes reales sin quemar presupuesto. Encontramos el Product-Market Fit.',
    features: [
      'Pruebas A/B Omnicanal',
      'Iteración Rápida de Mensajes',
      'Optimización de CPA en Tiempo Real',
    ],
  },
  {
    number: '03',
    titleLines: ['Escalamiento', 'Agresivo'],
    desc: 'Una vez que validamos el embudo y confirmamos el ROAS (Retorno de Inversión), inyectamos capital agresivamente. Construimos sistemas de adquisición predecibles hacia el $1M.',
    features: [
      'Sistemas Automatizados',
      'Retargeting Avanzado',
      'Crecimiento Exponencial Seguro',
    ],
  },
]
