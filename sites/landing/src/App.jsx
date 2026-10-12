import { useMemo, useState } from 'react'
import { Button, Container, Eyebrow, Icon, SectionHeading, Simulator } from './ui.jsx'

const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || '#diagnostico'
const LINKEDIN_URL = 'https://www.linkedin.com/in/fernando-arnhold/'
const INSTAGRAM_URL = 'https://www.instagram.com/FERNANDO.ARNHOLD'
const CONTACT_EMAIL = 'fernando.arnhold@montebravo.com.br'
const FEE_BASED_VIDEO_URL = import.meta.env.VITE_FEE_BASED_VIDEO_URL || ''

const CTA_LABEL = 'Agendar diagnóstico patrimonial'

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

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Modelo Fee Based', '#fee-based'],
    ['Metodologia', '#metodologia'],
    ['Sobre', '#sobre'],
    ['Dúvidas', '#faq'],
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline/70 bg-white/75 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#inicio" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Fernando Arnhold, início">
          <img src="/images/fernando-arnhold-avatar.webp" alt="" className="h-9 w-9 rounded-full object-cover" width="640" height="640" />
          <span>
            <span className="block text-[15px] font-medium text-ink" translate="no">Fernando Arnhold</span>
            <span className="block text-xs text-mute">Financial Advisor</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="focus-ring rounded-sm text-[15px] text-ink-2 transition-colors hover:text-primary">
              {label}
            </a>
          ))}
          <Button href="#diagnostico">Agendar diagnóstico</Button>
        </nav>

        <button
          type="button"
          className="focus-ring grid h-11 w-11 place-items-center rounded-full text-ink ring-1 ring-hairline ring-inset lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-hairline bg-white px-5 pt-2 pb-6 lg:hidden">
          <nav className="mx-auto flex max-w-[1200px] flex-col" aria-label="Navegação móvel">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="focus-ring border-b border-hairline py-4 text-base text-ink" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <Button href="#diagnostico" className="mt-5 w-full" onClick={() => setOpen(false)}>
              Agendar diagnóstico
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-[72px]">
      <div className="mesh" aria-hidden="true" />

      <Container className="relative grid items-center gap-14 pt-14 pb-20 lg:min-h-[calc(100dvh-72px)] lg:grid-cols-[1.35fr_.65fr] lg:pt-16 lg:pb-24">
        <div>
          <Eyebrow className="reveal">Wealth Management · Modelo Fee Based</Eyebrow>

          <h1 className="reveal reveal-1 mt-5 text-[38px] leading-[1.06] font-light tracking-[-0.035em] text-ink sm:text-[50px] lg:text-[56px]">
            Gestão patrimonial com alinhamento total.
            <span className="block text-mute">O fim do conflito de interesses.</span>
          </h1>

          <p className="reveal reveal-2 mt-6 max-w-[34rem] text-lg leading-[1.6] text-ink-2">
            Consultoria patrimonial focada em transparência total e resultados de longo prazo. Eu trabalho para você, não para os produtos.
          </p>

          <div className="reveal reveal-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Button href="#diagnostico" className="w-full sm:w-auto">{CTA_LABEL}</Button>
            <a href="#video-fee-based" className="focus-ring group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full text-[15px] font-medium text-primary">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-lift ring-1 ring-hairline transition-transform group-hover:scale-105">
                <Icon name="play" className="ml-0.5 h-3.5 w-3.5" weight="fill" />
              </span>
              Entenda o Fee Based em 90 segundos
            </a>
          </div>
        </div>

        <div className="reveal reveal-2 relative mx-auto w-full max-w-[420px] lg:mr-0">
          <div className="overflow-hidden rounded-2xl bg-brand-dark shadow-deep">
            <img
              src="/images/fernando-arnhold.webp"
              alt="Fernando Arnhold em retrato profissional"
              className="aspect-[4/5] w-full object-cover object-[50%_22%]"
              width="1024"
              height="1536"
              fetchPriority="high"
            />
          </div>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-xl bg-white p-4 shadow-float ring-1 ring-hairline transition-transform hover:-translate-y-0.5 sm:-left-10 sm:right-auto sm:max-w-[300px]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary">
              <Icon name="linkedin" className="h-5 w-5" weight="fill" />
            </span>
            <span>
              <span className="block text-sm font-medium text-ink">Sócio e Financial Advisor na Monte Bravo</span>
              <span className="tnum mt-0.5 block text-xs text-mute">10 mil+ seguidores no LinkedIn</span>
            </span>
          </a>
        </div>
      </Container>
    </section>
  )
}

function ProofStrip() {
  const items = [
    ['scale', 'Sem incentivo à venda', 'Recomendações orientadas à estratégia'],
    ['return', 'Cashback transparente', 'Repasses tratados conforme o modelo contratado'],
    ['compass', 'Visão integrada', 'Investimentos, tributos e sucessão'],
    ['graduation', 'Formação do mercado', 'Professor de MBA em investimentos e planejamento financeiro'],
  ]

  return (
    <section aria-label="Diferenciais" className="border-y border-hairline bg-white">
      <Container className="grid gap-x-8 gap-y-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([icon, title, body]) => (
          <div key={title} className="flex gap-3.5">
            <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-[15px] font-medium text-ink">{title}</p>
              <p className="mt-1 text-sm leading-6 text-mute">{body}</p>
            </div>
          </div>
        ))}
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
    headline: 'Monte Bravo Corretora vai investir R$ 300 milhões para atrair profissionais ao “fee based”',
    data: 'Dez. 2025',
    url: 'https://valor.globo.com/financas/noticia/2025/12/10/monte-bravo-corretora-vai-investir-r-300-milhoes-para-atrair-profissionais-ao-fee-based.ghtml',
  },
  {
    veiculo: 'InfoMoney Advisor',
    headline: 'Monte Bravo investe R$ 300 mi na formação de assessores alinhados ao “fee based”',
    data: '2025',
    url: 'https://www.infomoney.com.br/advisor/monte-bravo-investe-r-300-mi-para-formar-novos-assessores-no-modelo-fee-based/',
  },
  {
    veiculo: 'InfoMoney · Opinião',
    headline: 'Resolução 179 da CVM completa um ano e acelera adoção do modelo “fee based” no Brasil',
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
  const [featured, ...rest] = PRESS_ITEMS

  return (
    <section className="bg-canvas-soft py-24 sm:py-28">
      <Container>
        <SectionHeading
          title="Uma mudança de mercado, não uma opinião isolada."
          body="O movimento em direção ao modelo Fee Based tem sido acompanhado de perto pela imprensa especializada, inclusive envolvendo a própria Monte Bravo."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring group mesh-dark flex min-h-[300px] flex-col justify-between rounded-2xl p-7 text-white shadow-float sm:p-9"
          >
            <span className="flex items-center gap-2 text-sm text-on-dark">
              <Icon name="newspaper" className="h-4 w-4" />
              {featured.veiculo}
            </span>
            <span>
              <span className="block text-[26px] leading-[1.15] font-light tracking-[-0.02em] sm:text-[30px]">{featured.headline}</span>
              <span className="mt-6 flex items-center justify-between gap-4 text-sm text-on-dark">
                <span>
                  {featured.autor} <span className="tnum">· {featured.data}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 font-medium whitespace-nowrap text-white">
                  Ler matéria
                  <Icon name="external" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </span>
          </a>

          <ul className="divide-y divide-hairline rounded-2xl bg-white px-6 ring-1 ring-hairline sm:px-7">
            {rest.map((item) => (
              <li key={item.url}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="focus-ring group flex items-start justify-between gap-6 py-5">
                  <span>
                    <span className="flex items-center gap-2 text-xs text-mute">
                      {item.veiculo}
                      <span className="tnum">· {item.data}</span>
                    </span>
                    <span className="mt-1.5 block text-[15px] leading-6 text-ink transition-colors group-hover:text-primary">{item.headline}</span>
                  </span>
                  <Icon name="external" className="mt-6 h-4 w-4 shrink-0 text-mute transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

function ConflictSection() {
  const costs = [
    ['Produtos com maior comissão', 'A remuneração pode variar conforme o produto recomendado, criando incentivo comercial que precisa ser explicitado e controlado.'],
    ['Giros desnecessários', 'Trocas frequentes podem gerar custos, tributação antecipada e perda de eficiência sem necessariamente melhorar a estratégia.'],
    ['Custos fragmentados', 'Taxas de administração, performance, distribuição, spread e estruturação podem reduzir o retorno líquido percebido.'],
  ]

  return (
    <section id="fee-based" className="bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="O custo invisível"
              title="O custo que pode estar corroendo sua rentabilidade."
              body="Nem sempre o maior custo de uma carteira aparece no extrato. Muitas vezes, ele está no incentivo econômico por trás da recomendação."
            />
            <blockquote className="mt-9 border-l-2 border-primary pl-5 text-xl leading-[1.45] font-light text-ink sm:text-[22px]">
              “Se o seu consultor ganha na venda e não no seu resultado, para quem ele realmente trabalha?”
            </blockquote>
          </div>

          <div>
            <ol className="divide-y divide-hairline border-y border-hairline">
              {costs.map(([title, body]) => (
                <li key={title} className="flex gap-5 py-7">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-tint text-primary">
                    <Icon name="search" className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-normal text-ink">{title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-mute">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 rounded-xl bg-canvas-soft p-6 text-[15px] leading-[1.65] text-ink-2">
              O Fee Based não torna qualquer relação financeira livre de conflitos. Ele reduz estruturalmente o incentivo à venda de produtos e torna a remuneração mais previsível, auditável e conectada ao acompanhamento patrimonial.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PullQuote() {
  return (
    <section className="bg-canvas-soft">
      <Container className="py-20 sm:py-24">
        <p className="max-w-4xl text-[30px] leading-[1.15] font-light tracking-[-0.03em] text-ink sm:text-[44px]">
          O Fee Based não é um produto.
          <span className="block text-primary">É um modelo de relacionamento.</span>
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
    <section id="video-fee-based" className="bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-dark shadow-deep">
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
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/90 via-brand-dark/40 to-transparent" />

                  <div className="absolute inset-0 grid place-items-center">
                    <button
                      type="button"
                      onClick={() => embedUrl && setPlaying(true)}
                      disabled={!embedUrl}
                      className="focus-ring group grid h-18 w-18 place-items-center rounded-full bg-white text-primary shadow-deep transition-transform hover:scale-105 active:scale-[0.98] disabled:cursor-default sm:h-20 sm:w-20"
                      aria-label={embedUrl ? 'Reproduzir vídeo sobre o modelo Fee Based' : 'Vídeo sobre Fee Based em preparação'}
                    >
                      <Icon name="play" className="ml-1 h-7 w-7 sm:h-8 sm:w-8" weight="fill" />
                    </button>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <p className="max-w-md text-lg leading-snug font-light text-white sm:text-[22px]">
                      A remuneração influencia a recomendação antes mesmo da escolha do investimento.
                    </p>
                  </div>
                </>
              )}
            </div>

            <p className="mt-4 text-xs leading-5 text-mute">
              {embedUrl ? 'Vídeo de aproximadamente 90 segundos. ' : 'Vídeo em preparação. '}
              O vídeo não promete rentabilidade nem substitui uma análise individual. Ele explica a lógica de incentivos e transparência do modelo.
            </p>
          </div>

          <div>
            <SectionHeading
              title="Por que a forma como o profissional é remunerado muda tudo?"
              body="Em poucos minutos, entenda a diferença entre recomendações orientadas por comissões e uma estrutura em que a remuneração é previamente acordada e transparente."
            />

            <ul className="mt-8 space-y-3.5">
              {topics.map((topic) => (
                <li key={topic} className="flex gap-3 text-[15px] leading-6 text-ink-2">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-primary" weight="bold" />
                  {topic}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[15px] leading-[1.65] text-mute">
              O objetivo não é simplesmente trocar produtos ou instituições. É construir uma relação na qual custos, incentivos e decisões estejam claros desde o início.
            </p>

            <Button href="#diagnostico" className="mt-8 w-full sm:w-auto">{CTA_LABEL}</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Methodology() {
  const [first, ...others] = [
    {
      icon: 'scale',
      title: 'Alinhamento Integral',
      body: 'A remuneração é definida por honorário sobre o patrimônio acompanhado, conforme contrato. O objetivo é reduzir o incentivo econômico de recomendar um produto apenas porque ele paga mais.',
      detail: 'Mais previsibilidade. Menos distorção comercial.',
    },
    {
      icon: 'return',
      title: 'Transparência de Cashback',
      body: 'As comissões e rebates elegíveis são tratados com transparência e devolvidos ao cliente de acordo com as regras da plataforma e do contrato aplicável.',
      detail: 'O que é do cliente retorna ao cliente.',
    },
    {
      icon: 'compass',
      title: 'Visão 360º',
      body: 'A carteira deixa de ser analisada de forma isolada. Investimentos, liquidez, riscos, tributação, aposentadoria, proteção e sucessão passam a responder à mesma estratégia patrimonial.',
      detail: 'Uma visão única para decisões conectadas.',
    },
  ]

  return (
    <section id="metodologia" className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          title="Uma metodologia construída para proteger a qualidade da decisão."
          body="Antes de escolher produtos, definimos objetivos, restrições, riscos e a função de cada recurso dentro do patrimônio."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <article className="flex flex-col rounded-2xl bg-cream p-7 sm:p-10 lg:col-span-7 lg:row-span-2">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-primary shadow-lift">
              <Icon name={first.icon} className="h-6 w-6" />
            </span>
            <p className="mt-8 text-sm text-ink-2">Os 3 pilares Arnhold</p>
            <h3 className="mt-2 text-[30px] leading-[1.1] font-light tracking-[-0.025em] text-ink sm:text-[36px]">{first.title}</h3>
            <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.7] text-ink-2">{first.body}</p>
            <p className="mt-auto pt-10 text-[15px] font-medium text-ink">{first.detail}</p>
          </article>

          {others.map((pillar) => (
            <article key={pillar.title} className="flex flex-col rounded-2xl bg-white p-7 ring-1 ring-hairline transition-shadow hover:shadow-float lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-tint text-primary">
                  <Icon name={pillar.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-normal text-ink">{pillar.title}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-[1.65] text-mute">{pillar.body}</p>
              <p className="mt-5 text-sm font-medium text-ink">{pillar.detail}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm text-mute">Método, governança e acompanhamento contínuo para famílias, empresários e estruturas patrimoniais PF e PJ.</p>
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
    <section className="bg-canvas-soft py-24 sm:py-28">
      <Container>
        <SectionHeading
          title="O desafio do modelo tradicional e o próximo passo natural."
          body="O modelo comissionado foi desenhado para remunerar operações e produtos. O acompanhamento patrimonial contínuo pede uma estrutura diferente."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 ring-1 ring-hairline sm:p-9">
            <h3 className="text-[22px] font-light text-ink">Modelo comissionado</h3>
            <ul className="mt-6 space-y-4">
              {commissioned.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-mute">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-mute/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mesh-dark rounded-2xl p-7 text-white shadow-float sm:p-9">
            <h3 className="text-[22px] font-light">Fee Based</h3>
            <ul className="mt-6 space-y-4">
              {feeBased.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-on-dark">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-white" weight="bold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-5 text-mute">
          O Fee Based não elimina todos os conflitos possíveis nem garante resultado superior. É uma estrutura de remuneração diferente, com previsibilidade e transparência maiores sobre como o profissional é pago.
        </p>
      </Container>
    </section>
  )
}

function RespaldoRegulatorio() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Contexto regulatório e de mercado"
          title="Uma mudança já em curso, amparada pela CVM e consolidada nos mercados mais maduros."
          body="A Resolução CVM nº 179 trata da transparência na remuneração e dos conflitos de interesse na distribuição de investimentos, e tem acelerado a adoção do modelo Fee Based no Brasil. Não se trata de uma preferência isolada, mas de uma direção que o próprio mercado e o regulador vêm reforçando."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl p-7 ring-1 ring-hairline">
            <p className="tnum text-[44px] leading-none font-light tracking-[-0.03em] text-primary">70%+</p>
            <p className="mt-4 text-sm leading-6 text-mute">dos advisors independentes nos EUA já operam sob modelos baseados em honorários, segundo a Investment Adviser Association.</p>
          </div>
          <div className="rounded-2xl p-7 ring-1 ring-hairline">
            <p className="tnum text-[44px] leading-none font-light tracking-[-0.03em] text-ink">CVM 179</p>
            <p className="mt-4 text-sm leading-6 text-mute">resolução que trata da transparência na remuneração e dos conflitos de interesse na distribuição de valores mobiliários.</p>
          </div>
          <blockquote className="flex flex-col justify-between rounded-2xl bg-cream p-7 sm:col-span-2 sm:p-9">
            <p className="text-[24px] leading-[1.3] font-light tracking-[-0.015em] text-ink sm:text-[28px]">
              “Mostre-me os incentivos e eu lhe direi qual será o resultado.”
            </p>
            <footer className="mt-6 text-sm text-ink-2">Charlie Munger, investidor</footer>
          </blockquote>
        </div>
      </Container>
    </section>
  )
}

const INPUT_CLASS =
  'mt-2 h-11 w-full rounded-md border border-hairline-input bg-white px-3.5 text-[15px] text-ink outline-none transition placeholder:text-mute/80 focus:border-primary focus:ring-3 focus:ring-primary/15'

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
    <section id="diagnostico" className="bg-canvas-soft py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              title="Sua carteira está realmente otimizada?"
              body="Solicite uma análise inicial, gratuita e sem compromisso, para identificar pontos de atenção em custos, riscos, eficiência tributária, liquidez e alinhamento da carteira atual."
            />

            <ul className="mt-9 space-y-4">
              {[
                'Leitura da estrutura atual e dos objetivos patrimoniais',
                'Mapeamento de custos explícitos e potenciais custos invisíveis',
                'Análise de concentração, liquidez e riscos não intencionais',
                'Identificação de oportunidades tributárias e sucessórias para aprofundamento',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-ink-2">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-primary" weight="bold" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-md text-xs leading-5 text-mute">A análise inicial não constitui recomendação individual definitiva. Qualquer orientação depende do entendimento completo do perfil, objetivos, restrições e documentação aplicável.</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-float ring-1 ring-hairline sm:p-9">
            {submitted ? (
              <div className="grid min-h-[420px] place-items-center text-center" role="status">
                <div>
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-tint text-primary">
                    <Icon name="check" className="h-6 w-6" weight="bold" />
                  </span>
                  <h3 className="mt-6 text-2xl font-light text-ink">Solicitação enviada com sucesso.</h3>
                  <p className="mx-auto mt-3 max-w-md text-[15px] leading-6 text-mute">Recebi suas informações para o diagnóstico patrimonial. O próximo passo é entrar em contato para compreender melhor seu momento e alinhar a conversa inicial.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="focus-ring mt-6 min-h-11 rounded-full px-5 text-[15px] font-medium text-primary ring-1 ring-primary/35 ring-inset hover:ring-primary">
                    Voltar ao formulário
                  </button>
                </div>
              </div>
            ) : (
              <form name="diagnostico-patrimonial" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="diagnostico-patrimonial" />
                <p className="hidden" aria-hidden="true">
                  <label>Não preencha este campo: <input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
                </p>
                <div>
                  <h3 className="text-[24px] leading-tight font-light tracking-[-0.015em] text-ink">Conte brevemente sobre seu momento patrimonial.</h3>
                  <p className="mt-2 text-sm leading-6 text-mute">As informações abaixo ajudam a direcionar a primeira conversa.</p>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="text-sm font-medium text-ink-2">Nome</span>
                    <input required name="nome" autoComplete="name" className={INPUT_CLASS} placeholder="Seu nome completo…" />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-ink-2">Telefone</span>
                    <input required name="telefone" type="tel" inputMode="tel" autoComplete="tel" className={`${INPUT_CLASS} tnum`} placeholder="(11) 99999-9999" />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-ink-2">E-mail</span>
                    <input required name="email" type="email" autoComplete="email" spellCheck="false" className={INPUT_CLASS} placeholder="voce@email.com" />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="text-sm font-medium text-ink-2">Faixa patrimonial investida</span>
                    <select required name="patrimonio" autoComplete="off" defaultValue="" className={INPUT_CLASS}>
                      <option value="" disabled>Selecione uma faixa</option>
                      <option>Até R$ 5 milhões</option>
                      <option>De R$ 5 milhões a R$ 10 milhões</option>
                      <option>De R$ 10 milhões a R$ 30 milhões</option>
                      <option>Acima de R$ 30 milhões</option>
                    </select>
                  </label>
                  <label className="sm:col-span-2">
                    <span className="text-sm font-medium text-ink-2">Principal prioridade</span>
                    <textarea name="prioridade" rows="4" autoComplete="off" className={`${INPUT_CLASS} h-auto resize-none py-3`} placeholder="Ex.: reduzir riscos, organizar sucessão, revisar custos ou estruturar aposentadoria…" />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="focus-ring group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-white transition-colors hover:bg-primary-deep active:bg-primary-press disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Enviando…' : CTA_LABEL}
                  {!submitting && <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" weight="bold" />}
                </button>
                {submitError && (
                  <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-center text-sm leading-5 text-red-800">
                    {submitError}
                  </p>
                )}
                <p className="mt-4 text-center text-xs leading-5 text-mute">Ao enviar, você concorda em ser contatado sobre o diagnóstico.</p>
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
    ['chart', 'Acompanhamento de investimentos', 'Estruturação e acompanhamento de carteiras no Brasil e no exterior, com atenção a risco, liquidez, custos e objetivos de longo prazo.'],
    ['compass', 'Planejamento patrimonial e financeiro', 'Organização de aposentadoria, fluxo de caixa, sucessão e decisões relevantes de famílias, empresários e executivos.'],
    ['scale', 'Tesouraria, câmbio e crédito', 'Apoio a empresas em temas de caixa, proteção cambial, estruturação de crédito e operações corporativas.'],
    ['briefcase', 'Estrutura de capital', 'Análise de alternativas de captação, mercado de capitais e decisões financeiras estratégicas para empresários e CFOs.'],
  ]

  return (
    <section id="sobre" className="overflow-hidden bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="mx-auto w-full max-w-md lg:sticky lg:top-28">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group block overflow-hidden rounded-2xl bg-white p-2.5 shadow-float ring-1 ring-hairline transition-transform hover:-translate-y-0.5"
            >
              <img
                src="/images/linkedin-fernando-arnhold.webp"
                alt="Resumo do perfil profissional de Fernando Arnhold no LinkedIn"
                className="w-full rounded-xl"
                width="585"
                height="308"
                loading="lazy"
              />
              <span className="flex items-center justify-between gap-4 px-2 pt-4 pb-1.5">
                <span>
                  <span className="block text-[15px] font-medium text-ink">Perfil profissional</span>
                  <span className="mt-0.5 block text-sm text-mute">Experiência, publicações e conexões profissionais.</span>
                </span>
                <Icon name="external" className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            <div className="mt-4 flex gap-3">
              {[
                ['linkedin', 'LinkedIn', LINKEDIN_URL],
                ['instagram', 'Instagram', INSTAGRAM_URL],
              ].map(([icon, label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full text-[15px] text-ink ring-1 ring-hairline ring-inset transition hover:text-primary hover:ring-primary/40"
                >
                  <Icon name={icon} className="h-[18px] w-[18px]" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              title="Estratégia, clareza e alinhamento para decisões patrimoniais de longo prazo."
              body="Atuo ao lado de empresários, famílias, executivos e empresas na estruturação de soluções financeiras, patrimoniais e corporativas, com foco em decisões mais eficientes, estratégicas e alinhadas aos objetivos de cada cliente."
            />

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-ink-2">
              {[
                ['briefcase', 'Sócio e Financial Advisor na Monte Bravo'],
                ['graduation', 'Professor de MBA'],
                ['globe', 'São Paulo, Brasil'],
              ].map(([icon, label]) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <Icon name={icon} className="h-[18px] w-[18px] text-primary" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-canvas-soft p-6">
                <h3 className="text-lg font-normal text-ink">Wealth Management</h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-mute">
                  Consolidação e atendimento de carteiras em diversas instituições, para clientes com patrimônio financeiro acima de R$ 10 milhões, conectando investimentos, liquidez, risco, tributação e planejamento patrimonial.
                </p>
              </div>
              <div className="rounded-2xl bg-canvas-soft p-6">
                <h3 className="text-lg font-normal text-ink">Soluções corporativas</h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-mute">
                  Apoio a empresas em tesouraria, câmbio, crédito, estrutura de capital, mercado de capitais e alternativas de captação.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {specialties.map(([icon, title, body]) => (
                <div key={title}>
                  <Icon name={icon} className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-[16px] font-medium text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-mute">{body}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-[62ch] text-[16px] leading-[1.7] text-ink-2">
              Além da atuação no mercado, sou professor de MBA nas áreas de investimentos, planejamento financeiro e certificações financeiras, contribuindo para a formação de profissionais do setor.
            </p>

            <blockquote className="mt-8 border-l-2 border-primary pl-5 text-xl leading-[1.45] font-light text-ink">
              “Um bom trabalho financeiro não se resume à escolha de produtos, mas à construção de estratégia, clareza e alinhamento de longo prazo.”
            </blockquote>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="#diagnostico">{CTA_LABEL}</Button>
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary" icon="mail" className="!whitespace-normal break-all">
                {CONTACT_EMAIL}
              </Button>
            </div>
          </div>
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
    <section id="faq" className="bg-canvas-soft py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ técnico"
              title="Transparência também significa explicar o modelo sem simplificações."
              body="As respostas abaixo estabelecem expectativas realistas sobre remuneração, cashback, diagnóstico e escopo do trabalho."
            />
          </div>

          <div className="divide-y divide-hairline rounded-2xl bg-white px-6 ring-1 ring-hairline sm:px-8">
            {items.map((item) => (
              <details key={item.question} className="group py-1">
                <summary className="focus-ring flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 rounded-md py-4 text-[16px] font-medium text-ink transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Icon name="plus" className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="max-w-[64ch] pb-6 text-[15px] leading-[1.7] text-mute">{item.answer}</p>
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
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="mesh-dark relative overflow-hidden rounded-2xl px-7 py-12 text-white shadow-deep sm:px-12 sm:py-16">
          <div className="max-w-2xl">
            <h2 className="text-[32px] leading-[1.1] font-light tracking-[-0.03em] sm:text-[46px]">Descubra o que sua carteira não está mostrando.</h2>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-on-dark">
              Uma análise objetiva pode revelar custos, riscos e ineficiências que se acumulam silenciosamente. O diagnóstico começa pela sua realidade, não por uma solução pronta.
            </p>
            <Button href="#diagnostico" variant="onDark" className="mt-9">{CTA_LABEL}</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Footer() {
  const links = [
    ['Modelo Fee Based', '#fee-based'],
    ['Vídeo', '#video-fee-based'],
    ['Metodologia', '#metodologia'],
    ['Sobre', '#sobre'],
    ['FAQ', '#faq'],
  ]

  return (
    <footer className="border-t border-hairline bg-canvas-soft pt-16 pb-10 text-mute">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[15px] font-medium text-ink">Fernando Arnhold</p>
            <p className="mt-2 max-w-sm text-sm leading-6">Gestão patrimonial orientada por método, transparência e alinhamento de incentivos.</p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <nav aria-label="Rodapé" className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
              {links.map(([label, href]) => (
                <a key={href} href={href} className="focus-ring rounded-sm transition-colors hover:text-primary">
                  {label}
                </a>
              ))}
            </nav>
            <div className="flex gap-2">
              {[
                ['linkedin', 'LinkedIn', LINKEDIN_URL, true],
                ['instagram', 'Instagram', INSTAGRAM_URL, true],
                ['mail', 'E-mail', `mailto:${CONTACT_EMAIL}`, false],
              ].map(([icon, label, href, external]) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={label}
                  className="focus-ring grid h-11 w-11 place-items-center rounded-full bg-white text-ink-2 ring-1 ring-hairline transition hover:text-primary hover:ring-primary/40"
                >
                  <Icon name={icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-hairline pt-8 text-xs leading-5 md:grid-cols-2">
          <p>Conteúdo institucional e educacional. Não constitui oferta, promessa de rentabilidade ou recomendação individual de investimento. Investimentos envolvem riscos e podem resultar em perdas.</p>
          <p>A nomenclatura profissional, os registros, vínculos institucionais, a mecânica de cashback e o escopo dos serviços devem ser revisados e adaptados à estrutura jurídica, regulatória e contratual efetivamente utilizada.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="tnum">© {new Date().getFullYear()} Fernando Arnhold. Todos os direitos reservados.</p>
          <p>Política de Privacidade · Termos de Uso · Aviso de Risco</p>
        </div>
      </Container>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a href="#conteudo" className="focus-ring sr-only z-50 rounded-full bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <ProofStrip />
        <Imprensa />
        <ConflictSection />
        <PullQuote />
        <VideoSection />
        <Simulator
          eyebrow="A prova matemática"
          title="Pequenas diferenças anuais se tornam grandes diferenças patrimoniais."
          body="Abaixo, uma simulação ilustrativa para visualizar o efeito cumulativo de custos, spreads, estruturas mais caras e giros evitáveis. Ajuste os parâmetros conforme sua realidade."
          calloutTitle="No diagnóstico"
          calloutBody="Mapeamos custos, tributação, riscos e sobreposições da sua carteira real."
        />
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
