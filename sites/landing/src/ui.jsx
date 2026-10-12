import { useMemo, useState } from 'react'
import { AnimatedNumber, Reveal } from './effects.jsx'
import {
  ArrowCounterClockwise,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarBlank,
  ChartLineUp,
  Check,
  Compass,
  Ear,
  EnvelopeSimple,
  Eye,
  FileText,
  GlobeSimple,
  GraduationCap,
  Handshake,
  Hourglass,
  InstagramLogo,
  Key,
  LinkedinLogo,
  List,
  Lock,
  MagnifyingGlass,
  MapTrifold,
  Newspaper,
  Play,
  Plus,
  Scales,
  ShieldCheck,
  Strategy,
  TreeStructure,
  UsersThree,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react'

const ICONS = {
  arrow: ArrowRight,
  external: ArrowUpRight,
  briefcase: Briefcase,
  calendar: CalendarBlank,
  chart: ChartLineUp,
  check: Check,
  close: X,
  compass: Compass,
  ear: Ear,
  eye: Eye,
  family: UsersThree,
  globe: GlobeSimple,
  graduation: GraduationCap,
  handshake: Handshake,
  hourglass: Hourglass,
  instagram: InstagramLogo,
  key: Key,
  knight: Strategy,
  linkedin: LinkedinLogo,
  lock: Lock,
  mail: EnvelopeSimple,
  map: MapTrifold,
  menu: List,
  newspaper: Newspaper,
  org: TreeStructure,
  play: Play,
  plus: Plus,
  report: FileText,
  return: ArrowCounterClockwise,
  scale: Scales,
  search: MagnifyingGlass,
  shield: ShieldCheck,
  whatsapp: WhatsappLogo,
}

export function Icon({ name, className = 'h-5 w-5', weight = 'regular' }) {
  const Component = ICONS[name]
  return Component ? <Component className={className} weight={weight} aria-hidden="true" /> : null
}

export const formatBRL = (value, compact = false) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value)

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`text-[13px] font-medium text-primary ${className}`}>{children}</p>
}

export function SectionHeading({ eyebrow, title, body, align = 'left', className = '' }) {
  return (
    <Reveal className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 className="text-[30px] leading-[1.12] font-light tracking-[-0.025em] text-ink sm:text-[40px] lg:text-[46px]">
        {title}
      </h2>
      {body && (
        <p className={`mt-5 max-w-[62ch] text-[17px] leading-[1.65] text-mute ${align === 'center' ? 'mx-auto' : ''}`}>
          {body}
        </p>
      )}
    </Reveal>
  )
}

const BUTTON_VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-deep active:bg-primary-press',
  secondary: 'bg-white text-primary ring-1 ring-primary/35 ring-inset hover:ring-primary',
  onDark: 'bg-white text-brand-dark hover:bg-primary-tint',
  ghostDark: 'text-white ring-1 ring-white/30 ring-inset hover:bg-white/10',
}

export function Button({ href, children, variant = 'primary', icon = 'arrow', className = '', ...props }) {
  return (
    <a
      href={href}
      {...props}
      className={`focus-ring group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium whitespace-nowrap transition-[background-color,box-shadow,transform] duration-200 active:translate-y-px ${BUTTON_VARIANTS[variant]} ${className}`}
    >
      {children}
      {icon && <Icon name={icon} className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" weight="bold" />}
    </a>
  )
}

export function Simulator({ id, eyebrow, title, body, footnote, calloutTitle, calloutBody }) {
  const [capital, setCapital] = useState(5_000_000)
  const [years, setYears] = useState(10)
  const [drag, setDrag] = useState(2)
  const grossReturn = 10

  const result = useMemo(() => {
    const aligned = capital * (1 + grossReturn / 100) ** years
    const commissioned = capital * (1 + (grossReturn - drag) / 100) ** years
    return { aligned, commissioned, difference: aligned - commissioned }
  }, [capital, years, drag])

  const maxValue = Math.max(result.aligned, result.commissioned)
  const bars = [
    {
      label: 'Carteira com maior eficiência',
      hint: `Hipótese de ${grossReturn}% a.a. líquido dos custos considerados`,
      value: result.aligned,
      className: 'bg-primary',
      labelClass: 'text-ink',
    },
    {
      label: 'Carteira com atrito adicional',
      hint: `Hipótese de ${(grossReturn - drag).toFixed(1).replace('.', ',')}% a.a.`,
      value: result.commissioned,
      className: 'bg-primary-subdued',
      labelClass: 'text-ink-2',
    },
  ]

  const sliders = [
    {
      label: 'Patrimônio inicial',
      display: formatBRL(capital, true),
      props: { min: 1_000_000, max: 30_000_000, step: 500_000, value: capital, onChange: (e) => setCapital(Number(e.target.value)) },
    },
    {
      label: 'Horizonte',
      display: `${years} anos`,
      ariaLabel: 'Horizonte em anos',
      props: { min: 5, max: 25, step: 1, value: years, onChange: (e) => setYears(Number(e.target.value)) },
    },
    {
      label: 'Diferença anual hipotética',
      display: `${drag.toFixed(1).replace('.', ',')}% a.a.`,
      props: { min: 0.5, max: 2, step: 0.1, value: drag, onChange: (e) => setDrag(Number(e.target.value)) },
    },
  ]

  return (
    <section id={id} className="bg-canvas-soft py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} body={body} />

        <Reveal className="mt-12 grid overflow-hidden rounded-2xl bg-white shadow-float ring-1 ring-hairline lg:grid-cols-[.8fr_1.2fr]">
          <div className="border-b border-hairline p-6 sm:p-8 lg:border-r lg:border-b-0">
            <h3 className="text-lg font-normal text-ink">Parâmetros da simulação</h3>

            <div className="mt-7 space-y-7">
              {sliders.map((slider) => (
                <label key={slider.label} className="block">
                  <span className="flex items-center justify-between gap-4 text-sm text-ink-2">
                    {slider.label}
                    <strong className="tnum font-medium text-ink">{slider.display}</strong>
                  </span>
                  <input className="range-input mt-3 w-full" type="range" aria-label={slider.ariaLabel || slider.label} {...slider.props} />
                </label>
              ))}
            </div>

            <p className="mt-8 border-t border-hairline pt-5 text-xs leading-5 text-mute">
              Premissa ilustrativa: retorno bruto constante de {grossReturn}% a.a. A diferença selecionada não representa promessa, média histórica ou garantia de resultado.{footnote ? ` ${footnote}` : ''}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-mute">Diferença patrimonial projetada</p>
                <p className="tnum mt-1 text-[36px] leading-none font-light tracking-[-0.03em] text-ink sm:text-[44px]"><AnimatedNumber value={result.difference} format={formatBRL} /></p>
              </div>
              <p className="tnum text-xs text-mute">Ao final de {years} anos</p>
            </div>

            <div className="mt-10 space-y-7">
              {bars.map((bar) => (
                <div key={bar.label}>
                  <div className="mb-2.5 flex items-end justify-between gap-4">
                    <div>
                      <p className={`text-[15px] font-medium ${bar.labelClass}`}>{bar.label}</p>
                      <p className="tnum text-xs text-mute">{bar.hint}</p>
                    </div>
                    <strong className={`tnum text-sm font-medium ${bar.labelClass}`}>{formatBRL(bar.value, true)}</strong>
                  </div>
                  <div
                    className={`h-2.5 rounded-full transition-[width] duration-500 ease-out ${bar.className}`}
                    style={{ width: `${(bar.value / maxValue) * 100}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-canvas-soft p-5">
                <p className="text-sm font-medium text-ink">O ponto central</p>
                <p className="mt-2 text-sm leading-6 text-mute">Não é perseguir rentabilidade extraordinária. É evitar perdas silenciosas de eficiência ao longo do tempo.</p>
              </div>
              <div className="mesh-dark rounded-xl p-5 text-white">
                <p className="text-sm font-medium">{calloutTitle}</p>
                <p className="mt-2 text-sm leading-6 text-on-dark">{calloutBody}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
