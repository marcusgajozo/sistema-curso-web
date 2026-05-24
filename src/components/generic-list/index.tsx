import type { ReactNode } from 'react';
import type z from 'zod';

import { Pagination } from '@/components/pagination';
import type { metaSchema } from '@/services/api/schemas/api-schema';

import styles from './styles/generic-list.module.css';

interface GenericListProps<T> {
  data?: T[];
  meta?: z.output<typeof metaSchema>['meta'];
  emptyMessage: string | ReactNode;
  renderItem: (item: T) => ReactNode;
}

export function GenericList<T>({
  data = [],
  meta,
  emptyMessage,
  renderItem,
}: GenericListProps<T>) {
  return (
    <>
      {data.length > 0 ? (
        <>
          <div className={styles.grid}>{data.map(renderItem)}</div>
          <Pagination meta={meta} />
        </>
      ) : (
        <div className={styles.empty}>{emptyMessage}</div>
      )}
    </>
  );
}
