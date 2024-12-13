import { Progress } from '@/components/ui/progress'
import AvatarCircle from './avatarCircle'
import UserList from './userList'
import { Project } from '@/schema'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

export default function ProjectCard ({ project }: { project?: Project }) {
  const navigate = useNavigate()
  if (!project) {
    return (
      <div className='w-auto blur blur-high rounded-2xl p-4 flex flex-col gap-2'>
        <div className='flex gap-2'>
          <p className='font-semibold'></p>
        </div>
        <div className='flex justify-between'>
          <div className='progress'> </div>
          <div className='priority'></div>
        </div>
        <div>
          <p>No project</p>
        </div>
        <div className='h-2'></div>
        <div className='flex'>
          <p className='progress'></p>
        </div>
      </div>
    )
  }
  let status = ''
  if (project.status === 0) {
    status = 'Not start'
  }
  if (project.status === 1) {
    status = 'In progress'
  }
  if (project.status === 2) {
    status = 'Finished'
  }
  return (
    <div
      className='w-auto blur blur-high rounded-2xl p-4 flex flex-col gap-4'
      onClick={() =>
        navigate('/add', { state: { project, users: project.userList } })
      }
    >
      <div className='flex gap-2'>
        <AvatarCircle url={project.creatorId?.avatar} />
        <p className='font-semibold'>By:{project.creatorId.username}</p>
      </div>
      <div className='flex justify-between'>
        <div className={`progress progress-${project.status}`}>{status}</div>
        <div className={`priority priority-${project.priority}`}>
          {project.priority.toUpperCase()}
        </div>
      </div>
      <div>
        <p>{`Task Completed: ${project.finishedTasks}/${project.numberOfTasks}`}</p>
      </div>
      <div>
        <Progress
          value={project.finishedTasks / project.numberOfTasks}
          className='h-2'
        />
      </div>
      <UserList users={project.userList} />
      <div className='flex'>
        <p className='progress progress-0'>
          Deadline: {moment(project.deadline).format('MMMM Do YYYY')}
        </p>
      </div>
    </div>
  )
}
