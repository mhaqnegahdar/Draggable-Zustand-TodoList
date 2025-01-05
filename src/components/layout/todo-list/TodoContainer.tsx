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

// Components
import Column from "@/components/layout/todo-list/Column";
import Card from "@/components/layout/todo-list/Card";
import RemoveArea from "@/components/layout/todo-list/RemoveArea";
import CreateTodo from "@/components/layout/todo-list/CreateTodo";
import { Popover } from "@/components/ui/popover";

// Types
import { ColumnProps, CardProps, Status } from "@/types/props";

export default function TodoContainer() {
  // State
  const [cards, setCards] = useState<CardProps[]>([
    { id: "1", title: "Task 1", description: "Details", status: "TODO" },
    { id: "2", title: "Task 2", description: "Details", status: "TODO" },
    { id: "3", title: "Task 3", description: "Details", status: "IN PROGRESS" },
    { id: "4", title: "Task 4", description: "Details", status: "DONE" },
    { id: "5", title: "Task 5", description: "Details", status: "DONE" },
    { id: "6", title: "Task 6", description: "Details", status: "DONE" },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Constants
  const columns: ColumnProps[] = [
    { title: "To Do", status: "TODO" },
    { title: "In Progress", status: "IN PROGRESS" },
    { title: "Done", status: "DONE" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handlers
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

  const handleRemove = (id: string) => {
    // Remove the item with the given ID from the state
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 px-md-0 grid md:grid-cols-3 gap-4 ">
        {/* Craete Todo Form */}
        <div className="col-span-full flex justify-end">
          <Popover>
            <CreateTodo />
          </Popover>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Columns */}
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
          {/* Remove Area */}
          <RemoveArea onRemove={handleRemove} />
        </DndContext>
      </section>
    </>
  );
}
