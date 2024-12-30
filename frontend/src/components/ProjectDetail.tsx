import { Project } from "@/schema";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="w-full blur blur-high relative h-full rounded-lg py-4 px-10">
      <div className="text-lg font-semibold mb-2">Project Detail</div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 border-b-2 w-full px-2">
          <label className="font-semibold">Name:</label>
          <div>{project.title}</div>
        </div>
        <div className="flex gap-2 border-b-2 w-full px-2">
          <label className="font-semibold">Priority:</label>
          <div className={`priority priority-${project.priority}`}>
            {project.priority.toUpperCase()}
          </div>
        </div>
        <div className="flex gap-2 border-b-2 w-full px-2">
          <label className="font-semibold">Status:</label>
          <div className={`status status-${project.status}`}>
            {project.status.toUpperCase()}
          </div>
        </div>
        <div className="flex gap-2 border-b-2 w-full px-2">
          <label className="font-semibold">Deadline:</label>
          <div>{project.deadline.toLocaleDateString()}</div>
        </div>
        <div className="flex gap-2 border-b-2 w-full px-2">
          <label className="font-semibold">Description:</label>
          <textarea className="blur blur-low overflow-y-scroll w-full px-2 rounded-md custom-scroll">
            {project.description}
          </textarea>
        </div>
      </div>
    </div>
  );
}
