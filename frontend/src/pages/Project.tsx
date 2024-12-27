import MessageBoard from "@/components/messageBoard";
import ProjectDetail from "@/components/ProjectDetail";
import { Project } from "@/schema";

const project: Project = {
  id: "1",
  title: "First Project",
  priority: "medium",
  status: 0,
  deadline: new Date(Date.now()),
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
