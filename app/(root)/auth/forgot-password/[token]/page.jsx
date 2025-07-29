"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zSchmea } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const ForgotPassword = () => {
    const forgotSchema = zSchmea.pick({
        password: true,
    }).refine(data => data.password === data)

    const forgotForm = useForm({
        resolver: zodResolver(forgotSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })
    return (
        <div>
            <Card className={'w-[400px]'}>
                <CardContent>
                    <Form {...forgotSchema}>
                        <form action="">
                            <div>
                                <FormField control={forgotSchema.control} render={({ field }) => (
                                    <FormItem>
                                        <Input type={'text'} name="" placeholder='enter your password' {...field} />
                                    </FormItem>
                                )}>
                                </FormField>
                            </div>
                            <div>
                                <FormField render=(({field})=>(
                                <FormItem>
                                    <Input type={'text'} name="" placeholder='enter your password' {...field} />
                                </FormItem>
                                ))>
                            </FormField>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </div >
    )
}

export default ForgotPassword