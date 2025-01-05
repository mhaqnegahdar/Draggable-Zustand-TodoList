import { CardProps } from "@/types/props";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoStoreState {
  todos: CardProps[];
  activeTodo: null | string;
}

interface TodoStoreActions {
  addTodo: (todo: CardProps) => void;
  removeTodo: (id: string) => void;
  updateTodos: (updatedTodos: CardProps[]) => void;
  setActiveTodo: (id: string | null) => void;
}

export const useTodoStore = create<TodoStoreState & TodoStoreActions>()(
  persist(
    (set) => ({
      todos: [] as CardProps[],
      activeTodo: null,
      addTodo: (todo) =>
        set((state) => ({
          ...state,
          todos: [...state.todos, todo],
        })),

      removeTodo: (id) =>
        set((state) => ({
          ...state,
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      updateTodos: (updatedTodos) =>
        set((state) => ({ ...state, todos: updatedTodos })),

      setActiveTodo: (id) =>
        set((state) => ({
          ...state,
          activeTodo: id,
        })),
    }),
    {
      name: "todo-store", // unique name for storage
    }
  )
);
