import { useState } from "react";
import Sidebar from "./components/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import TopBar from "./components/topBar";
import { ScrollArea } from "./components/ui/scroll-area";
import useAuth from "./store/store";

export default function Layout() {
  const [expanded, setExpanded] = useState(true);
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="w-full max-h-[100vh] h-[100vh] p-4 flex flex-col gap-[20px] relative md:flex-row">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <div className="w-full flex flex-col gap-2">
        <TopBar setExpanded={setExpanded} />
        <ScrollArea className="max-h-[100vh] relative">
          <Outlet />
        </ScrollArea>
      </div>
    </div>
  );
}
