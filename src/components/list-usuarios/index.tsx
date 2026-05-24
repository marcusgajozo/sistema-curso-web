import { generatePath, useNavigate } from 'react-router';
import z from 'zod';

import { GenericList } from '@/components/generic-list';
import { UsuarioCard } from '@/components/usuario-card';
import { ROUTES } from '@/routes/constants/routes-constants';
import type { metaSchema } from '@/services/api/schemas/api-schema';
import type { usuarioSchema } from '@/services/api/usuarios/schemas';

interface ListUsuariosProps {
  data?: z.output<typeof usuarioSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
}

export function ListUsuarios({ data = [], meta }: ListUsuariosProps) {
  const navigate = useNavigate();
  return (
    <GenericList
      data={data}
      meta={meta}
      emptyMessage="Nenhum usuário encontrado."
      renderItem={(usuario) => (
        <UsuarioCard
          key={usuario.id}
          usuario={usuario}
          listAction={[
            {
              name: 'Mais informações',
              function: () =>
                navigate(
                  generatePath(ROUTES.USUARIO_ID, { usuarioId: usuario.id }),
                ),
            },
            {
              name: 'Excluir',
              function: () => alert(`Excluir ${usuario.nome}`),
              destructive: true,
            },
          ]}
        />
      )}
    />
  );
}
