import { Calendar, MoreVertical, Users } from 'lucide-react';
import type z from 'zod';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import type { turmaSchema } from '@/services/api/turmas/schemas';
import type { CardProps } from '@/types/card';
import { getColor } from '@/util/get-color';

import styles from './styles/turma-card.module.css';

export function TurmaCard({
  data,
  listAction,
  hiddenAction = false,
}: CardProps<z.output<typeof turmaSchema>>) {
  const fallbackColor = getColor(data.titulo);
  const inscritos = data.usuariosIds?.length || 0;
  const vagasRestantes = Math.max(0, data.quantidadeVagas - inscritos);

  const formatData = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('pt-BR');
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <div
          className={styles.fallbackImage}
          style={{ backgroundColor: fallbackColor }}
        >
          <span className={styles.fallbackText}>{data.titulo.charAt(0)}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{data.titulo}</h3>
          <span
            className={`${styles.statusBadge} ${styles[data.status.toLowerCase()]}`}
          >
            {data.status}
          </span>
        </div>

        <p className={styles.description}>{data.descricao}</p>

        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <Calendar size={14} className={styles.icon} />
            <span>
              {formatData(data.dataInicio)} até {formatData(data.dataFim)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <Users size={14} className={styles.icon} />
            <span>
              {inscritos} {inscritos === 1 ? 'aluno' : 'alunos'} inscritos
            </span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.vagasInfo}>
            {vagasRestantes === 0
              ? 'Turma Lotada'
              : `${vagasRestantes} vagas restantes`}
          </div>

          {!hiddenAction && listAction && listAction.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={styles.actionButton}
                  aria-label="Ações da turma"
                >
                  <MoreVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
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
          )}
        </div>
      </div>
    </article>
  );
}
