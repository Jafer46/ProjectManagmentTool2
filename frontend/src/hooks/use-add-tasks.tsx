import { createTask, deleteTask, updateTask } from "@/api/taskApi";
import useAuth from "@/store/store";
import { Task } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function useAddTasks() {
  const [expanded, setExpanded] = React.useState(false);
  const [assignedUsers, setAssignedUsers] = React.useState<number[]>([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const queryClient = useQueryClient();
  const { user, token } = useAuth();

  const taskMutation = useMutation({
    mutationFn: (task: Task) => updateTask(task, token),
    onSuccess: (savedTask: Task) => {
      queryClient.setQueryData(["Tasks"], (oldTasks: Task[]) => {
        // Find the index of the task to update
        const index = oldTasks.findIndex((t) => t.id === savedTask.id);

        // If the task exists, update it; if not, return the old tasks
        if (index > -1) {
          const updatedTasks = [...oldTasks];
          updatedTasks[index] = savedTask; // Update the task
          return updatedTasks;
        }

        return oldTasks; // Return the old tasks if not found
      });
    },
  });

  const createTasks = useMutation({
    mutationFn: (task: Task) => createTask(task, token),
    onSuccess: (savedTask) => {
      queryClient.setQueryData(["Tasks"], (tasks: Task[]) => [
        ...(tasks || []),
        savedTask,
      ]);
    },
  });

  const deleteTasks = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId, token),
    onSuccess: (deletedTask: Task) => {
      queryClient.setQueryData(["Tasks"], (tasks: Task[]) =>
        tasks.filter((task) => task.id !== deletedTask.id)
      );
    },
  });

  return {
    expanded,
    setExpanded,
    assignedUsers,
    setAssignedUsers,
    title,
    setTitle,
    description,
    setDescription,
    user,
    taskMutation,
    createTasks,
    deleteTasks,
    token,
  };
}
