import { User } from "../types/schema";
import AvatarCircle from "./avatarCircle";

export default function UserList({ users }: { users?: User[] | null }) {
  if (!users || users.length < 1) {
    return (
      <div className="h-[26px] w-auto rounded-lg px-3">
        <p>no user selected</p>
      </div>
    );
  }

  const length = users.length < 5 ? users.length : 5;
  return (
    <div className="flex w-[100px] h-[36px] relative">
      {new Array(length).fill(null).map((_, index) => {
        return (
          <div
            key={index}
            className="w-[32px] h-[32px] rounded-full absolute bg-white flex justify-center items-center"
            style={{ left: `${index * 20}px` }}
          >
            <AvatarCircle url={users[index].avatar} />
          </div>
        );
      })}
      {users.length > 5 && (
        <div
          className="w-[32px] h-[32px] rounded-full absolute bg-white flex justify-center items-center"
          style={{ left: `${20 * 5}px` }}
        >
          +{users.length - 5}
        </div>
      )}
    </div>
  );
}
