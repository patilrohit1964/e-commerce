'use client'
import ButtonLoading from '../../../../components/application/ButtonLoading'
import { Card, CardContent } from '../../../../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { showToast } from '../../../../lib/toast'
import { zSchmea } from '../../../../lib/zodSchema'
import Logo from '../../../../public/next.svg'
import { WEBSITE_LOGIN } from '../../../../routes/websiteRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const RegisterPage = () => {
    const [loading, setLoading] = useState(false)
    const [istypePassword, setIsTypePassword] = useState(false)
    const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
        email: true, password: true, name: true
    }).extend({
        confirmPassword: z.string() //using this we can set type of any field and add extra field
    }).refine(data => data.password === data.confirmPassword, { message: "password not match", path: ['confirmPassword'] }) //using this we can add our custom logic
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const handleRegisterSubmit = async (values) => {
        try {
            setLoading(true)
            const { data: registerResponce } = await axios.post('/api/auth/register', values);
            if (!registerResponce.success) {
                throw new Error(registerResponce.message)
            }
            form.reset()
            showToast("success", registerResponce?.message || 'Account Created')
        }
        catch (error) {
            console.log(error)
            showToast('error', error?.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Card className={'w-[400px] px-4'}>
                <CardContent>
                    <div className='flex justify-center'>
                        <Image src={Logo} width={Logo.width} height={Logo.height} alt='logo' className='max-w-[150px]' />
                    </div>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold mt-3'>Create Account</h1>
                        <p>login into your account by out the form below</p>
                    </div>
                </CardContent>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
                            <div className='mb-3'>
                                <FormField control={form.control} name='name' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>FullName</FormLabel>
                                        <FormControl>
                                            <Input type={'text'} placeholder="enter your name" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}>
                                </FormField>
                            </div>
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
                            <div className='my-3 relative'>
                                <FormField control={form.control} name='password' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type={istypePassword ? 'text' : 'password'} placeholder="enter your password" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                        </FormControl>
                                        <FormMessage />
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
                            <div className='mb-3'>
                                <FormField control={form.control} name='confirmPassword' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type={istypePassword ? 'password' : 'text'} placeholder="enter your confirm password" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}>
                                </FormField>
                            </div>
                            <div><ButtonLoading type={'submit'} text={'Create Account'} loading={loading} className={'w-full cursor-pointer'} /></div>
                            <div className='text-center mt-3 flex items-center justify-center gap-2'>
                                <p>
                                    Already have account ?
                                </p>
                                <Link href={WEBSITE_LOGIN} className='underline text-primary'>Login</Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </Card >
        </div >
    )
}

export default RegisterPage