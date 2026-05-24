export interface ActionOption {
  name: string;
  function: () => void;
  destructive?: boolean;
}

export interface CardProps<T> {
  data: T;
  listAction?: ActionOption[];
  hiddenAction?: boolean;
}
