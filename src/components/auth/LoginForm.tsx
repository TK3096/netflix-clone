'use client'

import React, { useState, useTransition } from 'react'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import { login } from '@/actions/login'

import { loginSchema } from '@/shcemas/auth'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { FloatingInput } from '@/components/ui/FloatingInput'
import { FormError } from '@/components/ui/FormError'

export const LoginForm = () => {
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const calbackUrl = searchParams.get('callbackUrl') || undefined

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loading = isPending || form.formState.isSubmitting

  const handleSubmitForm = (data: zod.infer<typeof loginSchema>) => {
    setError('')

    startTransition(async () => {
      try {
        const res = await login(data, calbackUrl)
        if (res?.error) {
          setError(res.error)
        }
      } catch (err) {
        setError('Something went wrong')
      }
    })
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className='space-y-10'
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
            {error && <FormError message={error} />}
            <Button
              variant='primary'
              className='w-full'
              type='submit'
              disabled={loading}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
