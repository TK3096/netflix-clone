'use client'

import React, { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import { loginSchema } from '@/shcemas/auth'

import { login } from '@/actions/login'

import { FloatingInput } from '@/components/ui/FloatingInput'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/ui/FormError'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState('')

  const callbackUrl = searchParams.get('callbackUrl') || undefined

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loading = isPending || form.formState.isSubmitting

  const handleSubmitForm = (values: z.infer<typeof loginSchema>) => {
    setError('')

    startTransition(async () => {
      try {
        const res = await login(values, callbackUrl)

        if (res?.error) {
          setError(res.error)
        }

        if (res?.success) {
          form.reset()
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
            Sign In
          </Button>
          {error && <FormError message={error} />}
        </div>
      </form>
    </Form>
  )
}
