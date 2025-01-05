// RemoveArea.tsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface RemoveAreaProps {
  onRemove: (id: string) => void;
}

const RemoveArea: React.FC<RemoveAreaProps> = ({ onRemove }) => {
  const { isOver, setNodeRef, over } = useDroppable({
    id: "remove-area",
    data: {
      type: "remove",
    },
  });

  return (
    <div
      ref={setNodeRef}
      id="remove-area"
      className={cn(
        "relative flex h-10 w-full items-center justify-center rounded-md border-2 border-dashed border-red-500 bg-red-50 px-4 text-sm font-medium text-red-700 transition-colors",
        isOver ? "bg-red-100 border-red-700" : "bg-red-50"
      )}
      onClick={() => {
        if (isOver && over && over.data.current) {
          onRemove(over.data.current.id);
        }
      }}
    >
      {isOver ? "Drop to remove" : "Remove area"}
    </div>
  );
};

export default RemoveArea;
