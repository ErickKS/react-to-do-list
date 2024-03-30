import { useListTasks } from "@/hooks/useTaskList";

import { AddTaskDialog } from "@/components/task/add-task-dialog";
import { TaskItem } from "@/components/task/task-item";

export function App() {
  const [tasks] = useListTasks((state) => [state.tasks]);

  return (
    <>
      <main className="flex justify-center items-center h-screen w-full p-4">
        <div className="flex flex-col gap-4 min-h-[480px] max-w-[440px] bg-black/50 w-full p-4 border rounded-lg backdrop-blur-md">
          <header className="flex justify-between items-center">
            <h1 className="text-2xl font-medium leading-tight">Tasks</h1>

            <AddTaskDialog />
          </header>

          <div className="w-full h-px bg-muted" />

          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      </main>

      <div className="absolute -z-10 inset-0 bg-layer bg-cover bg-no-repeat bg-center" />
    </>
  );
}
