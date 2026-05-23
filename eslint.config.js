import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import pluginQuery from '@tanstack/eslint-plugin-query';

const noCommentsPlugin = {
  rules: {
    'no-comments': {
      meta: {
        type: /** @type {const} */ ('suggestion'),
        messages: {
          noComment: 'Comentários não são permitidos no código.',
        },
      },
      /** @param {import('eslint').Rule.RuleContext} context */
      create(context) {
        const sourceCode = context.sourceCode;
        return {
          Program() {
            for (const comment of sourceCode.getAllComments()) {
              const value = comment.value.trim();
              if (value.startsWith('eslint')) continue;
              if (value.startsWith('@ts-')) continue;
              if (comment.loc)
                context.report({ loc: comment.loc, messageId: 'noComment' });
            }
          },
        };
      },
    },
  },
};

export default defineConfig([
  globalIgnores(['dist']),
  ...pluginQuery.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      'no-comments': noCommentsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-comments/no-comments': 'warn',
      'no-console': 'error',
      'no-warning-comments': [
        'warn',
        { terms: ['fixme', 'hack'], location: 'start' },
      ],
      'react-refresh/only-export-components': 'off',
    },
  },
]);
