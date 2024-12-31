import { Task } from "@/types/schema";

export default function TaskListCard({ tasks }: { tasks?: Task[] }) {
  return (
    <div className="h-auto w-auto blur blur-low rounded-2xl p-4 flex flex-col gap-1">
      <div className="flex">
        <p className="font-semibold text-lg">My Tasks</p>
        <p className="text-slate-400">(05)</p>
      </div>

      {tasks?.map((task, index) => (
        <>
          <div key={index} className="flex items-center gap-2 border-b-2">
            <p>0{index}</p>
            <p>{task.title}</p>
            <div
              className={`ml-auto h-[22px] w-[22px] rounded-[50%] ${
                task.completed ? "bg-green-500" : "bg-inherit"
              }`}
            >
              {task.completed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22px"
                  viewBox="0 -960 960 960"
                  width="22px"
                  fill="#fff"
                >
                  <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
