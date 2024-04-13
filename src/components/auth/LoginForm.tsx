'use client'

import React, { useTransition } from 'react'
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

export const LoginForm = () => {
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmitForm = (data: zod.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        const calbackUrl = searchParams.get('callbackUrl') || undefined
        const res = await login(data, calbackUrl)
        // todo: handle error and success state
        if (res?.error) {
          console.log('error: ', res.error)
        }
      } catch (err) {
        console.log('err: ', err)
      }
    })
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className='space-y-4'
        >
          <div className='space-y-2'>
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant='primary' className='w-full' type='submit'>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
