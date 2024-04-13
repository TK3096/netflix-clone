'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { registerSchema } from '@/shcemas/auth'

import { register } from '@/actions/register'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { FloatingInput } from '@/components/ui/FloatingInput'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const loading = isPending || form.formState.isSubmitting

  const handleSubmitForm = (data: zod.infer<typeof registerSchema>) => {
    startTransition(async () => {
      try {
        const res = await register(data)

        // todo: handle error and success state
        if (res?.error) {
          console.log('error: ', res.error)
        }

        if (res?.success) {
          form.reset()

          router.push(DEFAULT_LOGIN_REDIRECT)
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
          className='space-y-10'
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
          <Button
            variant='primary'
            className='w-full'
            type='submit'
            disabled={loading}
          >
            Register
          </Button>
        </form>
      </Form>
    </div>
  )
}
