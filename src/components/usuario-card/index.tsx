import { BookOpen, MoreVertical } from 'lucide-react';
import type z from 'zod';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import type { usuarioSchema } from '@/services/api/usuarios/schemas';
import type { CardProps } from '@/types/card';
import { getColor } from '@/util/get-color';

import styles from './styles/usuario-card.module.css';

export function UsuarioCard({
  data,
  listAction,
}: CardProps<z.output<typeof usuarioSchema>>) {
  const avatarColor = getColor(data.nome);
  const turmasInscritas = data.turmasIds?.length || 0;

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar} style={{ backgroundColor: avatarColor }}>
          {data.nome.charAt(0).toUpperCase()}
        </div>

        {listAction && listAction.length > 0 && (
          <div className={styles.actions}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={styles.actionButton}
                  aria-label="Ações do usuário"
                >
                  <MoreVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                {listAction.map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={action.function}
                    style={
                      action.destructive
                        ? { color: 'var(--danger)' }
                        : undefined
                    }
                  >
                    {action.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{data.nome}</h3>
        <p className={styles.email}>{data.email}</p>

        <div className={styles.footer}>
          <div className={styles.infoRow}>
            <BookOpen size={14} className={styles.icon} />
            <span>
              {turmasInscritas === 1
                ? 'Matriculado em 1 turma'
                : `Matriculado em ${turmasInscritas} turmas`}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
