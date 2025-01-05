import React from "react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import {
  Card as CardContainer,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CSS } from "@dnd-kit/utilities";
import { CardProps } from "@/types/props";

export default function Card({ id, title, description, status }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <CardContainer
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "opacity-25")}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="relative">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Badge
          className={cn({
            "bg-blue-500": status === "IN PROGRESS",
            "bg-green-500": status === "DONE",
            "bg-yellow-500": status === "TODO",
          })}
        >
          {status}
        </Badge>
      </CardFooter>
    </CardContainer>
  );
}
