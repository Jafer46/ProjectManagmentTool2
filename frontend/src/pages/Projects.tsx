import { getUserProjects } from "@/api/projectApi";
import ProjectCard from "@/components/projectCard";
import { Project } from "@/types/schema";
import useAuth from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Projects() {
  const { token, user } = useAuth();

  const { data: projects } = useQuery<Project[], Error>({
    queryKey: ["Projects"],
    queryFn: () => getUserProjects(token),
  });

  // const projects = [
  //   {
  //     id: "1",
  //     title: "First Project",
  //     priority: "medium",
  //     status: "completed",
  //     deadline: new Date(Date.now()),
  //     description:
  //       "The first explain pipe upward pole told rapidly tongue high down plan judge gentle missing start would experiment come mail choose sharp likely deer failed eastproject count ill everyone mainly number well constantly youth larger get name beside cost plane occur block level wise with molecular method opinion individual forgotto be jet particular anything therefore thrown to corn won onto gun purpose spider leaf understanding clear earlier people am wait poem afraid anyone welcome express",
  //   } as Project,
  // ];

  return (
    <Tabs className="w-full px-4 " defaultValue="projects">
      <TabsList className="grid w-full grid-cols-3 mb-2 blur blur-low">
        <TabsTrigger value="projects">All Projects</TabsTrigger>
        <TabsTrigger value="myProjects">My project</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
          {projects?.map((project: Project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="myProjects">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
          {projects
            ?.filter((p) => p.creatorId == user.id)
            ?.map((project: Project) => (
              <ProjectCard project={project} />
            ))}
        </div>
      </TabsContent>
      <TabsContent value="completed">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
          {projects
            ?.filter((p) => p.status === "completed")
            ?.map((project: Project) => (
              <ProjectCard project={project} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
