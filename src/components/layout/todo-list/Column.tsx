import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import { CardProps, ColumnProps } from "@/types/props";

export default function Column({
  title,
  status,
  cards,
}: ColumnProps & { cards: CardProps[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status, // Unique ID for this droppable
  });

  const isEmpty = cards.length === 0;

  return (
    <div
      ref={setNodeRef} // Mark this column as droppable
      id={`${status}-column`}
      className={`border p-4 rounded-md  ${isOver ? "bg-gray-100" : ""}`}
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="h-[600px] relative space-y-4">
        <SortableContext
          id={status}
          items={cards.map((card) => card.id)} // Ensure SortableContext always has an ID
          strategy={verticalListSortingStrategy}
        >
          {/* Placeholder for empty column */}
          {isEmpty ? (
            <div className="flex items-center justify-center h-full border-dashed border-2 border-gray-300 text-gray-500">
              Drop items here
            </div>
          ) : (
            cards.map((card) => <Card key={card.id} {...card} />)
          )}
        </SortableContext>
      </div>
    </div>
  );
}
