"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./Column";
import Card from "./Card";
import { ColumnProps, CardProps, Status } from "@/types/props";

export default function TodoContainer() {
  const [cards, setCards] = useState<CardProps[]>([
    { id: "1", title: "Task 1", description: "Details", status: "TODO" },
    { id: "2", title: "Task 2", description: "Details", status: "TODO" },
    { id: "3", title: "Task 3", description: "Details", status: "IN PROGRESS" },
    { id: "4", title: "Task 4", description: "Details", status: "DONE" },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const columns: ColumnProps[] = [
    { title: "To Do", status: "TODO" },
    { title: "In Progress", status: "IN PROGRESS" },
    { title: "Done", status: "DONE" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeCard = cards.find((card) => card.id === active.id);
    const overCard = cards.find((card) => card.id === over.id);

    const overContainerStatus = overCard
      ? overCard.status
      : (over.id as Status);

    if (!activeCard) return;

    if (activeCard.status !== overContainerStatus) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === active.id
            ? { ...card, status: overContainerStatus }
            : card
        )
      );
    } else {
      const columnCards = cards.filter(
        (card) => card.status === activeCard.status
      );
      const oldIndex = columnCards.findIndex((card) => card.id === active.id);
      const newIndex = columnCards.findIndex((card) => card.id === over.id);

      const updatedCards = arrayMove(columnCards, oldIndex, newIndex);

      setCards((prev) =>
        prev
          .filter((card) => card.status !== activeCard.status)
          .concat(updatedCards)
      );
    }
    setActiveId(null); // Reset active ID after drop
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 px-md-0 grid md:grid-cols-3 gap-4 ">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column) => (
          <Column
            key={column.status}
            {...column}
            cards={cards.filter((card) => card.status === column.status)}
          />
        ))}

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <Card {...cards.find((card) => card.id === activeId)!} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
