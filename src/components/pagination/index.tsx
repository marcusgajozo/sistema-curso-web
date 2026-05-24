import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router';
import type z from 'zod';

import { Button } from '@/components/button';
import type { metaSchema } from '@/services/api/schemas/api-schema';

import styles from './styles.module.css';

interface PaginationProps {
  meta?: z.output<typeof metaSchema>['meta'];
}

export function Pagination({ meta }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!meta || meta.totalPages <= 1) return null;

  const { page, totalPages } = meta;

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  };

  return (
    <div className={styles.container}>
      <Button
        variant="outline"
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPreviousPage}
        className={styles.button}
      >
        <ChevronLeft size={16} />
        Anterior
      </Button>

      <span className={styles.info}>
        Página {page} de {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
        className={styles.button}
      >
        Próxima
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
