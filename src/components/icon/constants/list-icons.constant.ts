import { lazy } from 'react';

export const listIconsConstant = {
  home: lazy(() =>
    import('lucide-react').then(({ Home }) => ({
      default: Home,
    })),
  ),
  'file-code': lazy(() =>
    import('lucide-react').then(({ FileCode }) => ({
      default: FileCode,
    })),
  ),
  suitcase: lazy(() =>
    import('lucide-react').then(({ Folder }) => ({
      default: Folder,
    })),
  ),
  'mail-right': lazy(() =>
    import('lucide-react').then(({ Mail }) => ({
      default: Mail,
    })),
  ),
  moon: lazy(() =>
    import('lucide-react').then(({ Moon }) => ({
      default: Moon,
    })),
  ),
  sun: lazy(() =>
    import('lucide-react').then(({ Sun }) => ({
      default: Sun,
    })),
  ),
  'user-fill': lazy(() =>
    import('lucide-react').then(({ User }) => ({
      default: User,
    })),
  ),
  thunder: lazy(() =>
    import('lucide-react').then(({ Zap }) => ({
      default: Zap,
    })),
  ),
} as const;
