import type { LucideProps } from 'lucide-react';

import { listIconsConstant } from './constants/list-icons.constant';

interface IconProps extends LucideProps {
  name: keyof typeof listIconsConstant;
  className?: string;
}

export function Icon({
  name,
  strokeWidth = 2,
  size = 28,
  className,
  ...props
}: IconProps) {
  const IconComponent = listIconsConstant[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      strokeWidth={strokeWidth}
      size={size}
      className={className}
      {...props}
    />
  );
}
