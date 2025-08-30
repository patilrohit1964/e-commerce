'use client'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import ButtonLoading from '@/components/application/ButtonLoading'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFetch } from '@/hooks/useFetch'
import { zSchmea } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { use } from 'react'
import { useForm } from 'react-hook-form'

const breadCrumbData = [
    {
        label: "Home",
        href: "Home",
    },
    {
        label: "Media",
        href: "Media",
    },
    {
        label: "Edit Media",
        href: "Edit Media",
    },
]
const EditMedia = ({ params }) => {
    const { id } = use(params)
    const { data: mediaData, loading } = useFetch(`/api/media/get/${id}`)
    const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
        _id: true,
        title: true,
        alt: true,
    })


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: "",
            alt: "",
            title: ""
        }
    })

    const onSubmit = async (values) => {
        // try {
        //     setLoading(true)
        //     const { data: loginResponce } = await axios.post('/api/auth/login', values);
        //     if (!loginResponce.success) {
        //         throw new Error(loginResponce.message)
        //     }
        //     setOtpEmail(values.email)
        //     form.reset()
        //     showToast("success", loginResponce.message || "logged in Successfull")
        // }
        // catch (error) {
        //     console.log(error)
        //     showToast('error', error?.message)
        // } finally {
        //     setLoading(false)
        // }
    }

    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <Card className={'py-0 rounded shadow-sm'}>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2'}>
                    <h4 className='text-2xl font-semibold'>Edit Media</h4>
                </CardHeader>
                <CardContent className={'pb-5'}>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onsubmit)}>
                                <div className='mb-5'>
                                    <Image src={mediaData?.data?.secure_url} width={300} height={300} alt={mediaData?.alt || 'image'} />
                                </div>
                                <div>
                                    <FormField control={form.control} name='alt' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={''}>Alt</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} id={'alt'} placeholder="enter your alt" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div>
                                    <FormField control={form.control} name='title' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={''}>Title</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} id={'title'} placeholder="enter your Title" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div>
                                    <ButtonLoading type={'submit'} text={'Update Media'} loading={loading} className={'cursor-pointer'} />
                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditMedia