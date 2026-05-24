# Estrutura do Projeto e Arquitetura

Este documento descreve a organização de pastas e as decisões arquiteturais adotadas neste projeto, visando escalabilidade, separação de responsabilidades e facilidade de manutenção.

## 🏗️ Arquitetura _Feature-First_ (Orientada a Features)

O projeto adota uma abordagem híbrida com fortes inspirações no **Feature-First** (ou _Feature-Sliced Design_). A ideia principal é agrupar arquivos pela sua funcionalidade de negócio (Feature/Page) quando são exclusivos de uma única tela.

No entanto, essa arquitetura foi aplicada de forma **parcial e pragmática**. Embora telas como `cursos-disponiveis` possuam seus próprios diretórios isolados para `components/` e `hooks/`, optei por manter certos componentes de domínio que possuem alto reuso (como `list-turmas`, `list-cursos`, `turma-card`, `curso-card`) diretamente na pasta global `src/components/`. Isso garante o compartilhamento visual e de regras entre diferentes páginas (como a Dashboard e a listagem de turmas), sem forçar dependências cruzadas complexas entre as pastas de features.

Vantagens:

- **Alta Coesão:** Tudo o que uma tela precisa para funcionar (hooks, componentes internos, tipagens) fica dentro da pasta daquela tela. Se você for dar manutenção na tela de "Cursos Disponíveis", você não precisa pular por 5 diretórios globais diferentes; tudo está lá dentro.
- **Isolamento:** Componentes específicos de uma tela (ex: `FilterCursosDisponiveis`) não "poluem" a pasta de componentes globais UI, pois dificilmente farão sentido em outras telas do sistema.
- **Escalabilidade:** Novas features podem ser adicionadas sem inchar as pastas raízes do projeto.

---

## 📂 Visão Geral dos Diretórios (`src/`)

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

---

## 🚀 Biblioteca Customizada: `use-request`

Destaque especial para o hook `use-request` localizado na pasta `src/hooks/use-request.ts`.

Esse hook é um projeto pessoal em andamento e contínua evolução, baseado na biblioteca experimental em desenvolvimento:
🔗 **[react-hook-use-request](https://github.com/marcusgajozo/react-hook-use-request)**

### O que ele busca resolver?

O objetivo dessa abstração (que ainda está sendo testada e iterada no mundo real através deste projeto) é envelopar a complexidade das requisições HTTP e sua integração com o React Query / TanStack Query. A ideia é fornecer uma interface limpa para os componentes visuais consumirem os dados.

Em vez de cada componente de tela lidar manualmente com as configurações do React Query ou de endpoints específicos na mão, eles apenas declaram um contrato limpo:

```tsx
const { data, isLoading } = useRequest({
  route: '/cursos/:id',
  method: 'get',
  params: { id: cursoId },
  autoFetch: !!cursoId,
});
```

A presença desse hook reforça a separação de responsabilidades (Clean Code) e ajuda as camadas visuais (Pages) a não misturarem código imperativo de requisição com renderização do React.

---

## ⚙️ Como Rodar o Projeto (Produção)

Para executar a aplicação em um ambiente de produção local utilizando os contêineres Docker já configurados, siga os passos abaixo:

1. **Configurar as Variáveis de Ambiente:**
   Copie o arquivo de exemplo de produção para criar o seu arquivo `.env` real na raiz do projeto:

   ```bash
   cp env.prd .env
   ```

2. **Subir os Contêineres:**
   Utilize o Docker Compose para realizar o build (usando o Dockerfile multi-stage configurado com Nginx) e iniciar a aplicação em segundo plano:

   ```bash
   docker-compose up -d --build
   ```

3. **Acessar a Aplicação:**
   A aplicação estará disponível no seu navegador no endereço: [http://localhost:8080](http://localhost:8080)
