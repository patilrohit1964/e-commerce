'use client'
import { Card, CardContent } from '@/components/ui/card'
import { zSchmea } from '@/lib/zodSchema'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const page = () => {
  const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
    email: true,
    password: true
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLoginSubmit = async (values) => {

  }
  return (
    <div>
      <Card className={'w-[450px]'}>
        <CardContent>
          <div className='flex justify-center'>
            <Image src={''} width={'path.width'} height={'path.height'} alt='logo' className='max-w-[150px]' />
          </div>
          <div className='text-center'>
            <h1></h1>
            <p></p>
          </div>
        </CardContent>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
              <div>
                <FormField control={form.control} name='email' render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type={'email'} placeholder="enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}>
                </FormField>
              </div>
              <div>
                <FormField control={form.control} name='email' render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type={'password'} placeholder="enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}>
                </FormField>
              </div>
            </form>
          </Form>
        </div>
      </Card >
    </div >
  )
}

export default page