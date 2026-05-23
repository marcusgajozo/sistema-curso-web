export const cursoTemasConstant = {
  INOVACAO: 'INOVACAO',
  TECNOLOGIA: 'TECNOLOGIA',
  MARKETING: 'MARKETING',
  EMPREENDEDORISMO: 'EMPREENDEDORISMO',
  AGRO: 'AGRO',
};

export type CursoTemas =
  (typeof cursoTemasConstant)[keyof typeof cursoTemasConstant];
