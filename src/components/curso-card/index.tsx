import { MoreVertical } from 'lucide-react';
import { useState } from 'react';
import type z from 'zod';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { colors } from '@/constants/colors';
import type { cursoSchema } from '@/services/api/cursos/schemas';

import styles from './styles/curso-card.module.css';

interface CursoCardProps {
  curso: z.output<typeof cursoSchema>;
  listAction?: React.ReactNode;
}

function getColor(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function CursoCard({ curso, listAction }: CursoCardProps) {
  const [imgError, setImgError] = useState(false);
  const turmasAtivas = curso.turmaIds?.length || 0;

  const showFallback = !curso.urlImagem || imgError;
  const fallbackColor = getColor(curso.titulo);

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        {showFallback ? (
          <div
            className={styles.fallbackImage}
            style={{ backgroundColor: fallbackColor }}
          >
            <span className={styles.fallbackText}>
              {curso.titulo.charAt(0)}
            </span>
          </div>
        ) : (
          <img
            src={curso.urlImagem}
            alt={`Capa do curso ${curso.titulo}`}
            className={styles.image}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{curso.titulo}</h3>
        <p className={styles.description}>{curso.descricao}</p>

        <div className={styles.temasContainer}>
          {curso.temas?.map((tema) => (
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

          {listAction && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={styles.actionButton}
                  aria-label="Ações do curso"
                >
                  <MoreVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
                {listAction}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </article>
  );
}
