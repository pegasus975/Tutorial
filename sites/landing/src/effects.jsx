import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]
const SPRING = { stiffness: 140, damping: 20, mass: 0.6 }

const formatCompact = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact', maximumFractionDigits: 1 }).format(value)
const formatFull = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)

function usePointerFine() {
  const ref = useRef(false)
  useEffect(() => {
    ref.current = window.matchMedia('(pointer: fine)').matches
  }, [])
  return ref
}

/* Entrada suave ao rolar. Sem movimento quando o sistema pede menos animação. */
export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Component = as === 'li' ? motion.li : motion.div
  if (reduce) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Component>
  )
}

/* Cartão que inclina em 3D acompanhando o mouse, com reflexo de luz. */
export function TiltCard({ children, className = '', max = 7, glare = true, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const fine = usePointerFine()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), SPRING)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), SPRING)
  const gx = useTransform(mx, [0, 1], [0, 100])
  const gy = useTransform(my, [0, 1], [0, 100])
  const glareOpacity = useSpring(0, SPRING)
  const glareBg = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgba(255,255,255,0.28), transparent 55%)`

  const Component = as === 'a' ? motion.a : as === 'article' ? motion.article : motion.div

  function handleMove(event) {
    if (reduce || !fine.current) return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
    glareOpacity.set(1)
  }

  function handleLeave() {
    mx.set(0.5)
    my.set(0.5)
    glareOpacity.set(0)
  }

  return (
    <Component
      {...rest}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {glare && !reduce && (
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glareBg, opacity: glareOpacity }} />
      )}
    </Component>
  )
}

/* Moeda 3D com “R$” gravado: faces + camadas de borda dão espessura real. */
export function Coin({ size = 96, depth = 10, tone = 'indigo', className = '' }) {
  const layers = Math.max(2, Math.round(depth / 2))
  return (
    <span className={`coin coin--${tone} ${className}`} style={{ width: size, height: size, '--coin-size': `${size}px` }} aria-hidden="true">
      {Array.from({ length: layers }, (_, i) => (
        <i key={i} className="coin-edge" style={{ transform: `translateZ(${-depth / 2 + ((i + 1) * depth) / (layers + 1)}px)` }} />
      ))}
      <i className="coin-face" style={{ transform: `translateZ(${depth / 2}px)` }}>R$</i>
      <i className="coin-face" style={{ transform: `rotateY(180deg) translateZ(${depth / 2}px)` }}>R$</i>
    </span>
  )
}

/* Moedas do topo: giram e sobem com a rolagem, reagem ao mouse em profundidade. */
const HERO_COINS = [
  { size: 132, depth: 14, className: 'right-[-34px] top-[-40px] z-20', parallax: 1, spin: 540, tilt: 26, float: 'coin-float' },
  { size: 78, depth: 10, className: 'left-[-46px] top-[38%] z-20', parallax: 1.6, spin: -420, tilt: 18, float: 'coin-float coin-float--late' },
  { size: 46, depth: 8, className: 'right-[18%] bottom-[-70px] z-0 blur-[1.5px] opacity-80', parallax: 2.4, spin: 360, tilt: 12, float: 'coin-float coin-float--slow' },
]

function HeroCoin({ coin, scrollY, px, py }) {
  const y = useTransform(scrollY, [0, 900], [0, -160 * coin.parallax])
  const rotateY = useTransform(scrollY, [0, 900], [-18, coin.spin])
  const rotateX = useTransform(py, [-1, 1], [coin.tilt, -coin.tilt])
  const tiltY = useTransform(px, [-1, 1], [-coin.tilt, coin.tilt])
  const x = useTransform(px, [-1, 1], [-10 * coin.parallax, 10 * coin.parallax])
  const rotY = useTransform([rotateY, tiltY], ([a, b]) => a + b)

  return (
    <motion.div className={`pointer-events-none absolute ${coin.className}`} style={{ y, x }}>
      <div className={coin.float}>
        <motion.div style={{ rotateX, rotateY: rotY, transformPerspective: 800, transformStyle: 'preserve-3d' }}>
          <Coin size={coin.size} depth={coin.depth} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function HeroCoins() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const pxRaw = useMotionValue(0)
  const pyRaw = useMotionValue(0)
  const px = useSpring(pxRaw, { stiffness: 60, damping: 18 })
  const py = useSpring(pyRaw, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (event) => {
      pxRaw.set((event.clientX / window.innerWidth) * 2 - 1)
      pyRaw.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, pxRaw, pyRaw])

  if (reduce) {
    return (
      <div className="pointer-events-none absolute right-[-30px] top-[-36px] z-20" style={{ transform: 'rotateY(-18deg)', transformStyle: 'preserve-3d' }}>
        <Coin size={120} depth={14} />
      </div>
    )
  }

  return HERO_COINS.map((coin) => <HeroCoin key={coin.size} coin={coin} scrollY={scrollY} px={px} py={py} />)
}

/* Frase que “se levanta” em perspectiva conforme entra na tela. */
export function PerspectiveText({ children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [38, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <div ref={ref} style={{ perspective: 900 }}>
      <motion.div className={className} style={reduce ? undefined : { rotateX, opacity, y, transformOrigin: '50% 100%' }}>
        {children}
      </motion.div>
    </div>
  )
}

/* Número que rola até o novo valor. */
export function AnimatedNumber({ value, format = formatFull, className = '' }) {
  const reduce = useReducedMotion()
  const current = useMotionValue(value)
  useEffect(() => {
    const controls = animate(current, value, { duration: 0.9, ease: EASE })
    return () => controls.stop()
  }, [current, value])
  const text = useTransform(current, (v) => format(v))
  return <motion.span className={className}>{reduce ? format(value) : text}</motion.span>
}

/* ---------- Seção fixada: pilhas de moedas crescendo com os juros compostos ---------- */

const START = 5_000_000
const YEARS = 20
const RATE_A = 0.1
const RATE_B = 0.08
const MAX_VALUE = START * (1 + RATE_A) ** YEARS
const MAX_COINS = 20
const COIN_STEP = MAX_VALUE / MAX_COINS
const COIN_DEPTH = 11

function StackCoin({ index, value, tone, size }) {
  const threshold = index * COIN_STEP
  const p = useTransform(value, (v) => Math.min(1, Math.max(0, (v - threshold) / (COIN_STEP * 0.9))))
  const z = useTransform(p, (t) => index * (COIN_DEPTH + 1) + (1 - t) * 140)
  const scale = useTransform(p, [0, 0.05, 1], [0, 0.7, 1])
  return (
    <motion.div className="absolute inset-0" style={{ z, scale, transformStyle: 'preserve-3d' }}>
      <Coin size={size} depth={COIN_DEPTH} tone={tone} />
    </motion.div>
  )
}

function CoinStack({ value, tone, size, x }) {
  return (
    <div className="absolute top-1/2 left-1/2" style={{ width: size, height: size, transform: `translate(-50%, -50%) translateX(${x}px)`, transformStyle: 'preserve-3d' }}>
      <span className="coin-shadow" aria-hidden="true" />
      {Array.from({ length: MAX_COINS }, (_, i) => (
        <StackCoin key={i} index={i} value={value} tone={tone} size={size} />
      ))}
    </div>
  )
}

const STEPS = [
  ['Ano 0', 'Duas carteiras começam iguais, com R$ 5 milhões cada.'],
  ['Ano 10', 'Uma diferença de 2% ao ano em custos já começa a separar as duas.'],
  ['Ano 20', 'A distância deixa de ser detalhe e vira patrimônio.'],
]

function StepCaption({ progress, index, children }) {
  const start = index / STEPS.length
  const end = (index + 1) / STEPS.length
  const isLast = index === STEPS.length - 1
  const opacity = useTransform(
    progress,
    index === 0 ? [0, end - 0.06, end] : isLast ? [start - 0.04, start + 0.04, 1] : [start - 0.04, start + 0.04, end - 0.06, end],
    index === 0 ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0],
  )
  const y = useTransform(opacity, [0, 1], [12, 0])
  return (
    <motion.p className="absolute inset-x-0 top-0 text-lg leading-[1.55] text-ink-2 sm:text-xl" style={{ opacity, y }}>
      {children}
    </motion.p>
  )
}

export function CompoundStory() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const fixedEnd = useMotionValue(1)
  const progress = reduce ? fixedEnd : smooth

  const years = useTransform(progress, (p) => Math.min(YEARS, Math.max(0, p * 1.08 * YEARS)))
  const valueA = useTransform(years, (y) => START * (1 + RATE_A) ** y)
  const valueB = useTransform(years, (y) => START * (1 + RATE_B) ** y)
  const yearLabel = useTransform(years, (y) => `Ano ${Math.round(y)}`)
  const labelA = useTransform(valueA, formatCompact)
  const labelB = useTransform(valueB, formatCompact)
  const gap = useTransform([valueA, valueB], ([a, b]) => formatFull(a - b))
  const stageSpin = useTransform(progress, [0, 1], [-38, -22])
  const stageTilt = useTransform(progress, [0, 1], [62, 56])

  return (
    <section ref={ref} aria-labelledby="custo-ano-a-ano" className="relative bg-white" style={{ height: reduce ? 'auto' : '280vh' }}>
      <div className={`${reduce ? 'py-24' : 'sticky top-[72px] h-[calc(100dvh-72px)]'} flex items-center overflow-hidden`}>
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-6 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
          <div>
            <h2 id="custo-ano-a-ano" className="text-[30px] leading-[1.1] font-light tracking-[-0.025em] text-ink sm:text-[44px]">
              O custo invisível, ano a ano.
            </h2>

            <div className="mt-6 flex items-baseline gap-4">
              <motion.span className="tnum text-[44px] leading-none font-light tracking-[-0.03em] text-primary sm:text-[64px]">
                {reduce ? `Ano ${YEARS}` : yearLabel}
              </motion.span>
            </div>

            <div className="relative mt-5 h-[84px] sm:h-[64px]">
              {reduce ? (
                <p className="text-lg leading-[1.55] text-ink-2 sm:text-xl">{STEPS[2][1]}</p>
              ) : (
                STEPS.map(([label, text], index) => (
                  <StepCaption key={label} progress={progress} index={index}>
                    {text}
                  </StepCaption>
                ))
              )}
            </div>

            <dl className="mt-4 grid max-w-md gap-3 border-t border-hairline pt-5 text-[15px]">
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2.5 text-ink-2">
                  <span className="h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
                  Carteira com maior eficiência
                </dt>
                <dd className="tnum font-medium text-ink"><motion.span>{labelA}</motion.span></dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2.5 text-ink-2">
                  <span className="h-3 w-3 rounded-full bg-[#aab3c2]" aria-hidden="true" />
                  Carteira com atrito adicional
                </dt>
                <dd className="tnum font-medium text-ink"><motion.span>{labelB}</motion.span></dd>
              </div>
              <div className="flex items-end justify-between gap-4 border-t border-hairline pt-3">
                <dt className="text-ink">Diferença acumulada</dt>
                <dd className="tnum text-[22px] font-light tracking-[-0.02em] text-primary sm:text-[26px]"><motion.span>{gap}</motion.span></dd>
              </div>
            </dl>

            <p className="mt-5 max-w-md text-xs leading-5 text-mute">
              Simulação ilustrativa: retorno bruto constante de 10% a.a. e diferença hipotética de 2% a.a. em custos. Não é promessa nem projeção de rentabilidade. Rentabilidade passada não garante resultados futuros.
            </p>
          </div>

          <div className="relative mx-auto h-[250px] w-full max-w-[520px] sm:h-[420px]" aria-hidden="true">
            <div className="absolute inset-0 origin-center scale-[0.62] sm:scale-100" style={{ perspective: 1400 }}>
              <motion.div className="absolute inset-0" style={{ rotateX: stageTilt, rotateZ: stageSpin, transformStyle: 'preserve-3d' }}>
                <span className="stage-floor" />
                <CoinStack value={valueA} tone="indigo" size={124} x={-82} />
                <CoinStack value={valueB} tone="silver" size={124} x={86} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
