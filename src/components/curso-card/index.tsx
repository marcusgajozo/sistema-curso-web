import type z from 'zod';

import type { cursoSchema } from '@/services/api/cursos/schemas';

import styles from './styles/curso-card.module.css';

interface CursoCardProps {
  curso: z.output<typeof cursoSchema>;
}

export function CursoCard({ curso }: CursoCardProps) {
  const turmasAtivas = curso.turmaIds?.length || 0;

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={
            curso.urlImagem ||
            'https://via.placeholder.com/400x225?text=Sem+Imagem'
          }
          alt={`Capa do curso ${curso.titulo}`}
          className={styles.image}
          loading="lazy"
        />
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
        </div>
      </div>
    </article>
  );
}
