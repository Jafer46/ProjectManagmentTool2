import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import { Create } from "./pages/Create";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import AddTasks from "./pages/AddTasks";
import Messaging from "./pages/Messaging";
import CalenderPage from "./pages/Calender";
import ProjectPage from "./pages/Project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "projects", element: <Projects /> },
      { path: "add", element: <AddTasks /> },
      { path: "tasks", element: <Tasks /> },
      { path: "calendar", element: <CalenderPage /> },
      { path: "create", element: <Create /> },
      { path: "settings", element: <Settings /> },
      { path: "message", element: <Messaging /> },
      { path: "project", element: <ProjectPage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
