import type { listIconsConstant } from '@/components/icon/constants/list-icons.constant';

export type MenuItem = {
  titulo: string;
  icon?: keyof typeof listIconsConstant;
  url?: string;
  function?: () => void;
  childrens?: MenuItem[];
};
