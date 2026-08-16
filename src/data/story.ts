// Contenido narrativo del scrollytelling de inicio (TheStory)
export interface StoryChapter {
  eyebrow: string
  title: string
  para: string
  chips: string[]
}

export const storyChapters: StoryChapter[] = [
  {
    eyebrow: 'El dato',
    title: 'El 80% del marketing se hace a ciegas',
    para: 'La mayoría de negocios invierte en publicidad sin saber qué funciona. Queman presupuesto esperando un milagro viral.',
    chips: ['Sin métricas', 'Presupuesto quemado'],
  },
  {
    eyebrow: 'El diagnóstico',
    title: 'Tu negocio no necesita más likes',
    para: 'Necesita saber cuánto cuesta captar un cliente y cuánto vale retenerlo. Empezamos por auditar tus números reales.',
    chips: ['Auditoría real', 'Datos, no humo'],
  },
  {
    eyebrow: 'La estrategia',
    title: 'Un sistema, no campañas sueltas',
    para: 'Diseñamos una máquina de crecimiento a la medida de tu operación: captación, conversión y recompra trabajando juntas.',
    chips: ['Metodología Bakano', 'Plan a medida'],
  },
  {
    eyebrow: 'Los experimentos',
    title: 'Medimos. Ajustamos. Repetimos.',
    para: 'Cada semana probamos hipótesis con tu dinero como si fuera nuestro. Lo que no rinde, muere rápido.',
    chips: ['Iteración semanal', 'Decisiones con datos'],
  },
  {
    eyebrow: 'La escala',
    title: 'Lo que funciona, se multiplica',
    para: 'Convertimos los ganadores en procesos: tu equipo ejecuta sin depender de agencias ni del caos operativo.',
    chips: ['Crecimiento compuesto', 'Sin dependencias'],
  },
  {
    eyebrow: 'Resultados',
    title: '', // el capítulo final usa el h1 SEO del template
    para: 'Sin depender de agencias, campañas virales, ni caos operativo. Resultados medibles, crecimiento sostenible.',
    chips: ['+150 negocios', '90% satisfacción'],
  },
]

export const storyStats = [
  { number: '20%', label: 'Aumento en Facturación' },
  { number: '150+', label: 'Negocios Transformados' },
  { number: '90%', label: 'Clientes Satisfechos' },
  { number: '24/7', label: 'Soporte Especializado' },
]
