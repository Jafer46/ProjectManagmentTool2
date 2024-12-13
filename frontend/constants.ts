import dashbordIcon from './src/assets/dashboard.png'
import projectIcon from './src/assets/project.png'
import taskIcon from './src/assets/task.png'
import createIcon from './src/assets/create.png'
import settingsIcon from './src/assets/setting.png'
import { type ChartConfig } from "@/components/ui/chart"
import user1 from './src/assets/user1.jpg'
import user2 from './src/assets/user2.jfif'
import user3 from './src/assets/user3.jpg'
import user4 from './src/assets/user4.jpg'
import user5 from './src/assets/uesr5.jpg'


export const tasks = [
  {
    completed: false,
    title: 'Do this'
  },
  {
    completed: false,
    title: 'Do that'
  },
  {
    completed: true,
    title: 'Do whatever'
  },
  {
    completed: false,
    title: 'Do this'
  },
  {
    completed: false,
    title: 'Do that'
  },
  {
    completed: true,
    title: 'Do whatever'
  }
]

export const routes = [
  { path: '/', name: 'Dashboard', image: dashbordIcon },
  { path: '/projects', name: 'Projects', image: projectIcon },
  { path: '/tasks', name: 'My Task', image: taskIcon },
  { path: '/create', name: 'Create', image: createIcon },
  { path: '/settings', name: 'Settings', image: settingsIcon },
]

export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 0, mobile: 2 },
]


 
export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig


export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
    PASSWORD = 'password'
}


export const usersData = [
  {
    username: 'hi',
    avatar: user1,
  },
  {
    username: 'w0w',
    avatar: user2,
  },
  {
    username: 'viv',
    avatar: user3,
  },
  {
    username: 'window',
    avatar: user4,
  },
  {
    username: 'amanda',
    avatar: user5,
  },
]