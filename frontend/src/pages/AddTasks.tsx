import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Task, User } from "../types/schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createTask,
  deleteTask,
  getPorjectTasks,
  updateTask,
} from "@/api/taskApi";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserList from "@/components/userList";

export default function AddTasks() {
  const [expanded, setExpanded] = useState(false);
  const [assignedUsers, setAssignedUsers] = useState<number[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { state } = useLocation();
  const { toast } = useToast();
  const { user, token } = useAuth();
  const { project, users } = state;
  const queryClient = useQueryClient();

  const close = () => {
    setExpanded(false);
    setTitle("");
    setDescription("");
  };
  const create = () => {
    if (
      !title ||
      !description ||
      !assignedUsers ||
      assignedUsers.length === 0
    ) {
      toast({
        variant: "destructive",
        title: "Invalid field",
        description: "Mandatory field is not completed",
      });
      return;
    }
    createTasks.mutate({
      title,
      description,
      projectId: project.id,
      createdBy: user.id,
      assignedUsersId: assignedUsers,
      id: 0,
      completed: false,
    });
    close();
  };
  const taskDelete = (taskId: string) => {
    deleteTasks.mutate(taskId);
  };

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

  const { data: tasks } = useQuery<Task[], Error>({
    queryKey: ["Tasks"],
    queryFn: () => getPorjectTasks(project.id, token),
  });
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
  const update = (task: Task) => {
    task.completed = true;
    taskMutation.mutate(task);
  };
  return (
    <div className="w-full blur blur-high rounded-lg p-4 ">
      <div className="text-xl font-semibold mb-2">Table of Tasks</div>
      <Table>
        {(!tasks || tasks.length === 0) && (
          <TableCaption>There are no tasks.</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[50px]">Title</TableHead>
            <TableHead className="max-w-[50px]">Description</TableHead>
            <TableHead className="max-w-[50px]">Status</TableHead>
            <TableHead className="max-w-[50px]">Assigned Uses</TableHead>
            <TableHead className="max-w-[50px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks &&
            tasks.map((task: Task) => (
              <TableRow key={task.id}>
                <TableCell className="max-w-[50px]">{task.title}</TableCell>
                <TableCell className="max-w-[50px]">
                  {task.description}
                </TableCell>
                <TableCell className="max-w-[50px]">
                  {task.completed ? "Completed" : "Pending"}
                </TableCell>
                <TableCell>
                  <UserList
                    users={users.filter((user: User) =>
                      task.assignedUsersId?.includes(user.id)
                    )}
                  />
                </TableCell>
                <TableCell>
                  {!task.completed &&
                    task.assignedUsersId?.includes(user.id) && (
                      <Button onClick={() => update(task)}>Completed</Button>
                    )}
                  {(project.creatorId === user.id ||
                    project.creatorId.id === user.id) && (
                    <Button onClick={() => taskDelete(task.id.toString())}>
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        {expanded && (
          <TableFooter>
            <TableRow>
              <TableCell>
                <Input
                  width="50px"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  width="50px"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    setAssignedUsers((values) => [
                      ...(values || []),
                      Number(value),
                    ])
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Users</SelectLabel>
                      {users &&
                        users.map((user: any) => (
                          <SelectItem value={user.id}>
                            {user.username}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="flex flex-wrap gap-2 p-0 m-0">
                <Button variant="default" onClick={() => create()}>
                  save
                </Button>
                <Button variant="destructive" onClick={() => close()}>
                  X
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
      {!expanded &&
        (user.id === project.creatorId || user.id === project.creatorId.id) && (
          <div className="flex justify-center">
            <button
              className="text-xl font-semibold bg-white h-[34px] w-[34px] rounded-full border border-gray-300"
              onClick={() => setExpanded(!expanded)}
            >
              +
            </button>
          </div>
        )}
    </div>
  );
}
