import type z from 'zod';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { useQueryParams } from '@/hooks/use-query-params';
import type { metaSchema } from '@/services/api/schemas/api-schema';

import styles from './styles/pagination.module.css';

interface PaginationProps {
  meta?: z.output<typeof metaSchema>['meta'];
  onPageChange?: (newPage: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  const { setQueryParams } = useQueryParams();

  if (!meta || meta.totalPages <= 1) return null;

  const { page, totalPages } = meta;

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setQueryParams({ page: newPage });
    }
  };

  return (
    <div className={styles.container}>
      <Button
        variant="outline"
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPreviousPage}
        className={styles.button}
      >
        <Icon name="chevron-left" size={16} />
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
        <Icon name="chevron-right" size={16} />
      </Button>
    </div>
  );
}
