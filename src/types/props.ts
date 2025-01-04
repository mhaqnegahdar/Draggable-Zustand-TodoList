export type Status = "TODO" | "IN PROGRESS" | "DONE";

export interface CardProps {
  id: string;
  title: string;
  description: string;
  status: Status;
}

export interface ColumnProps {
  title: string;
  status: Status;
}

export interface TodoContainerProps {
  columns: ColumnProps[];
}

export type Columns = {
  title: string;
  cards: CardProps[];
};
