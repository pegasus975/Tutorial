# Publicação no Netlify

## Método mais simples

1. Entre na sua conta do Netlify.
2. Abra **Projects**.
3. Use a área de drag-and-drop e envie o ZIP deste projeto.
4. O Netlify detectará o Vite e executará o build definido em `netlify.toml`.
5. Após a publicação, abra **Forms** e confirme o formulário `diagnostico-patrimonial`.

## Configuração já incluída

- Comando de build: `npm run build`
- Diretório publicado: `dist`
- Node.js: `22.12.0`
- Fallback SPA para evitar páginas 404
- Cache de arquivos estáticos
- Cabeçalhos básicos de segurança
- Formulário integrado ao Netlify Forms
- Campo honeypot contra robôs

## Notificações dos leads

No painel do site, abra **Forms > Form notifications** e cadastre o e-mail que deve receber cada nova solicitação de diagnóstico.

## Link externo opcional

Para usar Calendly, WhatsApp ou outro sistema em vez do Netlify Forms, crie a variável de ambiente:

```text
VITE_BOOKING_URL=https://seu-link.com
```

Depois, faça um novo deploy.

## Configurar o vídeo Fee Based

No painel do Netlify, abra **Project configuration > Environment variables** e adicione:

```text
VITE_FEE_BASED_VIDEO_URL=https://www.youtube.com/watch?v=SEU_ID
```

Também são aceitos links do Vimeo. Após salvar, acione **Deploys > Trigger deploy > Deploy site**. O player é carregado somente após o clique do visitante.
