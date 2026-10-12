# Landing Page — Fernando Arnhold

Landing page mobile-first em React + Tailwind CSS, pronta para publicação no Netlify.

## Publicar rapidamente no Netlify

### Opção 1 — Enviar o projeto pelo painel

1. Abra o painel do Netlify e entre na sua conta.
2. Acesse **Projects** e use a área de drag-and-drop.
3. Arraste o arquivo `fernando-arnhold-netlify-v4-video.zip`.
4. O Netlify detectará o Vite e executará o build definido no arquivo `netlify.toml`.

Para atualizar o site depois, envie novamente o projeto atualizado ou conecte um repositório GitHub.

### Opção 2 — Deploy contínuo com GitHub

1. Envie o conteúdo deste projeto para um repositório no GitHub.
2. No Netlify, escolha **Add new project > Import an existing project**.
3. Conecte o repositório.
4. As configurações serão lidas automaticamente do arquivo `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node.js: `22.12.0`
5. Publique o projeto. Cada novo push no GitHub gerará um deploy automático.

## Formulário de diagnóstico

O formulário está integrado ao **Netlify Forms**. Depois do primeiro deploy:

1. Abra o projeto no Netlify.
2. Entre em **Forms**.
3. Confirme que o formulário `diagnostico-patrimonial` foi detectado.
4. Configure notificações por e-mail em **Forms > Form notifications**.
5. Faça um envio real de teste usando dados plausíveis e verifique também a área de spam.

O formulário inclui um campo honeypot para reduzir envios automatizados.

## Usar Calendly, WhatsApp ou outro formulário

O Netlify Forms funciona por padrão, sem variável de ambiente. Para redirecionar o envio para outro canal, defina no Netlify:

```text
VITE_BOOKING_URL=https://seu-link-de-agendamento.com
```

Caminho no painel: **Project configuration > Environment variables**. Depois de salvar a variável, faça um novo deploy.

Também é possível criar localmente um arquivo `.env` a partir do `.env.example`.

## Adicionar o vídeo sobre Fee Based

A nova seção de vídeo está posicionada entre o bloco sobre conflito de incentivos e a prova matemática. O botão secundário da Hero leva diretamente até ela.

O componente aceita links do **YouTube** — inclusive vídeo não listado, Shorts ou Live — e do **Vimeo**. Para ativar o player no Netlify:

1. Publique o vídeo no YouTube ou Vimeo.
2. No Netlify, abra **Project configuration > Environment variables**.
3. Crie a variável:

```text
VITE_FEE_BASED_VIDEO_URL=https://www.youtube.com/watch?v=SEU_ID
```

4. Salve e faça um novo deploy.

O site converte automaticamente o link para o formato de incorporação e só carrega o player depois que o visitante aperta o botão de reprodução. Isso evita carregar o iframe pesado na abertura da página. Enquanto a variável estiver vazia, a seção exibe uma capa elegante com o aviso “Vídeo em preparação”, sem gerar link quebrado.

Para melhor desempenho, use uma capa personalizada no próprio YouTube ou Vimeo e mantenha o vídeo entre 60 e 120 segundos, com legendas.

## Executar localmente

```bash
npm install
npm run dev
```

## Gerar a versão de produção

```bash
npm run build
npm run preview
```

## Arquivos específicos do Netlify

- `netlify.toml`: build, publicação, versão do Node, rewrite de SPA e cabeçalhos.
- `public/_redirects`: fallback para `index.html`, evitando erro 404 em rotas internas.
- `public/_headers`: cache dos assets e cabeçalhos básicos de segurança.
- Formulário estático oculto no `index.html`: permite ao Netlify detectar o formulário React.

## Imagens e presença digital incorporadas

- Retrato profissional na seção principal e como capa provisória do vídeo.
- Recorte do perfil do LinkedIn como elemento de prova social na seção “Sobre”.
- Links externos para LinkedIn e Instagram.
- E-mail profissional em CTA de contato.
- Dados estruturados `Person` com os perfis sociais no `index.html`.
- Seção de vídeo responsiva, com carregamento sob demanda e suporte a YouTube/Vimeo.

Os arquivos otimizados estão em `public/images/` e utilizam WebP para reduzir o peso do carregamento.

## Pontos que devem ser personalizados antes de divulgar

- Registro profissional, razão social, CNPJ, endereço e vínculos institucionais.
- Política de Privacidade, Termos de Uso e canal de contato do encarregado de dados.
- Regras exatas de cashback/rebates da instituição e do contrato utilizado.
- Critérios de elegibilidade do diagnóstico e público-alvo.
- Eventuais selos, certificações e credenciais — somente quando verificáveis.

## Revisão de compliance antes da publicação

1. **Título profissional:** valide o uso de “consultor”, “assessor”, “planejador”, “gestor” ou “independente” conforme registros, vínculo e atividade efetivamente exercida.
2. **Cashback:** mantenha a expressão “100%” somente se a operação realmente devolver 100% de todas as comissões elegíveis e houver documentação contratual clara.
3. **Simulação de 2% a.a.:** a página trata o valor como cenário hipotético ajustável. Não o apresente como média, promessa ou fato universal sem fonte e metodologia defensáveis.
4. **Conflitos:** o texto afirma redução estrutural de certos incentivos, não eliminação absoluta de conflitos.
5. **Diagnóstico gratuito:** deixe claro o escopo, as condições e que a análise inicial não representa recomendação definitiva.
6. **LGPD:** conecte o formulário a uma política de privacidade, base legal, prazo de retenção e processo de exclusão dos dados.
7. **Riscos:** preserve os avisos de que investimentos envolvem riscos e podem gerar perdas.
