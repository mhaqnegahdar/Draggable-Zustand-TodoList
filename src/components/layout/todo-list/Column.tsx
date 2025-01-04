// Components
import { useMemo } from "react";
import Card from "./Card";

// Types
import { CardProps, ColumnProps } from "@/types/props";

export default function Column({ title, status }: ColumnProps) {
  const cards: CardProps[] = [
    {
      id: "adfadf",
      title: "title",
      description: "description",
      status: "TODO",
    },
    {
      id: "adfccdd",
      title: "title",
      description: "description",
      status: "IN PROGRESS",
    },
  ] as CardProps[];

  const filteredCards = useMemo(
    () => cards.filter((card) => card.status === status),
    [cards, status]
  );
  return (
    <div id={`${status}-column`}>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="h-[600px]">
        <div className="rounded-xl bg-secondary h-full w-full p-4 space-y-4 ">
          {filteredCards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
