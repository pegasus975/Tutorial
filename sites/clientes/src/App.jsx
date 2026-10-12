import { useMemo, useState } from 'react'

const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || '#conversa'
const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/5551981610486?text=Ol%C3%A1%20Fernando%2C%20vi%20a%20p%C3%A1gina%20sobre%20o%20modelo%20Fee%20Based%20e%20gostaria%20de%20entender%20melhor.'
const LINKEDIN_URL = 'https://www.linkedin.com/in/fernando-arnhold/'
const CONTACT_EMAIL = 'fernando.arnhold@montebravo.com.br'

const formatBRL = (value, compact = false) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value)

function Icon({ name, className = 'h-5 w-5' }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    shield: <><path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    ear: <><circle cx="12" cy="12" r="9" /><path d="M12 8a3 3 0 0 1 3 3c0 2-2 2-2 4" /><path d="M10 17v.01" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4 4-2Z" /></>,
    knight: <><path d="M7 21h10" /><path d="M8 21v-3c0-1 .5-2 1.5-2.5S11 14 11 12c0-1.5-1-2-1-3.5C10 6 12 4 14 4c1 2 2 2.5 3 3.5.7.7 1 1.5 1 2.5v11" /></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" /><circle cx="12" cy="12" r="3" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M8 3v4" /><path d="M16 3v4" /></>,
    map: <><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2Z" /><path d="M9 4v14" /><path d="M15 6v14" /></>,
    key: <><circle cx="7.5" cy="15.5" r="3.5" /><path d="m10 13 8.5-8.5" /><path d="m16 6 2.5 2.5" /><path d="m13.5 8.5 2 2" /></>,
    hourglass: <><path d="M6 3h12" /><path d="M6 21h12" /><path d="M8 3c0 5 8 5 8 9s-8 4-8 9" /><path d="M16 3c0 5-8 5-8 9s8 4 8 9" /></>,
    graduation: <><path d="m3 10 9-5 9 5-9 5-9-5Z" /><path d="M7 12v4c3 2 7 2 10 0v-4" /></>,
    family: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3 2-5 5-5s5 2 5 5" /><path d="M14 20c0-2.2 1.5-4 4-4s4 1.8 4 4" /></>,
    org: <><rect x="9" y="3" width="6" height="4" rx="1" /><rect x="3" y="17" width="6" height="4" rx="1" /><rect x="15" y="17" width="6" height="4" rx="1" /><path d="M12 7v5" /><path d="M6 17v-3h12v3" /></>,
    report: <><path d="M6 3h9l3 3v15H6Z" /><path d="M15 3v3h3" /><path d="m8 16 3-3 2 2 3-4" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M8 7V5h8v2" /><path d="M3 12h18" /></>,
    handshake: <><path d="m2 12 5-4 3 2 3-2 5 4" /><path d="m5 8 6 5 2-1.5" /><path d="m19 8-6 5" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7" /><path d="M8 7v.01" /><path d="M12 17v-4a3 3 0 0 1 6 0v4" /><path d="M12 10v7" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    whatsapp: <><path d="M4 20l1.3-4.1A8 8 0 1 1 9 18.6Z" /><path d="M8.5 9.5c0 3 2.5 5.5 5.5 5.5.5 0 1-.7 1-1.2s-1.4-1.2-1.8-1.2-1 .6-1.2.6c-.7 0-3-1.2-3-3.9 0-.2.6-.5.6-1.2s-.8-1.8-1.2-1.8-1.2.5-1.2 1z" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    newspaper: <><path d="M4 4h13a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V4Z" /><path d="M19 8h1a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H7" /><path d="M7 8h8" /><path d="M7 12h8" /><path d="M7 16h5" /></>,
  }

  return <svg {...common}>{paths[name]}</svg>
}

function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10 ${className}`}>{children}</div>
}

function SectionHeading({ eyebrow, title, body, align = 'left', inverse = false }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      {eyebrow && (
        <p className={`mb-4 text-xs font-semibold tracking-[0.22em] uppercase ${inverse ? 'text-gold-300' : 'text-navy-700'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl ${inverse ? 'text-white' : 'text-navy-900'}`}>
        {title}
      </h2>
      {body && (
        <p className={`mt-5 text-base leading-8 sm:text-lg ${inverse ? 'text-platinum-300' : 'text-slate-600'}`}>
          {body}
        </p>
      )}
    </div>
  )
}

function PrimaryButton({ href = '#conversa', children, inverse = false, className = '', ...props }) {
  return (
    <a
      href={href}
      {...props}
      className={`focus-ring inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-200 active:scale-[0.98] ${
        inverse
          ? 'bg-white text-navy-900 hover:bg-platinum-100'
          : 'bg-navy-900 text-white shadow-[0_12px_35px_rgba(7,24,45,0.18)] hover:bg-navy-800'
      } ${className}`}
    >
      {children}
      <Icon name="arrow" className="h-4 w-4" />
    </a>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Nossa parceria', '#parceria'],
    ['Como funciona', '#papel'],
    ['O que muda', '#evolucao'],
    ['Dúvidas', '#faq'],
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10">
      <Container className="flex h-20 items-center justify-between">
        <a href="#topo" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Fernando Arnhold, início">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-white/25 bg-white/5">
            <img src="/images/fernando-arnhold-avatar.webp" alt="" className="h-full w-full object-cover" width="640" height="640" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.08em] text-white uppercase">Fernando Arnhold</p>
            <p className="text-[10px] tracking-[0.18em] text-platinum-300 uppercase">Financial Advisor · Monte Bravo</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="focus-ring rounded-sm text-sm text-platinum-300 transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <PrimaryButton href="#conversa" inverse className="!min-h-11 !px-5 !py-2.5 !text-xs">
            Agendar uma conversa
          </PrimaryButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="focus-ring rounded-md p-2 text-white lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-navy-950/98 backdrop-blur lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-md px-2 py-3 text-sm text-platinum-200 transition hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
            <PrimaryButton href="#conversa" inverse className="mt-2 w-full" onClick={() => setOpen(false)}>
              Agendar uma conversa
            </PrimaryButton>
          </Container>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="topo" className="hero-grid relative overflow-hidden bg-navy-950 pt-36 pb-24 text-white sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-950 to-navy-950" />
      <Container className="relative">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.055] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-platinum-200 uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
            Uma página para você, cliente Monte Bravo
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.1] font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Nossa parceria e o próximo passo natural.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-platinum-300 sm:text-xl">
            Ao longo do nosso trabalho juntos, construímos uma relação baseada em confiança, planejamento e acompanhamento contínuo. Preparei esta página para te mostrar uma evolução natural nesse relacionamento, sem pressa, sem obrigação, só para você conhecer.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="#evolucao">Ver o que muda e o que não muda</PrimaryButton>
            <PrimaryButton href="#conversa" inverse>Agendar uma conversa</PrimaryButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Jornada() {
  const etapas = [
    ['compass', 'Planejamento financeiro'],
    ['briefcase', 'Planejamento de aquisições'],
    ['shield', 'Acompanhamento patrimonial'],
    ['map', 'Análise de oportunidades imobiliárias'],
    ['chart', 'Construção da carteira de investimentos'],
    ['calendar', 'Revisões periódicas'],
    ['handshake', 'Apoio em decisões financeiras relevantes'],
    ['eye', 'Alinhamento contínuo de objetivos'],
  ]

  return (
    <section id="parceria" className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="O que construímos até aqui"
          title="Uma relação baseada em confiança, planejamento e resultado."
          body="Antes de falar sobre o próximo passo, vale lembrar o caminho que já percorremos juntos, porque é exatamente essa base que continua, e se fortalece, no formato que vou te apresentar."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {etapas.map(([icon, label]) => (
            <div key={label} className="rounded-2xl border border-platinum-200 bg-platinum-50 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-navy-900 text-gold-300">
                <Icon name={icon === 'chart' ? 'report' : icon} className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm leading-6 font-medium text-navy-900">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function MeuPapel() {
  const etapas = [
    ['ear', 'Ouvir', 'Entender o contexto'],
    ['map', 'Planejar', 'Desenhar estratégias'],
    ['knight', 'Executar', 'Buscar as melhores soluções'],
    ['eye', 'Acompanhar', 'Garantir disciplina e ajustes'],
  ]

  return (
    <section id="papel" className="bg-platinum-50 py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Como vejo meu papel"
            title="Mais do que um assessor de investimentos focado em produtos."
            body="Atuo como um consultor financeiro e patrimonial da sua família, o que significa olhar para o conjunto: investimentos, liquidez, riscos, sucessão e objetivos de longo prazo, não apenas para o próximo produto."
          />

          <div className="grid grid-cols-2 gap-4">
            {etapas.map(([icon, title, body]) => (
              <div key={title} className="rounded-2xl border border-platinum-200 bg-white p-5">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-navy-900/5 text-navy-800">
                  <Icon name={icon} className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-navy-900">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Comparativo() {
  const comissionado = [
    'Remuneração ligada a transações e produtos específicos.',
    'Custo total menos previsível ao longo do tempo.',
    'Quando há comissão embutida no produto, ela normalmente não é repassada ao cliente.',
  ]

  const feeBased = [
    'Modelo de remuneração alinhado aos nossos interesses, que remunera planejamento e acompanhamento.',
    'Transparência total e previsibilidade de custo.',
    'Governança e independência na análise das recomendações.',
  ]

  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Duas formas de remunerar o mesmo trabalho"
          title="Nenhum dos dois modelos é errado, cada um serve a um momento diferente."
          body="No modelo atual, minha remuneração está embutida nos produtos que compõem sua carteira. No Fee Based, ela é um valor combinado previamente com você, independente do produto. É uma mudança na forma de remuneração, não uma mudança na dedicação ao seu patrimônio."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-platinum-200 bg-white p-7">
            <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">Modelo Comissionado (atual)</p>
            <ul className="mt-5 space-y-4">
              {comissionado.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-platinum-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-navy-950 p-7 text-white">
            <p className="text-xs font-semibold tracking-[0.14em] text-gold-300 uppercase">Fee Based</p>
            <ul className="mt-5 space-y-4">
              {feeBased.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-platinum-200">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ComparadorDeCustos() {
  const [capital, setCapital] = useState(5_000_000)
  const [years, setYears] = useState(10)
  const [drag, setDrag] = useState(2)
  const grossReturn = 10

  const result = useMemo(() => {
    const alignedRate = grossReturn / 100
    const commissionedRate = (grossReturn - drag) / 100
    const aligned = capital * (1 + alignedRate) ** years
    const commissioned = capital * (1 + commissionedRate) ** years
    return {
      aligned,
      commissioned,
      difference: aligned - commissioned,
    }
  }, [capital, years, drag])

  const maxValue = Math.max(result.aligned, result.commissioned)
  const alignedWidth = `${(result.aligned / maxValue) * 100}%`
  const commissionedWidth = `${(result.commissioned / maxValue) * 100}%`

  return (
    <section className="soft-grid bg-platinum-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Simulação ilustrativa"
          title="Pequenas diferenças anuais podem se tornar grandes diferenças patrimoniais."
          body="Ajuste os parâmetros com a ordem de grandeza da sua própria carteira, para visualizar o efeito cumulativo de uma diferença de custo ao longo do tempo. É uma simulação, não uma projeção do que vai acontecer com você."
          align="center"
        />

        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-platinum-200 bg-white shadow-[0_22px_70px_rgba(7,24,45,0.08)] lg:grid-cols-[.82fr_1.18fr]">
          <div className="border-b border-platinum-200 p-6 sm:p-9 lg:border-r lg:border-b-0">
            <h3 className="text-lg font-semibold text-navy-900">Parâmetros da simulação</h3>

            <div className="mt-7 space-y-7">
              <label className="block">
                <span className="flex items-center justify-between gap-4 text-sm font-medium text-slate-700">
                  Patrimônio inicial
                  <strong className="text-navy-900">{formatBRL(capital, true)}</strong>
                </span>
                <input
                  className="range-input mt-4 w-full"
                  type="range"
                  min="1000000"
                  max="30000000"
                  step="500000"
                  value={capital}
                  onChange={(event) => setCapital(Number(event.target.value))}
                  aria-label="Patrimônio inicial"
                />
              </label>

              <label className="block">
                <span className="flex items-center justify-between gap-4 text-sm font-medium text-slate-700">
                  Horizonte
                  <strong className="text-navy-900">{years} anos</strong>
                </span>
                <input
                  className="range-input mt-4 w-full"
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={years}
                  onChange={(event) => setYears(Number(event.target.value))}
                  aria-label="Horizonte em anos"
                />
              </label>

              <label className="block">
                <span className="flex items-center justify-between gap-4 text-sm font-medium text-slate-700">
                  Diferença anual hipotética
                  <strong className="text-navy-900">{drag.toFixed(1).replace('.', ',')}% a.a.</strong>
                </span>
                <input
                  className="range-input mt-4 w-full"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={drag}
                  onChange={(event) => setDrag(Number(event.target.value))}
                  aria-label="Diferença anual hipotética"
                />
              </label>
            </div>

            <div className="mt-8 rounded-2xl border border-platinum-200 bg-platinum-50 p-4 text-xs leading-5 text-slate-500">
              Premissa ilustrativa: retorno bruto constante de {grossReturn}% a.a. A diferença selecionada não representa promessa, média histórica ou garantia de resultado. Rentabilidade passada não garante resultados futuros.
            </div>
          </div>

          <div className="p-6 sm:p-9">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Diferença patrimonial projetada</p>
                <p className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-navy-900 sm:text-4xl">{formatBRL(result.difference)}</p>
              </div>
              <p className="text-xs text-slate-500">Ao final de {years} anos</p>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-navy-900">Carteira com maior eficiência</p>
                    <p className="text-xs text-slate-500">Hipótese de {grossReturn}% a.a. líquido dos custos considerados</p>
                  </div>
                  <strong className="text-sm text-navy-900">{formatBRL(result.aligned, true)}</strong>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-platinum-100">
                  <div className="h-full rounded-full bg-navy-900 transition-all duration-500" style={{ width: alignedWidth }} />
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-700">Carteira com atrito adicional</p>
                    <p className="text-xs text-slate-500">Hipótese de {(grossReturn - drag).toFixed(1).replace('.', ',')}% a.a.</p>
                  </div>
                  <strong className="text-sm text-slate-700">{formatBRL(result.commissioned, true)}</strong>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-platinum-100">
                  <div className="h-full rounded-full bg-platinum-500 transition-all duration-500" style={{ width: commissionedWidth }} />
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-platinum-200 p-5">
                <p className="text-xs tracking-[0.14em] text-slate-500 uppercase">O ponto central</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Não é perseguir rentabilidade extraordinária. É evitar perdas silenciosas de eficiência ao longo do tempo.</p>
              </div>
              <div className="rounded-2xl bg-navy-900 p-5 text-white">
                <p className="text-xs tracking-[0.14em] text-gold-300 uppercase">Na nossa conversa</p>
                <p className="mt-2 text-sm leading-6 text-platinum-200">Mostro essa mesma simulação com os números reais da sua carteira.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Autoridade() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
            <div className="relative overflow-hidden rounded-[2rem] border border-platinum-200 bg-navy-900 shadow-[0_30px_90px_rgba(7,24,45,0.18)]">
              <div className="aspect-[4/5]">
                <img
                  src="/images/fernando-arnhold.webp"
                  alt="Fernando Arnhold em retrato profissional"
                  className="h-full w-full object-cover object-[50%_22%]"
                  width="1024"
                  height="1536"
                />
              </div>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring absolute top-5 left-4 flex max-w-[225px] items-center gap-3 rounded-2xl border border-white/15 bg-white/95 p-3 text-navy-900 shadow-xl transition hover:-translate-y-0.5 sm:-left-8 sm:top-10"
              aria-label="Abrir perfil de Fernando Arnhold no LinkedIn"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-900 text-white">
                <Icon name="linkedin" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold">10 mil+ seguidores</p>
                <p className="mt-0.5 text-[10px] text-slate-500">Perfil profissional no LinkedIn</p>
              </div>
            </a>

            <div className="mt-4 ml-auto max-w-[320px] rounded-2xl border border-platinum-200 bg-navy-900 p-4 shadow-xl sm:p-5 xl:absolute xl:top-[43%] xl:-right-8 xl:mt-0 xl:max-w-[205px] xl:bg-navy-950/92 xl:p-4 xl:backdrop-blur">
              <div className="flex items-center gap-2 text-gold-300">
                <Icon name="graduation" className="h-4 w-4 shrink-0" />
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase">Formação do mercado</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-platinum-200">Professor de MBA em investimentos e planejamento financeiro.</p>
            </div>
          </div>

          <SectionHeading
            eyebrow="Quem está te acompanhando nessa decisão"
            title="Mais de uma década dedicada a wealth management e planejamento patrimonial."
            body="Sócio e Financial Advisor na Monte Bravo, com certificações CFP® e CPA-20, e atuação como professor de MBA em investimentos e planejamento financeiro. A mesma pessoa que já cuida do seu patrimônio hoje."
          />
        </div>
      </Container>
    </section>
  )
}

function Evolucao() {
  const naoMuda = [
    ['shield', 'Seu assessor dedicado'],
    ['shield', 'Rigor na seleção de investimentos'],
    ['shield', 'Nossa proximidade'],
    ['lock', 'Atendimento e suporte'],
    ['shield', 'Acesso às melhores oportunidades do mercado'],
    ['lock', 'Compromisso com seus objetivos'],
  ]

  return (
    <section id="evolucao" className="bg-navy-950 py-24 text-white sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Evolução com segurança"
          title="O que não muda e o que muda."
          body="A mudança está concentrada em um único ponto: a forma como minha remuneração é estruturada. Tudo o que já funciona na nossa relação continua exatamente como está."
          inverse
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-lg font-semibold text-white">O que NÃO muda</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {naoMuda.map(([icon, label]) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-gold-300">
                    <Icon name={icon} className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6 text-platinum-200">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-gold-300/30 bg-gradient-to-b from-white/[0.06] to-transparent p-7">
            <p className="text-lg font-semibold text-gold-300">O que MUDA</p>
            <p className="mt-4 text-sm leading-7 text-platinum-200">
              A forma de remuneração. Passamos para um modelo focado em previsibilidade de custo, transparência total, governança e alinhamento absoluto de interesses.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

function RespaldoInstitucional() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Uma mudança institucional, não uma escolha isolada"
          title="Essa migração é acompanhada de perto pelo nosso próprio time jurídico e de compliance."
          body="A Resolução CVM nº 179 trata da transparência na remuneração e dos conflitos de interesse na distribuição de investimentos, e tem acelerado a adoção do modelo Fee Based no Brasil. É uma direção de mercado, respaldada pelo regulador, não uma iniciativa isolada minha."
        />

        <blockquote className="mt-8 rounded-[1.75rem] border border-platinum-200 bg-platinum-50 p-7 sm:p-8">
          <p className="text-lg leading-8 text-navy-900 sm:text-xl">
            “A assessoria deixa de ser o meio para a venda de um produto e passa a ser um fim em si mesma, orientada pelo melhor interesse do investidor.”
          </p>
          <footer className="mt-4 text-sm text-slate-500">Caio Rizk, Diretor Jurídico e de Compliance da Monte Bravo</footer>
        </blockquote>
      </Container>
    </section>
  )
}

function ProximosAnos() {
  const itens = [
    ['calendar', 'Reunião patrimonial semestral'],
    ['map', 'Mapa patrimonial consolidado'],
    ['key', 'Planejamento de grandes aquisições'],
    ['hourglass', 'Planejamento de aposentadoria'],
    ['graduation', 'Planejamento educacional dos filhos'],
    ['shield', 'Revisão de seguros e proteção'],
    ['family', 'Planejamento sucessório'],
    ['org', 'Organização patrimonial da família'],
    ['report', 'Relatório anual estratégico'],
  ]

  return (
    <section className="bg-platinum-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="O que podemos entregar nos próximos anos"
          title="Um acompanhamento que vai além dos investimentos."
          body="Grande parte desse trabalho já acontece hoje. O modelo Fee Based nos dá o espaço para aprofundar cada uma dessas frentes, sem que a conversa precise sempre passar por um produto."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {itens.map(([icon, label]) => (
            <div key={label} className="rounded-2xl border border-platinum-200 bg-white p-6 text-center">
              <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-navy-900/5 text-navy-800">
                <Icon name={icon} className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm leading-6 font-medium text-navy-900">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Compromisso() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-navy-700 uppercase">Nosso compromisso continua o mesmo</p>
          <p className="mt-6 text-2xl leading-tight font-semibold tracking-[-0.02em] text-navy-900 sm:text-3xl">
            "Fazer a diferença na sua vida e na vida da sua família através de decisões financeiras cada vez melhores."
          </p>
          <p className="mt-5 text-sm text-slate-500">Mais do que investimentos, cuidar do seu patrimônio e da sua tranquilidade.</p>
        </div>
      </Container>
    </section>
  )
}

const PRESS_ITEMS = [
  {
    veiculo: 'InfoMoney · Opinião',
    autor: 'Caio Rizk, Monte Bravo',
    headline: 'A transformação do modelo de assessoria de investimentos no Brasil',
    data: 'Set. 2026',
    url: 'https://www.infomoney.com.br/colunistas/convidados/a-transformacao-do-modelo-de-assessoria-de-investimentos-no-brasil/',
  },
  {
    veiculo: 'Valor Econômico',
    headline: 'Monte Bravo Corretora vai investir R$ 300 milhões para atrair profissionais ao "fee based"',
    data: 'Dez. 2025',
    url: 'https://valor.globo.com/financas/noticia/2025/12/10/monte-bravo-corretora-vai-investir-r-300-milhoes-para-atrair-profissionais-ao-fee-based.ghtml',
  },
  {
    veiculo: 'InfoMoney Advisor',
    headline: 'Monte Bravo investe R$ 300 mi na formação de assessores alinhados ao "fee based"',
    data: '2025',
    url: 'https://www.infomoney.com.br/advisor/monte-bravo-investe-r-300-mi-para-formar-novos-assessores-no-modelo-fee-based/',
  },
  {
    veiculo: 'InfoMoney · Opinião',
    headline: 'Resolução 179 da CVM completa um ano e acelera adoção do modelo "fee based" no Brasil',
    data: 'Nov. 2025',
    url: 'https://www.infomoney.com.br/colunistas/convidados/resolucao-179-da-cvm-completa-um-ano-e-acelera-adocao-do-modelo-fee-based-no-brasil/',
  },
  {
    veiculo: 'Estadão',
    headline: 'Conflito de interesses impulsiona migração da assessoria para consultoria',
    data: 'Mar. 2026',
    url: 'https://www.montebravo.com.br/blog/sala-de-imprensa/conflito-interesses-assessoria-consultoria-fee-fixo/',
  },
  {
    veiculo: 'Brazil Journal',
    headline: 'Quando o fee-based vale a pena?',
    data: '2025',
    url: 'https://braziljournal.com/quando-o-fee-based-vale-a-pena/',
  },
]

function Imprensa() {
  return (
    <section className="bg-platinum-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Fee Based na imprensa"
          title="Uma mudança de mercado, amparada por regulação."
          body="Essa não é uma escolha isolada minha. É um movimento acompanhado de perto pela imprensa especializada, com participação direta da Monte Bravo."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRESS_ITEMS.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group flex flex-col rounded-2xl border border-platinum-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-navy-700 hover:shadow-[0_16px_40px_rgba(7,24,45,0.08)]"
            >
              <div className="flex items-center gap-2 text-navy-700">
                <Icon name="newspaper" className="h-4 w-4 shrink-0" />
                <p className="text-xs font-semibold tracking-[0.1em] uppercase">{item.veiculo}</p>
              </div>
              <p className="mt-3 flex-1 text-sm leading-6 font-semibold text-navy-900">{item.headline}</p>
              {item.autor && <p className="mt-2 text-xs text-slate-500">{item.autor}</p>}
              <div className="mt-4 flex items-center justify-between border-t border-platinum-200 pt-3">
                <span className="text-xs text-slate-500">{item.data}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-navy-800 transition group-hover:gap-1.5">
                  Ler matéria
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

function FAQ() {
  const perguntas = [
    {
      q: 'Preciso decidir agora?',
      a: 'Não. Essa página é só para você entender como o modelo funciona. A decisão de migrar, e o momento de fazer isso, é sua.',
    },
    {
      q: 'Meu atendimento muda se eu não migrar?',
      a: 'Não. Continuo à disposição do mesmo jeito, no modelo que você já conhece. Não há nenhuma obrigação de mudança.',
    },
    {
      q: 'Como fica o custo na prática?',
      a: 'Depende do tamanho e da composição da sua carteira hoje. Na nossa conversa, mostro uma simulação com números reais da sua situação, para você comparar com clareza.',
    },
    {
      q: 'A migração é imediata?',
      a: 'Não precisa ser. Podemos estruturar uma transição gradual, migrando parte da carteira primeiro, se fizer mais sentido para você.',
    },
  ]

  return (
    <section id="faq" className="bg-platinum-50 py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Dúvidas comuns" title="Perguntas que a maioria dos clientes me faz." align="center" />

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {perguntas.map(({ q, a }) => (
            <div key={q} className="rounded-2xl border border-platinum-200 bg-white p-6">
              <p className="text-sm font-semibold text-navy-900">{q}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{a}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Conversa() {
  return (
    <section id="conversa" className="bg-navy-950 py-24 text-white sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Vamos conversar"
            title="Se fizer sentido, posso te mostrar como ficaria na prática."
            body="Sem compromisso, sem pressa. Uma conversa de alinhamento, com números reais da sua carteira, para você decidir com clareza se esse é o momento certo."
            align="center"
            inverse
          />

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <PrimaryButton href={BOOKING_URL} inverse>Agendar uma conversa</PrimaryButton>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-navy-950 py-10 text-platinum-300">
      <Container className="flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs leading-5">
          Fernando Arnhold, Financial Advisor · Monte Bravo
          <br />
          R. Min. Jesuíno Cardoso, 454 - 9º andar - Vila Nova Conceição, São Paulo - SP
        </p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${CONTACT_EMAIL}`} className="focus-ring rounded-full p-2 transition hover:text-white" aria-label="E-mail">
            <Icon name="mail" className="h-4 w-4" />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="focus-ring rounded-full p-2 transition hover:text-white" aria-label="LinkedIn">
            <Icon name="linkedin" className="h-4 w-4" />
          </a>
        </div>
      </Container>
      <Container className="mt-6">
        <p className="text-[11px] leading-5 text-platinum-500">
          Material de caráter exclusivamente informativo, destinado a clientes já atendidos por Fernando Arnhold / Monte Bravo. Não constitui oferta, recomendação de investimento ou promessa de rentabilidade. A adesão ao modelo Fee Based é opcional e não altera o padrão de atendimento já prestado.
        </p>
      </Container>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <Imprensa />
      <Jornada />
      <MeuPapel />
      <Comparativo />
      <ComparadorDeCustos />
      <Evolucao />
      <RespaldoInstitucional />
      <ProximosAnos />
      <Compromisso />
      <Autoridade />
      <FAQ />
      <Conversa />
      <Footer />
    </div>
  )
}
