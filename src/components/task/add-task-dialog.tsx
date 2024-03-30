import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";

import { useListTasks } from "@/hooks/useTaskList";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const createTaskFormSchema = z.object({
  task: z.string().min(2, { message: "Minimum 2 characters." }),
});

type CreateTaskFormData = z.infer<typeof createTaskFormSchema>;

export function AddTaskDialog() {
  const [openDialog, setDialogOpen] = useState(false);
  const [addTask] = useListTasks((state) => [state.addTaskToList]);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskFormSchema),
  });

  useEffect(() => {
    reset({ task: "" });
    clearErrors();
  }, [openDialog]);

  function handleCreateNewTask({ task }: CreateTaskFormData) {
    addTask(task);

    reset({ task: "" });
    setDialogOpen(false);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Plus className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateNewTask)} className="flex flex-col gap-6 mt-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="task" className="text-sm font-medium leading-none">
              Task name
            </label>
            <Input id="task" autoComplete="off" {...register("task")} />

            {errors.task?.message && <span className="text-sm text-destructive font-semibold">{errors.task.message}</span>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
