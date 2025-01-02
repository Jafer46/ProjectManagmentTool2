import { Task } from "@/types/schema";
import useAuth from "@/store/store";
import { getUserTasks, updateTask } from "@/api/taskApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TasksTable from "@/components/tasksTable";

export default function Tasks() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery<Task[], Error>({
    queryKey: ["Tasks"],
    queryFn: () => getUserTasks(token),
  });

  const taskMutation = useMutation({
    mutationFn: (task: Task) => updateTask(task, token),
    onSuccess: (savedTask) => {
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

  const update = (task: Task) => {
    task.completed = true;
    taskMutation.mutate(task);
  };

  return <TasksTable tasks={tasks} update={update} />;
}
