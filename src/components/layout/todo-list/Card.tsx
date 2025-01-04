// Hooks / Packages
import React from "react";
import { cn } from "@/lib/utils";

// Components
import { TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card as CardContainer,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

// Types
import { CardProps } from "@/types/props";

export default function Card({ id, title, description, status }: CardProps) {
  return (
    <CardContainer id={id} draggable>
      <CardHeader className="relative">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button variant={"link"} className="absolute top-2 right-2">
          <TrashIcon className="text-red-500" />
        </Button>
      </CardHeader>

      <CardFooter>
        <Badge
          className={cn({
            "bg-blue-500": status == "IN PROGRESS",
            "text-green-500": status == "DONE",
            "bg-yellow-500": status == "TODO",
          })}
        >
          {status}
        </Badge>
      </CardFooter>
    </CardContainer>
  );
}
