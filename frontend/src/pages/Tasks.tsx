import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Task } from '@/schema'
import useAuth from '@/store'
import { Button } from '../components/ui/button'
import { getUserTasks, updateTask } from '@/api/taskApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function Tasks () {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  const { data: tasks } = useQuery<Task[], Error>({
    queryKey: ['Tasks'],
    queryFn: () => getUserTasks(token)
  })
  const taskMutation = useMutation({
    mutationFn: (task: Task) => updateTask(task, token),
    onSuccess: savedTask => {
      queryClient.setQueryData(['Tasks'], (oldTasks: Task[]) => {
        // Find the index of the task to update
        const index = oldTasks.findIndex(t => t._id === savedTask._id)

        // If the task exists, update it; if not, return the old tasks
        if (index > -1) {
          const updatedTasks = [...oldTasks]
          updatedTasks[index] = savedTask // Update the task
          return updatedTasks
        }

        return oldTasks // Return the old tasks if not found
      })
    }
  })
  const update = (task: Task) => {
    task.completed = true
    taskMutation.mutate(task)
  }
  return (
    <div className='w-full blur blur-high rounded-lg p-4 '>
      <div className='text-xl font-semibold mb-2'>Table of Tasks</div>
      <Table>
        {(!tasks || tasks.length === 0) && (
          <TableCaption>There are no tasks.</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className='max-w-[50px]'>Title</TableHead>
            <TableHead className='max-w-[50px]'>Description</TableHead>
            <TableHead className='max-w-[50px]'>Status</TableHead>
            <TableHead className='max-w-[50px]'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks &&
            tasks.map((task: Task) => (
              <TableRow key={task._id}>
                <TableCell className='max-w-[50px]'>{task.title}</TableCell>
                <TableCell className='max-w-[50px]'>
                  {task.description}
                </TableCell>
                <TableCell className='max-w-[50px]'>
                  {task.completed ? 'Completed' : 'Pending'}
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
  )
}
