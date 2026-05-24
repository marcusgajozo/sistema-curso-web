import z from 'zod';

import { Pagination } from '@/components/pagination';
import { UsuarioCard } from '@/components/usuario-card';
import type { metaSchema } from '@/services/api/schemas/api-schema';
import type { usuarioSchema } from '@/services/api/usuarios/schemas';

import styles from './styles/list-usuarios.module.css';

interface ListUsuariosProps {
  data?: z.output<typeof usuarioSchema>[];
  meta?: z.output<typeof metaSchema>['meta'];
}

export function ListUsuarios({ data = [], meta }: ListUsuariosProps) {
  return (
    <>
      {data.length > 0 ? (
        <>
          <div className={styles.grid}>
            {data?.map((usuario) => (
              <UsuarioCard
                key={usuario.id}
                usuario={usuario}
                listAction={[
                  {
                    name: 'Editar Usuário',
                    function: () => alert(`Editar ${usuario.nome}`),
                  },
                  {
                    name: 'Excluir',
                    function: () => alert(`Excluir ${usuario.nome}`),
                    destructive: true,
                  },
                ]}
              />
            ))}
          </div>

          <Pagination meta={meta} />
        </>
      ) : (
        <div className={styles.empty}>Nenhum usuário encontrado.</div>
      )}
    </>
  );
}
