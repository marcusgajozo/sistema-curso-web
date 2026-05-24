import { useMemo } from 'react';
import type z from 'zod';

import { Badge } from '@/components/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { Icon } from '@/components/icon';
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

  const isEncerrado = data.status === 'ENCERRADO';
  const hasActions = !hiddenAction && listAction && listAction.length > 0;
  const showFooter = !isEncerrado || hasActions;

  const { badgeText, badgeVariant } = useMemo(() => {
    const hoje = new Date();
    const dataInicio = new Date(data.dataInicio);
    hoje.setHours(0, 0, 0, 0);
    dataInicio.setHours(0, 0, 0, 0);

    const isEmBreve = dataInicio > hoje && data.status === 'DISPONIVEL';

    if (isEmBreve) {
      return { badgeText: 'Em breve', badgeVariant: 'info' as const };
    }
    if (data.status === 'DISPONIVEL') {
      return { badgeText: data.status, badgeVariant: 'success' as const };
    }
    return { badgeText: data.status, badgeVariant: 'default' as const };
  }, [data.status, data.dataInicio]);

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
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>

        <p className={styles.description}>{data.descricao}</p>

        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <Icon name="calendar" size={14} className={styles.icon} />
            <span>
              {formatData(data.dataInicio)} até {formatData(data.dataFim)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <Icon name="users" size={14} className={styles.icon} />
            <span>
              {inscritos} {inscritos === 1 ? 'aluno' : 'alunos'} inscritos
            </span>
          </div>
        </div>

        {showFooter && (
          <div className={styles.footer}>
            {isEncerrado ? (
              <div />
            ) : (
              <Badge variant="info">
                {vagasRestantes === 0
                  ? 'Turma Lotada'
                  : `${vagasRestantes} vagas restantes`}
              </Badge>
            )}

            {hasActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={styles.actionButton}
                    aria-label="Ações da turma"
                  >
                    <Icon name="more-vertical" size={16} />
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
        )}
      </div>
    </article>
  );
}
