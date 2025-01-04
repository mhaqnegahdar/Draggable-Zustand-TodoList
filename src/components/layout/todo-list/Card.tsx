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
import { TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities";
import { CardProps } from "@/types/props";

export default function Card({ id, title, description, status }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <CardContainer
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="relative">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button
          variant="link"
          className="absolute top-2 right-2 hover:scale-x-125 "
        >
          <TrashIcon className="text-red-500 " />
        </Button>
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
