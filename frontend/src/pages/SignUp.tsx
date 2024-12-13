import { Form } from '../components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CustomFormField from '../components/CustomFormField'
import { z } from 'zod'
import { FormFieldType } from '../../constants'
import SubmitButton from '../components/SubmitButton'
import { useState } from 'react'
import { signup } from '@/api/userApi'
import { useToast } from '@/components/ui/use-toast'
import useAuth from '@/store'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'user must be at least two characters.'
  }),
  email: z.string().email('invalid email address'),
  password: z.string()
})

export default function SignUp () {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { login } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async ({
    username,
    email,
    password
  }: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const { user, accessToken } = await signup({ username, email, password })
      setLoading(false)
      login(user, accessToken)
      navigate('/')
    } catch (err: any) {
      setLoading(false)
      toast({
        variant: 'destructive',
        title: err.message ?? 'unexpected error',
        description: 'Something went wrong!'
      })
    }
  }
  return (
    <div className='h-[100vh] w-full flex justify-center items-center'>
      <div className='w-full h-auto rounded-xl blur blur-low p-4 md:w-1/3'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 mb-3 space-y-2'
          >
            <section className='mb-12 space-y-1'>
              <h1 className='text-xl font-bold'>Hi there 👋</h1>
              <p className='text-dark-700'>
                Add your data to the following form for sign up
              </p>
            </section>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='username'
              label='User name'
              placeHolder='ex. Jafer Hussein'
              iconSrc=''
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              label='Email'
              placeHolder='ex. 123@gamil.com'
              iconSrc=''
            />
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name='password'
              label='Password'
              placeHolder='ex ....'
              iconSrc=''
            />
            <SubmitButton isLoading={loading}>Sign up</SubmitButton>
          </form>
        </Form>
        <div className='flex items-center justify-center'>
          <Button variant='link' onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
