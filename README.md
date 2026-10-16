# Sistema Curso Web

Interface web do sistema de gestão de cursos, turmas e matrículas. Consome a API REST do [api-course-system](https://github.com/marcusgajozo/api-course-system) e tem telas de dashboard, listagem e cadastro de cursos, turmas e usuários.

## Stack

- React com TypeScript e Vite
- React Router nas rotas
- TanStack Query no estado de servidor
- react-hook-form na validação de formulário
- Axios como cliente HTTP, com a URL base vinda de `VITE_API_BASE_URL`
- Docker com build em múltiplos estágios e Nginx

## Como rodar em desenvolvimento

```bash
npm install
cp .env.example .env      # aponte VITE_API_BASE_URL para a API rodando
npm run dev
```

## Como rodar em produção, localmente

1. Copie o arquivo de exemplo de produção para criar o `.env`:

   ```bash
   cp .env.prd .env
   ```

2. Suba os contêineres. O build usa o Dockerfile multi-stage configurado com Nginx:

   ```bash
   docker-compose up -d --build
   ```

3. A aplicação fica em [http://localhost:8080](http://localhost:8080).

## Projeto relacionado

- API: [api-course-system](https://github.com/marcusgajozo/api-course-system)

---

## Estrutura do projeto e arquitetura

Este documento descreve a organização de pastas e as decisões arquiteturais adotadas neste projeto, visando escalabilidade, separação de responsabilidades e facilidade de manutenção.

### Arquitetura feature-first (orientada a features)

O projeto adota uma abordagem híbrida com fortes inspirações no **Feature-First** (ou _Feature-Sliced Design_). A ideia principal é agrupar arquivos pela sua funcionalidade de negócio (Feature/Page) quando são exclusivos de uma única tela.

No entanto, essa arquitetura foi aplicada de forma **parcial e pragmática**. Embora telas como `cursos-disponiveis` possuam seus próprios diretórios isolados para `components/` e `hooks/`, optei por manter certos componentes de domínio que possuem alto reuso (como `list-turmas`, `list-cursos`, `turma-card`, `curso-card`) diretamente na pasta global `src/components/`. Isso garante o compartilhamento visual e de regras entre diferentes páginas (como a Dashboard e a listagem de turmas), sem forçar dependências cruzadas complexas entre as pastas de features.

Vantagens:

- **Alta coesão:** tudo o que uma tela precisa para funcionar (hooks, componentes internos, tipagens) fica dentro da pasta daquela tela. Para dar manutenção na tela de "Cursos Disponíveis", você não precisa pular por cinco diretórios globais diferentes.
- **Isolamento:** componentes específicos de uma tela, como `FilterCursosDisponiveis`, não poluem a pasta de componentes globais, pois dificilmente fariam sentido em outras telas.
- **Escalabilidade:** novas features podem ser adicionadas sem inchar as pastas raiz do projeto.

### Visão geral dos diretórios

```
src/
├── components/   # (GLOBAL UI) Componentes burros e genéricos (Button, Input, Pagination, Icon). Sem lógica de negócio.
├── constants/    # Constantes globais (ex: mapeamento de cores, temas gerais).
├── hooks/        # Hooks GLOBAIS e bibliotecas abstratas (como o use-request).
├── layouts/      # Estruturas de casca/container (ex: MainLayout com Sidebar).
├── libs/         # Configurações de bibliotecas externas (React Query, Zod i18n, Axios config).
├── pages/        # (FEATURE FIRST) O coração da aplicação! Cada pasta aqui é uma tela independente.
│   ├── cursos-disponiveis/
│   │   ├── components/  # Componentes que SÓ pertencem à tela de cursos-disponiveis
│   │   ├── hooks/       # Hooks de regras de negócio (ex: use-cursos-disponiveis.ts)
│   │   └── index.tsx    # O componente principal da página
│   └── ...
├── routes/       # Definição e mapeamento de todas as rotas (react-router).
├── services/     # Camada de comunicação com APIs externas. Organizada por domínio (cursos/, turmas/, usuarios/).
├── styles/       # Design Tokens e arquivos CSS globais (ex: globals.css).
├── types/        # Tipagens TypeScript estritamente globais.
└── util/         # Funções utilitárias puras (ex: get-color).
```

### Biblioteca customizada: use-request

Destaque para o hook `use-request`, em `src/hooks/use-request.ts`.

Esse hook virou um projeto próprio: está publicado no npm como [typed-route-client](https://www.npmjs.com/package/typed-route-client), com o código em [marcusgajozo/typed-route-client](https://github.com/marcusgajozo/typed-route-client). O repositório está arquivado e sem manutenção ativa, mas o hook continua em uso aqui.

O objetivo da abstração é envolver a complexidade das requisições HTTP e a integração com o React Query. Em vez de cada componente de tela lidar com as configurações do React Query ou com endpoints na mão, ele declara um contrato:

```tsx
const { data, isLoading } = useRequest({
  route: '/cursos/:id',
  method: 'get',
  params: { id: cursoId },
  autoFetch: !!cursoId,
});
```

A presença desse hook reforça a separação de responsabilidades e ajuda as camadas visuais a não misturarem código imperativo de requisição com a renderização do React.
