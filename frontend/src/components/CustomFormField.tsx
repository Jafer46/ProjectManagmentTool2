import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Control } from 'react-hook-form'
import { FormFieldType } from '../../constants'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button } from './ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './ui/select'

interface CustomProps {
  control: Control<any>
  fieldType: FormFieldType
  name: string
  label?: string
  placeHolder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  value?: any
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeHolder } = props
  const [showPassword, setShowPassword] = React.useState(false)

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-400 bg-white'>
          {iconSrc && (
            <img
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeHolder}
              {...field}
              className='shad-input border-0'
            />
          </FormControl>
        </div>
      )
      break
    case FormFieldType.DATE_PICKER:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !field.value && 'text-muted-foreground'
                )}
              >
                {field.value ? (
                  format(field.value, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={field.value}
              onSelect={field.onChange}
              disabled={date => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )
      break
    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Priorities</SelectLabel>
              <SelectItem value='high'>high</SelectItem>
              <SelectItem value='medium'>medium</SelectItem>
              <SelectItem value='low'>Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )
      break
    case FormFieldType.PASSWORD:
      return (
        <div className='relative'>
          <FormControl>
            <Input
              type={showPassword ? 'text' : 'password'} // Change input type based on state
              className='hide-password-toggle pr-10'
              placeholder='ex 1234.....'
              {...field}
            />
          </FormControl>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? (
              <EyeIcon className='h-4 w-4' aria-hidden='true' />
            ) : (
              <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
            )}
            <span className='sr-only'>
              {showPassword ? 'Hide password' : 'Show password'}
            </span>
          </Button>

          {/* Hides browser's password toggles */}
          <style>{`
    .hide-password-toggle::-ms-reveal,
    .hide-password-toggle::-ms-clear {
      visibility: hidden;
      pointer-events: none;
      display: none;
    }
  `}</style>
        </div>
      )
      break
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='ET'
            placeholder={placeHolder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className='input-phone'
          />
        </FormControl>
      )
      break
    default:
      break
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className='text-lg'>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
