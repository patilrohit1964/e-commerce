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

const ForgotPassword = () => {
    const [passResetLoading, setPassResetLoading] = useState(false)
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
                                <div>
                                    <FormField control={forgotForm.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} placeholder='enter your password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div className='my-3'>
                                    <FormField control={forgotForm.control} name="confirmPassword" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} placeholder='confirm your password' {...field} />
                                            </FormControl>
                                            <FormMessage />
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