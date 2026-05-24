import type { ReactNode } from 'react';

interface SuspenseLoadingProps {
  isLoading?: boolean;
  fallback: ReactNode;
  children: ReactNode;
}

export function SuspenseLoading({
  isLoading,
  fallback,
  children,
}: SuspenseLoadingProps) {
  if (isLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
