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
import { getProjectTasks } from "@/api/taskApi";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import UserList from "@/components/userList";
import useAddTasks from "@/hooks/use-add-tasks";

export default function AddTasks() {
  const {
    title,
    description,
    assignedUsers,
    setTitle,
    setAssignedUsers,
    setDescription,
    setExpanded,
    expanded,
    user,
    taskMutation,
    createTasks,
    deleteTasks,
    token,
  } = useAddTasks();
  const { state } = useLocation();
  const { project, users } = state;
  const { toast } = useToast();

  const close = () => {
    setExpanded(false);
    setTitle("");
    setDescription("");
  };

  const taskCreate = () => {
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

  const { data: tasks } = useQuery<Task[], Error>({
    queryKey: ["Tasks"],
    queryFn: () => getProjectTasks(project.id, token),
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
                <Button variant="default" onClick={taskCreate}>
                  save
                </Button>
                <Button variant="destructive" onClick={close}>
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
