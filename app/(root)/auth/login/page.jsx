'use client'
import ButtonLoading from '@/components/application/ButtonLoading'
import OtpVerification from '@/components/application/OtpVerification'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { showToast } from '@/lib/toast'
import { zSchmea } from '@/lib/zodSchema'
import Logo from '@/public/next.svg'
import { WEBSITE_REGISTER } from '@/routes/websiteRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [istypePassword, setIsTypePassword] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpEmail, setOtpEmail] = useState()
  const router = useRouter()
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
    try {
      setLoading(true)
      const { data: loginResponce } = await axios.post('/api/auth/login', values);
      if (!loginResponce.success) {
        throw new Error(loginResponce.message)
      }
      setOtpEmail(values.email)
      form.reset()
      showToast("success", loginResponce.message || "logged in Successfull")
    }
    catch (error) {
      console.log(error)
      showToast('error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOtpVerification = async (values) => {
    try {
      setOtpLoading(true)
      const { data: otpResponce } = await axios.post("/api/auth/verify-otp", values)
      if (!otpResponce.success) {
        throw new Error(otpResponce.message)
      }
      setOtpEmail('')
      showToast('success', otpResponce.message || "otp verified")
      router.push('/')
    }
    catch (error) {
      console.log(error)
      showToast('error', error)
    } finally {
      setOtpLoading(false)
    }
  }

  return (
    <div>
      <Card className={'w-[400px]'}>
        <CardContent>
          <div className='flex justify-center'>
            <Image src={Logo} width={Logo.width} height={Logo.height} alt='logo' className='max-w-[150px]' />
          </div>
          {!otpEmail ?
            <>
              <div className='text-center'>
                <h1 className='text-3xl font-bold'>Log into Account</h1>
                <p>login into your account by out the form below</p>
              </div>
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
                            <Input type={istypePassword ? 'text' : 'password'} placeholder="enter your password" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                          </FormControl>
                          <div className='flex justify-between items-center'>
                            <FormMessage />
                            <div className='text-sm ml-auto'>
                              <p className='text-primary cursor-pointer hover:text-gray-700 transition-all delay-150'>Forgot Password ?</p>
                            </div>
                          </div>
                          <button className='absolute right-2 top-7 cursor-pointer' onClick={() => setIsTypePassword(!istypePassword)}>
                            {istypePassword ?
                              <EyeIcon color='gray' size={'25'} />
                              :
                              <EyeClosedIcon color='gray' />
                            }
                          </button>
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
            </>
            :
            <OtpVerification email={otpEmail} loading={otpLoading} onSubmit={handleOtpVerification} />
          }
        </CardContent>
      </Card >
    </div >
  )
}

export default LoginPage