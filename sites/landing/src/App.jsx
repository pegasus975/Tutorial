import { useMemo, useState } from 'react'

const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || '#diagnostico'
const LINKEDIN_URL = 'https://www.linkedin.com/in/fernando-arnhold/'
const INSTAGRAM_URL = 'https://www.instagram.com/FERNANDO.ARNHOLD'
const CONTACT_EMAIL = 'fernando.arnhold@montebravo.com.br'
const FEE_BASED_VIDEO_URL = import.meta.env.VITE_FEE_BASED_VIDEO_URL || ''

function getVideoEmbedUrl(url) {
  if (!url) return ''

  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname.replace('www.', '')

    if (hostname === 'youtu.be') {
      const videoId = parsed.pathname.split('/').filter(Boolean)[0]
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1` : ''
    }

    if (hostname.includes('youtube.com')) {
      const parts = parsed.pathname.split('/').filter(Boolean)
      const videoId = parsed.searchParams.get('v') || (['embed', 'shorts', 'live'].includes(parts[0]) ? parts[1] : '')
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1` : ''
    }

    if (hostname === 'vimeo.com' || hostname === 'player.vimeo.com') {
      const videoId = parsed.pathname.split('/').filter(Boolean).find((part) => /^\d+$/.test(part))
      return videoId ? `https://player.vimeo.com/video/${videoId}?dnt=1` : ''
    }

    return url
  } catch {
    return ''
  }
}

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
    return: <><path d="M4 12a8 8 0 1 0 3-6.2" /><path d="M4 4v6h6" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4 4-2Z" /></>,
    chart: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /></>,
    scale: <><path d="m12 3-7 4 7 4 7-4-7-4Z" /><path d="m5 12 7 4 7-4" /><path d="m5 17 7 4 7-4" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    wallet: <><path d="M4 7a2 2 0 0 1 2-2h12v14H6a2 2 0 0 1-2-2V7Z" /><path d="M4 8h14" /><path d="M15 13h3" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    building: <><path d="M4 21V7l8-4 8 4v14" /><path d="M9 21v-5h6v5" /><path d="M8 9h.01" /><path d="M12 9h.01" /><path d="M16 9h.01" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7" /><path d="M8 7v.01" /><path d="M12 17v-4a3 3 0 0 1 6 0v4" /><path d="M12 10v7" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M8 7V5h8v2" /><path d="M3 12h18" /></>,
    graduation: <><path d="m3 10 9-5 9 5-9 5-9-5Z" /><path d="M7 12v4c3 2 7 2 10 0v-4" /></>,
    play: <path d="m9 7 8 5-8 5V7Z" />,
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
      <p className={`mb-4 text-xs font-semibold tracking-[0.22em] uppercase ${inverse ? 'text-gold-300' : 'text-navy-700'}`}>
        {eyebrow}
      </p>
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

function PrimaryButton({ href = '#diagnostico', children, inverse = false, className = '', ...props }) {
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
    ['Modelo Fee Based', '#fee-based'],
    ['Metodologia', '#metodologia'],
    ['Sobre', '#sobre'],
    ['Dúvidas', '#faq'],
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10">
      <Container className="flex h-20 items-center justify-between">
        <a href="#inicio" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Fernando Arnhold — início">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-white/25 bg-white/5">
            <img src="/images/fernando-arnhold-avatar.webp" alt="" className="h-full w-full object-cover" width="640" height="640" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.08em] text-white uppercase">Fernando Arnhold</p>
            <p className="text-[10px] tracking-[0.18em] text-platinum-300 uppercase">Financial Advisor</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="focus-ring rounded-sm text-sm text-platinum-300 transition hover:text-white">
              {label}
            </a>
          ))}
          <a href="#diagnostico" className="focus-ring rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-navy-900">
            Agendar diagnóstico
          </a>
        </nav>

        <button
          type="button"
          className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-navy-950/98 px-5 py-5 backdrop-blur lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Navegação móvel">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="focus-ring border-b border-white/10 py-4 text-base text-platinum-200"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <PrimaryButton href="#diagnostico" inverse className="mt-5 w-full" onClick={() => setOpen(false)}>
              Agendar diagnóstico
            </PrimaryButton>
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero-grid relative overflow-hidden bg-navy-950 pt-20 text-white">
      <div className="absolute top-24 -right-28 h-96 w-96 rounded-full bg-navy-700/30 blur-3xl" />
      <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

      <Container className="relative grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
        <div className="reveal max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.055] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-platinum-200 uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
            Wealth Management · Modelo Fee Based
          </div>

          <h1 className="max-w-5xl text-4xl leading-[1.07] font-semibold tracking-[-0.048em] sm:text-5xl lg:text-7xl">
            Gestão Patrimonial com Alinhamento Total:
            <span className="mt-2 block text-platinum-300">O Fim do Conflito de Interesses.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-platinum-300 sm:text-xl">
            Consultoria patrimonial focada em transparência total e resultados de longo prazo. Eu trabalho para você, não para os produtos.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="#diagnostico" inverse className="w-full sm:w-auto">
              Agendar meu Diagnóstico Patrimonial
            </PrimaryButton>
            <a href="#video-fee-based" className="focus-ring inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10">
                <Icon name="play" className="h-3.5 w-3.5" />
              </span>
              Entenda o Fee Based em 90 segundos
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ['Sem incentivo à venda', 'Recomendações orientadas à estratégia'],
              ['Cashback transparente', 'Repasses tratados conforme o modelo contratado'],
              ['Visão integrada', 'Investimentos, tributos e sucessão'],
            ].map(([title, body]) => (
              <div key={title} className="border-l border-white/20 pl-4">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs leading-5 text-platinum-500">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-navy-900 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
              <img
                src="/images/fernando-arnhold.webp"
                alt="Fernando Arnhold em retrato profissional"
                className="h-full w-full object-cover object-[50%_22%]"
                width="1024"
                height="1536"
                fetchPriority="high"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy-950/65 px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-gold-300 uppercase backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
                Fernando Arnhold
              </div>
              <p className="mt-4 max-w-sm text-xl leading-snug font-semibold text-white sm:text-2xl">
                Sócio e Financial Advisor na Monte Bravo
              </p>
              <p className="mt-2 text-sm leading-6 text-platinum-300">Wealth Management · Planejamento Patrimonial · Soluções Corporativas</p>
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

          <div className="mt-4 ml-auto max-w-[320px] rounded-2xl border border-white/15 bg-navy-900 p-4 shadow-xl sm:p-5 xl:absolute xl:top-[43%] xl:-right-8 xl:mt-0 xl:max-w-[205px] xl:bg-navy-950/92 xl:p-4 xl:backdrop-blur">
            <div className="flex items-center gap-2 text-gold-300">
              <Icon name="graduation" className="h-4 w-4 shrink-0" />
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase">Formação do mercado</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-platinum-200">Professor de MBA em investimentos e planejamento financeiro.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ConflictSection() {
  return (
    <section id="fee-based" className="bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="O custo invisível"
              title="O custo que pode estar corroendo sua rentabilidade."
              body="Nem sempre o maior custo de uma carteira aparece no extrato. Muitas vezes, ele está no incentivo econômico por trás da recomendação."
            />
            <blockquote className="mt-9 border-l-2 border-gold-400 pl-5 text-xl leading-8 font-medium text-navy-900 sm:text-2xl">
              “Se o seu consultor ganha na venda e não no seu resultado, para quem ele realmente trabalha?”
            </blockquote>
          </div>

          <div className="rounded-[2rem] border border-platinum-200 bg-platinum-50 p-6 sm:p-9">
            <div className="space-y-5">
              {[
                ['Produtos com maior comissão', 'A remuneração pode variar conforme o produto recomendado, criando incentivo comercial que precisa ser explicitado e controlado.'],
                ['Giros desnecessários', 'Trocas frequentes podem gerar custos, tributação antecipada e perda de eficiência sem necessariamente melhorar a estratégia.'],
                ['Custos fragmentados', 'Taxas de administração, performance, distribuição, spread e estruturação podem reduzir o retorno líquido percebido.'],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(7,24,45,0.05)]">
                  <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-900 text-white">
                    <Icon name="search" className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-navy-900 p-5 text-white">
              <p className="text-sm leading-6 text-platinum-300">
                O Fee Based não torna qualquer relação financeira livre de conflitos. Ele reduz estruturalmente o incentivo à venda de produtos e torna a remuneração mais previsível, auditável e conectada ao acompanhamento patrimonial.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}


function PullQuote() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div className="absolute inset-0 hero-grid opacity-60" />
      <Container className="relative">
        <p className="max-w-4xl text-2xl leading-[1.35] font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
          O Fee Based não é um produto.
          <span className="mt-2 block text-platinum-300">É um modelo de relacionamento.</span>
        </p>
      </Container>
    </section>
  )
}

function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const embedUrl = useMemo(() => getVideoEmbedUrl(FEE_BASED_VIDEO_URL), [])
  const autoplayUrl = embedUrl ? `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1` : ''

  const topics = [
    'Como funciona a remuneração no modelo comissionado',
    'Onde podem surgir incentivos desalinhados na recomendação',
    'O que muda na experiência e na transparência do Fee Based',
  ]

  return (
    <section id="video-fee-based" className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-28">
      <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-navy-700/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div className="relative">
            <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-white/15 bg-navy-950 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
              {playing && embedUrl ? (
                <iframe
                  src={autoplayUrl}
                  title="Fernando Arnhold explica o modelo Fee Based"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <>
                  <img
                    src="/images/fernando-arnhold.webp"
                    alt="Fernando Arnhold em apresentação sobre o modelo Fee Based"
                    className="h-full w-full object-cover object-[50%_25%]"
                    width="1024"
                    height="1536"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/35 to-navy-950/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => embedUrl && setPlaying(true)}
                      disabled={!embedUrl}
                      className="focus-ring group grid h-20 w-20 place-items-center rounded-full border border-white/35 bg-white/95 text-navy-900 shadow-2xl transition hover:scale-105 disabled:cursor-default disabled:opacity-90 sm:h-24 sm:w-24"
                      aria-label={embedUrl ? 'Reproduzir vídeo sobre o modelo Fee Based' : 'Vídeo sobre Fee Based em preparação'}
                    >
                      <Icon name="play" className="ml-1 h-8 w-8 transition group-hover:scale-110 sm:h-10 sm:w-10" />
                    </button>
                  </div>

                  <div className="absolute top-5 left-5 rounded-full border border-white/20 bg-navy-950/70 px-3.5 py-2 text-[10px] font-semibold tracking-[0.14em] text-gold-300 uppercase backdrop-blur">
                    {embedUrl ? 'Vídeo · aproximadamente 90 segundos' : 'Vídeo em preparação'}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                    <p className="max-w-xl text-lg leading-snug font-semibold text-white sm:text-2xl">
                      A remuneração influencia a recomendação antes mesmo da escolha do investimento.
                    </p>
                  </div>
                </>
              )}
            </div>

            <p className="mt-4 text-xs leading-5 text-platinum-500">
              O vídeo não promete rentabilidade nem substitui uma análise individual. Ele explica a lógica de incentivos e transparência do modelo.
            </p>
          </div>

          <div>
            <SectionHeading
              eyebrow="Fee Based em 90 segundos"
              title="Por que a forma como o profissional é remunerado muda tudo?"
              body="Em poucos minutos, entenda a diferença entre recomendações orientadas por comissões e uma estrutura em que a remuneração é previamente acordada e transparente."
              inverse
            />

            <div className="mt-8 space-y-3">
              {topics.map((topic) => (
                <div key={topic} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5">
                  <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-gold-300">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm leading-6 text-platinum-200">{topic}</p>
                </div>
              ))}
            </div>

            <blockquote className="mt-7 border-l-2 border-gold-400 pl-5 text-base leading-7 text-platinum-200">
              O objetivo não é simplesmente trocar produtos ou instituições. É construir uma relação na qual custos, incentivos e decisões estejam claros desde o início.
            </blockquote>

            <PrimaryButton href="#diagnostico" inverse className="mt-8 w-full sm:w-auto">
              Agendar meu Diagnóstico Patrimonial
            </PrimaryButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

function MathProof() {
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
      alignedRate,
      commissionedRate,
    }
  }, [capital, years, drag])

  const maxValue = Math.max(result.aligned, result.commissioned)
  const alignedWidth = `${(result.aligned / maxValue) * 100}%`
  const commissionedWidth = `${(result.commissioned / maxValue) * 100}%`

  return (
    <section className="soft-grid bg-platinum-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="A prova matemática"
          title="Pequenas diferenças anuais se tornam grandes diferenças patrimoniais."
          body="Abaixo, uma simulação ilustrativa para visualizar o efeito cumulativo de custos, spreads, estruturas mais caras e giros evitáveis. Ajuste os parâmetros conforme sua realidade."
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
              Premissa ilustrativa: retorno bruto constante de {grossReturn}% a.a. A diferença selecionada não representa promessa, média histórica ou garantia de resultado.
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
                <p className="text-xs tracking-[0.14em] text-gold-300 uppercase">No diagnóstico</p>
                <p className="mt-2 text-sm leading-6 text-platinum-200">Mapeamos custos, tributação, riscos e sobreposições da sua carteira real.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Methodology() {
  const pillars = [
    {
      number: '01',
      icon: 'scale',
      title: 'Alinhamento Integral',
      body: 'A remuneração é definida por honorário sobre o patrimônio acompanhado, conforme contrato. O objetivo é reduzir o incentivo econômico de recomendar um produto apenas porque ele paga mais.',
      detail: 'Mais previsibilidade. Menos distorção comercial.',
    },
    {
      number: '02',
      icon: 'return',
      title: 'Transparência de Cashback',
      body: 'As comissões e rebates elegíveis são tratados com transparência e devolvidos ao cliente de acordo com as regras da plataforma e do contrato aplicável.',
      detail: 'O que é do cliente retorna ao cliente.',
    },
    {
      number: '03',
      icon: 'compass',
      title: 'Visão 360º',
      body: 'A carteira deixa de ser analisada de forma isolada. Investimentos, liquidez, riscos, tributação, aposentadoria, proteção e sucessão passam a responder à mesma estratégia patrimonial.',
      detail: 'Uma visão única para decisões conectadas.',
    },
  ]

  return (
    <section id="metodologia" className="bg-white py-24 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Os 3 Pilares Arnhold"
            title="Uma metodologia construída para proteger a qualidade da decisão."
            body="Antes de escolher produtos, definimos objetivos, restrições, riscos e a função de cada recurso dentro do patrimônio."
          />
          <p className="max-w-sm text-sm leading-6 text-slate-500">Método, governança e acompanhamento contínuo para famílias, empresários e estruturas patrimoniais PF e PJ.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.number} className="group flex min-h-[390px] flex-col rounded-[1.75rem] border border-platinum-200 bg-platinum-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-platinum-300 hover:shadow-[0_20px_50px_rgba(7,24,45,0.08)] sm:p-8">
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-white">
                  <Icon name={pillar.icon} className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-platinum-300">{pillar.number}</span>
              </div>
              <h3 className="mt-9 text-2xl font-semibold tracking-[-0.025em] text-navy-900">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{pillar.body}</p>
              <div className="mt-auto border-t border-platinum-200 pt-6">
                <p className="text-sm font-semibold text-navy-800">{pillar.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ComparisonSection() {
  const commissioned = [
    'Remuneração ligada a transações e produtos específicos.',
    'Custo total menos previsível ao longo do tempo.',
    'Estrutura de incentivo que precisa de controles adicionais.',
  ]
  const feeBased = [
    'Honorário definido previamente, independente do produto escolhido.',
    'Custo mais previsível e auditável para o cliente.',
    'Remuneração conectada ao acompanhamento patrimonial contínuo.',
  ]

  return (
    <section className="bg-platinum-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Os dois modelos, lado a lado"
          title="O desafio do modelo tradicional e o próximo passo natural."
          body="O modelo comissionado foi desenhado para remunerar operações e produtos. O acompanhamento patrimonial contínuo pede uma estrutura diferente."
          align="left"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-platinum-200 bg-white p-7 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Modelo comissionado</p>
            <ul className="mt-5 space-y-4">
              {commissioned.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-navy-900 bg-navy-950 p-7 text-white sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold-300 uppercase">Fee Based</p>
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

        <p className="mt-6 max-w-3xl text-xs leading-5 text-slate-500">
          O Fee Based não elimina todos os conflitos possíveis nem garante resultado superior. É uma estrutura de remuneração diferente, com previsibilidade e transparência maiores sobre como o profissional é pago.
        </p>
      </Container>
    </section>
  )
}

function RespaldoRegulatorio() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 hero-grid opacity-60" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-gold-300 uppercase">Contexto regulatório e de mercado</p>
            <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">
              Uma mudança já em curso, amparada pela CVM e consolidada nos mercados mais maduros.
            </h2>
            <p className="mt-5 text-base leading-8 text-platinum-300">
              A Resolução CVM nº 179 trata da transparência na remuneração e dos conflitos de interesse na distribuição de investimentos, e tem acelerado a adoção do modelo Fee Based no Brasil. Não se trata de uma preferência isolada, mas de uma direção que o próprio mercado e o regulador vêm reforçando.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-2xl font-semibold text-white">70%+</p>
                <p className="mt-2 text-xs leading-5 text-platinum-300">dos advisors independentes nos EUA já operam sob modelos baseados em honorários, segundo a Investment Adviser Association.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-2xl font-semibold text-white">CVM 179</p>
                <p className="mt-2 text-xs leading-5 text-platinum-300">resolução que trata da transparência na remuneração e dos conflitos de interesse na distribuição de valores mobiliários.</p>
              </div>
            </div>
          </div>

          <blockquote className="rounded-[2rem] border border-gold-300/25 bg-white/[0.04] p-8">
            <p className="text-2xl leading-snug font-semibold text-white sm:text-3xl">
              “Mostre-me os incentivos e eu lhe direi qual será o resultado.”
            </p>
            <footer className="mt-5 text-sm text-platinum-300">Charlie Munger, investidor</footer>
          </blockquote>
        </div>
      </Container>
    </section>
  )
}

function Diagnostic() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const params = new URLSearchParams({
      nome: form.get('nome') || '',
      telefone: form.get('telefone') || '',
      patrimonio: form.get('patrimonio') || '',
      email: form.get('email') || '',
      prioridade: form.get('prioridade') || '',
    })

    if (BOOKING_URL && !BOOKING_URL.startsWith('#')) {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead')
      }
      const connector = BOOKING_URL.includes('?') ? '&' : '?'
      window.location.href = `${BOOKING_URL}${connector}${params.toString()}`
      return
    }

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(form).toString(),
      })

      if (!response.ok) {
        throw new Error('Não foi possível enviar o formulário.')
      }

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead')
      }

      formElement.reset()
      setSubmitted(true)
    } catch {
      setSubmitError('Não foi possível enviar seus dados agora. Tente novamente ou utilize o canal de contato informado no site.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="diagnostico" className="bg-navy-950 py-24 text-white sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Diagnóstico patrimonial"
              title="Sua carteira está realmente otimizada?"
              body="Solicite uma análise inicial, gratuita e sem compromisso, para identificar pontos de atenção em custos, riscos, eficiência tributária, liquidez e alinhamento da carteira atual."
              inverse
            />

            <div className="mt-9 space-y-4">
              {[
                'Leitura da estrutura atual e dos objetivos patrimoniais',
                'Mapeamento de custos explícitos e potenciais custos invisíveis',
                'Análise de concentração, liquidez e riscos não intencionais',
                'Identificação de oportunidades tributárias e sucessórias para aprofundamento',
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-platinum-200">
                  <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-gold-300">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-md text-xs leading-5 text-platinum-500">A análise inicial não constitui recomendação individual definitiva. Qualquer orientação depende do entendimento completo do perfil, objetivos, restrições e documentação aplicável.</p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 text-navy-900 shadow-2xl sm:p-9">
            {submitted ? (
              <div className="grid min-h-[420px] place-items-center text-center">
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-navy-900 text-white">
                    <Icon name="check" className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">Solicitação enviada com sucesso.</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">Recebi suas informações para o diagnóstico patrimonial. O próximo passo é entrar em contato para compreender melhor seu momento e alinhar a conversa inicial.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="focus-ring mt-6 rounded-full border border-platinum-300 px-5 py-2.5 text-sm font-semibold">Voltar ao formulário</button>
                </div>
              </div>
            ) : (
              <form
                name="diagnostico-patrimonial"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="diagnostico-patrimonial" />
                <p className="hidden" aria-hidden="true">
                  <label>Não preencha este campo: <input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
                </p>
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-navy-700 uppercase">Solicitar análise</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">Conte brevemente sobre seu momento patrimonial.</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">As informações abaixo ajudam a direcionar a primeira conversa.</p>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Nome</span>
                    <input required name="nome" autoComplete="name" className="focus-ring mt-2 h-12 w-full rounded-xl border border-platinum-300 bg-white px-4 text-sm outline-none transition focus:border-navy-700" placeholder="Seu nome completo" />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-slate-700">Telefone</span>
                    <input required name="telefone" inputMode="tel" autoComplete="tel" className="focus-ring mt-2 h-12 w-full rounded-xl border border-platinum-300 bg-white px-4 text-sm outline-none transition focus:border-navy-700" placeholder="(11) 99999-9999" />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-slate-700">E-mail</span>
                    <input required name="email" type="email" autoComplete="email" className="focus-ring mt-2 h-12 w-full rounded-xl border border-platinum-300 bg-white px-4 text-sm outline-none transition focus:border-navy-700" placeholder="voce@email.com" />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Faixa patrimonial investida</span>
                    <select required name="patrimonio" defaultValue="" className="focus-ring mt-2 h-12 w-full rounded-xl border border-platinum-300 bg-white px-4 text-sm outline-none transition focus:border-navy-700">
                      <option value="" disabled>Selecione uma faixa</option>
                      <option>Até R$ 5 milhões</option>
                      <option>De R$ 5 milhões a R$ 10 milhões</option>
                      <option>De R$ 10 milhões a R$ 30 milhões</option>
                      <option>Acima de R$ 30 milhões</option>
                    </select>
                  </label>
                  <label className="sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Principal prioridade</span>
                    <textarea name="prioridade" rows="4" className="focus-ring mt-2 w-full resize-none rounded-xl border border-platinum-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-navy-700" placeholder="Ex.: reduzir riscos, organizar sucessão, revisar custos ou estruturar aposentadoria." />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="focus-ring mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Enviando...' : 'Agendar meu Diagnóstico Patrimonial'}
                  {!submitting && <Icon name="arrow" className="h-4 w-4" />}
                </button>
                {submitError && (
                  <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-xs leading-5 text-red-700">
                    {submitError}
                  </p>
                )}
                <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">Ao enviar, você concorda em ser contatado sobre o diagnóstico. Publique uma Política de Privacidade adequada antes de iniciar campanhas de captação.</p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

function About() {
  const specialties = [
    ['Acompanhamento de investimentos', 'Estruturação e acompanhamento de carteiras no Brasil e no exterior, com atenção a risco, liquidez, custos e objetivos de longo prazo.'],
    ['Planejamento patrimonial e financeiro', 'Organização de aposentadoria, fluxo de caixa, sucessão e decisões relevantes de famílias, empresários e executivos.'],
    ['Tesouraria, câmbio e crédito', 'Apoio a empresas em temas de caixa, proteção cambial, estruturação de crédito e operações corporativas.'],
    ['Estrutura de capital', 'Análise de alternativas de captação, mercado de capitais e decisões financeiras estratégicas para empresários e CFOs.'],
  ]

  return (
    <section id="sobre" className="overflow-hidden bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <div className="relative mx-auto w-full max-w-xl lg:sticky lg:top-28">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group block overflow-hidden rounded-[1.75rem] border border-platinum-200 bg-white p-3 shadow-[0_22px_65px_rgba(7,24,45,0.10)] transition hover:-translate-y-1"
              aria-label="Abrir o perfil de Fernando Arnhold no LinkedIn"
            >
              <img
                src="/images/linkedin-fernando-arnhold.webp"
                alt="Resumo do perfil profissional de Fernando Arnhold no LinkedIn"
                className="w-full rounded-[1.2rem]"
                width="585"
                height="308"
                loading="lazy"
              />
              <div className="flex items-center justify-between gap-4 px-2 pt-4 pb-1">
                <div>
                  <p className="text-sm font-semibold text-navy-900">Perfil profissional</p>
                  <p className="mt-1 text-xs text-slate-500">Experiência, publicações e conexões profissionais.</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-900 text-white transition group-hover:bg-navy-800">
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
              </div>
            </a>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-3 rounded-2xl border border-platinum-200 bg-platinum-50 px-4 py-3.5 text-sm font-semibold text-navy-900 transition hover:border-navy-700"
              >
                <Icon name="linkedin" className="h-5 w-5" />
                LinkedIn
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-3 rounded-2xl border border-platinum-200 bg-platinum-50 px-4 py-3.5 text-sm font-semibold text-navy-900 transition hover:border-navy-700"
              >
                <Icon name="instagram" className="h-5 w-5" />
                Instagram
              </a>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Sobre Fernando Arnhold"
              title="Estratégia, clareza e alinhamento para decisões patrimoniais de longo prazo."
              body="Atuo ao lado de empresários, famílias, executivos e empresas na estruturação de soluções financeiras, patrimoniais e corporativas, com foco em decisões mais eficientes, estratégicas e alinhadas aos objetivos de cada cliente."
            />

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                ['briefcase', 'Sócio e Financial Advisor · Monte Bravo'],
                ['graduation', 'Professor de MBA'],
                ['globe', 'São Paulo · Brasil'],
              ].map(([icon, label]) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-platinum-200 bg-platinum-50 px-3.5 py-2 text-xs font-medium text-slate-700">
                  <Icon name={icon} className="h-4 w-4 text-navy-700" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-platinum-200 bg-white p-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-gold-400 uppercase">Wealth Management</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Consolidação e atendimento de carteiras em diversas instituições, para clientes com patrimônio financeiro acima de R$ 10 milhões — conectando investimentos, liquidez, risco, tributação e planejamento patrimonial.
                </p>
              </div>
              <div className="rounded-2xl border border-platinum-200 bg-white p-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-gold-400 uppercase">Soluções corporativas</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Apoio a empresas em tesouraria, câmbio, crédito, estrutura de capital, mercado de capitais e alternativas de captação.
                </p>
              </div>
            </div>

            <div className="mt-9 grid gap-4">
              {specialties.map(([title, body], index) => (
                <div key={title} className="grid gap-3 border-b border-platinum-200 pb-5 sm:grid-cols-[auto_1fr]">
                  <span className="text-sm font-semibold text-gold-400">0{index + 1}</span>
                  <div>
                    <h3 className="font-semibold text-navy-900">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-base leading-8 text-slate-600">
              Além da atuação no mercado, sou professor de MBA nas áreas de investimentos, planejamento financeiro e certificações financeiras, contribuindo para a formação de profissionais do setor.
            </p>

            <blockquote className="mt-7 rounded-2xl border border-gold-400/30 bg-gold-300/10 p-5 text-base leading-7 text-navy-900">
              “Um bom trabalho financeiro não se resume à escolha de produtos, mas à construção de estratégia, clareza e alinhamento de longo prazo.”
            </blockquote>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
              >
                <Icon name="mail" className="h-4 w-4 shrink-0" />
                <span className="break-all text-xs sm:text-sm">{CONTACT_EMAIL}</span>
              </a>
              <a href="#diagnostico" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-platinum-300 px-5 py-3 text-sm font-semibold text-navy-900 transition hover:border-navy-700">
                Agendar meu Diagnóstico Patrimonial
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
          </div>
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
          title="Uma mudança de mercado, não uma opinião isolada."
          body="O movimento em direção ao modelo Fee Based tem sido acompanhado de perto pela imprensa especializada, inclusive envolvendo a própria Monte Bravo."
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
  const items = [
    {
      question: 'O que é o modelo Fee Based?',
      answer: 'É um modelo de remuneração no qual o serviço de acompanhamento é cobrado por honorário previamente definido, normalmente relacionado ao patrimônio acompanhado. A lógica é tornar a remuneração mais previsível e reduzir o incentivo de escolher produtos com base na comissão de distribuição. As condições exatas devem constar no contrato.',
    },
    {
      question: 'Fee Based elimina todos os conflitos de interesse?',
      answer: 'Não. Nenhum modelo, isoladamente, elimina todos os conflitos possíveis. O Fee Based reduz de maneira relevante o conflito associado à remuneração variável por produto. Ainda assim, transparência, deveres profissionais, governança, suitability e documentação continuam essenciais.',
    },
    {
      question: 'Como funciona a devolução de cashback ou rebates?',
      answer: 'Quando um produto gera comissão de distribuição elegível, o valor pode ser devolvido ou compensado em favor do cliente, conforme as regras da instituição, da plataforma e do contrato vigente. A página deve refletir exatamente a mecânica operacional disponível no seu modelo de atendimento.',
    },
    {
      question: 'Por que esse modelo é adotado por investidores sofisticados?',
      answer: 'Porque famílias empresárias, investidores institucionais e estruturas de wealth management tendem a valorizar clareza de custos, governança, separação entre aconselhamento e distribuição e acompanhamento de longo prazo. O ponto não é o rótulo do modelo, mas a capacidade de demonstrar alinhamento, processo e prestação de contas.',
    },
    {
      question: 'O diagnóstico já inclui uma recomendação de investimentos?',
      answer: 'A primeira conversa serve para compreender o contexto e identificar pontos de atenção. Uma recomendação individual depende da análise completa de perfil, objetivos, horizonte, liquidez, riscos, tributação e demais informações necessárias.',
    },
    {
      question: 'Para quem este trabalho faz mais sentido?',
      answer: 'Principalmente para investidores e famílias com patrimônio financeiro acima de R$ 10 milhões que desejam organizar o patrimônio com visão integrada, entender o custo real da carteira, reduzir decisões fragmentadas e contar com acompanhamento consultivo em temas como riscos, aposentadoria, liquidez, tributação, sucessão e investimentos no Brasil e no exterior.',
    },
  ]

  return (
    <section id="faq" className="bg-platinum-50 py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ técnico"
              title="Transparência também significa explicar o modelo sem simplificações."
              body="As respostas abaixo estabelecem expectativas realistas sobre remuneração, cashback, diagnóstico e escopo do trabalho."
            />
            <PrimaryButton href="#diagnostico" className="mt-8">Agendar meu Diagnóstico Patrimonial</PrimaryButton>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <details key={item.question} className="group rounded-2xl border border-platinum-200 bg-white p-5 open:shadow-[0_14px_40px_rgba(7,24,45,0.06)] sm:p-6">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-5 rounded-md font-semibold text-navy-900">
                  <span><span className="mr-3 text-xs text-platinum-500">0{index + 1}</span>{item.question}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-platinum-100 text-lg font-normal transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 border-t border-platinum-200 pt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Próximo passo</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">Descubra o que sua carteira não está mostrando.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-platinum-300">Uma análise objetiva pode revelar custos, riscos e ineficiências que se acumulam silenciosamente. O diagnóstico começa pela sua realidade — não por uma solução pronta.</p>
            <PrimaryButton href="#diagnostico" inverse className="mt-8">Agendar meu Diagnóstico Patrimonial</PrimaryButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-navy-950 py-12 text-platinum-500">
      <Container>
        <div className="flex flex-col gap-8 border-b border-white/10 pb-9 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.08em] text-white uppercase">Fernando Arnhold</p>
            <p className="mt-2 max-w-md text-xs leading-5">Gestão patrimonial orientada por método, transparência e alinhamento de incentivos.</p>
          </div>
          <div className="flex flex-col gap-5 md:items-end">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs">
              <a href="#fee-based" className="focus-ring rounded-sm transition hover:text-white">Modelo Fee Based</a>
              <a href="#video-fee-based" className="focus-ring rounded-sm transition hover:text-white">Vídeo</a>
              <a href="#metodologia" className="focus-ring rounded-sm transition hover:text-white">Metodologia</a>
              <a href="#sobre" className="focus-ring rounded-sm transition hover:text-white">Sobre</a>
              <a href="#faq" className="focus-ring rounded-sm transition hover:text-white">FAQ</a>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs text-platinum-300 transition hover:border-white/35 hover:text-white">
                <Icon name="linkedin" className="h-4 w-4" />
                LinkedIn
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs text-platinum-300 transition hover:border-white/35 hover:text-white">
                <Icon name="instagram" className="h-4 w-4" />
                Instagram
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs text-platinum-300 transition hover:border-white/35 hover:text-white">
                <Icon name="mail" className="h-4 w-4" />
                E-mail
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 text-[11px] leading-5 md:grid-cols-2">
          <p>Conteúdo institucional e educacional. Não constitui oferta, promessa de rentabilidade ou recomendação individual de investimento. Investimentos envolvem riscos e podem resultar em perdas.</p>
          <p>A nomenclatura profissional, os registros, vínculos institucionais, a mecânica de cashback e o escopo dos serviços devem ser revisados e adaptados à estrutura jurídica, regulatória e contratual efetivamente utilizada.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fernando Arnhold. Todos os direitos reservados.</p>
          <p>Política de Privacidade · Termos de Uso · Aviso de Risco</p>
        </div>
      </Container>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Imprensa />
        <ConflictSection />
        <PullQuote />
        <VideoSection />
        <MathProof />
        <Methodology />
        <ComparisonSection />
        <RespaldoRegulatorio />
        <Diagnostic />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
