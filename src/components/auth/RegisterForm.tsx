'use client'

import React from 'react'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { registerSchema } from '@/shcemas/auth'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { FloatingInput } from '@/components/ui/FloatingInput'

export const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const handleSubmitForm = (data: zod.infer<typeof registerSchema>) => {
    console.log(data)
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
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
