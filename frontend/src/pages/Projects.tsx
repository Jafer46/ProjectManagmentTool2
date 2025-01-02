import { getUserProjects } from "@/api/projectApi";
import ProjectCard from "@/components/projectCard";
import { Project } from "@/types/schema";
import useAuth from "@/store/store";
import { useQuery } from "@tanstack/react-query";

export default function Projects() {
  const { token } = useAuth();

  // const { data: projects } = useQuery<Project[], Error>({
  //   queryKey: ['Projects'],
  //   queryFn: () => getUserProjects(token)
  // })

  const projects = [
    {
      id: "1",
      title: "First Project",
      priority: "medium",
      status: "completed",
      deadline: new Date(Date.now()),
      description:
        "The first explain pipe upward pole told rapidly tongue high down plan judge gentle missing start would experiment come mail choose sharp likely deer failed eastproject count ill everyone mainly number well constantly youth larger get name beside cost plane occur block level wise with molecular method opinion individual forgotto be jet particular anything therefore thrown to corn won onto gun purpose spider leaf understanding clear earlier people am wait poem afraid anyone welcome express",
    } as Project,
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
      {projects?.map((project: Project) => (
        <ProjectCard project={project} />
      ))}
    </div>
  );
}
