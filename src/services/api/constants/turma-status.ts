export const turmaStatusConstant = {
  DISPONIVEL: 'DISPONIVEL',
  ENCERRADO: 'ENCERRADO',
} as const;

export type TurmaStatus =
  (typeof turmaStatusConstant)[keyof typeof turmaStatusConstant];
