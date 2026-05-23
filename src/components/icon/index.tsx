import type { LucideProps } from 'lucide-react';
import { Suspense } from 'react';

import { listIconsConstant } from './constants/list-icons.constant';

interface IconProps extends LucideProps {
  name: keyof typeof listIconsConstant;
}

export function Icon({
  name,
  strokeWidth = 2,
  size = 28,
  ...props
}: IconProps) {
  const IconComponent = listIconsConstant[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IconComponent strokeWidth={strokeWidth} size={size} {...props} />
    </Suspense>
  );
}
