import { useState } from 'react';
import type z from 'zod';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { Icon } from '@/components/icon';
import type { cursoSchema } from '@/services/api/cursos/schemas';
import type { CardProps } from '@/types/card';
import { getColor } from '@/util/get-color';

import styles from './styles/curso-card.module.css';

export function CursoCard({
  data,
  listAction,
  hiddenAction,
}: CardProps<z.output<typeof cursoSchema>>) {
  const [imgError, setImgError] = useState(false);
  const turmasAtivas = data.turmaIds?.length || 0;

  const showFallback = !data.urlImagem || imgError;
  const fallbackColor = getColor(data.titulo);

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        {showFallback ? (
          <div
            className={styles.fallbackImage}
            style={{ backgroundColor: fallbackColor }}
          >
            <span className={styles.fallbackText}>{data.titulo.charAt(0)}</span>
          </div>
        ) : (
          <img
            src={data.urlImagem}
            alt={`Capa do curso ${data.titulo}`}
            className={styles.image}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{data.titulo}</h3>
        <p className={styles.description}>{data.descricao}</p>

        <div className={styles.temasContainer}>
          {data.temas?.map((tema) => (
            <span key={tema} className={styles.badge}>
              {tema}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.turmasInfo}>
            {turmasAtivas === 1
              ? '1 turma ativa'
              : `${turmasAtivas} turmas ativas`}
          </div>

          {!hiddenAction && listAction && listAction.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={styles.actionButton}
                  aria-label="Ações do curso"
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
      </div>
    </article>
  );
}
