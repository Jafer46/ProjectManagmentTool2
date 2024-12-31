import MessageBoard from "@/components/messageBoard";
import ProjectDetail from "@/components/ProjectDetail";
import TasksTable from "@/components/tasksTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Project, Task } from "@/types/schema";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

const project: Project = {
  id: "1",
  title: "First Project",
  priority: "medium",
  status: "completed",
  deadline: new Date(Date.now()),
  description:
    "The first explain pipe upward pole told rapidly tongue high down plan judge gentle missing start would experiment come mail choose sharp likely deer failed eastproject count ill everyone mainly number well constantly youth larger get name beside cost plane occur block level wise with molecular method opinion individual forgotto be jet particular anything therefore thrown to corn won onto gun purpose spider leaf understanding clear earlier people am wait poem afraid anyone welcome express",
  tasks: [],
};

type TabsValue = "project" | "tasks" | "messages";

export default function ProjectPage() {
  const isMobile = useIsMobile();
  const [value, setValue] = React.useState("project");

  //updates the tasks status
  function update(value: Task) {
    console.log(value);
    //todo: implemtation for the update
  }

  //tracks currently opened tab
  function changing(value: string): void {
    setValue(value as TabsValue);
  }

  if (!isMobile && value === "messages") {
    setValue("project");
  }

  //if the screen size is < 780px
  //renders three tabs
  if (isMobile) {
    return (
      <Tabs value={value} className="w-full px-4 " onValueChange={changing}>
        <TabsList className="grid w-full grid-cols-3 mb-2 blur blur-low">
          <TabsTrigger value="project">Project Detail</TabsTrigger>
          <TabsTrigger value="tasks">Poject Tasks</TabsTrigger>
          <TabsTrigger value="messages">Poject Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="project">
          <div className="h-[80vh] max-h-[80vh]">
            <ProjectDetail project={project} />
          </div>
        </TabsContent>
        <TabsContent value="tasks">
          <div className="h-[80vh] max-h-[80vh]">
            <TasksTable tasks={project.tasks} update={update} />
          </div>
        </TabsContent>
        <TabsContent value="messages">
          <div className="h-[80vh] max-h-[80vh]">
            <MessageBoard />
          </div>
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <Tabs className="w-full px-4 " value={value} onValueChange={changing}>
      <TabsList className="grid w-full grid-cols-2 mb-2 blur blur-low">
        <TabsTrigger value="project">Project Detail</TabsTrigger>
        <TabsTrigger value="tasks">Poject Tasks</TabsTrigger>
      </TabsList>
      <TabsContent value="project">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 h-[80vh] max-h-[80vh]">
          <div className="lg:col-span-2">
            <ProjectDetail project={project} />
          </div>
          <div className="lg:col-span-1">
            <MessageBoard />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="tasks">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 h-[80vh] max-h-[80vh]">
          <div className="lg:col-span-2">
            <TasksTable tasks={project.tasks} update={update} />
          </div>
          <div className="lg:col-span-1">
            <MessageBoard />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
