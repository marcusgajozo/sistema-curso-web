import { Calendar, MoreVertical, Users } from 'lucide-react';
import type z from 'zod';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import type { turmaSchema } from '@/services/api/turmas/schemas';
import { getColor } from '@/util/get-color';

import styles from './styles/turma-card.module.css';

interface ActionOption {
  name: string;
  function: () => void;
  destructive?: boolean;
}

interface TurmaCardProps {
  turma: z.output<typeof turmaSchema>;
  listAction?: ActionOption[];
}

export function TurmaCard({ turma, listAction }: TurmaCardProps) {
  const fallbackColor = getColor(turma.titulo);
  const inscritos = turma.usuariosIds?.length || 0;
  const vagasRestantes = Math.max(0, turma.quantidadeVagas - inscritos);

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
          <span className={styles.fallbackText}>{turma.titulo.charAt(0)}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{turma.titulo}</h3>
          <span
            className={`${styles.statusBadge} ${styles[turma.status.toLowerCase()]}`}
          >
            {turma.status}
          </span>
        </div>

        <p className={styles.description}>{turma.descricao}</p>

        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <Calendar size={14} className={styles.icon} />
            <span>
              {formatData(turma.dataInicio)} até {formatData(turma.dataFim)}
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

          {listAction && listAction.length > 0 && (
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
