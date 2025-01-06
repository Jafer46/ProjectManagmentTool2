import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AvatarCircle({
  url,
  username,
}: {
  url?: string;
  username?: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={url} />
      <AvatarFallback>
        {username?.charAt(0).toString().toUpperCase() ?? "CN"}
      </AvatarFallback>
    </Avatar>
  );
}
