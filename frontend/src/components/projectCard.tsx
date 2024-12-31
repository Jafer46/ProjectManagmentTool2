import { Progress } from "@/components/ui/progress";
import AvatarCircle from "./avatarCircle";
import UserList from "./userList";
import { Project } from "@/types/schema";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }: { project?: Project }) {
  const navigate = useNavigate();
  if (!project) {
    return (
      <div className="w-auto blur blur-high rounded-2xl p-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <p className="font-semibold"></p>
        </div>
        <div className="flex justify-between">
          <div className="progress"> </div>
          <div className="priority"></div>
        </div>
        <div>
          <p>No project</p>
        </div>
        <div className="h-2"></div>
        <div className="flex">
          <p className="progress"></p>
        </div>
      </div>
    );
  }
  let status = project.status;

  const admin = project.users?.find((user) => user.id == project.creatorId);
  const finishedTasks =
    project.tasks?.filter((task) => task.completed)?.length ?? 0;
  const numberOfTasks = project.tasks?.length ?? 0;
  return (
    <div
      className="w-auto blur blur-high rounded-2xl p-4 flex flex-col gap-4"
      onClick={() =>
        navigate("/add", { state: { project, users: project.users } })
      }
    >
      <div className="flex gap-2">
        <AvatarCircle url={admin?.avatar} />
        <p className="font-semibold">By:{admin?.username}</p>
      </div>
      <div className="flex justify-between">
        <div className={`status status-${project.status}`}>{status}</div>
        <div className={`priority priority-${project.priority}`}>
          {project.priority.toUpperCase()}
        </div>
      </div>
      <div>
        <p>{`Task Completed: ${finishedTasks}/${numberOfTasks}`}</p>
      </div>
      <div>
        <Progress value={finishedTasks / numberOfTasks} className="h-2" />
      </div>
      <UserList users={project.users} />
      <div className="flex">
        <p className="progress progress-0">
          Deadline: {moment(project.deadline).format("MMMM Do YYYY")}
        </p>
      </div>
    </div>
  );
}
