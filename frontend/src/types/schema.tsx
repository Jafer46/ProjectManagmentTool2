import { z } from "zod";

export interface error {
  message: string;
}
export interface User {
  id: number;
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
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;

  createdBy: number;
  projectId?: number;
  userId?: number;
  project?: Project;
  user?: User;
  assignedUsers?: User[];
  assignedUsersId?: number[];
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  priority: "medium" | "high" | "low";
  status: "ongoing" | "pending" | "overdue" | "completed";
  creatorId?: string;
  deadline: Date;
  type: "group" | "personal";
  completedAt?: Date;

  tasksCount?: number;
  completedTasksCount?: number;
  tasks?: Task[];
  messages?: Message[];
  users?: User[];
  creator?: User[];
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
