import { Link, useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../constants'
import logoutImg from '../assets/logout.png'
import mainIcon from '../assets/mainicon.png'
import classnames from 'classnames'
import useAuth from '@/store'

export default function Sidebar ({ expanded, setExpanded }: any) {
  const location = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleExpanded = () => {
    if (window.innerWidth < 768) {
      setExpanded(false)
    }
  }
  return (
    <section
      className={classnames(
        'transition-all duration-300 ease-in-out rounded-lg',
        {
          'blur blur-low md:w-[226px] h-full opacity-100': expanded,
          'h-0 opacity-0 md:opacity-100 md:h-full md:w-[44px] overflow-hidden':
            !expanded
        }
      )}
    >
      <nav className='flex flex-col md:h-full'>
        <div
          className={classnames({
            'flex justify-center': true,
            'my-5': expanded,
            'flex justify-center items-center mb-6 mt-9': !expanded
          })}
        >
          <img src={mainIcon} alt='main' />
        </div>
        {routes.map((route, index) => {
          const isActive = route.path === location.pathname
          return (
            <div
              key={index}
              className={classnames({
                'flex gap-2 py-3': true,
                'pl-4': expanded,
                'justify-center items-center': !expanded,
                'border-r-4 border-[#d9b906] bg-gradient-to-r from-[#cdcdc869] to-[#f8df4e73]':
                  isActive,
                'hover:border-[#d9b906] hover:border-r-4': !isActive
              })}
            >
              <Link
                to={route.path}
                className={classnames({
                  'font-semibold text-lg pr-1 flex gap-2': true,
                  'text-[#d9b906]': isActive,
                  'hover:text-[#d9b906]': !isActive
                })}
              >
                <img
                  src={route.image}
                  alt={route.name}
                  className={classnames({
                    'w-[24px] h-[24px]': true,
                    'filter-gold': isActive
                  })}
                />
                <span
                  className={classnames({ hidden: !expanded })}
                  onClick={() => handleExpanded()}
                >
                  {route.name}
                </span>
              </Link>
            </div>
          )
        })}
        <div
          className='flex gap-2 mt-auto p-4'
          onClick={() => {
            logout()
            navigate('/login')
          }}
        >
          <img src={logoutImg} alt='logout' className='w-[24px] h-[24px]' />
          <p className='font-semibold'>Logout</p>
        </div>
      </nav>
    </section>
  )
}
