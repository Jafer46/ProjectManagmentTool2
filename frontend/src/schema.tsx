import { z } from 'zod'

export interface error {
  message: string
}
export interface User {
  fullName?: string
  username: string
  email?: string
  avatar?: string
  _id: string
}

export interface Task {
  title: string
  description: string
  partOf: string
  createdBy: string
  assignedUsers: string[]
  completed?: boolean
  _id: string
}

export interface Project {
  creatorId: User
  priority: string
  deadline: Date
  status: number
  userList: User[]
  numberOfTasks: number
  finishedTasks: number
}

export const userSchema = z.object({
  username: z.string().min(2, {
    message: 'user must be at least two characters.'
  }),
  email: z.string().email('invalid email address'),
  avatar: z.string().optional(),
  password: z.string().min(8, {
    message: 'password must be at least eight characters.'
  }),
  fullName: z.string().optional()
})

export const projectSchema = z.object({
  title: z.string().min(3, {
    message: 'title must be at least three laters.'
  }),
  description: z.string().min(3, {
    message: 'description must be at least three characters.'
  }),
  deadline: z.date({ message: 'deadline is required' }),
  priority: z.string()
})
