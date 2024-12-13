import { createProject } from '@/api/projectApi'
import SubmitButton from '@/components/SubmitButton'
import { projectSchema } from '@/schema'
import useAuth from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormFieldType } from '../../constants'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CustomFormField from '@/components/CustomFormField'
import { useToast } from '@/components/ui/use-toast'
import UserSelection from '@/components/userSelection'
import { useNavigate } from 'react-router-dom'
import { Form, FormLabel } from '@/components/ui/form'

export const Create = () => {
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelected] = useState<any[]>([])
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      deadline: new Date(),
      priority: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    if (!selectedUsers || selectedUsers.length === 0) {
      toast({
        title: 'no selected user',
        description: 'user(s) must selected',
        variant: 'destructive'
      })
      return
    }
    setLoading(true)
    let userList: string[] = []
    selectedUsers.forEach(user => {
      userList.push(user._id)
    })
    try {
      const data = await createProject({ ...values, userList }, token)
      setLoading(false)
      navigate('/add', { state: { project: data, users: selectedUsers } })
    } catch (err) {
      setLoading(false)
    }
  }
  return (
    <div className='h-full w-full blur blur-low p-4 rounded-lg'>
      <Form {...form}>
        <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='text-xl font-semibold'>Create New Project</div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex flex-col gap-2'>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='title'
                label='Title'
                placeHolder='ex. New Project'
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='description'
                label='Description'
                placeHolder='ex. This is a new project'
              />
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name='date'
                label='Deadline'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='priority'
                label='Select Priority'
                placeHolder='select priority'
              />
              <FormLabel className='text-lg font-semibold'>
                Select Users
              </FormLabel>
              <UserSelection
                users={users}
                setUsers={setUsers}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelected}
              />
            </div>
          </div>
          <SubmitButton isLoading={loading}>create</SubmitButton>
        </form>
      </Form>
    </div>
  )
}
