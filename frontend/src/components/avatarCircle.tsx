import userIcon from '../assets/user.png'

export default function AvatarCircle ({ url }: { url?: string }) {
  if (!url || url === '') {
    return (
      <div className='bg-slate-300 rounded-[50%] h-[28px] w-[28px] flex justify-center items-center'>
        <img src={userIcon} alt='icon' height='24px' width='24px' />
      </div>
    )
  }

  return (
    <div className='h-[30px] w-[30px] overflow-hidden rounded-full'>
      <img src={url} alt='icon' className='h-full w-full object-cover' />
    </div>
  )
}
