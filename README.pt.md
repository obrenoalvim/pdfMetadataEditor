[English](README.md) | Português

# PDF Metadata Editor

[![CI](https://github.com/obrenoalvim/pdf-metadata-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/obrenoalvim/pdf-metadata-editor/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Um editor de metadados de PDF moderno e 100% client-side, construído com Next.js. Edite os metadados do PDF direto no navegador, sem fazer upload dos arquivos pra nenhum servidor — foco total em privacidade.

## Funcionalidades

- **Processamento 100% client-side** — todas as operações de PDF acontecem no navegador. Sem upload, sem processamento no servidor.
- **Suporte completo a metadados** — edite Título, Autor, Assunto, Palavras-chave, Criador, Produtor, Data de Criação e Data de Modificação.
- **Internacionalização** — suporte nativo a inglês e português (Brasil), com a escolha de idioma salva.
- **Tema escuro** — tema escuro moderno, otimizado para uso prolongado.
- **Arrastar e soltar** — upload de arquivo fácil, com suporte a drag-and-drop.
- **Design responsivo** — funciona bem em celular, tablet e desktop.
- **Type-safe** — construído com TypeScript para mais confiabilidade.

## Tecnologias

- **Next.js 13.5** — framework React com App Router
- **TypeScript** — desenvolvimento com tipagem
- **pdf-lib** — manipulação de PDF no client-side
- **Tailwind CSS** — framework CSS utility-first
- **shadcn/ui** — componentes React de alta qualidade
- **Lucide Icons** — ícones bonitos e consistentes
- **Sonner** — notificações toast

## Como começar

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/obrenoalvim/pdf-metadata-editor.git
cd pdf-metadata-editor
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Uso

1. **Faça upload de um PDF** — arraste e solte um arquivo PDF na área designada, ou clique para escolher um arquivo.
2. **Veja os metadados existentes** — o formulário é preenchido automaticamente com os metadados atuais do PDF.
3. **Edite os campos** — modifique qualquer um dos campos de metadados conforme necessário:
   - **Título** — título do documento
   - **Autor** — autor do documento
   - **Assunto** — assunto/descrição do documento
   - **Palavras-chave** — palavras-chave separadas por vírgula, para facilitar buscas
   - **Criador** — aplicação que criou o documento original
   - **Produtor** — aplicação que produziu o PDF
   - **Data de Criação** — quando o documento foi criado
   - **Data de Modificação** — quando o documento foi modificado pela última vez
4. **Aplicar e baixar** — clique em "Aplicar e Baixar" para gerar e baixar o PDF com os metadados atualizados.
5. **Limpar campos** — use "Limpar Todos os Campos" para resetar todos os campos de metadados.

### Suporte a idiomas

Clique no seletor de idioma no cabeçalho para alternar entre:
- Inglês (EN)
- Português (BR)

Sua preferência de idioma é salva automaticamente no localStorage.

## Build e deploy

### Build de produção

Gere o build de produção da aplicação:

```bash
npm run build
```

Isso cria um build de produção otimizado na pasta `.next`.

### Rodar o servidor de produção

Rode o build de produção localmente:

```bash
npm run start
```

### Deploy na Vercel

A forma mais fácil de fazer deploy é usando a [Vercel](https://vercel.com):

1. Envie seu código para um repositório Git (GitHub, GitLab ou Bitbucket)
2. Importe seu repositório na Vercel
3. A Vercel detecta o Next.js automaticamente e configura o build
4. Faça o deploy com um clique

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy em outras plataformas

Esta aplicação pode ser hospedada em qualquer plataforma com suporte a Next.js:

- **Netlify** — use o comando `npm run build`
- **GitHub Pages** — configure o export estático em `next.config.js`
- **Docker** — use o exemplo oficial de Docker do Next.js
- **Self-hosted** — rode `npm run build && npm run start`

## Estrutura do projeto

```
├── app/
│   ├── layout.tsx          # Layout raiz com tema escuro
│   ├── page.tsx            # Página principal da aplicação
│   └── globals.css         # Estilos globais
├── components/
│   ├── Header.tsx          # Cabeçalho com seletor de idioma
│   ├── Dropzone.tsx        # Componente de upload de arquivo
│   ├── MetadataForm.tsx    # Formulário de edição de metadados
│   └── ui/                 # Componentes shadcn/ui
├── lib/
│   ├── pdf.ts              # Utilitários de leitura/escrita de PDF
│   ├── dates.ts            # Utilitários de conversão de data
│   ├── i18n-context.tsx    # Contexto de internacionalização
│   └── utils.ts            # Utilitários gerais
├── i18n/
│   ├── en.json             # Traduções em inglês
│   └── pt.json             # Traduções em português
└── public/                 # Assets estáticos
```

## Limitações conhecidas

### Versão atual

- **PDFs criptografados** — não é possível editar metadados de PDFs protegidos por senha ou criptografados
- **Processamento de um arquivo por vez** — apenas um PDF pode ser processado por vez
- **Arquivos grandes** — PDFs muito grandes (>100MB) podem causar problemas de performance no navegador
- **Metadados XMP** — metadados XMP avançados não são suportados atualmente
- **Memória do navegador** — limitado pela memória disponível no navegador para processamento

### Compatibilidade de navegadores

Testado e funcionando em:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Desenvolvimento

### Checagem de tipos

Rode a checagem de tipos do TypeScript:

```bash
npm run typecheck
```

### Lint

Rode o ESLint:

```bash
npm run lint
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

## Licença

Este projeto é open source e distribuído sob a licença MIT.

## Privacidade e segurança

- **Sem coleta de dados** — esta aplicação não coleta, armazena ou transmite nenhum dado
- **Somente client-side** — todo o processamento do PDF acontece localmente no navegador
- **Sem analytics** — nenhum rastreamento ou analytics é implementado
- **Open source** — código-fonte completo disponível para revisão

## Suporte

Se encontrar algum problema ou tiver dúvidas:

1. Confira a seção [Limitações conhecidas](#limitações-conhecidas)
2. Abra uma issue no GitHub com detalhes sobre o problema
3. Inclua a versão do navegador e erros do console, se aplicável

## Agradecimentos

- [pdf-lib](https://pdf-lib.js.org/) — excelente biblioteca de manipulação de PDF
- [shadcn/ui](https://ui.shadcn.com/) — biblioteca de componentes bonita
- [Lucide Icons](https://lucide.dev/) — conjunto de ícones limpo e consistente
- [Pexels](https://pexels.com/) — fotografia de banco de imagens usada neste README
