# Refatoração de Estilos e Design Tokens

Este plano define a aplicação das melhorias de arquitetura CSS: centralização de Design Tokens no arquivo global, padronização do local de arquivos CSS Modules e a implementação do utilitário `clsx` para concatenação de classes.

## User Review Required

> [!IMPORTANT]
> Verifique se as nomenclaturas dos _Design Tokens_ (spacing, radius, typography) estão de acordo com o que você espera, ou se você tem um padrão específico em mente.

## Open Questions

> [!NOTE]
> Você prefere que eu mantenha os nomes originais dos arquivos (ex: `styles.module.css`) ao movê-los para a pasta `styles/`, ou prefere que eu os renomeie para seguir o padrão do componente (ex: `button.module.css`)? Atualmente, os componentes já existentes em pastas `styles/` usam as duas formas (ex: `page/styles/page.module.css` e `list-usuarios-turma/styles/list-usuarios-turma.module.css`). Vou renomeá-los para o nome do componente por padrão, para evitar conflitos de nomes no editor.

## Proposed Changes

### 1. Dependências

- **[NEW]** Instalar a biblioteca `clsx` via `pnpm add clsx` para lidar com as concatenações de classes CSS de forma nativa e limpa.

---

### 2. Design Tokens (`src/styles/globals.css`)

Adicionar novas variáveis globais semânticas (Design Tokens) no `:root`:

- Espaçamentos (ex: `--spacing-sm`, `--spacing-md`, `--spacing-lg`)
- Raios de borda (ex: `--radius-sm`, `--radius-md`, `--radius-full`)
- Tipografia (ex: `--font-sm`, `--font-md`, `--font-lg`)

#### [MODIFY] [globals.css](file:///wsl$/Ubuntu/home/mgajozo/projetos/sistema-curso-web/src/styles/globals.css)

---

### 3. Padronização de Estrutura de Pastas CSS

Mover todos os arquivos `.module.css` que estão perdidos na raiz dos componentes para uma subpasta `styles/` e renomeá-los para incluir o nome do componente, mantendo a regra de ouro: "CSS sempre dentro da pasta styles".

#### Components a serem movidos e atualizados:

- **Badge**:
  - [DELETE] `src/components/badge/styles.module.css`
  - [NEW] `src/components/badge/styles/badge.module.css`
  - [MODIFY] `src/components/badge/index.tsx`
- **Button**:
  - [DELETE] `src/components/button/styles.module.css`
  - [NEW] `src/components/button/styles/button.module.css`
  - [MODIFY] `src/components/button/index.tsx`
- **CheckboxGroup**:
  - [DELETE] `src/components/checkbox-group/styles.module.css`
  - [NEW] `src/components/checkbox-group/styles/checkbox-group.module.css`
  - [MODIFY] `src/components/checkbox-group/index.tsx`
- **Dialog**:
  - [DELETE] `src/components/dialog/styles.module.css`
  - [NEW] `src/components/dialog/styles/dialog.module.css`
  - [MODIFY] `src/components/dialog/index.tsx`
- **DropdownMenu**:
  - [DELETE] `src/components/dropdown-menu/styles.module.css`
  - [NEW] `src/components/dropdown-menu/styles/dropdown-menu.module.css`
  - [MODIFY] `src/components/dropdown-menu/index.tsx`
- **Input**:
  - [DELETE] `src/components/input/styles.module.css`
  - [NEW] `src/components/input/styles/input.module.css`
  - [MODIFY] `src/components/input/index.tsx`
- **Pagination**:
  - [DELETE] `src/components/pagination/styles.module.css`
  - [NEW] `src/components/pagination/styles/pagination.module.css`
  - [MODIFY] `src/components/pagination/index.tsx`

---

### 4. Refatoração com `clsx`

Modificar todos os componentes (incluindo os que não mudaram de pasta, como `TurmaCard`, `Page`, etc) que possuem concatenações manuais de classes (ex: ``className={`${styles.statusBadge} ${styles[status]}`}``) para utilizar a função `clsx`.

## Verification Plan

### Automated Tests

- Executar o linter com `pnpm lint:fix` para garantir que as novas importações de `clsx` e arquivos de estilo estejam válidas.
- Executar `pnpm build` para confirmar que nenhum caminho de importação CSS foi quebrado durante a movimentação.

### Manual Verification

- Acessar o sistema pelo navegador.
- Validar se o visual dos componentes (Botões, Dropdowns, Badges, Modais, Paginação) continua idêntico ao original sem quebras de layout.
