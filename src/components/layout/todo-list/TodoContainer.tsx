import React from "react";

// Components
import Column from "./Column";
// TYpes
import { ColumnProps } from "@/types/props";

export default function TodoContainer() {
  const columns: ColumnProps[] = [
    {
      title: "To Do",
      status: "TODO",
    },
    {
      title: "In Progress",
      status: "IN PROGRESS",
    },
    {
      title: "Done",
      status: "DONE",
    },
  ];
  return (
    <section className="w-full max-w-7xl mx-auto px-4 px-md-0 grid md:grid-cols-3 gap-4 ">
      {columns.map((column) => (
        <Column key={column.status} {...column} />
      ))}
    </section>
  );
}
