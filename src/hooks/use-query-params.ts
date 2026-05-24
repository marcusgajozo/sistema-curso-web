import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    const params: Record<string, string | number> = {};

    for (const [key, value] of searchParams.entries()) {
      if (value !== '') {
        params[key] = value;
      }
    }

    return params;
  }, [searchParams]);

  const setQueryParams = useCallback(
    (newParams: Record<string, string | number | undefined | null>) => {
      setSearchParams((prevParams) => {
        const updatedParams = new URLSearchParams(prevParams);

        Object.entries(newParams).forEach(([key, value]) => {
          if (value === undefined || value === null || value === '') {
            updatedParams.delete(key);
          } else {
            updatedParams.set(key, String(value));
          }
        });

        return updatedParams;
      });
    },
    [setSearchParams],
  );

  return { queryParams, setQueryParams };
}
