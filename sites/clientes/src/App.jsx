import { useState } from 'react'
import { Button, Container, Eyebrow, Icon, SectionHeading, Simulator } from './ui.jsx'

const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || '#conversa'
const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/5551981610486?text=Ol%C3%A1%20Fernando%2C%20vi%20a%20p%C3%A1gina%20sobre%20o%20modelo%20Fee%20Based%20e%20gostaria%20de%20entender%20melhor.'
const LINKEDIN_URL = 'https://www.linkedin.com/in/fernando-arnhold/'
const CONTACT_EMAIL = 'fernando.arnhold@montebravo.com.br'

// Sem link de agenda configurado, o botão da seção final apontaria para a própria seção.
const HAS_BOOKING_LINK = !BOOKING_URL.startsWith('#')

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Nossa parceria', '#parceria'],
    ['Como funciona', '#papel'],
    ['O que muda', '#evolucao'],
    ['Dúvidas', '#faq'],
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline/70 bg-white/75 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#topo" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Fernando Arnhold, início">
          <img src="/images/fernando-arnhold-avatar.webp" alt="" className="h-9 w-9 rounded-full object-cover" width="640" height="640" />
          <span>
            <span className="block text-[15px] font-medium text-ink" translate="no">Fernando Arnhold</span>
            <span className="block text-xs text-mute">Financial Advisor · Monte Bravo</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="focus-ring rounded-sm text-[15px] text-ink-2 transition-colors hover:text-primary">
              {label}
            </a>
          ))}
          <Button href="#conversa">Agendar uma conversa</Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="focus-ring grid h-11 w-11 place-items-center rounded-full text-ink ring-1 ring-hairline ring-inset lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-hairline bg-white px-5 pt-2 pb-6 lg:hidden">
          <nav className="mx-auto flex max-w-[1200px] flex-col" aria-label="Navegação móvel">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="focus-ring border-b border-hairline py-4 text-base text-ink">
                {label}
              </a>
            ))}
            <Button href="#conversa" className="mt-5 w-full" onClick={() => setOpen(false)}>
              Agendar uma conversa
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-[72px]">
      <div className="mesh" aria-hidden="true" />
      <Container className="relative pt-20 pb-24 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl">
          <Eyebrow className="reveal">Uma página para você, cliente Monte Bravo</Eyebrow>

          <h1 className="reveal reveal-1 mt-5 text-[40px] leading-[1.06] font-light tracking-[-0.035em] text-ink sm:text-[56px] lg:text-[64px]">
            Nossa parceria e o próximo passo natural.
          </h1>

          <p className="reveal reveal-2 mt-7 max-w-[40rem] text-lg leading-[1.65] text-ink-2">
            Ao longo do nosso trabalho juntos, construímos uma relação baseada em confiança, planejamento e acompanhamento contínuo. Preparei esta página para te mostrar uma evolução natural nesse relacionamento, sem pressa, sem obrigação, só para você conhecer.
          </p>

          <div className="reveal reveal-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#conversa" className="w-full sm:w-auto">Agendar uma conversa</Button>
            <Button href="#evolucao" variant="secondary" className="w-full sm:w-auto">Ver o que muda e o que não muda</Button>
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
    <section className="border-t border-hairline bg-canvas-soft py-24 sm:py-28">
      <Container>
        <SectionHeading
          title="Uma mudança de mercado, amparada por regulação."
          body="Essa não é uma escolha isolada minha. É um movimento acompanhado de perto pela imprensa especializada, com participação direta da Monte Bravo."
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

function Jornada() {
  const etapas = [
    ['compass', 'Planejamento financeiro'],
    ['briefcase', 'Planejamento de aquisições'],
    ['shield', 'Acompanhamento patrimonial'],
    ['map', 'Análise de oportunidades imobiliárias'],
    ['report', 'Construção da carteira de investimentos'],
    ['calendar', 'Revisões periódicas'],
    ['handshake', 'Apoio em decisões financeiras relevantes'],
    ['eye', 'Alinhamento contínuo de objetivos'],
  ]

  return (
    <section id="parceria" className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          title="Uma relação baseada em confiança, planejamento e resultado."
          body="Antes de falar sobre o próximo passo, vale lembrar o caminho que já percorremos juntos, porque é exatamente essa base que continua, e se fortalece, no formato que vou te apresentar."
        />

        <ul className="mt-12 flex flex-wrap gap-3" aria-label="O que construímos até aqui">
          {etapas.map(([icon, label]) => (
            <li key={label} className="inline-flex items-center gap-2.5 rounded-full bg-canvas-soft py-2.5 pr-5 pl-3 text-[15px] text-ink ring-1 ring-hairline">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-primary shadow-lift">
                <Icon name={icon} className="h-4 w-4" />
              </span>
              {label}
            </li>
          ))}
        </ul>
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
    <section id="papel" className="bg-canvas-soft py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Como vejo meu papel"
          title="Mais do que um assessor de investimentos focado em produtos."
          body="Atuo como um consultor financeiro e patrimonial da sua família, o que significa olhar para o conjunto: investimentos, liquidez, riscos, sucessão e objetivos de longo prazo, não apenas para o próximo produto."
        />

        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-primary-subdued lg:block" aria-hidden="true" />
          {etapas.map(([icon, title, body]) => (
            <li key={title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-primary shadow-float ring-1 ring-hairline">
                <Icon name={icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-lg font-normal text-ink lg:mt-2">{title}</span>
                <span className="mt-1 block text-[15px] text-mute">{body}</span>
              </span>
            </li>
          ))}
        </ol>
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
          title="Nenhum dos dois modelos é errado, cada um serve a um momento diferente."
          body="No modelo atual, minha remuneração está embutida nos produtos que compõem sua carteira. No Fee Based, ela é um valor combinado previamente com você, independente do produto. É uma mudança na forma de remuneração, não uma mudança na dedicação ao seu patrimônio."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 ring-1 ring-hairline sm:p-9">
            <h3 className="text-[22px] font-light text-ink">Modelo comissionado (atual)</h3>
            <ul className="mt-6 space-y-4">
              {comissionado.map((item) => (
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
      </Container>
    </section>
  )
}

function Evolucao() {
  const naoMuda = [
    'Seu assessor dedicado',
    'Rigor na seleção de investimentos',
    'Nossa proximidade',
    'Atendimento e suporte',
    'Acesso às melhores oportunidades do mercado',
    'Compromisso com seus objetivos',
  ]

  return (
    <section id="evolucao" className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Evolução com segurança"
          title="O que não muda e o que muda."
          body="A mudança está concentrada em um único ponto: a forma como minha remuneração é estruturada. Tudo o que já funciona na nossa relação continua exatamente como está."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-2xl bg-canvas-soft p-7 sm:p-9">
            <h3 className="text-[22px] font-light text-ink">O que não muda</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {naoMuda.map((label) => (
                <li key={label} className="flex items-start gap-3 text-[15px] leading-6 text-ink-2">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-primary" weight="bold" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-cream p-7 sm:p-9">
            <h3 className="text-[22px] font-light text-ink">O que muda</h3>
            <p className="mt-4 text-[16px] leading-[1.7] text-ink-2">
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
    <section className="bg-canvas-soft py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <SectionHeading
            title="Essa migração é acompanhada de perto pelo nosso próprio time jurídico e de compliance."
            body="A Resolução CVM nº 179 trata da transparência na remuneração e dos conflitos de interesse na distribuição de investimentos, e tem acelerado a adoção do modelo Fee Based no Brasil. É uma direção de mercado, respaldada pelo regulador, não uma iniciativa isolada minha."
          />

          <blockquote className="rounded-2xl bg-white p-8 shadow-float ring-1 ring-hairline sm:p-10">
            <p className="text-[24px] leading-[1.35] font-light tracking-[-0.015em] text-ink sm:text-[28px]">
              “A assessoria deixa de ser o meio para a venda de um produto e passa a ser um fim em si mesma, orientada pelo melhor interesse do investidor.”
            </p>
            <footer className="mt-6 text-sm text-mute">Caio Rizk, Diretor Jurídico e de Compliance da Monte Bravo</footer>
          </blockquote>
        </div>
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
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          title="Um acompanhamento que vai além dos investimentos."
          body="Grande parte desse trabalho já acontece hoje. O modelo Fee Based nos dá o espaço para aprofundar cada uma dessas frentes, sem que a conversa precise sempre passar por um produto."
        />

        <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map(([icon, label]) => (
            <li key={label} className="flex items-center gap-4 border-t border-hairline py-5 text-[16px] text-ink">
              <Icon name={icon} className="h-5 w-5 shrink-0 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function Compromisso() {
  return (
    <section className="bg-canvas-soft py-24 sm:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>Nosso compromisso continua o mesmo</Eyebrow>
          <p className="mt-6 text-[30px] leading-[1.2] font-light tracking-[-0.025em] text-ink sm:text-[40px]">
            “Fazer a diferença na sua vida e na vida da sua família através de decisões financeiras cada vez melhores.”
          </p>
          <p className="mt-6 text-[15px] text-mute">Mais do que investimentos, cuidar do seu patrimônio e da sua tranquilidade.</p>
        </div>
      </Container>
    </section>
  )
}

function Autoridade() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[380px] lg:mx-0">
            <div className="overflow-hidden rounded-2xl bg-brand-dark shadow-deep">
              <img
                src="/images/fernando-arnhold.webp"
                alt="Fernando Arnhold em retrato profissional"
                className="aspect-[4/5] w-full object-cover object-[50%_22%]"
                width="1024"
                height="1536"
                loading="lazy"
              />
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring absolute right-4 -bottom-6 left-4 flex items-center gap-4 rounded-xl bg-white p-4 shadow-float ring-1 ring-hairline transition-transform hover:-translate-y-0.5 sm:right-auto sm:-left-8"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary">
                <Icon name="linkedin" className="h-5 w-5" weight="fill" />
              </span>
              <span>
                <span className="tnum block text-sm font-medium text-ink">10 mil+ seguidores</span>
                <span className="mt-0.5 block text-xs text-mute">Perfil profissional no LinkedIn</span>
              </span>
            </a>
          </div>

          <div>
            <SectionHeading
              title="Mais de uma década dedicada a wealth management e planejamento patrimonial."
              body="Sócio e Financial Advisor na Monte Bravo, com certificações CFP® e CPA-20, e atuação como professor de MBA em investimentos e planejamento financeiro. A mesma pessoa que já cuida do seu patrimônio hoje."
            />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-ink-2">
              {[
                ['briefcase', 'Sócio na Monte Bravo'],
                ['shield', 'CFP® e CPA-20'],
                ['graduation', 'Professor de MBA'],
              ].map(([icon, label]) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <Icon name={icon} className="h-[18px] w-[18px] text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>
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
    <section id="faq" className="bg-canvas-soft py-24 sm:py-28">
      <Container>
        <SectionHeading title="Perguntas que a maioria dos clientes me faz." />

        <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {perguntas.map(({ q, a }) => (
            <div key={q} className="border-t border-hairline pt-6">
              <dt className="text-[18px] font-normal text-ink">{q}</dt>
              <dd className="mt-3 max-w-[52ch] text-[15px] leading-[1.7] text-mute">{a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

function Conversa() {
  return (
    <section id="conversa" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="mesh-dark overflow-hidden rounded-2xl px-7 py-12 text-white shadow-deep sm:px-12 sm:py-16">
          <div className="max-w-2xl">
            <Eyebrow className="text-primary-subdued">Vamos conversar</Eyebrow>
            <h2 className="mt-4 text-[32px] leading-[1.1] font-light tracking-[-0.03em] sm:text-[46px]">Se fizer sentido, posso te mostrar como ficaria na prática.</h2>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-on-dark">
              Sem compromisso, sem pressa. Uma conversa de alinhamento, com números reais da sua carteira, para você decidir com clareza se esse é o momento certo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {HAS_BOOKING_LINK && (
                <Button href={BOOKING_URL} variant="onDark">Agendar uma conversa</Button>
              )}
              <Button href={WHATSAPP_URL} target="_blank" rel="noreferrer" variant={HAS_BOOKING_LINK ? 'ghostDark' : 'onDark'} icon="whatsapp">
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas-soft pt-14 pb-10 text-mute">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-sm leading-6">
            <p className="text-[15px] font-medium text-ink">Fernando Arnhold</p>
            <p>Financial Advisor · Monte Bravo</p>
            <p className="mt-2">R. Min. Jesuíno Cardoso, 454 - 9º andar - Vila Nova Conceição, São Paulo - SP</p>
          </div>
          <div className="flex gap-2">
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="E-mail" className="focus-ring grid h-11 w-11 place-items-center rounded-full bg-white text-ink-2 ring-1 ring-hairline transition hover:text-primary hover:ring-primary/40">
              <Icon name="mail" className="h-[18px] w-[18px]" />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="focus-ring grid h-11 w-11 place-items-center rounded-full bg-white text-ink-2 ring-1 ring-hairline transition hover:text-primary hover:ring-primary/40">
              <Icon name="linkedin" className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <p className="mt-10 border-t border-hairline pt-8 text-xs leading-5">
          Material de caráter exclusivamente informativo, destinado a clientes já atendidos por Fernando Arnhold / Monte Bravo. Não constitui oferta, recomendação de investimento ou promessa de rentabilidade. A adesão ao modelo Fee Based é opcional e não altera o padrão de atendimento já prestado.
        </p>
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
        <Imprensa />
        <Jornada />
        <MeuPapel />
        <Comparativo />
        <Simulator
          title="Pequenas diferenças anuais podem se tornar grandes diferenças patrimoniais."
          body="Ajuste os parâmetros com a ordem de grandeza da sua própria carteira, para visualizar o efeito cumulativo de uma diferença de custo ao longo do tempo. É uma simulação, não uma projeção do que vai acontecer com você."
          footnote="Rentabilidade passada não garante resultados futuros."
          calloutTitle="Na nossa conversa"
          calloutBody="Mostro essa mesma simulação com os números reais da sua carteira."
        />
        <Evolucao />
        <RespaldoInstitucional />
        <ProximosAnos />
        <Compromisso />
        <Autoridade />
        <FAQ />
        <Conversa />
      </main>
      <Footer />
    </>
  )
}
