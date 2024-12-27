import MessageBoard from "@/components/messageBoard";
import ProjectDetail from "@/components/ProjectDetail";
import { Project } from "@/schema";

const project: Project = {
  id: "1",
  title: "First Project",
  priority: "medium",
  status: "completed",
  deadline: new Date(Date.now()),
  description:
    "The first explain pipe upward pole told rapidly tongue high down plan judge gentle missing start would experiment come mail choose sharp likely deer failed eastproject count ill everyone mainly number well constantly youth larger get name beside cost plane occur block level wise with molecular method opinion individual forgotto be jet particular anything therefore thrown to corn won onto gun purpose spider leaf understanding clear earlier people am wait poem afraid anyone welcome express",
};

export default function ProjectPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
      <div className="lg:col-span-2">
        <ProjectDetail project={project} />
      </div>
      <div className="lg:col-span-1">
        <MessageBoard />
      </div>
    </div>
  );
}
