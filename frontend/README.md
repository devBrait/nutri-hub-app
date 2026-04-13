# NutriHub — Frontend

Cliente web da plataforma NutriHub, desenvolvido para pacientes e nutricionistas.

---

## Arquitetura

Utiliza Arquitetura Orientada a Features, organizando o código por funcionalidade em vez de tipo de arquivo. Essa estrutura foi escolhida para suportar o crescimento natural do sistema sem grandes reestruturações.

```
frontend/src/
├── components/            → Componentes reutilizáveis (UI compartilhado)
├── features/              → Módulos por funcionalidade do sistema (auth, patient, nutritionist...)
├── hooks/                 → Hooks customizados globais
├── context/               → Contextos React globais (tema, autenticação...)
├── pages/                 → Páginas compostas por features e componentes
├── lib/                   → Configurações de bibliotecas externas (axios, react-query...)
└── utils/                 → Utilitários e helpers globais
```

---

## Como executar

```bash
npm install
npm run dev
# Disponível em: http://localhost:5173
```

## Como fazer build

```bash
npm run build
npm run preview
```

---

## Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila TypeScript e gera bundle de produção |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Executa o linter (Biome) |
| `npm run format` | Formata todos os arquivos (Biome) |
| `npm run check` | Lint + format em conjunto |

---

## Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| UI | Material UI + Emotion |
| Ícones | Material UI Icons |
| Linter / Formatter | Biome.js |
