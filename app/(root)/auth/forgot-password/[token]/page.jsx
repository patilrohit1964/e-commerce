"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zSchmea } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Logo from '@/public/next.svg'
import Image from 'next/image'
import ButtonLoading from '@/components/application/ButtonLoading'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import axios from 'axios'
import { responce } from '@/lib/helper'
import { showToast } from '@/lib/toast'
import { useRouter } from 'next/navigation'

const ForgotPassword = () => {
    const [passResetLoading, setPassResetLoading] = useState(false)
    const [istypePassword, setIsTypePassword] = useState(false)
    const router = useRouter()
    const forgotSchema = zSchmea.pick({
        password: true,
    }).extend({
        confirmPassword: z.string()
    }).refine(data => data.password === data.confirmPassword, { message: "password not match", path: ['confirmPassword'] })

    const forgotForm = useForm({
        resolver: zodResolver(forgotSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const handleForgotPassword = async (values) => {
        setPassResetLoading(true)
        try {
            const { data: forgotPassResponce } = await axios.post("/api/auth/forgot-pass", values)
            if (!forgotPassResponce.success) {
                return responce(false, 400, "something wrong");
            }
            forgotForm.reset()
            setPassResetLoading(false)
            showToast('success', "Password reset successfull")
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setPassResetLoading(false)
        }
    }
    return (
        <div>
            <Card className={'w-[400px]'}>
                <CardContent>
                    <div className='flex justify-center mb-3'>
                        <Image src={Logo} width={Logo.width} height={Logo.height} alt='logo' className='max-w-[150px]' />
                    </div>
                    <div>
                        <Form {...forgotForm}>
                            <form onSubmit={forgotForm.handleSubmit(handleForgotPassword)}>
                                <div className='relative'>
                                    <FormField control={forgotForm.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type={istypePassword ? 'text' : 'password'} placeholder='enter your password' {...field} />
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
                                <div className='my-3 relative'>
                                    <FormField control={forgotForm.control} name="confirmPassword" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type={istypePassword ? 'text' : 'password'} placeholder='confirm your password' {...field} />
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
                                <ButtonLoading loading={passResetLoading} text={"Forgot Password"} className={'w-full'} />
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}

export default ForgotPassword