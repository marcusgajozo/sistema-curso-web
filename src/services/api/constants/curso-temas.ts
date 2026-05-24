export const cursoTemasConstant = {
  INOVACAO: 'INOVACAO',
  TECNOLOGIA: 'TECNOLOGIA',
  MARKETING: 'MARKETING',
  EMPREENDEDORISMO: 'EMPREENDEDORISMO',
  AGRO: 'AGRO',
} as const;

export type CursoTemas =
  (typeof cursoTemasConstant)[keyof typeof cursoTemasConstant];
