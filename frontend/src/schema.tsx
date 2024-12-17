import { z } from "zod";

export interface error {
  message: string;
}
export interface User {
  id: string | number;
  username: string;
  email?: string;
  password?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;

  messages?: Message[];
  tasks?: Task[];
  projects?: Project[];
  RefreshToken?: RefreshToken | RefreshToken[];
}

export interface Task {
  id: string | number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;

  projectId?: string | number;
  userId?: string | number;
  project?: Project;
  user?: User;
}

export interface Project {
  id: string | number;
  title: string;
  description?: string;
  priority: "medium" | "high" | "low";
  status: number;
  creatorId?: string | number;
  deadline: Date;

  tasks?: Task[];
  messages?: Message[];
  users?: User[];
}

export interface Message {
  id: string | number;
  content: string;
  userId: string | number;
  projectId: string | number;
  user?: User;
  project?: Project;
}

export interface RefreshToken {
  token: string;
}

export const userSchema = z.object({
  username: z.string().min(2, {
    message: "user must be at least two characters.",
  }),
  email: z.string().email("invalid email address"),
  avatar: z.string().optional(),
  password: z.string().min(8, {
    message: "password must be at least eight characters.",
  }),
  fullName: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(3, {
    message: "title must be at least three laters.",
  }),
  description: z.string().min(3, {
    message: "description must be at least three characters.",
  }),
  deadline: z.date({ message: "deadline is required" }),
  priority: z.string(),
});
