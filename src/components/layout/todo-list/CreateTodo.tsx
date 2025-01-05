"use client";

// Hooks / Packages
import { useTodoStore } from "@/store/todo-store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as uuid from "uuid";

// Components
import {
  //   Popover,
  PopoverContent,
  PopoverTrigger,
  usePopover,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Icons
import { PlusCircle } from "lucide-react";

export default function CreateTodo() {
  const { close } = usePopover();
  const { addTodo } = useTodoStore();

  const createTodoFormSchema = z.object({
    title: z
      .string()
      .min(2, { message: "Title must be between 2 and 50 characters" })
      .max(50, { message: "Title must be between 2 and 50 characters" }),
    description: z.string(),
  });

  type createTodoFormType = z.infer<typeof createTodoFormSchema>;

  // 1. Define your form.
  const createTodoForm = useForm<createTodoFormType>({
    resolver: zodResolver(createTodoFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // 2. Define submit and reset handler.
  function onSubmit(values: createTodoFormType) {
    addTodo({ id: uuid.v4(), ...values, status: "TODO" });
    // Clear the form
    handleReset();
  }
  function handleReset() {
    // Clear the form
    createTodoForm.reset();

    // Close the Popover
    close();
  }

  return (
    <>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <PlusCircle className="h-5 w-5" />
          New Todo
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...createTodoForm}>
          <form
            onSubmit={createTodoForm.handleSubmit(onSubmit)}
            onReset={handleReset}
            className="space-y-3"
          >
            <FormField
              control={createTodoForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createTodoForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-4">
              <Button type="submit">Submit</Button>
              <Button type="reset" variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </>
  );
}
