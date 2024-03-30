import { create } from "zustand";
import { v4 } from "uuid";

const initialTask = [
  {
    id: v4(),
    description: "Learn React",
    done: false,
  },
];

export interface Task {
  id: string;
  description: string;
  done: boolean;
}

interface TaskList {
  tasks: Task[];
  addTaskToList: (description: string) => void;
  removeTaskFromList: (id: string) => void;
  setTaskStatus: (id: string) => void;
}

export const useListTasks = create<TaskList>((set) => ({
  tasks: initialTask,
  addTaskToList: (description) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: v4(),
          description,
          done: false,
        },
      ],
    })),
  removeTaskFromList: (id) => set((state) => ({ tasks: state.tasks.filter((item) => item.id !== id) })),
  setTaskStatus: (id) =>
    set((state) => {
      const taskIndex = state.tasks.findIndex((item) => item.id === id);
      const updatedTasks = [...state.tasks];

      updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done;
      return { tasks: updatedTasks };
    }),
}));
