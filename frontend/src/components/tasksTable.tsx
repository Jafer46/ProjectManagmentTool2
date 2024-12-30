import { Task } from "@/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

interface TaskTableProps {
  tasks: Task[] | undefined;
  update: (task: Task) => void;
}

export default function TasksTable({ tasks, update }: TaskTableProps) {
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
                  {!task.completed && (
                    <Button onClick={() => update(task)}>Set Completed</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
