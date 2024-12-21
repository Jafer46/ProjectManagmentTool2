import useAuth from "@/store";
import notificationIcon from "../assets/notification.png";
import AvatarCircle from "./avatarCircle";
import { useEffect } from "react";
import menuIcon from "../assets/menu.png";
export default function TopBar({ setExpanded }: any) {
  const { user } = useAuth();

  useEffect(() => {}, [user]);
  return (
    <div className="w-full flex rounded-xl gap-2 blur blur-high p-2 items-center">
      <img
        src={menuIcon}
        height="32px"
        width="32px"
        alt="menu"
        onClick={() => setExpanded((prev: boolean) => !prev)}
        className="hover:bg-slate-400 rounded-md cursor-pointer transition"
      />
      <img
        src={notificationIcon}
        alt="notification"
        className="w-[20px] h-[20px] ml-auto"
      />
      <AvatarCircle url={user?.avatar} username={user?.username} />
    </div>
  );
}
