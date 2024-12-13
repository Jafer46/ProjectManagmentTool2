import { userMessage } from '@/constants/fakedata'
import UserMessgeCard from './UserMessageCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'

export default function UserMessageList () {
  const [selectedId, setSelected] = useState<string | number>(1)
  return (
    <form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0'>
      <fieldset className='grid gap-4 rounded-lg border p-4'>
        <legend className='-ml-1 px-1 text-sm font-medium'>Users</legend>
        <ScrollArea className='h-[70vh]'>
          <div className='flex flex-col gap-4'>
            {userMessage.map((user, index) => (
              <UserMessgeCard
                id={index}
                user={selectedId}
                username={user.username}
                avatar={user.avatar}
                setUser={setSelected}
              />
            ))}
          </div>
        </ScrollArea>
      </fieldset>
    </form>
  )
}
