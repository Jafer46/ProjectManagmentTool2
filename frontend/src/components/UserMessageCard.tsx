import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import classNames from 'classnames'

export default function UserMessgeCard ({
  id,
  username,
  avatar,
  user,
  setUser
}: {
  id: string | number
  username: string
  avatar: string
  user: string | number
  setUser: any
}) {
  const handleUserChange = () => {
    setUser(id)
    console.log(id)
  }

  return (
    <Card
      onClick={handleUserChange}
      className={classNames({ 'shadow-orange-400': id == user })}
    >
      <CardHeader className='p-2'>
        <CardTitle className='flex flex-row gap-2 items-center'>
          <Avatar>
            <AvatarImage src={avatar || ''} alt='@shadcn' />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          {username}
        </CardTitle>
        <CardDescription>User Name</CardDescription>
      </CardHeader>
    </Card>
  )
}
