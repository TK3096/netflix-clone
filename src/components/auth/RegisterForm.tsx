'use client'

import React, { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { registerSchema } from '@/shcemas/auth'

import { register } from '@/actions/register'

import { FloatingInput } from '@/components/ui/FloatingInput'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/ui/FormError'
import { FormSuccess } from '@/components/ui/FormSuccess'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

export const RegisterForm: React.FC = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const loading = isPending || form.formState.isSubmitting

  const handleSubmitForm = (values: z.infer<typeof registerSchema>) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      try {
        const res = await register(values)

        if (res?.error) {
          setError(res.error)
        }

        if (res?.success) {
          setSuccess(res.success)

          setTimeout(() => {
            form.reset()

            router.push('/auth/login')
          }, 1000)
        }
      } catch {
        setError('Something went wrong')
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className='space-y-6'
      >
        <div className='space-y-3'>
          <FormField
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingInput
                    id='name'
                    type='text'
                    label='Name'
                    error={fieldState.error?.message}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingInput
                    id='email'
                    type='email'
                    label='Email'
                    error={fieldState.error?.message}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='password'
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingInput
                    id='password'
                    type='password'
                    label='Password'
                    error={fieldState.error?.message}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-4'>
          <Button
            type='submit'
            variant='primary'
            className='w-full'
            disabled={loading || !form.formState.isDirty}
          >
            Sign Up
          </Button>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </div>
      </form>
    </Form>
  )
}
