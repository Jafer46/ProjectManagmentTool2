import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import ProjectCard from '../components/projectCard'

import TaskListCard from '../components/taskListCard'
import { chartConfig } from '../../constants'
import { chartData } from '../../constants'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import useAuth from '@/store'
import { Calendar } from '@/components/ui/calendar'
import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '@/api/userApi'

function Dashboard () {
  const { token } = useAuth()

  const { data } = useQuery<any, Error>({
    queryKey: ['data'],
    queryFn: () => getDashboard(token)
  })
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-row-3 lg:grid-cols-3 lg:grid-rows-2'>
      <ProjectCard project={data?.projects[0]} />
      <TaskListCard tasks={data?.myTasks} />
      <Calendar
        mode='multiple'
        selected={data?.deadlineList}
        className='blur blur-low rounded-2xl flex justify-center'
      />
      <ProjectCard project={data?.projects[1]} />
      <ChartContainer
        config={chartConfig}
        className='h-[320px] w-full blur blur-low rounded-xl md:col-span-2'
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
          <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default Dashboard
