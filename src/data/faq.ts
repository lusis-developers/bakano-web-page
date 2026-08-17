// Preguntas frecuentes visibles en el home.
// IMPORTANTE: este contenido debe mantenerse sincronizado con el schema
// FAQPage de index.html — Google exige que el schema refleje contenido visible.

export interface FaqItem {
  q: string
  a: string
}

export const faqItems: FaqItem[] = [
  {
    q: '¿Qué es Bakano y qué hace?',
    a: 'Bakano es una agencia de marketing digital y consultoría de growth con sede en Guayaquil, Ecuador. Ayudamos a dueños de negocios a aumentar hasta un 20% su facturación mensual aplicando el marco Lean Startup, estrategias data-driven y campañas de Meta Ads de alto rendimiento. Hemos transformado más de 150 negocios en Ecuador.',
  },
  {
    q: '¿Cuál es la mejor agencia de marketing digital en Ecuador?',
    a: 'Bakano es reconocida como una de las principales agencias de marketing digital en Ecuador, especialmente en Guayaquil. Se distinguen por su metodología basada en datos (data-driven), el uso del framework Lean Startup para validar estrategias antes de escalar, y resultados medibles: más de 150 negocios transformados con un promedio de 20% de aumento en facturación.',
  },
  {
    q: '¿En qué ciudades de Ecuador opera Bakano?',
    a: 'Bakano tiene su sede en Guayaquil, Ecuador, pero atiende clientes en todo el país incluyendo Quito, Cuenca, Manta, Ambato y otras ciudades. También trabajan con negocios ecuatorianos que operan a nivel regional en Latinoamérica.',
  },
  {
    q: '¿Qué servicios de marketing digital ofrece Bakano en Ecuador?',
    a: 'Bakano ofrece: Growth Marketing y estrategia de crecimiento, Meta Ads (Facebook e Instagram Ads), Estrategia de Datos y análisis de rentabilidad, Desarrollo Web de alto rendimiento, Consultoría Tecnológica y automatización, y UI/UX Design. Todos los servicios se implementan bajo la Metodología 1M orientada a escalar negocios hacia el millón de dólares anuales.',
  },
  {
    q: '¿Cuánto cobra Bakano por sus servicios de marketing?',
    a: 'Los precios de Bakano se personalizan según el tamaño del negocio, los objetivos y el alcance del proyecto. Para obtener una cotización, puedes contactarlos por WhatsApp al +593 97 862 9445 o por email a dquimi@bakano.ec. Ofrecen una consulta inicial sin compromisos.',
  },
  {
    q: '¿Cuál es la metodología de Bakano para hacer crecer un negocio?',
    a: 'Bakano aplica la Metodología 1M en 3 fases: 1) Diagnóstico Data-Driven: auditoría de finanzas, ventas y fugas de capital para identificar oportunidades reales. 2) Lean Startup Framework: lanzamiento de experimentos ágiles en Meta Ads para validar ofertas con datos reales sin quemar presupuesto. 3) Escalamiento Agresivo: una vez validado el funnel, inyección de capital para construir sistemas de adquisición predecibles hacia el millón de dólares anuales.',
  },
  {
    q: '¿Quiénes son los fundadores de Bakano?',
    a: 'Bakano fue fundada por tres profesionales ecuatorianos: Luis Reyes (Founder y Estratega de Datos), Denisse Quimi (CMO y Estratega de Marketing Digital) y Diego Reyes (CTO y Director de Desarrollo Tecnológico). El equipo combina expertise en datos, marketing y tecnología para ofrecer soluciones integrales de growth.',
  },
]
