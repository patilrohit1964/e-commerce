'use client'
import { Card, CardContent } from '@/components/ui/card'
import { zSchmea } from '@/lib/zodSchema'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import Logo from '@/public/next.svg'
import ButtonLoading from '@/components/application/ButtonLoading'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { WEBSITE_REGISTER } from '@/routes/websiteRoute'
const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [istypePassword, setIsTypePassword] = useState(false)
  const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
    email: true,
  }).extend({
    password: z.string().min(3, 'password field is required') //using this we can set type of any field and add extra field
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLoginSubmit = async (values) => {
    console.log('values', values);
  }
  return (
    <div>
      <Card className={'w-[400px] px-4'}>
        <CardContent>
          <div className='flex justify-center'>
            <Image src={Logo} width={Logo.width} height={Logo.height} alt='logo' className='max-w-[150px]' />
          </div>
          <div className='text-center'>
            <h1 className='text-3xl font-bold'>Log into Account</h1>
            <p>login into your account by out the form below</p>
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
                      <Input type={'email'} placeholder="enter your email" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}>
                </FormField>
              </div>
              <div className='my-5 relative'>
                <FormField control={form.control} name='password' render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type={istypePassword ? 'password' : 'text'} placeholder="enter your password" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                    </FormControl>
                    <button className='absolute right-2 top-7 cursor-pointer' onClick={() => setIsTypePassword(!istypePassword)}>
                      {istypePassword ?
                        <EyeClosedIcon color='gray' />
                        :
                        <EyeIcon color='gray' size={'25'} />
                      }
                    </button>
                    <div className='text-right text-sm'>
                      <p className='text-primary cursor-pointer hover:text-gray-700 transition-all delay-150'>Forgot Password ?</p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}>
                </FormField>
              </div>
              <div><ButtonLoading type={'submit'} text={'Login'} loading={loading} className={'w-full cursor-pointer'} /></div>
              <div className='text-center mt-3'>
                <p>
                  Don't have account ?
                </p>
                <Link href={WEBSITE_REGISTER} className='underline text-primary'>Create account</Link>
              </div>
            </form>
          </Form>
        </div>
      </Card >
    </div >
  )
}

export default LoginPage