"use client";
import React from "react";
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
import { ColumnProps, Status } from "@/types/props";
import { useTodoStore } from "@/store/todo-store";

export default function TodoContainer() {
  // State

  const { todos, activeTodo, removeTodo, updateTodos, setActiveTodo } =
    useTodoStore();

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
    setActiveTodo(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeCard = todos.find((card) => card.id === active.id);
    const overCard = todos.find((card) => card.id === over.id);

    const overContainerStatus = overCard
      ? overCard.status
      : (over.id as Status);

    if (!activeCard) return;

    if (activeCard.status !== overContainerStatus) {
      const updatedTodo = todos.map((card) => ({
        ...card,
        status: card.id === active.id ? overContainerStatus : card.status,
      }));

      updateTodos(updatedTodo);
    } else {
      const columnCards = todos.filter(
        (card) => card.status === activeCard.status
      );
      const oldIndex = columnCards.findIndex((card) => card.id === active.id);
      const newIndex = columnCards.findIndex((card) => card.id === over.id);

      const updatedCards = arrayMove(columnCards, oldIndex, newIndex);

      const reorderedTodos = todos
        .filter((card) => card.status !== activeCard.status)
        .concat(updatedCards);

      updateTodos(reorderedTodos);
    }
    setActiveTodo(null); // Reset active ID after drop
  };

  const handleRemove = (id: string) => {
    removeTodo(id);
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
              cards={todos.filter((card) => card.status === column.status)}
            />
          ))}

          {/* Drag Overlay */}
          <DragOverlay>
            {activeTodo ? (
              <Card {...todos.find((card) => card.id === activeTodo)!} />
            ) : null}
          </DragOverlay>
          {/* Remove Area */}
          <RemoveArea onRemove={handleRemove} />
        </DndContext>
      </section>
    </>
  );
}
